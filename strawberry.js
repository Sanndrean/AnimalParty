// ==========================================================
// FIND THE STRAWBERRY
// ==========================================================

const stage =
    document.getElementById(
        "cupsStage"
    );


const cups =
    Array.from(
        document.querySelectorAll(
            ".cup-wrapper"
        )
    );


const roundText =
    document.getElementById(
        "roundText"
    );


const livesText =
    document.getElementById(
        "livesText"
    );


const difficultyText =
    document.getElementById(
        "difficultyText"
    );


const gameMessage =
    document.getElementById(
        "gameMessage"
    );


const gameSubMessage =
    document.getElementById(
        "gameSubMessage"
    );


const roundSteps =
    Array.from(
        document.querySelectorAll(
            ".round-step"
        )
    );


const instructionOverlay =
    document.getElementById(
        "instructionOverlay"
    );


const startButton =
    document.getElementById(
        "startButton"
    );


const closeInstructionButton =
    document.getElementById(
        "closeInstructionButton"
    );


const helpButton =
    document.getElementById(
        "helpButton"
    );


const resultOverlay =
    document.getElementById(
        "resultOverlay"
    );


const resultIcon =
    document.getElementById(
        "resultIcon"
    );


const resultBadge =
    document.getElementById(
        "resultBadge"
    );


const resultTitle =
    document.getElementById(
        "resultTitle"
    );


const resultText =
    document.getElementById(
        "resultText"
    );


const resultMessageIcon =
    document.getElementById(
        "resultMessageIcon"
    );


const rewardBox =
    document.getElementById(
        "rewardBox"
    );


const resultBackButton =
    document.getElementById(
        "resultBackButton"
    );


// ==========================================================
// STATE
// ==========================================================

let currentRound =
    1;


let lives =
    2;


let strawberryCup =
    null;


let isPlaying =
    false;


let canChoose =
    false;


let isShuffling =
    false;


let helpOpened =
    false;


let cupPositions =
    [
        0,
        1,
        2
    ];


// ==========================================================
// SETTINGS
// ==========================================================

const roundSettings = {

    1: {
        name: "EASY",
        swapCount: 4,
        speed: 620,
        revealTime: 1500
    },

    2: {
        name: "MEDIUM",
        swapCount: 6,
        speed: 480,
        revealTime: 1250
    },

    3: {
        name: "TRICKY",
        swapCount: 8,
        speed: 385,
        revealTime: 1100
    }

};


// ==========================================================
// HELPERS
// ==========================================================

function wait(ms) {

    return new Promise(
        function(resolve) {

            setTimeout(
                resolve,
                ms
            );

        }
    );

}


function randomNumber(max) {

    return Math.floor(
        Math.random()
        *
        max
    );

}


// ==========================================================
// POSITIONS
// ==========================================================

function getStagePositions() {

    const stageWidth =
        stage.clientWidth;


    const cupWidth =
        cups[0].offsetWidth;


    const sideSpace =
        stageWidth * .075;


    return [

        sideSpace,

        (
            stageWidth -
            cupWidth
        )
        /
        2,

        stageWidth -
        cupWidth -
        sideSpace

    ];

}


function drawCupPositions(
    instant = false
) {

    const slots =
        getStagePositions();


    cups.forEach(
        function(
            cup,
            cupId
        ) {

            if (
                instant
            ) {

                cup.style.transition =
                    "none";

            }


            cup.style.left =
                slots[
                    cupPositions[
                        cupId
                    ]
                ]
                +
                "px";

        }
    );


    if (
        instant
    ) {

        requestAnimationFrame(
            function() {

                cups.forEach(
                    function(cup) {

                        cup.style.transition =
                            "";

                    }
                );

            }
        );

    }

}


// ==========================================================
// HUD
// ==========================================================

