// ==========================================================
// MEMORY MIX
// 3 ROUNDS / 3 TOTAL LIVES / SAME PATTERN ON WRONG ANSWER
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

function getStorage() {

    return (
        localStorage.getItem(
            "animalPartyMode"
        ) === "guest"
    )
        ? sessionStorage
        : localStorage;

}


const storage =
    getStorage();


let selectedCharacter =
    storage.getItem(
        "selectedCharacter"
    ) || "dandy";


if (!characters[selectedCharacter]) {

    selectedCharacter =
        "dandy";

}


const player =
    characters[selectedCharacter];


// ==========================================================
// SYMBOLS
// ==========================================================

const symbols = [
    "⚡",
    "☄️",
    "💥",
    "🔥",
    "🌈"
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

const roundText =
    document.getElementById(
        "roundText"
    );

const timerText =
    document.getElementById(
        "timerText"
    );

const timerCard =
    document.getElementById(
        "timerCard"
    );

const livesElement =
    document.getElementById(
        "lives"
    );

const objectiveText =
    document.getElementById(
        "objectiveText"
    );

const sequenceElement =
    document.getElementById(
        "sequence"
    );

const memoryCountdown =
    document.getElementById(
        "memoryCountdown"
    );

const answerRow =
    document.getElementById(
        "answerRow"
    );

const symbolButtons =
    document.querySelectorAll(
        ".symbol-button"
    );

const instructionOverlay =
    document.getElementById(
        "instructionOverlay"
    );

const readyButton =
    document.getElementById(
        "readyButton"
    );

const startCountdownOverlay =
    document.getElementById(
        "startCountdownOverlay"
    );

const startCountdown =
    document.getElementById(
        "startCountdown"
    );

const roundOverlay =
    document.getElementById(
        "roundOverlay"
    );

const roundPopupText =
    document.getElementById(
        "roundPopupText"
    );

const winOverlay =
    document.getElementById(
        "winOverlay"
    );

const loseOverlay =
    document.getElementById(
        "loseOverlay"
    );

const loseReason =
    document.getElementById(
        "loseReason"
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
// FEEDBACK ELEMENT
// auto-created if HTML doesn't already have one
// ==========================================================

let feedback =
    document.getElementById(
        "feedbackEffect"
    );


if (!feedback) {

    feedback =
        document.createElement(
            "div"
        );


    feedback.id =
        "feedbackEffect";


    feedback.className =
        "feedback-effect";


    document.body.appendChild(
        feedback
    );

}


// ==========================================================
// PLAYER UI
// ==========================================================

playerIcon.textContent =
    player.icon;


playerName.textContent =
    player.name;


// ==========================================================
// STATE
// ==========================================================

let round =
    1;


let lives =
    3;


let sequence =
    [];


let playerAnswer =
    [];


let acceptingInput =
    false;


let gameEnded =
    false;


let timeLeft =
    60;


let timer =
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


function createSequence() {

    const result = [];


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        result.push(

            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ]

        );

    }


    return result;

}


function updateLives() {

    livesElement.innerHTML =
        "";


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const heart =
            document.createElement(
                "span"
            );


        heart.textContent =
            i < lives
                ? "❤️"
                : "🖤";


        if (
            i >= lives
        ) {

            heart.classList.add(
                "lost-heart"
            );

        }


        livesElement.appendChild(
            heart
        );

    }

}


function setButtons(
    enabled
) {

    symbolButtons.forEach(
        function(button) {

            button.disabled =
                !enabled;

        }
    );

}


// ==========================================================
// FEEDBACK ✅ / ❌
// ==========================================================

function showFeedback(
    symbol,
    type
) {

    feedback.textContent =
        symbol;


    feedback.className =
        "feedback-effect show " +
        type;


    setTimeout(
        function() {

            feedback.className =
                "feedback-effect";

        },

        650
    );

}


// ==========================================================
// TIMER
// ==========================================================

function startTimer() {

    timeLeft =
        60;


    timerText.textContent =
        timeLeft;


    timer =
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

                    timerCard.classList.add(
                        "danger"
                    );

                }


                if (
                    timeLeft <= 0
                ) {

                    showLose(
                        "Time is up! ⏰"
                    );

                }

            },

            1000
        );

}


// ==========================================================
// OPENING COUNTDOWN
// ==========================================================

async function openingCountdown() {

    readyButton.disabled =
        true;


    instructionOverlay.classList.remove(
        "show"
    );


    startCountdownOverlay.classList.add(
        "show"
    );


    for (
        const number of
        [
            "3",
            "2",
            "1",
            "GO!"
        ]
    ) {

        startCountdown.textContent =
            number;


        await wait(
            number === "GO!"
                ? 500
                : 750
        );

    }


    startCountdownOverlay.classList.remove(
        "show"
    );


    startTimer();


    startRound(
        true
    );

}


// ==========================================================
// SHOW CURRENT SEQUENCE
// ==========================================================

