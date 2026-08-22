// ==========================================================
// ANIMAL PARTY HOME
// CLEAN BUILD
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
// MINIGAMES
// ==========================================================

const miniGames = [

    {
        id: "monkey-bash",
        name: "Monkey Bash",
        icon: "🐵💣",
        file: "minigame.html",

        difficulty: "🟢 EASY ⭐",
        difficultyKey: "easy",

        description:
            "Throw bombs at Dr. KingKong and avoid bananas."
    },


    {
        id: "sky-jump",
        name: "Sky Jump",
        icon: "☁️⬆️",
        file: "skyjump.html",

        difficulty: "🟢 EASY ⭐",
        difficultyKey: "easy",

        description:
            "Jump left and right until you reach the top."
    },


    {
        id: "memory-mix",
        name: "Memory Mix",
        icon: "🧠✨",
        file: "memorygame.html",

        difficulty: "🟡 BEGINNER ⭐⭐",
        difficultyKey: "beginner",

        description:
            "Memorize symbol patterns through three rounds."
    },


    {
        id: "rock-paper-scissors",
        name: "Rock Paper Scissors",
        icon: "🐯✊",
        file: "rpsgame.html",

        difficulty: "🟡 BEGINNER ⭐⭐",
        difficultyKey: "beginner",

        description:
            "Defeat Mr.T in a best-of-three showdown."
    },


    {
        id: "red-light-green-light",
        name: "Red Light Green Light",
        icon: "🚦🏃",
        file: "redlight.html",

        difficulty: "🟡 BEGINNER ⭐⭐",
        difficultyKey: "beginner",

        description:
            "Move on green and freeze instantly on red."
    },


    {
        id: "speed-sprint",
        name: "Speed Sprint",
        icon: "🏃‍♂️💨",
        file: "racegame.html",

        difficulty: "🟠 HARD ⭐⭐⭐",
        difficultyKey: "hard",

        description:
            "React to W, A, S, D and beat your opponents."
    },


    {
        id: "math-quiz",
        name: "Math Quiz",
        icon: "🧮✏️",
        file: "mathquiz.html",

        difficulty: "🟠 HARD ⭐⭐⭐",
        difficultyKey: "hard",

        description:
            "Answer ten quick math questions before time runs out."
    },


    {
        id: "number-reorganizer",
        name: "Number Reorganizer",
        icon: "🔢🧩",
        file: "numbergame.html",

        difficulty: "🔴 IMPOSSIBLE ⭐⭐⭐⭐",
        difficultyKey: "impossible",

        description:
            "Organize numbers and survive all number rounds."
    }

];


// ==========================================================
// DIFFICULTY ORDER
// ==========================================================

const difficultyOrder = {

    easy: 1,
    beginner: 2,
    hard: 3,
    impossible: 4,
    deadly: 5

};


// ==========================================================
// PLAY MODE
// ==========================================================

function getPlayMode() {

    return (
        localStorage.getItem(
            "animalPartyMode"
        )
        ||
        "player"
    );

}


function getStorage() {

    if (
        getPlayMode() ===
        "guest"
    ) {

        return sessionStorage;

    }

    return localStorage;

}


const storage =
    getStorage();


// ==========================================================
// DEFAULTS
// ==========================================================

if (
    storage.getItem(
        "playerLevel"
    ) === null
) {

    storage.setItem(
        "playerLevel",
        "1"
    );

}


if (
    storage.getItem(
        "playerStars"
    ) === null
) {

    storage.setItem(
        "playerStars",
        "0"
    );

}


if (
    storage.getItem(
        "playedMiniGames"
    ) === null
) {

    storage.setItem(
        "playedMiniGames",
        JSON.stringify([])
    );

}


// ==========================================================
// ELEMENTS
// ==========================================================

const levelText =
    document.getElementById(
        "levelText"
    );


const starRow =
    document.getElementById(
        "starRow"
    );


const rankText =
    document.getElementById(
        "rankText"
    );


const rankIcon =
    document.getElementById(
        "rankIcon"
    );


const rankCard =
    document.getElementById(
        "rankCard"
    );


const rankMenu =
    document.getElementById(
        "rankMenu"
    );


const modePill =
    document.getElementById(
        "modePill"
    );