function updateHUD() {

    roundText.textContent =
        currentRound
        +
        " / 3";


    if (
        lives === 2
    ) {

        livesText.textContent =
            "❤️❤️";

    }

    else if (
        lives === 1
    ) {

        livesText.textContent =
            "❤️🖤";

    }

    else {

        livesText.textContent =
            "🖤🖤";

    }


    difficultyText.textContent =
        "BEGINNER · ROUND "
        +
        currentRound
        +
        " · "
        +
        roundSettings[
            currentRound
        ].name;


    roundSteps.forEach(
        function(
            step,
            index
        ) {

            const round =
                index + 1;


            step.classList.remove(
                "active",
                "complete"
            );


            if (
                round <
                currentRound
            ) {

                step.classList.add(
                    "complete"
                );

            }


            if (
                round ===
                currentRound
            ) {

                step.classList.add(
                    "active"
                );

            }

        }
    );

}


// ==========================================================
// VISUAL RESET
// ==========================================================

function resetCupVisuals() {

    cups.forEach(
        function(cup) {

            cup.classList.remove(
                "reveal",
                "correct",
                "wrong"
            );


            cup.style.top =
                "50%";

        }
    );

}


// ==========================================================
// START
// ==========================================================

function resetGame() {

    currentRound =
        1;


    lives =
        2;


    strawberryCup =
        null;


    isPlaying =
        true;


    canChoose =
        false;


    isShuffling =
        false;


    cupPositions =
        [
            0,
            1,
            2
        ];


    resetCupVisuals();


    drawCupPositions(
        true
    );


    updateHUD();

}


async function startGame() {

    if (
        isPlaying
    ) {

        return;

    }


    resetGame();


    await wait(
        300
    );


    startRound();

}


// ==========================================================
// ROUND
// ==========================================================

async function startRound() {

    if (
        !isPlaying
    ) {

        return;

    }


    canChoose =
        false;


    resetCupVisuals();


    cupPositions =
        [
            0,
            1,
            2
        ];


    drawCupPositions(
        true
    );


    updateHUD();


    const config =
        roundSettings[
            currentRound
        ];


    gameMessage.textContent =
        "WATCH CAREFULLY!";


    gameSubMessage.textContent =
        "Remember which cup hides the strawberry 🍓";


    strawberryCup =
        cups[
            randomNumber(
                3
            )
        ];


    await wait(
        600
    );


    strawberryCup.classList.add(
        "reveal"
    );


    gameMessage.textContent =
        "REMEMBER THIS CUP! 🍓";


    await wait(
        config.revealTime
    );


    strawberryCup.classList.remove(
        "reveal"
    );


    await wait(
        450
    );


    isShuffling =
        true;


    gameMessage.textContent =
        "FOLLOW THE CUPS!";


    await shuffle(
        config
    );


    isShuffling =
        false;


    canChoose =
        true;


    gameMessage.textContent =
        "WHERE IS THE STRAWBERRY?";


    gameSubMessage.textContent =
        "Choose one cup 🍓";

}


// ==========================================================
// SHUFFLE
// ==========================================================

async function shuffle(
    config
) {

    for (
        let move = 0;
        move <
        config.swapCount;
        move++
    ) {

        let first;

        let second;


        do {

            first =
                randomNumber(
                    3
                );


            second =
                randomNumber(
                    3
                );

        }
        while (
            first ===
            second
        );


        const firstPosition =
            cupPositions[
                first
            ];


        cupPositions[
            first
        ] =
            cupPositions[
                second
            ];


        cupPositions[
            second
        ] =
            firstPosition;


        cups[
            first
        ].style.top =
            "45%";


        cups[
            second
        ].style.top =
            "55%";


        drawCupPositions();


        await wait(
            config.speed *
            .65
        );


        cups[
            first
        ].style.top =
            "50%";


        cups[
            second
        ].style.top =
            "50%";


        await wait(
            config.speed *
            .35
        );

    }

}


// ==========================================================
// ANSWER
// ==========================================================

cups.forEach(
    function(cup) {

        cup.addEventListener(
            "click",
            function() {

                if (
                    !isPlaying
                    ||
                    !canChoose
                    ||
                    isShuffling
                ) {

                    return;

                }


                checkAnswer(
                    cup
                );

            }
        );

    }
);


