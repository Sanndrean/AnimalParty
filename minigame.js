// ==========================================================
// ANIMAL PARTY - MONKEY BASH
// FULL STABLE VERSION
// ==========================================================


// ==========================================================
// CHARACTER DATA
// ==========================================================

const characters = {

    dandy: { name: "Maximus", icon: "🐶" },
    claire: { name: "Sidney", icon: "🐭" },
    bubu: { name: "Ron", icon: "🐰" },
    janhe: { name: "Mario", icon: "🦊" },
    lunar: { name: "V", icon: "🐼" },
    lala: { name: "Debora", icon: "🐨" },
    bara: { name: "Andrea", icon: "🐻" },
    lex: { name: "Shiendra", icon: "🐺" },
    will: { name: "Lio", icon: "🦁" },
    coxie: { name: "Sapidermen", icon: "🐮" },
    piglet: { name: "Randy", icon: "🐷" },
    frogie: { name: "Ongko", icon: "🐸" }

};


// ==========================================================
// STORAGE
// ==========================================================

function getGameStorage() {

    return (
        localStorage.getItem("animalPartyMode") === "guest"
    )
        ? sessionStorage
        : localStorage;

}


const storage =
    getGameStorage();


// ==========================================================
// PLAYER
// ==========================================================

let selectedCharacter =
    storage.getItem("selectedCharacter") || "dandy";


if (!characters[selectedCharacter]) {

    selectedCharacter = "dandy";

}


const playerData =
    characters[selectedCharacter];


// ==========================================================
// ELEMENTS
// ==========================================================

const playerIcon =
    document.getElementById("playerIcon");

const playerName =
    document.getElementById("playerName");

const healthFill =
    document.getElementById("healthFill");

const healthText =
    document.getElementById("healthText");

const boss =
    document.getElementById("boss");

const itemArea =
    document.getElementById("itemArea");

const timerText =
    document.getElementById("timerText");

const timerBox =
    document.getElementById("timerBox");

const instructionOverlay =
    document.getElementById("instructionOverlay");

const readyButton =
    document.getElementById("readyButton");

const countdownOverlay =
    document.getElementById("countdownOverlay");

const countdown =
    document.getElementById("countdown");

const winOverlay =
    document.getElementById("winOverlay");

const loseOverlay =
    document.getElementById("loseOverlay");

const winButton =
    document.getElementById("winButton");

const loseButton =
    document.getElementById("loseButton");


// ==========================================================
// UI PLAYER
// ==========================================================

if (playerIcon) {
    playerIcon.textContent = playerData.icon;
}

if (playerName) {
    playerName.textContent = playerData.name;
}


// ==========================================================
// SETTINGS
// ==========================================================

const MAX_HP = 300;

const BOMB_DAMAGE = 20;

const BANANA_HEAL = 50;

const GAME_TIME = 40;


// ==========================================================
// STATE
// ==========================================================

let bossHP = MAX_HP;

let timeLeft = GAME_TIME;

let gameStarted = false;

let gameEnded = false;

let timerInterval = null;

let bananaSpawner = null;

let bossFaceTimeout = null;


// ==========================================================
// HELPERS
// ==========================================================

function wait(ms) {

    return new Promise(
        resolve =>
            setTimeout(resolve, ms)
    );

}


function randomBetween(min, max) {

    return (
        Math.random() *
        (max - min)
        +
        min
    );

}


// ==========================================================
// HEALTH
// ==========================================================

function renderHealth() {

    const percent =
        Math.max(
            0,
            Math.min(
                100,
                bossHP / MAX_HP * 100
            )
        );


    healthFill.style.width =
        percent + "%";


    healthText.textContent =
        bossHP +
        " / " +
        MAX_HP +
        " HP";


    if (percent > 60) {

        healthFill.style.background =
            "linear-gradient(#62e278,#2ba552)";

    }

    else if (percent > 30) {

        healthFill.style.background =
            "linear-gradient(#ffe95d,#e99b25)";

    }

    else {

        healthFill.style.background =
            "linear-gradient(#ff6874,#c82f43)";

    }

}


