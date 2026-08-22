// ==========================================================
// ANIMAL PARTY - NUMBER REORGANIZER
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
        localStorage.getItem("animalPartyMode") === "guest"
    )
        ? sessionStorage
        : localStorage;

}


const storage =
    getGameStorage();


let selectedCharacter =
    storage.getItem("selectedCharacter") || "dandy";


if (!characters[selectedCharacter]) {

    selectedCharacter =
        "dandy";

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

const phaseText =
    document.getElementById("phaseText");

const timerText =
    document.getElementById("timerText");

const timerCard =
    document.getElementById("timerCard");

const objectiveLabel =
    document.getElementById("objectiveLabel");

const objectiveText =
    document.getElementById("objectiveText");

const objectiveSubtext =
    document.getElementById("objectiveSubtext");

const numberGrid =
    document.getElementById("numberGrid");

const progressLabel =
    document.getElementById("progressLabel");

const nextNumberText =
    document.getElementById("nextNumberText");

const progressFill =
    document.getElementById("progressFill");

const feedback =
    document.getElementById("feedback");

const instructionOverlay =
    document.getElementById("instructionOverlay");

const readyButton =
    document.getElementById("readyButton");

const countdownOverlay =
    document.getElementById("countdownOverlay");

const countdown =
    document.getElementById("countdown");

const nextChallengeOverlay =
    document.getElementById("nextChallengeOverlay");

const nextChallengeButton =
    document.getElementById("nextChallengeButton");

const roundBanner =
    document.getElementById("roundBanner");

const roundBannerText =
    document.getElementById("roundBannerText");

const winOverlay =
    document.getElementById("winOverlay");

const loseOverlay =
    document.getElementById("loseOverlay");

const loseReason =
    document.getElementById("loseReason");

const winButton =
    document.getElementById("winButton");

const loseButton =
    document.getElementById("loseButton");


// ==========================================================
// PLAYER UI
// ==========================================================

if (playerIcon) {

    playerIcon.textContent =
        playerData.icon;

}


if (playerName) {

    playerName.textContent =
        playerData.name;

}


// ==========================================================
// STATE
// ==========================================================

let phase =
    "organize";


let expectedNumber =
    30;


let gameEnded =
    false;


let acceptingInput =
    false;


let organizeTimeLeft =
    60;


let organizeTimer =
    null;


let findRound =
    0;


let findTargets =
    [];


let foundTargets =
    [];


let findTimeLeft =
    10;


let findTimer =
    null;


// ==========================================================
// HELPERS
// ==========================================================

function wait(ms) {

    return new Promise(
        resolve =>
            setTimeout(resolve, ms)
    );

}


function shuffleArray(
    array
) {

    for (
        let i =
            array.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (
                    i + 1
                )
            );


        [
            array[i],
            array[j]
        ]
        =
        [
            array[j],
            array[i]
        ];

    }


    return array;

}


function randomInt(
    min,
    max
) {

    return (
        Math.floor(
            Math.random() *
            (
                max -
                min +
                1
            )
        )
        +
        min
    );

}


// ==========================================================
// FEEDBACK
// ==========================================================

function showFeedback(
    emoji
) {

    if (!feedback) {
        return;
    }


    feedback.textContent =
        emoji;


    feedback.classList.remove(
        "show"
    );


    void feedback.offsetWidth;


    feedback.classList.add(
        "show"
    );

}


// ==========================================================
// CREATE BOARD
// ==========================================================

function createNumberBoard() {

    numberGrid.innerHTML =
        "";


    const numbers =
        shuffleArray(
            Array.from(
                {
                    length: 30
                },
                (_, index) =>
                    index + 1
            )
        );


    numbers.forEach(
        function(number) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "number-button";


            button.textContent =
                number;


            button.dataset.number =
                number;


            button.addEventListener(
                "click",
                function() {

                    handleNumberClick(
                        button,
                        number
                    );

                }
            );


            numberGrid.appendChild(
                button
            );

        }
    );

}


// ==========================================================
// ORGANIZE TIMER
// ==========================================================

function startOrganizeTimer() {

    clearInterval(
        organizeTimer
    );


    organizeTimeLeft =
        60;


    timerText.textContent =
        organizeTimeLeft;


    timerCard.classList.remove(
        "danger"
    );


    organizeTimer =
        setInterval(
            function() {

                if (
                    gameEnded ||
                    phase !==
                    "organize"
                ) {

                    return;

                }


                organizeTimeLeft--;


                timerText.textContent =
                    organizeTimeLeft;


                if (
                    organizeTimeLeft <= 10
                ) {

                    timerCard.classList.add(
                        "danger"
                    );

                }


                if (
                    organizeTimeLeft <= 0
                ) {

                    loseGame(
                        "Time ran out!"
                    );

                }

            },
            1000
        );

}


