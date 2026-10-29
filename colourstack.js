const tubeBoard = document.getElementById("tubeBoard");
const progressValue = document.getElementById("progressValue");
const progressFill = document.getElementById("progressFill");
const timeLeft = document.getElementById("timeLeft");
const gameMessage = document.getElementById("gameMessage");
const introOverlay = document.getElementById("introOverlay");
const resultOverlay = document.getElementById("resultOverlay");
const countdownOverlay = document.getElementById("countdownOverlay");
const countdownNumber = document.getElementById("countdownNumber");
const dangerOverlay = document.getElementById("dangerOverlay");
const startButton = document.getElementById("startButton");
const colours = ["coral", "sun", "ocean", "leaf"];
const stackCapacity = 4;
let stacks = [];
let selectedStack = null;
let secondsRemaining = 60;
let timer = null;
let gameActive = false;
let countingDown = false;
let lastMove = null;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function shuffle(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function newBoard() {
  const blocks = shuffle(colours.flatMap((colour) => Array(stackCapacity).fill(colour)));
  stacks = Array.from({ length: colours.length }, (_, index) => blocks.slice(index * 4, index * 4 + 4));
  stacks.push([]);
  selectedStack = null;
  renderBoard();
  updateProgress();
}

function renderBoard() {
  tubeBoard.replaceChildren();
  stacks.forEach((stack, stackIndex) => {
    const wrap = document.createElement("div");
    wrap.className = "tube-wrap";
    const tube = document.createElement("button");
    tube.type = "button";
    const received = lastMove?.stack === stackIndex;
    tube.className = `tube${selectedStack === stackIndex ? " selected" : ""}${received ? " received" : ""}`;
    tube.setAttribute("aria-label", `Stack ${stackIndex + 1}, ${stack.length} blocks`);
    tube.setAttribute("aria-pressed", String(selectedStack === stackIndex));
    tube.addEventListener("click", () => chooseStack(stackIndex));
    stack.forEach((colour, blockIndex) => {
      const block = document.createElement("span");
      block.className = `block${lastMove?.stack === stackIndex && lastMove.block === blockIndex ? " just-placed" : ""}`;
      block.dataset.colour = colour;
      block.setAttribute("aria-hidden", "true");
      tube.appendChild(block);
    });
    const label = document.createElement("span");
    label.className = "tube-label";
    label.textContent = stackIndex === 4 ? "SPARE" : `STACK ${stackIndex + 1}`;
    wrap.append(tube, label);
    tubeBoard.appendChild(wrap);
  });
  lastMove = null;
}

function updateProgress() {
  const groupedBlocks = stacks.reduce((total, stack) => {
    if (stack.length < 2) return total + stack.length;
    let longestRun = 1;
    let currentRun = 1;
    for (let i = 1; i < stack.length; i += 1) {
      currentRun = stack[i] === stack[i - 1] ? currentRun + 1 : 1;
      longestRun = Math.max(longestRun, currentRun);
    }
    return total + longestRun;
  }, 0);
  const percentage = Math.min(100, Math.round((groupedBlocks / (colours.length * stackCapacity)) * 100));
  progressValue.textContent = `${percentage}%`;
  progressFill.style.width = `${percentage}%`;
  return percentage;
}

function isComplete() {
  const completedColours = new Set();
  for (const stack of stacks) {
    if (!stack.length) continue;
    if (!stack.every((colour) => colour === stack[0])) return false;
    completedColours.add(stack[0]);
  }
  return completedColours.size === colours.length;
}

function chooseStack(index) {
  if (!gameActive) return;
  if (selectedStack === null) {
    if (!stacks[index].length) {
      gameMessage.textContent = "Pilih stack yang masih memiliki blok.";
      return;
    }
    selectedStack = index;
    gameMessage.textContent = "Pilih stack mana saja yang masih punya ruang.";
    renderBoard();
    return;
  }
  if (selectedStack === index) {
    selectedStack = null;
    gameMessage.textContent = "Pilih stack lain untuk memindahkan blok.";
    renderBoard();
    return;
  }
  const source = stacks[selectedStack];
  const destination = stacks[index];
  if (destination.length < stackCapacity) {
    destination.push(source.pop());
    lastMove = { stack: index, block: destination.length - 1 };
    gameMessage.textContent = "Blok dipindahkan! Terus kelompokkan warna yang sama.";
  } else {
    gameMessage.textContent = "Stack itu sudah penuh. Pilih stack lain.";
  }
  selectedStack = null;
  renderBoard();
  updateProgress();
  if (isComplete()) finishGame(true);
}

async function startGame() {
  if (countingDown) return;
  countingDown = true;
  clearInterval(timer);
  secondsRemaining = 60;
  timeLeft.textContent = "60";
  timeLeft.parentElement.classList.remove("is-low");
  dangerOverlay.classList.add("is-hidden");
  gameActive = false;
  resultOverlay.classList.add("is-hidden");
  introOverlay.classList.add("is-hidden");
  startButton.disabled = true;
  gameMessage.textContent = "Pindahkan blok sampai tiap stack berisi satu warna.";
  newBoard();
  countdownOverlay.classList.remove("is-hidden");
  countdownOverlay.setAttribute("aria-hidden", "false");
  for (let count = 3; count >= 1; count -= 1) {
    countdownNumber.textContent = String(count);
    countdownNumber.classList.remove("count-pulse");
    void countdownNumber.offsetWidth;
    countdownNumber.classList.add("count-pulse");
    await wait(800);
  }
  countdownOverlay.classList.add("is-hidden");
  countdownOverlay.setAttribute("aria-hidden", "true");
  countingDown = false;
  gameActive = true;
  timer = setInterval(() => {
    secondsRemaining -= 1;
    timeLeft.textContent = String(secondsRemaining);
    if (secondsRemaining <= 10) {
      timeLeft.parentElement.classList.add("is-low");
      dangerOverlay.classList.remove("is-hidden");
    }
    if (secondsRemaining <= 0) finishGame(false);
  }, 1000);
}

function finishGame(won) {
  if (!gameActive) return;
  gameActive = false;
  clearInterval(timer);
  dangerOverlay.classList.add("is-hidden");
  document.getElementById("resultIcon").textContent = won ? "🏆" : "💔";
  document.getElementById("resultKicker").textContent = won ? "🟢 EASY COMPLETE" : "TIME'S UP";
  document.getElementById("resultTitle").textContent = won ? "YOU WON!" : "YOU LOST";
  document.getElementById("resultMessage").textContent = won
    ? `You grouped every colour with ${secondsRemaining} seconds to spare.`
    : "The timer ran out before the stacks were sorted. Try again and beat the clock.";
  document.getElementById("starReward").classList.toggle("is-hidden", !won);
  document.getElementById("resultCard").classList.toggle("lost", !won);
  if (won) {
    const rewardStorage = localStorage.getItem("animalPartyMode") === "guest" ? sessionStorage : localStorage;
    let stars = Number.parseInt(rewardStorage.getItem("playerStars") || "0", 10);
    let level = Number.parseInt(rewardStorage.getItem("playerLevel") || "1", 10);
    if (!Number.isFinite(stars) || stars < 0) stars = 0;
    if (!Number.isFinite(level) || level < 1) level = 1;
    stars = ((stars % 3) + 3) % 3 + 1;
    if (stars >= 3) {
      stars = 0;
      level += 1;
    }
    rewardStorage.setItem("playerStars", String(stars));
    rewardStorage.setItem("playerLevel", String(level));
    sessionStorage.setItem("justWon", "true");
  }
  resultOverlay.classList.remove("is-hidden");
}

startButton.addEventListener("click", startGame);
newBoard();