// ==========================================================
// BOSS HIT ANIMATION
// ==========================================================

function bossHit() {

    clearTimeout(
        bossFaceTimeout
    );


    boss.textContent =
        Math.random() < .5
            ? "🙈"
            : "🙊";


    boss.style.transform =
        "scale(1.14) rotate(-6deg)";


    setTimeout(
        function() {

            boss.style.transform = "";

        },
        180
    );


    bossFaceTimeout =
        setTimeout(
            function() {

                if (!gameEnded) {

                    boss.textContent =
                        "🐵";

                }

            },
            450
        );

}


// ==========================================================
// BOSS HEAL
// ==========================================================

function bossHeal() {

    clearTimeout(
        bossFaceTimeout
    );


    boss.textContent =
        "😋";


    boss.style.transform =
        "scale(1.12)";


    setTimeout(
        function() {

            boss.style.transform = "";

        },
        200
    );


    bossFaceTimeout =
        setTimeout(
            function() {

                if (!gameEnded) {

                    boss.textContent =
                        "🐵";

                }

            },
            450
        );

}


// ==========================================================
// ITEM COUNT
// ==========================================================

function countBombs() {

    return itemArea.querySelectorAll(
        '.game-item[data-type="bomb"]'
    ).length;

}


function countBananas() {

    return itemArea.querySelectorAll(
        '.game-item[data-type="banana"]'
    ).length;

}


// ==========================================================
// SPAWN ITEM
// ==========================================================

function createItem(type) {

    if (
        !gameStarted ||
        gameEnded
    ) {
        return;
    }


    const item =
        document.createElement("div");


    item.className =
        "game-item";


    item.dataset.type =
        type;


    item.textContent =
        type === "bomb"
            ? "💣"
            : "🍌";


    const areaRect =
        itemArea.getBoundingClientRect();


    const safeWidth =
        Math.max(
            60,
            areaRect.width - 65
        );


    const safeHeight =
        Math.max(
            60,
            areaRect.height - 65
        );


    item.style.left =
        randomBetween(
            0,
            safeWidth
        )
        + "px";


    item.style.top =
        randomBetween(
            0,
            safeHeight
        )
        + "px";


    itemArea.appendChild(
        item
    );


    enableDrag(
        item
    );


    // banana disappears after 8 sec
    if (
        type === "banana"
    ) {

        const bananaTimeout =
            setTimeout(
                function() {

                    if (
                        item.isConnected
                    ) {

                        item.style.transition =
                            "opacity .3s, transform .3s";


                        item.style.opacity =
                            "0";


                        item.style.transform =
                            "scale(.5)";


                        setTimeout(
                            function() {

                                if (
                                    item.isConnected
                                ) {

                                    item.remove();

                                }

                            },
                            300
                        );

                    }

                },
                8000
            );


        item.dataset.expireTimer =
            bananaTimeout;

    }

}


// ==========================================================
// BOMBS
// ==========================================================

function spawnBombWave() {

    if (
        !gameStarted ||
        gameEnded
    ) {
        return;
    }


    const existing =
        countBombs();


    const needed =
        5 - existing;


    for (
        let i = 0;
        i < needed;
        i++
    ) {

        createItem(
            "bomb"
        );

    }

}


function ensureBombs() {

    if (
        !gameStarted ||
        gameEnded
    ) {
        return;
    }


    if (
        countBombs() <= 2
    ) {

        setTimeout(
            function() {

                spawnBombWave();

            },
            350
        );

    }

}


// ==========================================================
// BANANA SPAWNER
// ==========================================================

function startBananaSpawner() {

    bananaSpawner =
        setInterval(
            function() {

                if (
                    gameEnded ||
                    !gameStarted
                ) {
                    return;
                }


                if (
                    countBananas() >= 2
                ) {
                    return;
                }


                // only ~35% chance each check
                if (
                    Math.random() < .35
                ) {

                    createItem(
                        "banana"
                    );

                }

            },
            3000
        );

}


// ==========================================================
// DRAG
// ==========================================================

