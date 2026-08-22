// ==========================================================
// ANIMAL PARTY - ROCK PAPER SCISSORS
// FULL STABLE VERSION
// ==========================================================


// ==========================================================
// CHARACTERS
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
        localStorage.getItem(
            "animalPartyMode"
        ) === "guest"
    )
        ? sessionStorage
        : localStorage;

}


const storage =
    getGameStorage();


let selectedCharacter =
    storage.getItem(
        "selectedCharacter"
    ) || "dandy";


if (
    !characters[
        selectedCharacter
    ]
) {

    selectedCharacter =
        "dandy";

}


const playerData =
    characters[
        selectedCharacter
    ];


// ==========================================================
// ELEMENTS
// ==========================================================

const playerIcon =
    document.getElementById(
        "playerIcon"
    );

const playerName =
    document.getElementById(
        "playerName"
    );

const fighterIcon =
    document.getElementById(
        "fighterIcon"
    );

const roundText =
    document.getElementById(
        "roundText"
    );

const timerText =
    document.getElementById(
        "timerText"
    );

const timerBox =
    document.getElementById(
        "timerBox"
    );

const playerScore =
    document.getElementById(
        "playerScore"
    );

const enemyScore =
    document.getElementById(
        "enemyScore"
    );

const playerChoiceDisplay =
    document.getElementById(
        "playerChoiceDisplay"
    );

const enemyChoiceDisplay =
    document.getElementById(
        "enemyChoiceDisplay"
    );

const battleText =
    document.getElementById(
        "battleText"
    );

const choiceButtons =
    document.querySelectorAll(
        ".choice-button"
    );

const instructionOverlay =
    document.getElementById(
        "instructionOverlay"
    );

const readyButton =
    document.getElementById(
        "readyButton"
    );

const countdownOverlay =
    document.getElementById(
        "countdownOverlay"
    );

const countdown =
    document.getElementById(
        "countdown"
    );

const roundResult =
    document.getElementById(
        "roundResult"
    );

const roundResultText =
    document.getElementById(
        "roundResultText"
    );

const winOverlay =
    document.getElementById(
        "winOverlay"
    );

const loseOverlay =
    document.getElementById(
        "loseOverlay"
    );

const winButton =
    document.getElementById(
        "winButton"
    );

const loseButton =
    document.getElementById(
        "loseButton"
    );


// ==========================================================
// PLAYER UI
// ==========================================================

playerIcon.textContent =
    playerData.icon;


playerName.textContent =
    playerData.name;


fighterIcon.textContent =
    playerData.icon;


// ==========================================================
// DATA
// ==========================================================

const choices = {

    rock: {
        emoji: "✊🏼"
    },

    paper: {
        emoji: "✋🏼"
    },

    scissors: {
        emoji: "✌🏼"
    }

};


// ==========================================================
// STATE
// ==========================================================

let round =
    1;


let playerWins =
    0;


let enemyWins =
    0;


let gameStarted =
    false;


let gameEnded =
    false;


let acceptingChoice =
    false;


let timeLeft =
    10;


let roundTimer =
    null;


// ==========================================================
// HELPERS
// ==========================================================

function wait(ms) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

}


function setChoicesEnabled(
    enabled
) {

    choiceButtons.forEach(
        function(button) {

            button.disabled =
                !enabled;

        }
    );

}


// ==========================================================
// TIMER
// ==========================================================

function startRoundTimer() {

    clearInterval(
        roundTimer
    );


    timeLeft =
        10;


    timerText.textContent =
        timeLeft;


    timerBox.classList.remove(
        "danger"
    );


    roundTimer =
        setInterval(
            function() {

                if (
                    !acceptingChoice ||
                    gameEnded
                ) {
                    return;
                }


                timeLeft--;


                timerText.textContent =
                    timeLeft;


                if (
                    timeLeft <= 3
                ) {

                    timerBox.classList.add(
                        "danger"
                    );

                }


                if (
                    timeLeft <= 0
                ) {

                    clearInterval(
                        roundTimer
                    );


                    timeOutRound();

                }

            },
            1000
        );

}


// ==========================================================
// ENEMY CHOICE
//
// DRAW dibuat lebih jarang.
// ==========================================================

function makeEnemyChoice(
    playerChoice
) {

    const random =
        Math.random();


    // only around 12% draw

    if (
        random <
        .12
    ) {

        return playerChoice;

    }


    const otherChoices =
        Object.keys(
            choices
        ).filter(
            choice =>
                choice !==
                playerChoice
        );


    return otherChoices[
        Math.floor(
            Math.random() *
            otherChoices.length
        )
    ];

}


// ==========================================================
// RESULT
// ==========================================================

function getRoundResult(
    playerChoice,
    enemyChoice
) {

    if (
        playerChoice ===
        enemyChoice
    ) {

        return "draw";

    }


    if (
        playerChoice === "rock" &&
        enemyChoice === "scissors"
    ) {

        return "win";

    }


    if (
        playerChoice === "paper" &&
        enemyChoice === "rock"
    ) {

        return "win";

    }


    if (
        playerChoice === "scissors" &&
        enemyChoice === "paper"
    ) {

        return "win";

    }


    return "lose";

}


// ==========================================================
// START COUNTDOWN
// ==========================================================

