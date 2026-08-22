// ==========================================================
// ANIMAL PARTY - SPEED SPRINT
// FULL STABLE VERSION
// DESKTOP + MOBILE
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

const hudPlayerIcon =
    document.getElementById("hudPlayerIcon");

const hudPlayerName =
    document.getElementById("hudPlayerName");

const playerIcon =
    document.getElementById("playerIcon");

const timerText =
    document.getElementById("timerText");

const timerBox =
    document.getElementById("timerBox");

const placeText =
    document.getElementById("placeText");

const playerRacer =
    document.getElementById("playerRacer");

const flashRacer =
    document.getElementById("flashRacer");

const grassyRacer =
    document.getElementById("grassyRacer");

const bigKey =
    document.getElementById("bigKey");

const promptFill =
    document.getElementById("promptFill");

const runEffect =
    document.getElementById("runEffect");

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

const loseText =
    document.getElementById("loseText");

const winButton =
    document.getElementById("winButton");

const loseButton =
    document.getElementById("loseButton");

const mobileKeys =
    document.querySelectorAll(".mobile-key");


// ==========================================================
// PLAYER UI
// ==========================================================

if (hudPlayerIcon) {

    hudPlayerIcon.textContent =
        playerData.icon;

}


if (hudPlayerName) {

    hudPlayerName.textContent =
        playerData.name;

}


if (playerIcon) {

    playerIcon.textContent =
        playerData.icon;

}


// ==========================================================
// SETTINGS
// ==========================================================

const GAME_TIME =
    40;


const PROMPT_TIME =
    1500;


const keys =
    [
        "w",
        "a",
        "s",
        "d"
    ];


// ==========================================================
// STATE
// ==========================================================

let gameStarted =
    false;


let gameEnded =
    false;


let acceptingInput =
    false;


let currentKey =
    "w";


let previousKey =
    "";


let promptStartedAt =
    0;


let timeLeft =
    GAME_TIME;


let playerProgress =
    0;


let flashProgress =
    0;


let grassyProgress =
    0;


let gameTimer =
    null;


let botTimer =
    null;


let promptTimeout =
    null;


let promptAnimation =
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


function clamp(
    value,
    min,
    max
) {

    return Math.max(
        min,
        Math.min(
            max,
            value
        )
    );

}


function randomKey() {

    let nextKey;


    do {

        nextKey =
            keys[
                Math.floor(
                    Math.random() *
                    keys.length
                )
            ];

    }
    while (
        nextKey === previousKey
    );


    previousKey =
        nextKey;


    return nextKey;

}


// ==========================================================
// RACER VISUAL
// ==========================================================

function progressToLeft(
    progress
) {

    return (
        2 +
        progress *
        0.86
    );

}


function updateRacers() {

    if (playerRacer) {

        playerRacer.style.left =
            progressToLeft(
                playerProgress
            )
            +
            "%";

    }


    if (flashRacer) {

        flashRacer.style.left =
            progressToLeft(
                flashProgress
            )
            +
            "%";

    }


    if (grassyRacer) {

        grassyRacer.style.left =
            progressToLeft(
                grassyProgress
            )
            +
            "%";

    }


    updatePlace();

}


// ==========================================================
// PLACE
// ==========================================================

function updatePlace() {

    const racers = [

        {
            id: "player",
            progress: playerProgress
        },

        {
            id: "flash",
            progress: flashProgress
        },

        {
            id: "grassy",
            progress: grassyProgress
        }

    ];


    racers.sort(
        function(a, b) {

            return (
                b.progress -
                a.progress
            );

        }
    );


    const place =
        racers.findIndex(
            racer =>
                racer.id === "player"
        )
        +
        1;


    if (placeText) {

        placeText.textContent =
            "#" +
            place;

    }

}


// ==========================================================
// RACER ANIMATION
// ==========================================================

