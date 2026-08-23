// ==========================================================
// SHEEP CENSUS
// DEADLY
// ==========================================================


// ==========================================================
// ELEMENTS
// ==========================================================

const animalLayer =
    document.getElementById(
        "animalLayer"
    );


const sheepField =
    document.getElementById(
        "sheepField"
    );


const roundText =
    document.getElementById(
        "roundText"
    );


const livesText =
    document.getElementById(
        "livesText"
    );


const roundBadge =
    document.getElementById(
        "roundBadge"
    );


const mainQuestion =
    document.getElementById(
        "mainQuestion"
    );


const subMessage =
    document.getElementById(
        "subMessage"
    );


const roundReminder =
    document.getElementById(
        "roundReminder"
    );


const reminderRound =
    document.getElementById(
        "reminderRound"
    );


const answerPanel =
    document.getElementById(
        "answerPanel"
    );


const guessNumber =
    document.getElementById(
        "guessNumber"
    );


const increaseButton =
    document.getElementById(
        "increaseButton"
    );


const decreaseButton =
    document.getElementById(
        "decreaseButton"
    );


const submitButton =
    document.getElementById(
        "submitButton"
    );


const timerText =
    document.getElementById(
        "timerText"
    );


const timerBar =
    document.getElementById(
        "timerBar"
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


const readyButton =
    document.getElementById(
        "readyButton"
    );


const closeInstructionButton =
    document.getElementById(
        "closeInstructionButton"
    );


const helpButton =
    document.getElementById(
        "helpButton"
    );


const feedbackFlash =
    document.getElementById(
        "feedbackFlash"
    );


const feedbackIcon =
    document.getElementById(
        "feedbackIcon"
    );


const feedbackTitle =
    document.getElementById(
        "feedbackTitle"
    );


const feedbackAnswer =
    document.getElementById(
        "feedbackAnswer"
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


let correctSheepCount =
    2;


let currentGuess =
    2;


let gameRunning =
    false;


let animalsRunning =
    false;


let answerActive =
    false;


let answerLocked =
    false;


let helpOpened =
    false;


const ANSWER_TIME =
    20;


let timerInterval =
    null;


// ==========================================================
// DIFFICULTY
// ==========================================================

const roundSettings = {

    1: {

        name: "WARM UP",

        minimum: 2,

        maximum: 8,

        distractors: 1,

        spawnGap: 760,

        travelTime: 4200

    },


    2: {

        name: "QUICK",

        minimum: 7,

        maximum: 16,

        distractors: 2,

        spawnGap: 620,

        travelTime: 3900

    },


    3: {

        name: "CHAOS",

        minimum: 14,

        maximum: 27,

        distractors: 4,

        spawnGap: 490,

        travelTime: 3500

    },


    4: {

        name: "DANGER",

        minimum: 24,

        maximum: 40,

        distractors: 6,

        spawnGap: 330,

        travelTime: 2850

    },


    5: {

        name: "DEADLY",

        minimum: 36,

        maximum: 54,

        distractors: 8,

        spawnGap: 265,

        travelTime: 2550

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


function randomBetween(
    min,
    max
) {

    return Math.floor(
        Math.random()
        *
        (
            max -
            min +
            1
        )
    )
    +
    min;

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
                Math.random()
                *
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


// ==========================================================
// GUESS
// ==========================================================

function clampGuess(
    value
) {

    value =
        Number(
            value
        );


    if (
        !Number.isFinite(
            value
        )
    ) {

        return 2;

    }


    return Math.max(
        2,
        Math.min(
            54,
            Math.round(
                value
            )
        )
    );

}


function setGuess(
    value
) {

    currentGuess =
        clampGuess(
            value
        );


    guessNumber.value =
        currentGuess;

}


// ==========================================================
// HUD
// ==========================================================

function updateHUD() {

    roundText.textContent =
        currentRound
        +
        " / 5";


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


    roundBadge.textContent =
        "⚫ DEADLY · ROUND "
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
// RESET
// ==========================================================

function resetGame() {

    stopTimer();


    currentRound =
        1;


    lives =
        2;


    correctSheepCount =
        2;


    setGuess(
        2
    );


    gameRunning =
        true;


    animalsRunning =
        false;


    answerActive =
        false;


    answerLocked =
        false;


    animalLayer.innerHTML =
        "";


    answerPanel.classList.add(
        "hidden"
    );


    updateHUD();

}


// ==========================================================
// START
// ==========================================================

async function startGame() {

    if (
        gameRunning
    ) {

        return;

    }


    resetGame();


    await wait(
        250
    );


    startRound();

}


// ==========================================================
// ROUND
// ==========================================================

async function startRound() {

    if (
        !gameRunning
    ) {

        return;

    }


    stopTimer();


    answerLocked =
        false;


    answerActive =
        false;


    animalsRunning =
        false;


    animalLayer.innerHTML =
        "";


    answerPanel.classList.add(
        "hidden"
    );


    updateHUD();


    const settings =
        roundSettings[
            currentRound
        ];


    correctSheepCount =
        randomBetween(
            settings.minimum,
            settings.maximum
        );


    reminderRound.textContent =
        "ROUND "
        +
        currentRound;


    roundReminder.classList.remove(
        "hidden"
    );


    mainQuestion.textContent =
        "BERAPAKAH DOMBA YANG LEWAT?";


    subMessage.textContent =
        "Count 🐑 only — ignore 🐘 and 🐇";


    await wait(
        1600
    );


    roundReminder.classList.add(
        "hidden"
    );


    await wait(
        300
    );


    mainQuestion.textContent =
        "COUNT CAREFULLY!";


    subMessage.textContent =
        "Only sheep count!";


    animalsRunning =
        true;


    await runAnimalSequence(
        correctSheepCount,
        settings
    );


    animalsRunning =
        false;


    await wait(
        400
    );


    showAnswerPanel();

}


// ==========================================================
// ANIMAL ARRAY
// ==========================================================

function generateAnimals(
    sheepAmount,
    distractorAmount
) {

    const animals =
        [];


    for (
        let i = 0;
        i < sheepAmount;
        i++
    ) {

        animals.push(
            {
                emoji: "🐑",
                type: "sheep"
            }
        );

    }


    for (
        let i = 0;
        i < distractorAmount;
        i++
    ) {

        if (
            Math.random() <
            .5
        ) {

            animals.push(
                {
                    emoji: "🐘",
                    type: "elephant"
                }
            );

        }

        else {

            animals.push(
                {
                    emoji: "🐇",
                    type: "rabbit"
                }
            );

        }

    }


    return shuffleArray(
        animals
    );

}


// ==========================================================
// RUN ANIMALS
// ==========================================================

async function runAnimalSequence(
    sheepAmount,
    settings
) {

    const sequence =
        generateAnimals(
            sheepAmount,
            settings.distractors
        );


    const promises =
        [];


    for (
        let i = 0;
        i <
        sequence.length;
        i++
    ) {

        const lane =
            i % 4;


        promises.push(

            createRunningAnimal(

                sequence[i],

                lane,

                settings.travelTime

            )

        );


        await wait(
            settings.spawnGap
        );

    }


    await Promise.all(
        promises
    );

}


// ==========================================================
// CREATE ANIMAL
// ==========================================================

function createRunningAnimal(
    data,
    lane,
    travelTime
) {

    return new Promise(
        function(resolve) {

            const animal =
                document.createElement(
                    "div"
                );


            animal.className =
                "running-animal "
                +
                data.type;


            animal.textContent =
                data.emoji;


            const lanes =
                [
                    9,
                    30,
                    51,
                    72
                ];


            animal.style.top =
                lanes[
                    lane
                ]
                +
                "%";


            animal.style.left =
                "-100px";


            animalLayer.appendChild(
                animal
            );


            requestAnimationFrame(
                function() {

                    requestAnimationFrame(
                        function() {

                            animal.style.transition =
                                "left "
                                +
                                travelTime
                                +
                                "ms linear";


                            animal.style.left =
                                (
                                    sheepField.clientWidth
                                    +
                                    120
                                )
                                +
                                "px";

                        }
                    );

                }
            );


            setTimeout(
                function() {

                    animal.remove();

                    resolve();

                },
                travelTime +
                120
            );

        }
    );

}


// ==========================================================
// ANSWER
// ==========================================================

function showAnswerPanel() {

    setGuess(
        2
    );


    mainQuestion.textContent =
        "BERAPAKAH DOMBA YANG LEWAT?";


    subMessage.textContent =
        "20 seconds to answer ⏱";


    answerPanel.classList.remove(
        "hidden"
    );


    answerActive =
        true;


    answerLocked =
        false;


    startTimer();

}


// ==========================================================
// INPUT
// ==========================================================

guessNumber.addEventListener(
    "focus",
    function() {

        if (
            !answerActive
        ) {

            guessNumber.blur();

            return;

        }


        guessNumber.select();

    }
);


guessNumber.addEventListener(
    "input",
    function() {

        if (
            !answerActive
        ) {

            return;

        }


        if (
            guessNumber.value ===
            ""
        ) {

            return;

        }


        let value =
            Number(
                guessNumber.value
            );


        if (
            value > 54
        ) {

            value =
                54;

        }


        currentGuess =
            value;

    }
);


guessNumber.addEventListener(
    "blur",
    function() {

        setGuess(
            guessNumber.value
        );

    }
);


// ==========================================================
// BUTTONS
// ==========================================================

increaseButton.addEventListener(
    "click",
    function() {

        if (
            !answerActive
        ) {

            return;

        }


        setGuess(
            Number(
                guessNumber.value
                ||
                currentGuess
            )
            +
            1
        );

    }
);


decreaseButton.addEventListener(
    "click",
    function() {

        if (
            !answerActive
        ) {

            return;

        }


        setGuess(
            Number(
                guessNumber.value
                ||
                currentGuess
            )
            -
            1
        );

    }
);


submitButton.addEventListener(
    "click",
    function() {

        setGuess(
            guessNumber.value
        );


        lockAnswer();

    }
);


// ==========================================================
// TIMER
// ==========================================================

function startTimer() {

    stopTimer();


    const start =
        Date.now();


    timerBar.style.width =
        "100%";


    timerBar.classList.remove(
        "danger"
    );


    timerInterval =
        setInterval(
            function() {

                const elapsed =
                    (
                        Date.now()
                        -
                        start
                    )
                    /
                    1000;


                const remaining =
                    Math.max(
                        0,
                        ANSWER_TIME
                        -
                        elapsed
                    );


                timerText.textContent =
                    Math.ceil(
                        remaining
                    );


                timerBar.style.width =
                    (
                        remaining /
                        ANSWER_TIME
                        *
                        100
                    )
                    +
                    "%";


                if (
                    remaining <=
                    5
                ) {

                    timerBar.classList.add(
                        "danger"
                    );

                }


                if (
                    remaining <=
                    0
                ) {

                    stopTimer();


                    setGuess(
                        guessNumber.value
                    );


                    lockAnswer();

                }

            },
            100
        );

}


function stopTimer() {

    if (
        timerInterval
    ) {

        clearInterval(
            timerInterval
        );


        timerInterval =
            null;

    }

}


// ==========================================================
// LOCK
// ==========================================================

function lockAnswer() {

    if (
        !answerActive
        ||
        answerLocked
    ) {

        return;

    }


    setGuess(
        guessNumber.value
    );


    answerLocked =
        true;


    answerActive =
        false;


    stopTimer();


    answerPanel.classList.add(
        "hidden"
    );


    checkAnswer();

}


// ==========================================================
// FEEDBACK
// ==========================================================

async function showFeedback(
    correct
) {

    feedbackFlash.className =
        "feedback-flash";


    if (
        correct
    ) {

        feedbackFlash.classList.add(
            "correct"
        );


        feedbackIcon.textContent =
            "✅";


        feedbackTitle.textContent =
            "CORRECT!";


        feedbackAnswer.textContent =
            "There were "
            +
            correctSheepCount
            +
            " sheep!";

    }

    else {

        feedbackFlash.classList.add(
            "wrong"
        );


        feedbackIcon.textContent =
            "❌";


        feedbackTitle.textContent =
            "WRONG!";


        feedbackAnswer.textContent =
            "Correct answer: "
            +
            correctSheepCount;

    }


    await wait(
        1150
    );


    feedbackFlash.className =
        "feedback-flash hidden";

}


// ==========================================================
// CHECK
// ==========================================================

async function checkAnswer() {

    const correct =
        currentGuess ===
        correctSheepCount;


    if (
        correct
    ) {

        await showFeedback(
            true
        );


        if (
            currentRound ===
            5
        ) {

            winGame();

            return;

        }


        currentRound +=
            1;


        await wait(
            500
        );


        startRound();

    }

    else {

        lives -=
            1;


        updateHUD();


        await showFeedback(
            false
        );


        if (
            lives <=
            0
        ) {

            loseGame();

            return;

        }


        await wait(
            700
        );


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
// WIN
// ==========================================================

function winGame() {

    gameRunning =
        false;


    awardStar();


    resultIcon.textContent =
        "🏆";


    resultBadge.textContent =
        "DEADLY COMPLETE";


    resultTitle.textContent =
        "YOU WON!";


    resultMessageIcon.textContent =
        "🐑";


    resultText.textContent =
        "You survived all 5 rounds!";


    rewardBox.classList.remove(
        "hidden"
    );


    resultOverlay.classList.remove(
        "hidden"
    );

}


// ==========================================================
// LOSE
// ==========================================================

function loseGame() {

    gameRunning =
        false;


    resultIcon.textContent =
        "💔";


    resultBadge.textContent =
        "NO LIVES LEFT";


    resultTitle.textContent =
        "YOU LOST";


    resultMessageIcon.textContent =
        "🐑";


    resultText.textContent =
        "The flock escaped your count.";


    rewardBox.classList.add(
        "hidden"
    );


    resultOverlay.classList.remove(
        "hidden"
    );

}


// ==========================================================
// INSTRUCTION
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


readyButton.addEventListener(
    "click",
    function() {

        instructionOverlay.classList.add(
            "hidden"
        );


        helpOpened =
            false;


        if (
            !gameRunning
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
            !gameRunning
        ) {

            startGame();

        }

    }
);


helpButton.addEventListener(
    "click",
    function() {

        if (
            animalsRunning
            ||
            answerActive
        ) {

            return;

        }


        openInstructions(
            true
        );

    }
);


// ==========================================================
// ENTER
// ==========================================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            !answerActive
        ) {

            return;

        }


        if (
            event.key ===
            "Enter"
        ) {

            event.preventDefault();


            setGuess(
                guessNumber.value
            );


            lockAnswer();

        }

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
// INIT
// ==========================================================

function initialize() {

    gameRunning =
        false;


    animalsRunning =
        false;


    answerActive =
        false;


    updateHUD();


    openInstructions(
        false
    );

}


initialize();