// ==========================================================
// ORGANIZE CLICK
// ==========================================================

function handleOrganizeClick(
    button,
    number
) {

    if (
        !acceptingInput ||
        gameEnded
    ) {

        return;

    }


    if (
        number ===
        expectedNumber
    ) {

        showFeedback(
            "✅"
        );


        button.classList.add(
            "correct"
        );


        setTimeout(
            function() {

                button.classList.add(
                    "completed"
                );

            },
            180
        );


        expectedNumber--;


        const completedCount =
            30 -
            expectedNumber;


        const progress =
            completedCount /
            30 *
            100;


        progressFill.style.width =
            progress +
            "%";


        if (
            expectedNumber >= 1
        ) {

            nextNumberText.textContent =
                expectedNumber;

        }

        else {

            nextNumberText.textContent =
                "DONE!";

        }


        if (
            expectedNumber <= 0
        ) {

            completeOrganize();

        }

    }

    else {

        showFeedback(
            "❌"
        );


        button.classList.remove(
            "wrong"
        );


        void button.offsetWidth;


        button.classList.add(
            "wrong"
        );


        setTimeout(
            function() {

                button.classList.remove(
                    "wrong"
                );

            },
            350
        );

    }

}


// ==========================================================
// COMPLETE ORGANIZE
// ==========================================================

function completeOrganize() {

    acceptingInput =
        false;


    clearInterval(
        organizeTimer
    );


    phase =
        "transition";


    phaseText.textContent =
        "COMPLETE";


    objectiveLabel.textContent =
        "CHALLENGE 1 COMPLETE";


    objectiveText.textContent =
        "NICE WORK!";


    objectiveSubtext.textContent =
        "Get ready for Find Number.";


    setTimeout(
        function() {

            nextChallengeOverlay.classList.add(
                "show"
            );

        },
        600
    );

}


// ==========================================================
// FIND TARGETS
// ==========================================================

function generateFindTargets(
    round
) {

    const count =
        round <= 3
            ? 1
            : 2;


    const targets =
        [];


    while (
        targets.length < count
    ) {

        const number =
            randomInt(
                1,
                30
            );


        if (
            !targets.includes(
                number
            )
        ) {

            targets.push(
                number
            );

        }

    }


    return targets;

}


// ==========================================================
// START FIND PHASE
// ==========================================================

async function startFindPhase() {

    nextChallengeOverlay.classList.remove(
        "show"
    );


    phase =
        "find";


    findRound =
        1;


    await startFindRound();

}


// ==========================================================
// START FIND ROUND
// ==========================================================

async function startFindRound() {

    if (
        gameEnded
    ) {

        return;

    }


    phase =
        "find";


    acceptingInput =
        false;


    foundTargets =
        [];


    findTargets =
        generateFindTargets(
            findRound
        );


    phaseText.textContent =
        "FIND";


    objectiveLabel.textContent =
        "FIND NUMBER";


    if (
        findTargets.length === 1
    ) {

        objectiveText.textContent =
            "FIND NUMBER " +
            findTargets[0];

    }

    else {

        objectiveText.textContent =
            "FIND "
            +
            findTargets[0]
            +
            " AND "
            +
            findTargets[1];

    }


    objectiveSubtext.textContent =
        "Tap the correct number before time runs out.";


    progressLabel.textContent =
        "ROUND";


    nextNumberText.textContent =
        findRound +
        " / 5";


    progressFill.style.width =
        (
            (
                findRound -
                1
            )
            /
            5
            *
            100
        )
        +
        "%";


    createNumberBoard();


    roundBannerText.textContent =
        "ROUND " +
        findRound;


    roundBanner.classList.add(
        "show"
    );


    await wait(
        800
    );


    roundBanner.classList.remove(
        "show"
    );


    acceptingInput =
        true;


    startFindTimer();

}


// ==========================================================
// FIND TIMER
// ==========================================================