function animateRacer(
    racer
) {

    if (!racer) {
        return;
    }


    racer.classList.remove(
        "run"
    );


    void racer.offsetWidth;


    racer.classList.add(
        "run"
    );

}


// ==========================================================
// PROMPT
// ==========================================================

function clearPrompt() {

    clearTimeout(
        promptTimeout
    );


    if (promptAnimation) {

        promptAnimation.cancel();

        promptAnimation =
            null;

    }

}


function createPrompt() {

    if (
        !gameStarted ||
        gameEnded
    ) {

        return;

    }


    clearPrompt();


    currentKey =
        randomKey();


    if (bigKey) {

        bigKey.textContent =
            currentKey.toUpperCase();


        bigKey.classList.remove(
            "correct",
            "wrong"
        );

    }


    acceptingInput =
        true;


    promptStartedAt =
        performance.now();


    if (promptFill) {

        promptFill.style.width =
            "100%";


        promptAnimation =
            promptFill.animate(
                [
                    {
                        width:
                            "100%"
                    },

                    {
                        width:
                            "0%"
                    }
                ],
                {
                    duration:
                        PROMPT_TIME,

                    easing:
                        "linear",

                    fill:
                        "forwards"
                }
            );

    }


    promptTimeout =
        setTimeout(
            function() {

                if (
                    !acceptingInput ||
                    gameEnded
                ) {

                    return;

                }


                acceptingInput =
                    false;


                playerProgress =
                    clamp(
                        playerProgress -
                        1.2,
                        0,
                        100
                    );


                if (bigKey) {

                    bigKey.classList.add(
                        "wrong"
                    );

                }


                updateRacers();


                setTimeout(
                    createPrompt,
                    200
                );

            },
            PROMPT_TIME
        );

}


// ==========================================================
// INPUT HANDLER
// ==========================================================

function handleInput(
    pressedKey,
    button = null
) {

    if (
        !gameStarted ||
        gameEnded ||
        !acceptingInput
    ) {

        return;

    }


    pressedKey =
        String(
            pressedKey
        )
        .toLowerCase();


    if (
        !keys.includes(
            pressedKey
        )
    ) {

        return;

    }


    acceptingInput =
        false;


    clearPrompt();


    if (
        pressedKey ===
        currentKey
    ) {

        const reactionTime =
            performance.now() -
            promptStartedAt;


        const reactionScore =
            clamp(
                1 -
                reactionTime /
                PROMPT_TIME,
                0,
                1
            );


        const movement =
            2.1 +
            reactionScore *
            3.2;


        playerProgress =
            clamp(
                playerProgress +
                movement,
                0,
                100
            );


        if (bigKey) {

            bigKey.classList.add(
                "correct"
            );

        }


        if (button) {

            button.classList.add(
                "correct"
            );

        }


        animateRacer(
            playerRacer
        );


        if (runEffect) {

            runEffect.classList.remove(
                "show"
            );


            void runEffect.offsetWidth;


            runEffect.classList.add(
                "show"
            );

        }

    }

    else {

        playerProgress =
            clamp(
                playerProgress -
                2,
                0,
                100
            );


        if (bigKey) {

            bigKey.classList.add(
                "wrong"
            );

        }


        if (button) {

            button.classList.add(
                "wrong"
            );

        }

    }


    updateRacers();


    if (button) {

        setTimeout(
            function() {

                button.classList.remove(
                    "correct",
                    "wrong"
                );

            },
            250
        );

    }


    if (
        playerProgress >= 100
    ) {

        finishRace();

        return;

    }


    setTimeout(
        createPrompt,
        190
    );

}


// ==========================================================
// DESKTOP KEYBOARD
// ==========================================================

document.addEventListener(
    "keydown",
    function(event) {

        const key =
            event.key.toLowerCase();


        if (
            !keys.includes(
                key
            )
        ) {

            return;

        }


        event.preventDefault();


        if (event.repeat) {

            return;

        }


        handleInput(
            key
        );

    }
);


