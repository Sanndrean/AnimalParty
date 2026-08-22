// ==========================================================
// ANIMAL PARTY - MATH QUIZ
// 10 QUESTIONS / 2 LIVES / 15 SEC EACH
// ==========================================================



// ==========================================================
// CHARACTER
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


const questionCounter =
    document.getElementById(
        "questionCounter"
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


const questionType =
    document.getElementById(
        "questionType"
    );


const questionText =
    document.getElementById(
        "questionText"
    );


const answerButtons =
    document.querySelectorAll(
        ".answer-button"
    );


const feedback =
    document.getElementById(
        "feedback"
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


const questionTransition =
    document.getElementById(
        "questionTransition"
    );


const nextQuestionText =
    document.getElementById(
        "nextQuestionText"
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
// PLAYER UI
// ==========================================================

playerIcon.textContent =
    playerData.icon;


playerName.textContent =
    playerData.name;



// ==========================================================
// STATE
// ==========================================================

let questionNumber =
    1;


let lives =
    2;


let currentQuestion =
    null;


let acceptingAnswer =
    false;


let gameEnded =
    false;


let timeLeft =
    15;


let questionTimer =
    null;



// ==========================================================
// HELPER
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


function shuffle(
    array
) {

    for (
        let i =
            array.length -
            1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (
                    i +
                    1
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
// QUESTION GENERATION
// ==========================================================

function generateQuestion(
    number
) {

    let text;
    let answer;
    let type;


    // Q1-2 addition

    if (
        number <= 2
    ) {

        const a =
            randomInt(
                10,
                60
            );


        const b =
            randomInt(
                10,
                39
            );


        answer =
            a +
            b;


        text =
            `${a} + ${b} = ?`;


        type =
            "ADDITION";

    }


    // Q3-5 multiplication

    else if (
        number <= 5
    ) {

        const a =
            randomInt(
                1,
                10
            );


        const b =
            randomInt(
                1,
                10
            );


        answer =
            a *
            b;


        text =
            `${a} × ${b} = ?`;


        type =
            "MULTIPLICATION";

    }


    // Q6-8 division

    else if (
        number <= 8
    ) {

        const divisor =
            Math.random() <
            .5
                ? 2
                : 5;


        const answerValue =
            randomInt(
                2,
                12
            );


        const dividend =
            divisor *
            answerValue;


        answer =
            answerValue;


        text =
            `${dividend} ÷ ${divisor} = ?`;


        type =
            "DIVISION";

    }


    // Q9-10 find X

    else {

        const x =
            randomInt(
                1,
                8
            );


        const coefficient =
            randomInt(
                1,
                3
            );


        const add =
            randomInt(
                1,
                8
            );


        const result =
            coefficient *
            x +
            add;


        answer =
            x;


        text =
            `${coefficient}x + ${add} = ${result}`;


        type =
            "FIND X";

    }


    const wrongAnswers =
        new Set();


    while (
        wrongAnswers.size <
        2
    ) {

        const difference =
            randomInt(
                -4,
                4
            );


        const wrong =
            answer +
            difference;


        if (
            wrong !== answer &&
            wrong >= 0
        ) {

            wrongAnswers.add(
                wrong
            );

        }

    }


    const answers =
        shuffle(
            [
                answer,
                ...wrongAnswers
            ]
        );


    return {
        text,
        answer,
        answers,
        type
    };

}



// ==========================================================
// LIVES
// ==========================================================

function renderLives() {

    livesElement.textContent =
        "❤️".repeat(
            lives
        )
        +
        "🖤".repeat(
            2 -
            lives
        );

}



// ==========================================================
// FEEDBACK
// ==========================================================

function showFeedback(
    emoji
) {

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
// TIMER
// ==========================================================

function startQuestionTimer() {

    clearInterval(
        questionTimer
    );


    timeLeft =
        15;


    timerText.textContent =
        timeLeft;


    timerCard.classList.remove(
        "warning"
    );


    questionTimer =
        setInterval(
            function() {

                if (
                    gameEnded ||
                    !acceptingAnswer
                ) {

                    return;

                }


                timeLeft--;


                timerText.textContent =
                    timeLeft;


                if (
                    timeLeft <= 5
                ) {

                    timerCard.classList.add(
                        "warning"
                    );

                }


                if (
                    timeLeft <= 0
                ) {

                    clearInterval(
                        questionTimer
                    );


                    timeExpired();

                }

            },

            1000
        );

}



// ==========================================================
// LOAD QUESTION
// ==========================================================

function loadQuestion() {

    if (
        gameEnded
    ) {

        return;

    }


    currentQuestion =
        generateQuestion(
            questionNumber
        );


    questionCounter.textContent =
        questionNumber +
        " / 10";


    questionType.textContent =
        currentQuestion.type;


    questionText.textContent =
        currentQuestion.text;


    answerButtons.forEach(
        function(button, index) {

            button.textContent =
                currentQuestion
                    .answers[
                        index
                    ];


            button.dataset.value =
                currentQuestion
                    .answers[
                        index
                    ];


            button.disabled =
                false;


            button.classList.remove(
                "correct",
                "wrong"
            );

        }
    );


    acceptingAnswer =
        true;


    startQuestionTimer();

}



// ==========================================================
// TIME EXPIRED
// ==========================================================

async function timeExpired() {

    if (
        gameEnded ||
        !acceptingAnswer
    ) {

        return;

    }


    acceptingAnswer =
        false;


    lives--;


    renderLives();


    showFeedback(
        "⏰"
    );


    answerButtons.forEach(
        button =>
            button.disabled =
                true
    );


    if (
        lives <= 0
    ) {

        await wait(
            650
        );


        loseGame(
            "Time ran out and you lost your last life!"
        );


        return;

    }


    await wait(
        700
    );


    nextQuestion();

}



// ==========================================================
// ANSWER
// ==========================================================

answerButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            async function() {

                if (
                    !acceptingAnswer ||
                    gameEnded
                ) {

                    return;

                }


                acceptingAnswer =
                    false;


                clearInterval(
                    questionTimer
                );


                answerButtons.forEach(
                    btn =>
                        btn.disabled =
                            true
                );


                const value =
                    Number(
                        button.dataset.value
                    );


                // CORRECT

                if (
                    value ===
                    currentQuestion.answer
                ) {

                    button.classList.add(
                        "correct"
                    );


                    showFeedback(
                        "✅"
                    );


                    await wait(
                        600
                    );


                    nextQuestion();

                }


                // WRONG

                else {

                    button.classList.add(
                        "wrong"
                    );


                    lives--;


                    renderLives();


                    showFeedback(
                        "⛔"
                    );


                    if (
                        lives <= 0
                    ) {

                        await wait(
                            650
                        );


                        loseGame(
                            "You ran out of lives!"
                        );


                        return;

                    }


                    await wait(
                        650
                    );


                    nextQuestion();

                }

            }
        );

    }
);



// ==========================================================
// NEXT QUESTION
// ==========================================================

async function nextQuestion() {

    if (
        questionNumber >=
        10
    ) {

        winGame();

        return;

    }


    questionNumber++;


    nextQuestionText.textContent =
        "QUESTION "
        +
        questionNumber;


    questionTransition.classList.add(
        "show"
    );


    await wait(
        700
    );


    questionTransition.classList.remove(
        "show"
    );


    loadQuestion();

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


        await wait(
            value === "GO!"
                ? 500
                : 750
        );

    }


    countdownOverlay.classList.remove(
        "show"
    );


    questionNumber =
        1;


    lives =
        2;


    gameEnded =
        false;


    renderLives();


    loadQuestion();

}



// ==========================================================
// WIN / LOSE
// ==========================================================

function winGame() {

    if (
        gameEnded
    ) {

        return;

    }


    gameEnded =
        true;


    acceptingAnswer =
        false;


    clearInterval(
        questionTimer
    );


    winOverlay.classList.add(
        "show"
    );

}


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


    acceptingAnswer =
        false;


    clearInterval(
        questionTimer
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



renderLives();