async function showCurrentSequence() {

    acceptingInput =
        false;


    setButtons(
        false
    );


    playerAnswer =
        [];


    answerRow.innerHTML =
        "";


    sequenceElement.innerHTML =
        "";


    objectiveText.textContent =
        "MEMORIZE THE ORDER";


    sequence.forEach(
        function(symbol) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "memory-card";


            card.textContent =
                symbol;


            sequenceElement.appendChild(
                card
            );

        }
    );


    // user gets 2 seconds before red countdown

    await wait(
        2000
    );


    for (
        const n of
        [
            "3",
            "2",
            "1"
        ]
    ) {

        memoryCountdown.textContent =
            n;


        memoryCountdown.classList.remove(
            "pulse"
        );


        void memoryCountdown.offsetWidth;


        memoryCountdown.classList.add(
            "pulse"
        );


        await wait(
            1000
        );

    }


    memoryCountdown.textContent =
        "";


    sequenceElement.innerHTML =
        "";


    objectiveText.textContent =
        "REPEAT THE ORDER";


    acceptingInput =
        true;


    setButtons(
        true
    );

}


// ==========================================================
// START ROUND
// newPattern = true only when entering a NEW round
// ==========================================================

async function startRound(
    newPattern = true
) {

    if (
        gameEnded
    ) {

        return;

    }


    if (
        newPattern
    ) {

        sequence =
            createSequence();

    }


    roundText.textContent =
        round +
        " / 3";


    await showCurrentSequence();

}


// ==========================================================
// WRONG ANSWER
// SAME PATTERN
// ==========================================================

async function retrySamePattern() {

    acceptingInput =
        false;


    setButtons(
        false
    );


    objectiveText.textContent =
        "TRY THE SAME PATTERN AGAIN";


    await wait(
        700
    );


    await showCurrentSequence();

}


// ==========================================================
// INPUT
// ==========================================================

symbolButtons.forEach(
    function(button) {

        button.addEventListener(
            "pointerdown",
            function(event) {

                event.preventDefault();


                if (
                    !acceptingInput ||
                    gameEnded
                ) {

                    return;

                }


                const symbol =
                    button.dataset.symbol;


                const position =
                    playerAnswer.length;


                const expected =
                    sequence[
                        position
                    ];


                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "answer-card";


                card.textContent =
                    symbol;


                answerRow.appendChild(
                    card
                );


                // ==================================================
                // WRONG
                // ==================================================

                if (
                    symbol !== expected
                ) {

                    acceptingInput =
                        false;


                    setButtons(
                        false
                    );


                    lives--;


                    updateLives();


                    card.classList.add(
                        "wrong-answer"
                    );


                    showFeedback(
                        "❌",
                        "wrong-feedback"
                    );


                    if (
                        lives <= 0
                    ) {

                        setTimeout(
                            function() {

                                showLose(
                                    "You ran out of lives! 💔"
                                );

                            },

                            600
                        );


                        return;

                    }


                    setTimeout(
                        function() {

                            retrySamePattern();

                        },

                        650
                    );


                    return;

                }


                // ==================================================
                // CORRECT
                // ==================================================

                playerAnswer.push(
                    symbol
                );


                card.classList.add(
                    "correct-answer"
                );


                showFeedback(
                    "✅",
                    "correct-feedback"
                );


                // pulse pressed button

                button.classList.remove(
                    "correct-press"
                );


                void button.offsetWidth;


                button.classList.add(
                    "correct-press"
                );


                setTimeout(
                    function() {

                        button.classList.remove(
                            "correct-press"
                        );

                    },

                    300
                );


                // ==================================================
                // COMPLETE PATTERN
                // ==================================================

                if (
                    playerAnswer.length ===
                    sequence.length
                ) {

                    acceptingInput =
                        false;


                    setButtons(
                        false
                    );


                    setTimeout(
                        completeRound,
                        500
                    );

                }

            }
        );

    }
);


// ==========================================================
// ROUND COMPLETE
// ==========================================================

async function completeRound() {

    if (
        round >= 3
    ) {

        showFeedback(
            "✅",
            "correct-feedback"
        );


        await wait(
            700
        );


        showWin();


        return;

    }


    round++;


    roundPopupText.textContent =
        "ROUND " +
        round;


    roundOverlay.classList.add(
        "show"
    );


    await wait(
        1100
    );


    roundOverlay.classList.remove(
        "show"
    );


    // NEW ROUND = NEW PATTERN

    startRound(
        true
    );

}


// ==========================================================
// WIN
// ==========================================================

function showWin() {

    if (
        gameEnded
    ) {

        return;

    }


    gameEnded =
        true;


    acceptingInput =
        false;


    clearInterval(
        timer
    );


    setButtons(
        false
    );


    winOverlay.classList.add(
        "show"
    );

}


// ==========================================================
// LOSE
// ==========================================================

function showLose(
    reason
) {

    if (
        gameEnded
    ) {

        return;

    }


    gameEnded =
        true;


    acceptingInput =
        false;


    clearInterval(
        timer
    );


    setButtons(
        false
    );


    loseReason.textContent =
        reason;


    loseOverlay.classList.add(
        "show"
    );

}


// ==========================================================
// REWARD
// ==========================================================

function getRank(
    level
) {

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
    openingCountdown
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


// ==========================================================
// INITIAL
// ==========================================================

updateLives();


setButtons(
    false
);