const homeCharacter =
    document.getElementById(
        "homeCharacter"
    );


const homeCharacterName =
    document.getElementById(
        "homeCharacterName"
    );


const backToLobbyButton =
    document.getElementById(
        "backToLobbyButton"
    );


const helpButton =
    document.getElementById(
        "helpButton"
    );


const helpOverlay =
    document.getElementById(
        "helpOverlay"
    );


const closeHelpButton =
    document.getElementById(
        "closeHelpButton"
    );


const libraryButton =
    document.getElementById(
        "libraryButton"
    );


const libraryOverlay =
    document.getElementById(
        "libraryOverlay"
    );


const closeLibraryButton =
    document.getElementById(
        "closeLibraryButton"
    );


const gameLibraryGrid =
    document.getElementById(
        "gameLibraryGrid"
    );


const playMatchButton =
    document.getElementById(
        "playMatchButton"
    );


const gameTransition =
    document.getElementById(
        "gameTransition"
    );


const transitionGameIcon =
    document.getElementById(
        "transitionGameIcon"
    );


const transitionGameName =
    document.getElementById(
        "transitionGameName"
    );


const transitionGameDifficulty =
    document.getElementById(
        "transitionGameDifficulty"
    );


const rewardOverlay =
    document.getElementById(
        "rewardOverlay"
    );


const levelUpOverlay =
    document.getElementById(
        "levelUpOverlay"
    );


const levelUpText =
    document.getElementById(
        "levelUpText"
    );


const rankUpOverlay =
    document.getElementById(
        "rankUpOverlay"
    );


const rankUpText =
    document.getElementById(
        "rankUpText"
    );


// ==========================================================
// WAIT
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


// ==========================================================
// CHARACTER
// ==========================================================

function loadCharacter() {

    let id =
        storage.getItem(
            "selectedCharacter"
        );


    if (
        !id ||
        !characters[id]
    ) {

        id =
            "dandy";

    }


    const character =
        characters[id];


    homeCharacter.textContent =
        character.icon;


    homeCharacterName.textContent =
        character.name;


    storage.setItem(
        "selectedCharacter",
        id
    );


    storage.setItem(
        "selectedCharacterIcon",
        character.icon
    );


    storage.setItem(
        "selectedCharacterName",
        character.name
    );

}


// ==========================================================
// LEVEL
// ==========================================================

function getLevel() {

    let level =
        parseInt(
            storage.getItem(
                "playerLevel"
            ),
            10
        );


    if (
        Number.isNaN(level) ||
        level < 1
    ) {

        level =
            1;

    }


    return level;

}


// ==========================================================
// STARS
// ==========================================================

function getStars() {

    let stars =
        parseInt(
            storage.getItem(
                "playerStars"
            ),
            10
        );


    if (
        Number.isNaN(stars) ||
        stars < 0
    ) {

        stars =
            0;

    }


    stars =
        stars % 3;


    storage.setItem(
        "playerStars",
        String(stars)
    );


    return stars;

}


// ==========================================================
// RANK
// ==========================================================

function getRank(level) {

    if (level >= 85) {
        return {
            name: "S+",
            icon: "🌈"
        };
    }


    if (level >= 80) {
        return {
            name: "S3",
            icon: "☀️"
        };
    }


    if (level >= 75) {
        return {
            name: "S2",
            icon: "🌤"
        };
    }


    if (level >= 70) {
        return {
            name: "S1",
            icon: "⛅"
        };
    }


    if (level >= 40) {
        return {
            name: "Legend",
            icon: "⭐"
        };
    }


    if (level >= 25) {
        return {
            name: "Hero",
            icon: "☄️"
        };
    }


    if (level >= 15) {
        return {
            name: "Flash",
            icon: "⚡"
        };
    }


    if (level >= 10) {
        return {
            name: "Master",
            icon: "🎎"
        };
    }


    if (level >= 3) {
        return {
            name: "Professional",
            icon: "🪆"
        };
    }


    return {
        name: "Beginner",
        icon: "🧸"
    };

}


// ==========================================================
// HUD
// ==========================================================