async function startCountdown() {

    readyButton.disabled =
        true;


    instructionOverlay.classList.remove(
        "show"
    );


    countdownOverlay.classList.add(
        "show"
    );


    for (
        const value of
        [
            "3",
            "2",
            "1",
            "GO!"
        ]
    ) {

        countdown.textContent =
            value;


        countdown.style.opacity =
            "0";


        countdown.style.transform =
            "scale(.5)";


        requestAnimationFrame(
            function() {

                countdown.style.transition =
                    ".25s";


                countdown.style.opacity =
                    "1";


                countdown.style.transform =
                    "scale(1)";

            }
        );


        await wait(
            value === "GO!"
                ? 500
                : 800
        );

    }


    countdownOverlay.classList.remove(
        "show"
    );


    startGame();

}


// ==========================================================
// START GAME
// ==========================================================

function startGame() {

    gameStarted =
        true;


    gameEnded =
        false;


    round =
        1;


    playerWins =
        0;


    enemyWins =
        0;


    updateScore();


    startRound();

}


// ==========================================================
// START ROUND
// ==========================================================

function startRound() {

    if (gameEnded) {
        return;
    }


    roundText.textContent =
        round;


    playerChoiceDisplay.textContent =
        "❔";


    enemyChoiceDisplay.textContent =
        "❔";


    battleText.textContent =
        "CHOOSE!";


    acceptingChoice =
        true;


    setChoicesEnabled(
        true
    );


    startRoundTimer();

}


// ==========================================================
// PLAYER SELECT
// ==========================================================

choiceButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                if (
                    !acceptingChoice ||
                    gameEnded
                ) {
                    return;
                }


                const choice =
                    button.dataset.choice;


                playRound(
                    choice
                );

            }
        );

    }
);


// ==========================================================
// ROCK PAPER SCISSORS SHOOT ANIMATION
// ==========================================================

async function playRound(playerChoice) {

    acceptingChoice = false;

    setChoicesEnabled(false);

    clearInterval(roundTimer);


    const enemyChoice =
        makeEnemyChoice(playerChoice);


    const sequence = [
        "ROCK!",
        "PAPER!",
        "SCISSORS!",
        "SHOOT!"
    ];


    for (const text of sequence) {

        battleText.textContent = text;


        /* bikin tulisan gede */
        battleText.classList.remove(
            "battle-big",
            "shoot-text"
        );


        /*
           restart animation setiap kata
        */
        void battleText.offsetWidth;


        battleText.classList.add(
            "battle-big"
        );


        if (text === "SHOOT!") {

            battleText.classList.add(
                "shoot-text"
            );

        }


        await wait(
            text === "SHOOT!"
                ? 600
                : 500
        );

    }


    /* balikin text ke posisi normal */

    battleText.classList.remove(
        "battle-big",
        "shoot-text"
    );


    playerChoiceDisplay.textContent =
        choices[playerChoice].emoji;


    enemyChoiceDisplay.textContent =
        choices[enemyChoice].emoji;


    const result =
        getRoundResult(
            playerChoice,
            enemyChoice
        );


    await wait(400);


    if (result === "win") {

        playerWins++;

        roundResultText.textContent =
            "YOU WON THIS ROUND!";

    }

    else if (result === "lose") {

        enemyWins++;

        roundResultText.textContent =
            "MR.T WON THIS ROUND!";

    }

    else {

        roundResultText.textContent =
            "DRAW!";

    }


    updateScore();


    roundResult.classList.add(
        "show"
    );


    await wait(950);


    roundResult.classList.remove(
        "show"
    );


    checkMatch();

}


// ==========================================================
// CHECK MATCH
// ==========================================================

function checkMatch() {

    if (
        playerWins >= 2
    ) {

        winGame();

        return;

    }


    if (
        enemyWins >= 2
    ) {

        loseGame();

        return;

    }


    round++;


    /*
        If draws happen, round can become
        4 / FINAL ROUND.
    */


    if (
        round >= 4
    ) {

        battleText.textContent =
            "FINAL ROUND!";

    }


    setTimeout(
        startRound,
        550
    );

}


// ==========================================================
// SCORE
// ==========================================================

function updateScore() {

    playerScore.textContent =
        playerWins;


    enemyScore.textContent =
        enemyWins;

}


// ==========================================================
// WIN / LOSE
// ==========================================================

function winGame() {

    if (gameEnded) {
        return;
    }


    gameEnded =
        true;


    gameStarted =
        false;


    acceptingChoice =
        false;


    clearInterval(
        roundTimer
    );


    setChoicesEnabled(
        false
    );


    setTimeout(
        function() {

            winOverlay.classList.add(
                "show"
            );

        },
        400
    );

}


function loseGame() {

    if (gameEnded) {
        return;
    }


    gameEnded =
        true;


    gameStarted =
        false;


    acceptingChoice =
        false;


    clearInterval(
        roundTimer
    );


    setChoicesEnabled(
        false
    );


    setTimeout(
        function() {

            loseOverlay.classList.add(
                "show"
            );

        },
        400
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

        stars =
            0;


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
// BUTTONS
// ==========================================================

readyButton.addEventListener(
    "click",
    startCountdown
);


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


loseButton.addEventListener(
    "click",
    function() {

        window.location.href =
            "home.html";

    }
);


setChoicesEnabled(
    false
);


updateScore();


console.log(
    "🐯 RPS ready"
);