function startFindTimer() {

    clearInterval(
        findTimer
    );


    findTimeLeft =
        10;


    timerText.textContent =
        findTimeLeft;


    timerCard.classList.remove(
        "danger"
    );


    document.body.classList.remove(
        "find-danger"
    );


    findTimer =
        setInterval(
            function() {

                if (
                    gameEnded ||
                    phase !== "find"
                ) {

                    return;

                }


                findTimeLeft--;


                timerText.textContent =
                    findTimeLeft;


                if (
                    findTimeLeft <= 3
                ) {

                    timerCard.classList.add(
                        "danger"
                    );


                    document.body.classList.add(
                        "find-danger"
                    );

                }


                if (
                    findTimeLeft <= 0
                ) {

                    loseGame(
                        "You couldn't find the number in time!"
                    );

                }

            },
            1000
        );

}


// ==========================================================
// FIND CLICK
// ==========================================================

function handleFindClick(
    button,
    number
) {

    if (
        !acceptingInput ||
        gameEnded
    ) {

        return;

    }


    const isTarget =
        findTargets.includes(
            number
        );


    const alreadyFound =
        foundTargets.includes(
            number
        );


    if (
        isTarget &&
        !alreadyFound
    ) {

        foundTargets.push(
            number
        );


        showFeedback(
            "✅"
        );


        button.classList.add(
            "correct"
        );


        button.disabled =
            true;


        if (
            foundTargets.length ===
            findTargets.length
        ) {

            completeFindRound();

        }

    }

    else {

        showFeedback(
            "❌"
        );


        button.classList.remove(
            "wrong"
        );


        void button.offsetWidth;


        button.classList.add(
            "wrong"
        );


        setTimeout(
            function() {

                button.classList.remove(
                    "wrong"
                );

            },
            350
        );

    }

}


// ==========================================================
// GENERIC CLICK
// ==========================================================

function handleNumberClick(
    button,
    number
) {

    if (
        phase === "organize"
    ) {

        handleOrganizeClick(
            button,
            number
        );

        return;

    }


    if (
        phase === "find"
    ) {

        handleFindClick(
            button,
            number
        );

    }

}


// ==========================================================
// COMPLETE FIND ROUND
// ==========================================================

async function completeFindRound() {

    acceptingInput =
        false;


    clearInterval(
        findTimer
    );


    document.body.classList.remove(
        "find-danger"
    );


    progressFill.style.width =
        (
            findRound /
            5 *
            100
        )
        +
        "%";


    showFeedback(
        "✅"
    );


    await wait(
        500
    );


    if (
        findRound >= 5
    ) {

        winGame();

        return;

    }


    findRound++;


    await startFindRound();

}


// ==========================================================
// COUNTDOWN
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
        const value of [
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
            "scale(.4)";


        void countdown.offsetWidth;


        countdown.style.transition =
            "transform .25s, opacity .25s";


        countdown.style.opacity =
            "1";


        countdown.style.transform =
            "scale(1)";


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

    gameEnded =
        false;


    phase =
        "organize";


    acceptingInput =
        true;


    expectedNumber =
        30;


    phaseText.textContent =
        "ORGANIZE";


    objectiveLabel.textContent =
        "CHALLENGE 1";


    objectiveText.textContent =
        "ORGANIZE FROM BIGGEST TO LOWEST";


    objectiveSubtext.textContent =
        "Start from 30 and continue down to 1.";


    progressLabel.textContent =
        "NEXT NUMBER";


    nextNumberText.textContent =
        "30";


    progressFill.style.width =
        "0%";


    createNumberBoard();


    startOrganizeTimer();

}


// ==========================================================
// WIN
// ==========================================================

function winGame() {

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
        organizeTimer
    );


    clearInterval(
        findTimer
    );


    document.body.classList.remove(
        "find-danger"
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


// ==========================================================
// LOSE
// ==========================================================

function loseGame(
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
        organizeTimer
    );


    clearInterval(
        findTimer
    );


    document.body.classList.remove(
        "find-danger"
    );


    loseReason.textContent =
        reason;


    loseOverlay.classList.add(
        "show"
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
            storage.getItem("playerStars") || "0",
            10
        );


    let level =
        parseInt(
            storage.getItem("playerLevel") || "1",
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
// BUTTONS
// ==========================================================

if (readyButton) {

    readyButton.disabled =
        false;


    readyButton.addEventListener(
        "click",
        startCountdown
    );

}


if (nextChallengeButton) {

    nextChallengeButton.addEventListener(
        "click",
        startFindPhase
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

createNumberBoard();


console.log(
    "🔢 Number Reorganizer fully loaded"
);