function enableDrag(item) {

    let dragging = false;

    let offsetX = 0;

    let offsetY = 0;


    function pointerDown(event) {

        if (
            !gameStarted ||
            gameEnded
        ) {
            return;
        }


        event.preventDefault();


        dragging = true;


        const rect =
            item.getBoundingClientRect();


        offsetX =
            event.clientX -
            rect.left;


        offsetY =
            event.clientY -
            rect.top;


        item.setPointerCapture(
            event.pointerId
        );


        item.style.zIndex =
            "500";

    }


    function pointerMove(event) {

        if (!dragging) {
            return;
        }


        event.preventDefault();


        const areaRect =
            itemArea.getBoundingClientRect();


        item.style.position =
            "fixed";


        item.style.left =
            (
                event.clientX -
                offsetX
            )
            + "px";


        item.style.top =
            (
                event.clientY -
                offsetY
            )
            + "px";

    }


    function pointerUp(event) {

        if (!dragging) {
            return;
        }


        dragging = false;


        try {

            item.releasePointerCapture(
                event.pointerId
            );

        }
        catch {}


        if (
            !item.isConnected
        ) {
            return;
        }


        const itemRect =
            item.getBoundingClientRect();


        const bossRect =
            boss.getBoundingClientRect();


        const centerX =
            itemRect.left +
            itemRect.width / 2;


        const centerY =
            itemRect.top +
            itemRect.height / 2;


        const hitBoss =
            centerX >= bossRect.left &&
            centerX <= bossRect.right &&
            centerY >= bossRect.top &&
            centerY <= bossRect.bottom;


        if (hitBoss) {

            useItem(
                item
            );

        }

        else {

            returnItem(
                item
            );

        }

    }


    item.addEventListener(
        "pointerdown",
        pointerDown
    );


    item.addEventListener(
        "pointermove",
        pointerMove
    );


    item.addEventListener(
        "pointerup",
        pointerUp
    );


    item.addEventListener(
        "pointercancel",
        pointerUp
    );

}


// ==========================================================
// RETURN ITEM
// ==========================================================

function returnItem(item) {

    if (!item.isConnected) {
        return;
    }


    const areaRect =
        itemArea.getBoundingClientRect();


    item.style.position =
        "absolute";


    item.style.left =
        randomBetween(
            0,
            Math.max(
                20,
                areaRect.width - 65
            )
        )
        + "px";


    item.style.top =
        randomBetween(
            0,
            Math.max(
                20,
                areaRect.height - 65
            )
        )
        + "px";


    item.style.zIndex =
        "";

}


// ==========================================================
// USE ITEM
// ==========================================================

function useItem(item) {

    if (
        gameEnded ||
        !gameStarted
    ) {
        return;
    }


    const type =
        item.dataset.type;


    item.remove();


    if (
        type === "bomb"
    ) {

        bossHP -=
            BOMB_DAMAGE;


        bossHP =
            Math.max(
                0,
                bossHP
            );


        bossHit();


        renderHealth();


        if (
            bossHP <= 0
        ) {

            winGame();

            return;

        }


        ensureBombs();

    }


    else if (
        type === "banana"
    ) {

        bossHP +=
            BANANA_HEAL;


        bossHP =
            Math.min(
                MAX_HP,
                bossHP
            );


        bossHeal();


        renderHealth();

    }

}


// ==========================================================
// TIMER
// ==========================================================

function startTimer() {

    timeLeft =
        GAME_TIME;


    timerText.textContent =
        timeLeft;


    timerInterval =
        setInterval(
            function() {

                if (
                    gameEnded
                ) {
                    return;
                }


                timeLeft--;


                timerText.textContent =
                    timeLeft;


                if (
                    timeLeft <= 10
                ) {

                    timerBox.style.background =
                        "#d83d50";


                    timerBox.style.transform =
                        "scale(1.05)";

                }


                if (
                    timeLeft <= 0
                ) {

                    loseGame();

                }

            },
            1000
        );

}


// ==========================================================
// COUNTDOWN
// ==========================================================