async function checkAnswer(
    chosenCup
) {

    canChoose =
        false;


    if (
        chosenCup ===
        strawberryCup
    ) {

        chosenCup.classList.add(
            "correct",
            "reveal"
        );


        gameMessage.textContent =
            "CORRECT!";


        gameSubMessage.textContent =
            "You found the strawberry 🍓";


        await wait(
            1350
        );


        if (
            currentRound ===
            3
        ) {

            winGame();

            return;

        }


        currentRound +=
            1;


        startRound();

    }

    else {

        lives -=
            1;


        updateHUD();


        chosenCup.classList.add(
            "wrong"
        );


        strawberryCup.classList.add(
            "reveal"
        );


        gameMessage.textContent =
            "WRONG CUP!";


        gameSubMessage.textContent =
            "The strawberry was here 😭";


        await wait(
            1450
        );


        if (
            lives <=
            0
        ) {

            loseGame();

            return;

        }


        startRound();

    }

}


// ==========================================================
// STAR
// ==========================================================

function awardStar() {

    const stars =
        Number(
            localStorage.getItem(
                "animalPartyStars"
            )
            ||
            0
        );


    localStorage.setItem(
        "animalPartyStars",
        String(
            stars + 1
        )
    );


    sessionStorage.setItem(
        "justWon",
        "true"
    );

}


// ==========================================================
// RESULT
// ==========================================================

function winGame() {

    isPlaying =
        false;


    awardStar();


    resultIcon.textContent =
        "🏆";


    resultBadge.textContent =
        "GAME COMPLETE";


    resultTitle.textContent =
        "YOU WON!";


    resultMessageIcon.textContent =
        "🍓";


    resultText.textContent =
        "You found the strawberry in all 3 rounds!";


    rewardBox.classList.remove(
        "hidden"
    );


    resultOverlay.classList.remove(
        "hidden"
    );

}


function loseGame() {

    isPlaying =
        false;


    resultIcon.textContent =
        "💔";


    resultBadge.textContent =
        "NO LIVES LEFT";


    resultTitle.textContent =
        "YOU LOST";


    resultMessageIcon.textContent =
        "🍓";


    resultText.textContent =
        "The strawberry got away this time.";


    rewardBox.classList.add(
        "hidden"
    );


    resultOverlay.classList.remove(
        "hidden"
    );

}


// ==========================================================
// INSTRUCTIONS
// ==========================================================

function openInstructions(
    fromHelp
) {

    helpOpened =
        Boolean(
            fromHelp
        );


    instructionOverlay.classList.remove(
        "hidden"
    );

}


startButton.addEventListener(
    "click",
    function() {

        instructionOverlay.classList.add(
            "hidden"
        );


        helpOpened =
            false;


        if (
            !isPlaying
        ) {

            startGame();

        }

    }
);


closeInstructionButton.addEventListener(
    "click",
    function() {

        instructionOverlay.classList.add(
            "hidden"
        );


        if (
            helpOpened
        ) {

            helpOpened =
                false;

            return;

        }


        if (
            !isPlaying
        ) {

            startGame();

        }

    }
);


helpButton.addEventListener(
    "click",
    function() {

        openInstructions(
            true
        );

    }
);


// ==========================================================
// RESULT BACK ONLY
// ==========================================================

resultBackButton.addEventListener(
    "click",
    function() {

        window.location.href =
            "home.html";

    }
);


// ==========================================================
// RESIZE
// ==========================================================

window.addEventListener(
    "resize",
    function() {

        drawCupPositions(
            true
        );

    }
);


// ==========================================================
// INIT
// ==========================================================

function initialize() {

    isPlaying =
        false;


    canChoose =
        false;


    updateHUD();


    requestAnimationFrame(
        function() {

            drawCupPositions(
                true
            );

        }
    );


    openInstructions(
        false
    );

}


initialize();