function renderHUD() {

    const level =
        getLevel();


    const stars =
        getStars();


    const rank =
        getRank(level);


    levelText.textContent =
        level;


    rankText.textContent =
        rank.name;


    rankIcon.textContent =
        rank.icon;


    const starElements =
        starRow.querySelectorAll(
            "span"
        );


    starElements.forEach(
        function(star, index) {

            if (
                index < stars
            ) {

                star.textContent =
                    "★";


                star.classList.add(
                    "on"
                );

            }

            else {

                star.textContent =
                    "☆";


                star.classList.remove(
                    "on"
                );

            }

        }
    );


    if (
        getPlayMode() ===
        "guest"
    ) {

        modePill.textContent =
            "👤 GUEST";

    }

    else {

        modePill.textContent =
            "🌟 PLAYER";

    }

}


// ==========================================================
// PLAYED GAMES
// ==========================================================

function getPlayedGames() {

    try {

        const data =
            JSON.parse(
                storage.getItem(
                    "playedMiniGames"
                )
                ||
                "[]"
            );


        if (
            Array.isArray(data)
        ) {

            return data;

        }

    }

    catch(error) {

        console.warn(
            error
        );

    }


    return [];

}


function savePlayedGames(games) {

    storage.setItem(
        "playedMiniGames",
        JSON.stringify(games)
    );

}


// ==========================================================
// RANDOM GAME
// ==========================================================

function chooseRandomMiniGame() {

    let played =
        getPlayedGames();


    let available =
        miniGames.filter(
            function(game) {

                return (
                    !played.includes(
                        game.id
                    )
                );

            }
        );


    if (
        available.length === 0
    ) {

        played =
            [];


        savePlayedGames(
            []
        );


        available =
            [...miniGames];

    }


    return (
        available[
            Math.floor(
                Math.random() *
                available.length
            )
        ]
    );

}


// ==========================================================
// MARK PLAYED
// ==========================================================

function markPlayed(gameId) {

    const played =
        getPlayedGames();


    if (
        !played.includes(
            gameId
        )
    ) {

        played.push(
            gameId
        );

    }


    savePlayedGames(
        played
    );

}


// ==========================================================
// LAUNCH
// ==========================================================

let launching =
    false;


async function launchGame(game) {

    if (launching) {

        return;

    }


    launching =
        true;


    libraryOverlay.classList.remove(
        "show"
    );


    transitionGameIcon.textContent =
        game.icon;


    transitionGameName.textContent =
        game.name.toUpperCase();


    transitionGameDifficulty.textContent =
        game.difficulty;


    gameTransition.classList.add(
        "show"
    );


    markPlayed(
        game.id
    );


    await wait(
        1400
    );


    window.location.href =
        game.file;

}


// ==========================================================
// PLAY
// ==========================================================

playMatchButton.addEventListener(
    "click",
    function() {

        launchGame(
            chooseRandomMiniGame()
        );

    }
);


// ==========================================================
// FILTER
// ==========================================================

let currentFilter =
    "all";


const filterButtons =
    document.querySelectorAll(
        ".filter-button"
    );


filterButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                filterButtons.forEach(
                    function(other) {

                        other.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter;


                renderLibrary();

            }
        );

    }
);


// ==========================================================
// LIBRARY
// ==========================================================

function renderLibrary() {

    gameLibraryGrid.innerHTML =
        "";


    let games =
        [...miniGames];


    games.sort(
        function(a, b) {

            return (
                difficultyOrder[
                    a.difficultyKey
                ]
                -
                difficultyOrder[
                    b.difficultyKey
                ]
            );

        }
    );


    if (
        currentFilter !==
        "all"
    ) {

        games =
            games.filter(
                function(game) {

                    return (
                        game.difficultyKey ===
                        currentFilter
                    );

                }
            );

    }


    if (
        games.length === 0
    ) {

        gameLibraryGrid.innerHTML =
            `
            <div class="empty-category">

                <div style="font-size:55px;">
                    🎮
                </div>

                <h2>
                    NO MINI GAMES YET
                </h2>

                <p>
                    New challenges coming soon!
                </p>

            </div>
            `;


        return;

    }


    const played =
        getPlayedGames();


    games.forEach(
        function(game) {

            const card =
                document.createElement(
                    "button"
                );


            card.type =
                "button";


            card.className =
                "game-card";


            if (
                played.includes(
                    game.id
                )
            ) {

                card.classList.add(
                    "played"
                );

            }


            card.innerHTML =
                `
                <div class="game-icon">
                    ${game.icon}
                </div>

                <h2>
                    ${game.name}
                </h2>

                <p>
                    ${game.description}
                </p>

                <div
                    class="
                        difficulty-pill
                        ${game.difficultyKey}
                    "
                >
                    ${game.difficulty}
                </div>

                <div class="play-pill">
                    PLAY ➜
                </div>
                `;


            card.addEventListener(
                "click",
                function() {

                    launchGame(
                        game
                    );

                }
            );


            gameLibraryGrid.appendChild(
                card
            );

        }
    );

}


