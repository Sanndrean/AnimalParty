// ==========================================================
// ANIMAL PARTY - RED LIGHT GREEN LIGHT
// FULL VERSION + BIG RED/GREEN EFFECT
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
    selectedCharacter = "dandy";
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

const player =
    document.getElementById("player");

const distanceText =
    document.getElementById("distanceText");

const lightStatus =
    document.getElementById("lightStatus");

const lightIcon =
    document.getElementById("lightIcon");

const lightText =
    document.getElementById("lightText");

const moveButton =
    document.getElementById("moveButton");

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

const lightAnnouncement =
    document.getElementById("lightAnnouncement");


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
// STATE
// ==========================================================

let progress = 0;

let currentLight = "green";

let gameStarted = false;

let gameEnded = false;

let lightLoopToken = 0;

let announcementTimeout = null;


// ==========================================================
// HELPERS
// ==========================================================

function wait(ms) {

    return new Promise(
        resolve =>
            setTimeout(resolve, ms)
    );

}


// ==========================================================
// BIG ANNOUNCEMENT
// ==========================================================

function showLightAnnouncement(
    text,
    type
) {

    if (!lightAnnouncement) {
        return;
    }


    clearTimeout(
        announcementTimeout
    );


    lightAnnouncement.classList.remove(
        "show",
        "green",
        "red"
    );


    lightAnnouncement.textContent =
        text;


    void lightAnnouncement.offsetWidth;


    lightAnnouncement.classList.add(
        type,
        "show"
    );


    announcementTimeout =
        setTimeout(
            function() {

                lightAnnouncement.classList.remove(
                    "show"
                );

            },
            850
        );

}


// ==========================================================
// RENDER PROGRESS
// ==========================================================

function renderProgress() {

    progress =
        Math.max(
            0,
            Math.min(
                100,
                progress
            )
        );


    const visualPosition =
        2 +
        progress * 0.86;


    if (player) {

        player.style.left =
            visualPosition + "%";

    }


    if (distanceText) {

        distanceText.textContent =
            Math.round(progress) + "%";

    }


    if (
        progress >= 100 &&
        !gameEnded
    ) {

        winGame();

    }

}


// ==========================================================
// GREEN
// ==========================================================

function setGreen() {

    if (gameEnded) {
        return;
    }


    currentLight =
        "green";


    if (lightStatus) {

        lightStatus.classList.remove(
            "red"
        );

        lightStatus.classList.add(
            "green"
        );

    }


    if (lightIcon) {

        lightIcon.textContent =
            "🟢";

    }


    if (lightText) {

        lightText.textContent =
            "GREEN LIGHT!";

    }


    document.body.classList.remove(
        "red-mode"
    );


    document.body.classList.add(
        "green-mode"
    );


    showLightAnnouncement(
        "🟢 GREEN LIGHT!",
        "green"
    );

}


// ==========================================================
// RED
// ==========================================================

function setRed() {

    if (gameEnded) {
        return;
    }


    currentLight =
        "red";


    if (lightStatus) {

        lightStatus.classList.remove(
            "green"
        );

        lightStatus.classList.add(
            "red"
        );

    }


    if (lightIcon) {

        lightIcon.textContent =
            "🔴";

    }


    if (lightText) {

        lightText.textContent =
            "RED LIGHT!";

    }


    document.body.classList.remove(
        "green-mode"
    );


    document.body.classList.add(
        "red-mode"
    );


    showLightAnnouncement(
        "🔴 RED LIGHT!",
        "red"
    );

}


// ==========================================================
// LIGHT LOOP
// ==========================================================

async function runLightLoop() {

    const token =
        ++lightLoopToken;


    while (
        gameStarted &&
        !gameEnded &&
        token === lightLoopToken
    ) {

        setGreen();


        await wait(
            1500 +
            Math.random() * 1600
        );


        if (
            gameEnded ||
            token !== lightLoopToken
        ) {
            return;
        }


        setRed();


        await wait(
            900 +
            Math.random() * 1300
        );

    }

}


// ==========================================================
// MOVE
// ==========================================================

function movePlayer() {

    if (
        !gameStarted ||
        gameEnded
    ) {
        return;
    }


    if (
        currentLight === "red"
    ) {

        loseGame();

        return;

    }


    progress += 4;


    if (player) {

        player.classList.remove(
            "running"
        );


        void player.offsetWidth;


        player.classList.add(
            "running"
        );

    }


    renderProgress();

}


// ==========================================================
// KEYBOARD
// ==========================================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.code !== "Space"
        ) {
            return;
        }


        event.preventDefault();


        if (event.repeat) {
            return;
        }


        movePlayer();

    }
);


// ==========================================================
// MOBILE BUTTON
// ==========================================================

if (moveButton) {

    moveButton.addEventListener(
        "pointerdown",
        function(event) {

            event.preventDefault();

            movePlayer();

        }
    );

}


// ==========================================================
// COUNTDOWN
// ==========================================================

async function startCountdown() {

    if (!readyButton) {
        return;
    }


    readyButton.disabled =
        true;


    if (instructionOverlay) {

        instructionOverlay.classList.remove(
            "show"
        );

    }


    if (countdownOverlay) {

        countdownOverlay.classList.add(
            "show"
        );

    }


    for (
        const value of [
            "3",
            "2",
            "1",
            "GO!"
        ]
    ) {

        if (countdown) {

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

        }


        await wait(
            value === "GO!"
                ? 500
                : 800
        );

    }


    if (countdownOverlay) {

        countdownOverlay.classList.remove(
            "show"
        );

    }


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


    progress =
        0;


    renderProgress();


    setGreen();


    runLightLoop();

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


    gameStarted =
        false;


    lightLoopToken++;


    progress =
        100;


    renderProgress();


    document.body.classList.remove(
        "green-mode",
        "red-mode"
    );


    if (lightText) {

        lightText.textContent =
            "FINISH! 🏁";

    }


    setTimeout(
        function() {

            if (winOverlay) {

                winOverlay.classList.add(
                    "show"
                );

            }

        },
        350
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


    gameStarted =
        false;


    lightLoopToken++;


    document.body.classList.remove(
        "green-mode",
        "red-mode"
    );


    if (lightText) {

        lightText.textContent =
            "CAUGHT! ☠️";

    }


    setTimeout(
        function() {

            if (loseOverlay) {

                loseOverlay.classList.add(
                    "show"
                );

            }

        },
        450
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


    if (stars >= 3) {

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

renderProgress();


console.log(
    "🚦 Red Light Green Light loaded"
);