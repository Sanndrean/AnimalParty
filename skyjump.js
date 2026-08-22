// ==========================================================
// ANIMAL PARTY - SKY JUMP
// REAL PLATFORM LANDING VERSION
// ==========================================================


// ==========================================================
// CHARACTERS
// ==========================================================

const characters = {

    dandy: {
        name: "Maximus",
        icon: "🐶"
    },

    claire: {
        name: "Sidney",
        icon: "🐭"
    },

    bubu: {
        name: "Ron",
        icon: "🐰"
    },

    janhe: {
        name: "Mario",
        icon: "🦊"
    },

    lunar: {
        name: "V",
        icon: "🐼"
    },

    lala: {
        name: "Debora",
        icon: "🐨"
    },

    bara: {
        name: "Andrea",
        icon: "🐻"
    },

    lex: {
        name: "Shiendra",
        icon: "🐺"
    },

    will: {
        name: "Lio",
        icon: "🦁"
    },

    coxie: {
        name: "Sapidermen",
        icon: "🐮"
    },

    piglet: {
        name: "Randy",
        icon: "🐷"
    },

    frogie: {
        name: "Ongko",
        icon: "🐸"
    }

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

const hudPlayerIcon =
    document.getElementById(
        "hudPlayerIcon"
    );


const hudPlayerName =
    document.getElementById(
        "hudPlayerName"
    );


const heightText =
    document.getElementById(
        "heightText"
    );


const timerText =
    document.getElementById(
        "timerText"
    );


const timerCard =
    document.getElementById(
        "timerCard"
    );


const gameWindow =
    document.getElementById(
        "gameWindow"
    );


const platformLayer =
    document.getElementById(
        "platformLayer"
    );


const startPlatform =
    document.getElementById(
        "startPlatform"
    );


const jumper =
    document.getElementById(
        "jumper"
    );


const jumperIcon =
    document.getElementById(
        "jumperIcon"
    );


const finishArea =
    document.getElementById(
        "finishArea"
    );


const leftButton =
    document.getElementById(
        "leftButton"
    );


const rightButton =
    document.getElementById(
        "rightButton"
    );


const directionText =
    document.getElementById(
        "directionText"
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


const deathMessage =
    document.getElementById(
        "deathMessage"
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
// PLAYER
// ==========================================================

hudPlayerIcon.textContent =
    playerData.icon;


hudPlayerName.textContent =
    playerData.name;


jumperIcon.textContent =
    playerData.icon;



// ==========================================================
// SETTINGS
// ==========================================================

const TOTAL_PLATFORMS =
    12;


const GAME_TIME =
    30;



// ==========================================================
// STATE
// ==========================================================

let platforms =
    [];


let currentPlatform =
    -1;


let currentSide =
    "center";


let worldOffset =
    0;


let jumping =
    false;


let gameStarted =
    false;


let gameEnded =
    false;


let timeLeft =
    GAME_TIME;


let timer =
    null;


let swipeStartX =
    null;


let swipeStartY =
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


function randomSide() {

    return (
        Math.random() < .5
            ? "left"
            : "right"
    );

}



// ==========================================================
// DIMENSIONS
// ==========================================================

function getWindowSize() {

    return {
        width:
            gameWindow.clientWidth,

        height:
            gameWindow.clientHeight
    };

}


function getPlatformWidth() {

    return (
        window.innerWidth <= 700
            ? clamp(
                gameWindow.clientWidth *
                .28,
                95,
                120
            )
            : 145
    );

}


function getJumperSize() {

    return {
        width:
            jumper.offsetWidth,

        height:
            jumper.offsetHeight
    };

}



// ==========================================================
// PLATFORM X
// ==========================================================

function getPlatformX(
    side
) {

    const gameWidth =
        gameWindow.clientWidth;


    const platformWidth =
        getPlatformWidth();


    const margin =
        window.innerWidth <= 700
            ? gameWidth * .07
            : gameWidth * .10;


    if (
        side === "left"
    ) {

        return margin;

    }


    return (
        gameWidth -
        platformWidth -
        margin
    );

}



// ==========================================================
// CREATE PATH
// ==========================================================

function generatePlatforms() {

    platformLayer.innerHTML =
        "";


    platforms =
        [];


    const size =
        getWindowSize();


    /*
        Start platform near bottom.

        Every next platform is around 125px higher.
        Some platforms may exist above viewport,
        then camera brings them down naturally.
    */

    const startY =
        size.height -
        70;


    const gap =
        window.innerWidth <= 700
            ? 112
            : 126;


    let previousSide =
        randomSide();


    for (
        let i = 0;
        i < TOTAL_PLATFORMS;
        i++
    ) {

        let side;


        /*
            ~30% chance of same-side platform.
        */

        if (
            i > 0 &&
            Math.random() < .30
        ) {

            side =
                previousSide;

        }

        else {

            side =
                randomSide();

        }


        previousSide =
            side;


        const platform =
            document.createElement(
                "div"
            );


        platform.className =
            "platform";


        platform.dataset.index =
            i;


        platform.dataset.side =
            side;


        platformLayer.appendChild(
            platform
        );


        platforms.push({

            element:
                platform,

            side:
                side,

            virtualY:
                startY -
                gap *
                (
                    i +
                    1
                )

        });

    }


    renderWorld();


    updateTarget();

}



// ==========================================================
// RENDER WORLD
// ==========================================================

function renderWorld() {

    const size =
        getWindowSize();


    const platformWidth =
        getPlatformWidth();


    platforms.forEach(
        function(platform) {

            const y =
                platform.virtualY +
                worldOffset;


            platform.element.style.width =
                platformWidth +
                "px";


            platform.element.style.left =
                getPlatformX(
                    platform.side
                )
                +
                "px";


            platform.element.style.top =
                y +
                "px";


            /*
                only hide if very far offscreen
            */

            if (
                y <
                -200 ||
                y >
                size.height +
                150
            ) {

                platform.element.style.visibility =
                    "hidden";

            }

            else {

                platform.element.style.visibility =
                    "visible";

            }

        }
    );


    // START PLATFORM

    const startWidth =
        window.innerWidth <= 700
            ? 125
            : 170;


    startPlatform.style.width =
        startWidth +
        "px";


    startPlatform.style.left =
        (
            size.width /
            2 -
            startWidth /
            2
        )
        +
        "px";


    startPlatform.style.top =
        (
            size.height -
            65 +
            worldOffset
        )
        +
        "px";

}



// ==========================================================
// GET LANDING POSITION
// ==========================================================

function getLandingPosition(
    platform
) {

    const playerSize =
        getJumperSize();


    const platformWidth =
        platform.element.offsetWidth;


    const platformLeft =
        parseFloat(
            platform.element.style.left
        );


    const platformTop =
        parseFloat(
            platform.element.style.top
        );


    return {

        x:
            platformLeft +
            platformWidth /
            2 -
            playerSize.width /
            2,

        y:
            platformTop -
            playerSize.height +
            7

    };

}



// ==========================================================
// START POSITION
// ==========================================================

function placePlayerAtStart() {

    const size =
        getWindowSize();


    const playerSize =
        getJumperSize();


    const startTop =
        parseFloat(
            startPlatform.style.top
        );


    jumper.style.left =
        (
            size.width /
            2 -
            playerSize.width /
            2
        )
        +
        "px";


    jumper.style.top =
        (
            startTop -
            playerSize.height +
            7
        )
        +
        "px";

}



// ==========================================================
// TARGET
// ==========================================================

function getNextPlatform() {

    return platforms[
        currentPlatform +
        1
    ] || null;

}


function updateTarget() {

    platforms.forEach(
        platform =>
            platform.element.classList.remove(
                "target"
            )
    );


    const next =
        getNextPlatform();


    if (!next) {

        directionText.textContent =
            "🏁 FINISH!";

        return;

    }


    next.element.classList.add(
        "target"
    );


    directionText.textContent =
        next.side === "left"
            ?
            "← NEXT: LEFT"
            :
            "NEXT: RIGHT →";

}



// ==========================================================
// REALISTIC JUMP
// ==========================================================

async function jumpTo(
    direction
) {

    if (
        !gameStarted ||
        gameEnded ||
        jumping
    ) {

        return;

    }


    const target =
        getNextPlatform();


    if (!target) {

        winGame();

        return;

    }


    jumping =
        true;


    // ======================================================
    // WRONG DIRECTION
    // ======================================================

    if (
        direction !==
        target.side
    ) {

        fallPlayer();

        return;

    }


    const currentX =
        parseFloat(
            jumper.style.left
        );


    const currentY =
        parseFloat(
            jumper.style.top
        );


    const landing =
        getLandingPosition(
            target
        );


    const sameSide =
        currentSide ===
        direction;


    /*
        Arc height.

        Same side = slightly smaller vertical arc.
        Crossing sides = higher arc.
    */

    const arcHeight =
        sameSide
            ? 58
            : 78;


    const middleX =
        (
            currentX +
            landing.x
        ) /
        2;


    const middleY =
        Math.min(
            currentY,
            landing.y
        )
        -
        arcHeight;


    // ======================================================
    // ANIMATE ACTUAL PLAYER POSITION
    // ======================================================

    const animation =
        jumper.animate(

            [

                {
                    left:
                        currentX +
                        "px",

                    top:
                        currentY +
                        "px",

                    transform:
                        "rotate(0deg)"
                },


                {
                    left:
                        middleX +
                        "px",

                    top:
                        middleY +
                        "px",

                    transform:
                        sameSide
                            ?
                            "rotate(0deg)"
                            :
                            direction ===
                            "right"
                                ?
                                "rotate(6deg)"
                                :
                                "rotate(-6deg)"
                },


                {
                    left:
                        landing.x +
                        "px",

                    top:
                        landing.y +
                        "px",

                    transform:
                        "rotate(0deg)"
                }

            ],

            {
                duration:
                    520,

                easing:
                    "cubic-bezier(.25,.65,.35,1)",

                fill:
                    "forwards"
            }

        );


    await animation.finished;


    /*
        Commit actual final coordinates.
        This is the part the old version didn't do.
    */

    jumper.style.left =
        landing.x +
        "px";


    jumper.style.top =
        landing.y +
        "px";


    jumper.style.transform =
        "rotate(0deg)";


    animation.cancel();


    currentSide =
        direction;


    currentPlatform++;


    heightText.textContent =
        (
            currentPlatform +
            1
        )
        +
        " / "
        +
        TOTAL_PLATFORMS;


    // ======================================================
    // MAKE LANDED PLATFORM NORMAL
    // ======================================================

    target.element.classList.remove(
        "target"
    );


    // ======================================================
    // CAMERA FOLLOW
    // ======================================================

    await cameraFollow(
        target
    );


    updateTarget();


    if (
        currentPlatform >=
        TOTAL_PLATFORMS -
        3
    ) {

        finishArea.classList.add(
            "active"
        );

    }


    if (
        currentPlatform >=
        TOTAL_PLATFORMS -
        1
    ) {

        await wait(
            250
        );


        winGame();

        return;

    }


    jumping =
        false;

}



// ==========================================================
// CAMERA FOLLOW
// ==========================================================

async function cameraFollow(
    platform
) {

    const platformTop =
        parseFloat(
            platform.element.style.top
        );


    const size =
        getWindowSize();


    /*
        Player should usually stay around
        58% of the game window height.

        Only scroll after they climb high enough.
    */

    const preferredY =
        size.height *
        .60;


    if (
        platformTop >= preferredY
    ) {

        return;

    }


    const shift =
        preferredY -
        platformTop;


    const oldOffset =
        worldOffset;


    const newOffset =
        worldOffset +
        shift;


    const startTime =
        performance.now();


    const duration =
        360;


    const playerStartX =
        parseFloat(
            jumper.style.left
        );


    const playerStartY =
        parseFloat(
            jumper.style.top
        );


    while (true) {

        const elapsed =
            performance.now() -
            startTime;


        const progress =
            Math.min(
                elapsed /
                duration,
                1
            );


        /*
            smooth ease
        */

        const eased =
            1 -
            Math.pow(
                1 -
                progress,
                3
            );


        worldOffset =
            oldOffset +
            (
                newOffset -
                oldOffset
            )
            *
            eased;


        renderWorld();


        /*
            Since character is standing on the target platform,
            move character by EXACTLY the same camera amount.
        */

        jumper.style.left =
            playerStartX +
            "px";


        jumper.style.top =
            (
                playerStartY +
                shift *
                eased
            )
            +
            "px";


        if (
            progress >= 1
        ) {

            break;

        }


        await new Promise(
            requestAnimationFrame
        );

    }


    worldOffset =
        newOffset;


    renderWorld();


    /*
        Recalculate exact landing after camera shift
        so player's feet stay attached to platform.
    */

    const newLanding =
        getLandingPosition(
            platform
        );


    jumper.style.left =
        newLanding.x +
        "px";


    jumper.style.top =
        newLanding.y +
        "px";

}



// ==========================================================
// FALL
// ==========================================================

async function fallPlayer() {

    gameStarted =
        false;


    clearInterval(
        timer
    );


    directionText.textContent =
        "WRONG PLATFORM!";


    jumper.classList.add(
        "falling"
    );


    jumper.style.top =
        (
            gameWindow.clientHeight +
            120
        )
        +
        "px";


    await wait(
        650
    );


    deathMessage.classList.add(
        "show"
    );


    await wait(
        850
    );


    deathMessage.classList.remove(
        "show"
    );


    loseGame(
        "You jumped the wrong way!"
    );

}



// ==========================================================
// TIMER
// ==========================================================

function startTimer() {

    clearInterval(
        timer
    );


    timeLeft =
        GAME_TIME;


    timerText.textContent =
        timeLeft;


    timerCard.classList.remove(
        "danger"
    );


    timer =
        setInterval(
            function() {

                if (
                    gameEnded ||
                    !gameStarted
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
                        "danger"
                    );

                }


                if (
                    timeLeft <= 0
                ) {

                    loseGame(
                        "Time is up! ⏰"
                    );

                }

            },
            1000
        );

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


        countdown.style.opacity =
            "0";


        countdown.style.transform =
            "scale(.3)";


        void countdown.offsetWidth;


        countdown.style.transition =
            ".25s";


        countdown.style.opacity =
            "1";


        countdown.style.transform =
            "scale(1)";


        await wait(
            value === "GO!"
                ? 500
                : 750
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


    jumping =
        false;


    currentPlatform =
        -1;


    currentSide =
        "center";


    worldOffset =
        0;


    jumper.classList.remove(
        "falling"
    );


    finishArea.classList.remove(
        "active"
    );


    heightText.textContent =
        "0 / "
        +
        TOTAL_PLATFORMS;


    generatePlatforms();


    placePlayerAtStart();


    startTimer();

}



// ==========================================================
// KEYBOARD
// ==========================================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.repeat
        ) {

            return;

        }


        if (
            event.key === "a" ||
            event.key === "A" ||
            event.key === "ArrowLeft"
        ) {

            event.preventDefault();


            jumpTo(
                "left"
            );

        }


        if (
            event.key === "d" ||
            event.key === "D" ||
            event.key === "ArrowRight"
        ) {

            event.preventDefault();


            jumpTo(
                "right"
            );

        }

    }
);