// ==========================================================
// LIBRARY OPEN / CLOSE
// ==========================================================

libraryButton.addEventListener(
    "click",
    function() {

        renderLibrary();


        libraryOverlay.classList.add(
            "show"
        );

    }
);


closeLibraryButton.addEventListener(
    "click",
    function() {

        libraryOverlay.classList.remove(
            "show"
        );

    }
);


// ==========================================================
// HELP
// ==========================================================

helpButton.addEventListener(
    "click",
    function() {

        helpOverlay.classList.add(
            "show"
        );

    }
);


closeHelpButton.addEventListener(
    "click",
    function() {

        helpOverlay.classList.remove(
            "show"
        );

    }
);


// ==========================================================
// CLOSE OVERLAY BY CLICKING BACKGROUND
// ==========================================================

helpOverlay.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            helpOverlay
        ) {

            helpOverlay.classList.remove(
                "show"
            );

        }

    }
);


libraryOverlay.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            libraryOverlay
        ) {

            libraryOverlay.classList.remove(
                "show"
            );

        }

    }
);


// ==========================================================
// MOBILE RANK
// ==========================================================

rankCard.addEventListener(
    "click",
    function(event) {

        if (
            window.innerWidth <=
            760
        ) {

            event.stopPropagation();


            rankMenu.classList.toggle(
                "open"
            );

        }

    }
);


document.addEventListener(
    "click",
    function() {

        if (
            window.innerWidth <=
            760
        ) {

            rankMenu.classList.remove(
                "open"
            );

        }

    }
);


// ==========================================================
// BACK TO LOBBY
// ==========================================================

backToLobbyButton.addEventListener(
    "click",
    function() {

        window.location.href =
            "lobby.html";

    }
);


// ==========================================================
// WIN ANIMATION
// ==========================================================

async function checkWinAnimation() {

    const justWon =
        sessionStorage.getItem(
            "justWon"
        );


    if (
        justWon !==
        "true"
    ) {

        return;

    }


    sessionStorage.removeItem(
        "justWon"
    );


    rewardOverlay.classList.add(
        "show"
    );


    await wait(
        1300
    );


    rewardOverlay.classList.remove(
        "show"
    );


    const currentLevel =
        getLevel();


    const previousLevel =
        parseInt(
            sessionStorage.getItem(
                "levelBeforeWin"
            )
            ||
            currentLevel,
            10
        );


    if (
        currentLevel >
        previousLevel
    ) {

        levelUpText.textContent =
            "LEVEL "
            +
            currentLevel;


        levelUpOverlay.classList.add(
            "show"
        );


        await wait(
            1400
        );


        levelUpOverlay.classList.remove(
            "show"
        );

    }


    const previousRank =
        sessionStorage.getItem(
            "rankBeforeWin"
        );


    const newRank =
        getRank(
            currentLevel
        );


    if (
        previousRank &&
        previousRank !==
        newRank.name
    ) {

        rankUpText.textContent =
            newRank.icon
            +
            " "
            +
            newRank.name;


        rankUpOverlay.classList.add(
            "show"
        );


        await wait(
            1500
        );


        rankUpOverlay.classList.remove(
            "show"
        );

    }


    sessionStorage.removeItem(
        "levelBeforeWin"
    );


    sessionStorage.removeItem(
        "rankBeforeWin"
    );


    renderHUD();

}


// ==========================================================
// START
// ==========================================================

loadCharacter();

renderHUD();

renderLibrary();

checkWinAnimation();


console.log(
    "🏠 Animal Party Home ready"
);