// ==========================================================
// MOBILE CONTROLS
// ==========================================================

mobileKeys.forEach(
    function(button) {

        button.addEventListener(
            "pointerdown",
            function(event) {

                event.preventDefault();


                handleInput(
                    button.dataset.key,
                    button
                );

            }
        );

    }
);


// ==========================================================
// BOTS
// ==========================================================

function startBots() {

    clearInterval(
        botTimer
    );


    botTimer =
        setInterval(
            function() {

                if (
                    !gameStarted ||
                    gameEnded
                ) {

                    return;

                }


                flashProgress =
                    clamp(
                        flashProgress +
                        (
                            0.42 +
                            Math.random() *
                            0.32
                        ),
                        0,
                        100
                    );


                grassyProgress =
                    clamp(
                        grassyProgress +
                        (
                            0.40 +
                            Math.random() *
                            0.34
                        ),
                        0,
                        100
                    );


                animateRacer(
                    flashRacer
                );


                animateRacer(
                    grassyRacer
                );


                updateRacers();


                if (
                    flashProgress >= 100 ||
                    grassyProgress >= 100
                ) {

                    finishRace();

                }

            },
            300
        );

}


// ==========================================================
// TIMER
// ==========================================================

function startTimer() {

    clearInterval(
        gameTimer
    );


    timeLeft =
        GAME_TIME;


    if (timerText) {

        timerText.textContent =
            timeLeft;

    }


    if (timerBox) {

        timerBox.classList.remove(
            "danger"
        );

    }


    gameTimer =
        setInterval(
            function() {

                if (
                    gameEnded
                ) {

                    return;

                }


                timeLeft--;


                if (timerText) {

                    timerText.textContent =
                        timeLeft;

                }


                if (
                    timeLeft <= 10 &&
                    timerBox
                ) {

                    timerBox.classList.add(
                        "danger"
                    );

                }


                if (
                    timeLeft <= 0
                ) {

                    finishRace();

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
        !instructionOverlay ||
        !countdownOverlay ||
        !countdown
    ) {

        console.error(
            "Sprint countdown element missing"
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


    for (
        const text of [
            "3",
            "2",
            "1",
            "GO!"
        ]
    ) {

        countdown.textContent =
            text;


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
            text === "GO!"
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


    acceptingInput =
        false;


    playerProgress =
        0;


    flashProgress =
        0;


    grassyProgress =
        0;


    updateRacers();


    startTimer();


    startBots();


    setTimeout(
        createPrompt,
        250
    );

}


// ==========================================================
// FINISH
// ==========================================================

function finishRace() {

    if (
        gameEnded
    ) {

        return;

    }


    gameEnded =
        true;


    gameStarted =
        false;


    acceptingInput =
        false;


    clearPrompt();


    clearInterval(
        gameTimer
    );


    clearInterval(
        botTimer
    );


    const ranking = [

        {
            id: "player",
            progress:
                playerProgress
        },

        {
            id: "flash",
            progress:
                flashProgress
        },

        {
            id: "grassy",
            progress:
                grassyProgress
        }

    ];


    ranking.sort(
        function(a, b) {

            return (
                b.progress -
                a.progress
            );

        }
    );


    const playerPlace =
        ranking.findIndex(
            racer =>
                racer.id === "player"
        )
        +
        1;


    if (placeText) {

        placeText.textContent =
            "#" +
            playerPlace;

    }


    if (
        playerPlace === 1
    ) {

        setTimeout(
            function() {

                winOverlay.classList.add(
                    "show"
                );

            },
            350
        );

    }

    else {

        if (loseText) {

            loseText.textContent =
                "You finished in position #"
                +
                playerPlace
                +
                ".";

        }


        setTimeout(
            function() {

                loseOverlay.classList.add(
                    "show"
                );

            },
            350
        );

    }

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

updateRacers();


console.log(
    "🏃 Speed Sprint fully loaded"
);