async function startCountdown() {

    if (
        !readyButton ||
        !countdownOverlay ||
        !countdown
    ) {

        console.error(
            "Monkey Bash countdown elements missing"
        );

        return;

    }


    readyButton.disabled =
        true;


    instructionOverlay.classList.remove(
        "show"
    );


    countdownOverlay.classList.add(
        "show"
    );


    const values =
        [
            "3",
            "2",
            "1",
            "GO!"
        ];


    for (
        const value of values
    ) {

        countdown.textContent =
            value;


        countdown.style.transform =
            "scale(.5)";


        countdown.style.opacity =
            "0";


        requestAnimationFrame(
            function() {

                countdown.style.transition =
                    "transform .25s, opacity .25s";


                countdown.style.transform =
                    "scale(1)";


                countdown.style.opacity =
                    "1";

            }
        );


        await wait(
            value === "GO!"
                ? 550
                : 800
        );

    }


    countdownOverlay.classList.remove(
        "show"
    );


    startGame();

}


// ==========================================================
// GAME START
// ==========================================================

function startGame() {

    gameStarted =
        true;


    gameEnded =
        false;


    bossHP =
        MAX_HP;


    boss.textContent =
        "🐵";


    itemArea.innerHTML =
        "";


    renderHealth();


    spawnBombWave();


    startBananaSpawner();


    startTimer();

}


// ==========================================================
// END GAME
// ==========================================================

function stopGame() {

    gameStarted =
        false;


    clearInterval(
        timerInterval
    );


    clearInterval(
        bananaSpawner
    );


    itemArea
        .querySelectorAll(
            ".game-item"
        )
        .forEach(
            item =>
                item.remove()
        );

}


// ==========================================================
// WIN
// ==========================================================

function winGame() {

    if (gameEnded) {
        return;
    }


    gameEnded =
        true;


    stopGame();


    bossHP =
        0;


    renderHealth();


    boss.textContent =
        "🙉";


    boss.style.transform =
        "scale(1.25)";


    setTimeout(
        function() {

            winOverlay.classList.add(
                "show"
            );

        },
        650
    );

}


// ==========================================================
// LOSE
// ==========================================================

function loseGame() {

    if (gameEnded) {
        return;
    }


    gameEnded =
        true;


    stopGame();


    setTimeout(
        function() {

            loseOverlay.classList.add(
                "show"
            );

        },
        350
    );

}


// ==========================================================
// RANK
// ==========================================================

function getRank(level) {

    if (level >= 85) return "S+";
    if (level >= 80) return "S3";
    if (level >= 75) return "S2";
    if (level >= 70) return "S1";
    if (level >= 40) return "Legend";
    if (level >= 25) return "Hero";
    if (level >= 15) return "Flash";
    if (level >= 10) return "Master";
    if (level >= 3) return "Professional";

    return "Beginner";

}


// ==========================================================
// REWARD
// ==========================================================

function rewardPlayer() {

    let stars =
        parseInt(
            storage.getItem(
                "playerStars"
            ) || "0",
            10
        );


    let level =
        parseInt(
            storage.getItem(
                "playerLevel"
            ) || "1",
            10
        );


    sessionStorage.setItem(
        "rankBeforeWin",
        getRank(level)
    );


    sessionStorage.setItem(
        "levelBeforeWin",
        String(level)
    );


    stars++;


    if (
        stars >= 3
    ) {

        stars = 0;

        level++;

    }


    storage.setItem(
        "playerStars",
        String(stars)
    );


    storage.setItem(
        "playerLevel",
        String(level)
    );


    sessionStorage.setItem(
        "justWon",
        "true"
    );

}


// ==========================================================
// BUTTON EVENTS
// ==========================================================

if (readyButton) {

    readyButton.addEventListener(
        "click",
        startCountdown
    );

}


if (winButton) {

    winButton.addEventListener(
        "click",
        function() {

            winButton.disabled =
                true;


            rewardPlayer();


            window.location.href =
                "home.html";

        }
    );

}


if (loseButton) {

    loseButton.addEventListener(
        "click",
        function() {

            window.location.href =
                "home.html";

        }
    );

}


// ==========================================================
// INITIAL
// ==========================================================

renderHealth();


console.log(
    "🐵 Monkey Bash ready"
);