// ==========================================================
// BUTTONS
// ==========================================================

leftButton.addEventListener(
    "pointerdown",
    function(event) {

        event.preventDefault();


        jumpTo(
            "left"
        );

    }
);


rightButton.addEventListener(
    "pointerdown",
    function(event) {

        event.preventDefault();


        jumpTo(
            "right"
        );

    }
);



// ==========================================================
// SWIPE
// ==========================================================

gameWindow.addEventListener(
    "touchstart",
    function(event) {

        if (
            event.touches.length !== 1
        ) {

            return;

        }


        swipeStartX =
            event.touches[0]
                .clientX;


        swipeStartY =
            event.touches[0]
                .clientY;

    },
    {
        passive: true
    }
);


gameWindow.addEventListener(
    "touchend",
    function(event) {

        if (
            swipeStartX === null
        ) {

            return;

        }


        const endX =
            event.changedTouches[0]
                .clientX;


        const endY =
            event.changedTouches[0]
                .clientY;


        const dx =
            endX -
            swipeStartX;


        const dy =
            endY -
            swipeStartY;


        swipeStartX =
            null;


        swipeStartY =
            null;


        if (
            Math.abs(dx) < 35
        ) {

            return;

        }


        if (
            Math.abs(dx) <
            Math.abs(dy)
        ) {

            return;

        }


        if (
            dx < 0
        ) {

            jumpTo(
                "left"
            );

        }

        else {

            jumpTo(
                "right"
            );

        }

    },
    {
        passive: true
    }
);



// ==========================================================
// RESIZE
// ==========================================================

window.addEventListener(
    "resize",
    function() {

        if (
            jumping
        ) {

            return;

        }


        renderWorld();


        if (
            currentPlatform >= 0
        ) {

            const current =
                platforms[
                    currentPlatform
                ];


            if (current) {

                const landing =
                    getLandingPosition(
                        current
                    );


                jumper.style.left =
                    landing.x +
                    "px";


                jumper.style.top =
                    landing.y +
                    "px";

            }

        }

        else {

            placePlayerAtStart();

        }

    }
);



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


    gameStarted =
        false;


    jumping =
        false;


    clearInterval(
        timer
    );


    finishArea.classList.add(
        "active"
    );


    directionText.textContent =
        "🏁 YOU MADE IT!";


    setTimeout(
        function() {

            winOverlay.classList.add(
                "show"
            );

        },
        450
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


    gameStarted =
        false;


    jumping =
        false;


    clearInterval(
        timer
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
// EVENTS
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



// ==========================================================
// INITIAL PREVIEW
// ==========================================================

generatePlatforms();


placePlayerAtStart();


heightText.textContent =
    "0 / 12";


timerText.textContent =
    "30";


console.log(
    "☁️ Realistic Sky Jump loaded"
);