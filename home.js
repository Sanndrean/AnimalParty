// ==========================================================
// ANIMAL PARTY HOME
// BAN SYSTEM + 4 FUTURE GAME SLOTS
// ==========================================================



// ==========================================================
// CHARACTERS
// ==========================================================

const characters = {


    dandy: {

        name:
            "Maximus",

        icon:
            "🐶"

    },


    claire: {

        name:
            "Sidney",

        icon:
            "🐭"

    },


    bubu: {

        name:
            "Ron",

        icon:
            "🐰"

    },


    janhe: {

        name:
            "Mario",

        icon:
            "🦊"

    },


    lunar: {

        name:
            "V",

        icon:
            "🐼"

    },


    lala: {

        name:
            "Debora",

        icon:
            "🐨"

    },


    bara: {

        name:
            "Andrea",

        icon:
            "🐻"

    },


    lex: {

        name:
            "Shiendra",

        icon:
            "🐺"

    },


    will: {

        name:
            "Lio",

        icon:
            "🦁"

    },


    coxie: {

        name:
            "Sapidermen",

        icon:
            "🐮"

    },


    piglet: {

        name:
            "Randy",

        icon:
            "🐷"

    },


    frogie: {

        name:
            "Ongko",

        icon:
            "🐸"

    }


};



// ==========================================================
// ACTIVE MINI GAMES
//
// URUTAN:
// EASY
// BEGINNER
// HARD
// IMPOSSIBLE
// DEADLY
// ==========================================================

const miniGames = [



    // ======================================================
    // EASY
    // ======================================================

    {

        id:
            "monkey-bash",

        name:
            "Monkey Bash",

        icon:
            "🐵💣",

        file:
            "minigame.html",

        difficulty:
            "🟢 EASY ⭐",

        difficultyKey:
            "easy",

        description:
            "Throw bombs at Dr. KingKong and avoid bananas."

    },


    {

        id:
            "sky-jump",

        name:
            "Sky Jump",

        icon:
            "☁️⬆️",

        file:
            "skyjump.html",

        difficulty:
            "🟢 EASY ⭐",

        difficultyKey:
            "easy",

        description:
            "Jump left and right until you reach the top."

    },



    // ======================================================
    // BEGINNER
    // ======================================================

    {

        id:
            "memory-mix",

        name:
            "Memory Mix",

        icon:
            "🧠✨",

        file:
            "memorygame.html",

        difficulty:
            "🟡 BEGINNER ⭐⭐",

        difficultyKey:
            "beginner",

        description:
            "Memorize symbol patterns through three rounds."

    },


    {

        id:
            "rock-paper-scissors",

        name:
            "Rock Paper Scissors",

        icon:
            "🐯✊",

        file:
            "rpsgame.html",

        difficulty:
            "🟡 BEGINNER ⭐⭐",

        difficultyKey:
            "beginner",

        description:
            "Defeat Mr.T in a best-of-three showdown."

    },


    {

        id:
            "red-light-green-light",

        name:
            "Red Light Green Light",

        icon:
            "🚦🏃",

        file:
            "redlight.html",

        difficulty:
            "🟡 BEGINNER ⭐⭐",

        difficultyKey:
            "beginner",

        description:
            "Move on green and freeze immediately on red."

    },


    {

        id:
            "find-the-strawberry",

        name:
            "Find The Strawberry",

        icon:
            "🍓🥤",

        file:
            "strawberry.html",

        difficulty:
            "🟡 BEGINNER ⭐⭐",

        difficultyKey:
            "beginner",

        description:
            "Follow the cups and find the hidden strawberry."

    },



    // ======================================================
    // HARD
    // ======================================================

    {

        id:
            "speed-sprint",

        name:
            "Speed Sprint",

        icon:
            "🏃‍♂️💨",

        file:
            "racegame.html",

        difficulty:
            "🟠 HARD ⭐⭐⭐",

        difficultyKey:
            "hard",

        description:
            "React to W, A, S, D and beat Mr.Flash & Grassy."

    },


    {

        id:
            "math-quiz",

        name:
            "Math Quiz",

        icon:
            "🧮✏️",

        file:
            "mathquiz.html",

        difficulty:
            "🟠 HARD ⭐⭐⭐",

        difficultyKey:
            "hard",

        description:
            "Answer ten quick math questions before time runs out."

    },



    // ======================================================
    // IMPOSSIBLE
    // ======================================================

    {

        id:
            "number-reorganizer",

        name:
            "Number Reorganizer",

        icon:
            "🔢🧩",

        file:
            "numbergame.html",

        difficulty:
            "🔴 IMPOSSIBLE ⭐⭐⭐⭐",

        difficultyKey:
            "impossible",

        description:
            "Organize 30→1, then survive five number finding rounds."

    },



    // ======================================================
    // DEADLY
    // ======================================================

    {

        id:
            "sheep-census",

        name:
            "Sheep Census",

        icon:
            "🐑🔢",

        file:
            "sheepcount.html",

        difficulty:
            "⚫ DEADLY ⭐⭐⭐⭐⭐",

        difficultyKey:
            "deadly",

        description:
            "Count only the sheep, ignore distractions, and survive five rounds."

    }


];



// ==========================================================
// 4 FUTURE GAME SLOTS
//
// NANTI KALAU MAU TAMBAH GAME:
//
// 1. GANTI enabled: false MENJADI true
// 2. ISI id
// 3. ISI name
// 4. ISI icon
// 5. ISI file
// 6. ISI difficultyKey
//
// difficultyKey hanya:
//
// easy
// beginner
// hard
// impossible
// deadly
//
// CONTOH:
//
// enabled: true,
// id: "apple-catcher",
// name: "Apple Catcher",
// icon: "🍎🧺",
// file: "applegame.html",
// difficulty: "🟠 HARD ⭐⭐⭐",
// difficultyKey: "hard"
// ==========================================================

const futureMiniGames = [



    // ======================================================
    // FUTURE SLOT 1
    // ======================================================

    {

        slot:
            1,

        enabled:
            false,

        id:
            "future-game-1",

        name:
            "Future Game 1",

        icon:
            "➕",

        file:
            "",

        difficulty:
            "COMING SOON",

        difficultyKey:
            "beginner",

        description:
            "Reserved slot for your next Animal Party mini game."

    },



    // ======================================================
    // FUTURE SLOT 2
    // ======================================================

    {

        slot:
            2,

        enabled:
            false,

        id:
            "future-game-2",

        name:
            "Future Game 2",

        icon:
            "➕",

        file:
            "",

        difficulty:
            "COMING SOON",

        difficultyKey:
            "hard",

        description:
            "Reserved slot for your next Animal Party mini game."

    },



    // ======================================================
    // FUTURE SLOT 3
    // ======================================================

    {

        slot:
            3,

        enabled:
            false,

        id:
            "future-game-3",

        name:
            "Future Game 3",

        icon:
            "➕",

        file:
            "",

        difficulty:
            "COMING SOON",

        difficultyKey:
            "impossible",

        description:
            "Reserved slot for your next Animal Party mini game."

    },



    // ======================================================
    // FUTURE SLOT 4
    // ======================================================

    {

        slot:
            4,

        enabled:
            false,

        id:
            "future-game-4",

        name:
            "Future Game 4",

        icon:
            "➕",

        file:
            "",

        difficulty:
            "COMING SOON",

        difficultyKey:
            "deadly",

        description:
            "Reserved slot for your next Animal Party mini game."

    }


];



// ==========================================================
// DIFFICULTY ORDER
// ==========================================================

const difficultyOrder = {

    easy:
        1,

    beginner:
        2,

    hard:
        3,

    impossible:
        4,

    deadly:
        5

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



// ==========================================================
// STORAGE
// ==========================================================

function getGameStorage() {


    if (
        getPlayMode() ===
        "guest"
    ) {

        return sessionStorage;

    }


    return localStorage;


}


const storage =
    getGameStorage();



// ==========================================================
// INITIAL STORAGE
// ==========================================================

function initializeStorage() {


    if (
        storage.getItem(
            "playerLevel"
        )
        ===
        null
    ) {

        storage.setItem(
            "playerLevel",
            "1"
        );

    }



    if (
        storage.getItem(
            "playerStars"
        )
        ===
        null
    ) {

        storage.setItem(
            "playerStars",
            "0"
        );

    }



    if (
        storage.getItem(
            "playedMiniGames"
        )
        ===
        null
    ) {

        storage.setItem(
            "playedMiniGames",
            JSON.stringify(
                []
            )
        );

    }



    /*
     * NEW:
     * BANNED MINI GAMES
     */

    if (
        storage.getItem(
            "bannedMiniGames"
        )
        ===
        null
    ) {

        storage.setItem(
            "bannedMiniGames",
            JSON.stringify(
                []
            )
        );

    }


}


initializeStorage();



// ==========================================================
// DOM
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


const rankList =
    document.getElementById(
        "rankList"
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


const availableGameCount =
    document.getElementById(
        "availableGameCount"
    );


const bannedGameCount =
    document.getElementById(
        "bannedGameCount"
    );


const unbanAllButton =
    document.getElementById(
        "unbanAllButton"
    );


const noGameOverlay =
    document.getElementById(
        "noGameOverlay"
    );


const openLibraryFromWarningButton =
    document.getElementById(
        "openLibraryFromWarningButton"
    );


const closeNoGameButton =
    document.getElementById(
        "closeNoGameButton"
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

function wait(
    milliseconds
) {


    return new Promise(
        function(resolve) {

            setTimeout(
                resolve,
                milliseconds
            );

        }
    );


}



// ==========================================================
// CURRENT ACTIVE GAME LIST
//
// Future slot otomatis masuk kalau enabled = true.
// ==========================================================

function getActiveMiniGames() {


    const enabledFutureGames =
        futureMiniGames.filter(
            function(
                game
            ) {

                return (
                    game.enabled ===
                    true
                );

            }
        );


    return [

        ...miniGames,

        ...enabledFutureGames

    ];


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
        !id
    ) {

        id =
            localStorage.getItem(
                "selectedCharacter"
            );

    }


    if (
        id
        &&
        characters[
            id
        ]
    ) {


        homeCharacter.textContent =
            characters[
                id
            ].icon;


        homeCharacterName.textContent =
            characters[
                id
            ].name;


        return;

    }



    const storedIcon =
        storage.getItem(
            "selectedCharacterIcon"
        )
        ||
        localStorage.getItem(
            "selectedCharacterIcon"
        );


    const storedName =
        storage.getItem(
            "selectedCharacterName"
        )
        ||
        localStorage.getItem(
            "selectedCharacterName"
        );


    homeCharacter.textContent =
        storedIcon
        ||
        characters.dandy.icon;


    homeCharacterName.textContent =
        storedName
        ||
        characters.dandy.name;


}



// ==========================================================
// LEVEL
// ==========================================================

function getLevel() {


    const value =
        parseInt(
            storage.getItem(
                "playerLevel"
            ),
            10
        );


    if (
        Number.isNaN(
            value
        )
        ||
        value <
        1
    ) {

        return 1;

    }


    return value;


}



// ==========================================================
// STARS
// ==========================================================

function getStars() {


    const value =
        parseInt(
            storage.getItem(
                "playerStars"
            ),
            10
        );


    if (
        Number.isNaN(
            value
        )
        ||
        value <
        0
    ) {

        return 0;

    }


    return (
        value %
        3
    );


}



// ==========================================================
// RANK
// ==========================================================

function getRank(
    level
) {


    if (
        level >=
        85
    ) {

        return {

            name:
                "S+",

            icon:
                "🌈"

        };

    }


    if (
        level >=
        80
    ) {

        return {

            name:
                "S3",

            icon:
                "☀️"

        };

    }


    if (
        level >=
        75
    ) {

        return {

            name:
                "S2",

            icon:
                "🌤"

        };

    }


    if (
        level >=
        70
    ) {

        return {

            name:
                "S1",

            icon:
                "⛅"

        };

    }


    if (
        level >=
        40
    ) {

        return {

            name:
                "Legend",

            icon:
                "⭐"

        };

    }


    if (
        level >=
        25
    ) {

        return {

            name:
                "Hero",

            icon:
                "☄️"

        };

    }


    if (
        level >=
        15
    ) {

        return {

            name:
                "Flash",

            icon:
                "⚡"

        };

    }


    if (
        level >=
        10
    ) {

        return {

            name:
                "Master",

            icon:
                "🎎"

        };

    }


    if (
        level >=
        3
    ) {

        return {

            name:
                "Professional",

            icon:
                "🪆"

        };

    }


    return {

        name:
            "Beginner",

        icon:
            "🧸"

    };


}



// ==========================================================
// RENDER HUD
// ==========================================================

function renderHUD() {


    const level =
        getLevel();


    const stars =
        getStars();


    const rank =
        getRank(
            level
        );


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
        function(
            star,
            index
        ) {


            if (
                index <
                stars
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
        getPlayMode()
        ===
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
// SAFE ARRAY STORAGE
// ==========================================================

function readArrayStorage(
    key
) {


    try {


        const parsed =
            JSON.parse(
                storage.getItem(
                    key
                )
                ||
                "[]"
            );


        if (
            Array.isArray(
                parsed
            )
        ) {

            return parsed;

        }


    }

    catch (
        error
    ) {

        console.warn(
            "Storage reset:",
            key,
            error
        );

    }


    return [];


}



// ==========================================================
// PLAYED GAMES
// ==========================================================

function getPlayedGames() {


    return readArrayStorage(
        "playedMiniGames"
    );


}


function savePlayedGames(
    games
) {


    storage.setItem(
        "playedMiniGames",
        JSON.stringify(
            games
        )
    );


}


function markPlayed(
    gameId
) {


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
// BAN SYSTEM
// ==========================================================

function getBannedGames() {


    return readArrayStorage(
        "bannedMiniGames"
    );


}



function saveBannedGames(
    games
) {


    storage.setItem(
        "bannedMiniGames",
        JSON.stringify(
            games
        )
    );


}



// ==========================================================
// IS BANNED
// ==========================================================

function isGameBanned(
    gameId
) {


    return getBannedGames().includes(
        gameId
    );


}



// ==========================================================
// BAN GAME
// ==========================================================

function banGame(
    gameId
) {


    const banned =
        getBannedGames();


    if (
        !banned.includes(
            gameId
        )
    ) {

        banned.push(
            gameId
        );

    }


    saveBannedGames(
        banned
    );


}



// ==========================================================
// UNBAN GAME
// ==========================================================

function unbanGame(
    gameId
) {


    const banned =
        getBannedGames().filter(
            function(
                id
            ) {

                return (
                    id !==
                    gameId
                );

            }
        );


    saveBannedGames(
        banned
    );


}



// ==========================================================
// TOGGLE BAN
// ==========================================================

function toggleBanGame(
    gameId
) {


    if (
        isGameBanned(
            gameId
        )
    ) {

        unbanGame(
            gameId
        );

    }

    else {

        banGame(
            gameId
        );

    }


    renderLibrary();


}



// ==========================================================
// UNBAN ALL
// ==========================================================

function unbanAllGames() {


    saveBannedGames(
        []
    );


    renderLibrary();


}



// ==========================================================
// LIBRARY STATS
// ==========================================================

function updateLibraryStats() {


    const activeGames =
        getActiveMiniGames();


    const banned =
        getBannedGames().filter(
            function(
                id
            ) {


                return activeGames.some(
                    function(
                        game
                    ) {

                        return (
                            game.id ===
                            id
                        );

                    }
                );


            }
        );


    bannedGameCount.textContent =
        banned.length;


    availableGameCount.textContent =
        activeGames.length
        -
        banned.length;


}



// ==========================================================
// RANDOM MATCH
// ==========================================================

function chooseRandomMiniGame() {


    const activeGames =
        getActiveMiniGames();


    const banned =
        getBannedGames();


    /*
     * NEVER include banned games.
     */

    const allowedGames =
        activeGames.filter(
            function(
                game
            ) {

                return (
                    !banned.includes(
                        game.id
                    )
                );

            }
        );


    /*
     * All games banned.
     */

    if (
        allowedGames.length ===
        0
    ) {

        return null;

    }



    let played =
        getPlayedGames();



    /*
     * Allowed AND not played.
     */

    let available =
        allowedGames.filter(
            function(
                game
            ) {

                return (
                    !played.includes(
                        game.id
                    )
                );

            }
        );



    /*
     * If every ALLOWED game is played,
     * reset played cycle.
     *
     * IMPORTANT:
     * BANNED LIST IS NOT RESET.
     */

    if (
        available.length ===
        0
    ) {


        const bannedSet =
            new Set(
                banned
            );


        /*
         * Keep banned game history if desired,
         * but clear played status for allowed games.
         */

        played =
            played.filter(
                function(
                    id
                ) {

                    return bannedSet.has(
                        id
                    );

                }
            );


        savePlayedGames(
            played
        );


        available =
            [
                ...allowedGames
            ];

    }



    return available[
        Math.floor(
            Math.random()
            *
            available.length
        )
    ];


}



// ==========================================================
// LAUNCH GAME
// ==========================================================

let launching =
    false;


async function launchGame(
    game
) {


    if (
        !game
        ||
        launching
    ) {

        return;

    }


    if (
        !game.file
    ) {

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


    /*
     * Choosing directly from library
     * still counts as PLAYED.
     *
     * This means Random Match avoids it
     * until the next played cycle.
     */

    markPlayed(
        game.id
    );


    await wait(
        1350
    );


    window.location.href =
        game.file;


}



// ==========================================================
// RANDOM PLAY
// ==========================================================

playMatchButton.addEventListener(
    "click",
    function() {


        const game =
            chooseRandomMiniGame();


        if (
            !game
        ) {

            noGameOverlay.classList.add(
                "show"
            );


            return;

        }


        launchGame(
            game
        );


    }
);



// ==========================================================
// LIBRARY FILTER
// ==========================================================

let currentFilter =
    "all";


const filterButtons =
    Array.from(
        document.querySelectorAll(
            ".filter-button"
        )
    );



// ==========================================================
// SORT GAMES
// ==========================================================

function sortGames(
    games
) {


    return [
        ...games
    ].sort(
        function(
            first,
            second
        ) {


            return (
                difficultyOrder[
                    first.difficultyKey
                ]
                -
                difficultyOrder[
                    second.difficultyKey
                ]
            );


        }
    );


}



// ==========================================================
// RENDER NORMAL GAME CARD
// ==========================================================

function createGameCard(
    game,
    played,
    banned
) {


    const card =
        document.createElement(
            "article"
        );


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


    const gameIsBanned =
        banned.includes(
            game.id
        );


    if (
        gameIsBanned
    ) {

        card.classList.add(
            "banned"
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


        <div class="game-card-actions">


            <button
                type="button"
                class="card-play-button"
            >
                PLAY
            </button>


            <button
                type="button"
                class="card-ban-button"
            >
                ${
                    gameIsBanned
                    ?
                    "UNBAN"
                    :
                    "🚫 BAN"
                }
            </button>


        </div>

        `;



    const playButton =
        card.querySelector(
            ".card-play-button"
        );


    const banButton =
        card.querySelector(
            ".card-ban-button"
        );



    /*
     * NOTE:
     *
     * Ban affects RANDOM MATCH only.
     *
     * You can still manually PLAY a banned game
     * from Library if you want.
     */

    playButton.addEventListener(
        "click",
        function(
            event
        ) {


            event.stopPropagation();


            launchGame(
                game
            );


        }
    );



    banButton.addEventListener(
        "click",
        function(
            event
        ) {


            event.stopPropagation();


            toggleBanGame(
                game.id
            );


        }
    );


    return card;


}



// ==========================================================
// FUTURE GAME PLACEHOLDER
// ==========================================================

function createFutureCard(
    game
) {


    const card =
        document.createElement(
            "article"
        );


    card.className =
        "game-card future-card";


    card.innerHTML =
        `

        <div class="game-icon future-icon">
            ${game.icon}
        </div>


        <h2>
            GAME SLOT ${game.slot}
        </h2>


        <p>
            ${game.description}
        </p>


        <div class="coming-soon-pill">
            🔒 COMING SOON
        </div>


        <button
            type="button"
            class="future-button"
            disabled
        >
            RESERVED
        </button>

        `;


    return card;


}



// ==========================================================
// RENDER LIBRARY
// ==========================================================

function renderLibrary() {


    gameLibraryGrid.innerHTML =
        "";


    updateLibraryStats();



    const activeGames =
        sortGames(
            getActiveMiniGames()
        );


    const banned =
        getBannedGames();


    const played =
        getPlayedGames();



    let visibleGames =
        [
            ...activeGames
        ];



    // ======================================================
    // BANNED FILTER
    // ======================================================

    if (
        currentFilter ===
        "banned"
    ) {


        visibleGames =
            visibleGames.filter(
                function(
                    game
                ) {

                    return banned.includes(
                        game.id
                    );

                }
            );


    }


    // ======================================================
    // DIFFICULTY FILTER
    // ======================================================

    else if (
        currentFilter !==
        "all"
    ) {


        visibleGames =
            visibleGames.filter(
                function(
                    game
                ) {

                    return (
                        game.difficultyKey ===
                        currentFilter
                    );

                }
            );


    }



    // ======================================================
    // EMPTY
    // ======================================================

    if (
        visibleGames.length ===
        0
        &&
        currentFilter !==
        "all"
    ) {


        gameLibraryGrid.innerHTML =
            `

            <div class="empty-category">

                <div class="empty-icon">
                    ${
                        currentFilter ===
                        "banned"
                        ?
                        "✅"
                        :
                        "🎮"
                    }
                </div>


                <h2>

                    ${
                        currentFilter ===
                        "banned"
                        ?
                        "NO BANNED GAMES"
                        :
                        "NO GAMES HERE YET"
                    }

                </h2>


                <p>

                    ${
                        currentFilter ===
                        "banned"
                        ?
                        "You currently allow every mini game in Random Match."
                        :
                        "More Animal Party mini games are coming soon!"
                    }

                </p>

            </div>

            `;


        return;

    }



    // ======================================================
    // NORMAL CARDS
    // ======================================================

    visibleGames.forEach(
        function(
            game
        ) {


            const card =
                createGameCard(
                    game,
                    played,
                    banned
                );


            gameLibraryGrid.appendChild(
                card
            );


        }
    );



    // ======================================================
    // SHOW 4 FUTURE SLOTS ONLY IN ALL
    //
    // Disabled future slots remain visible.
    // Once enabled = true, it becomes a real game card
    // automatically and disappears from placeholder list.
    // ======================================================

    if (
        currentFilter ===
        "all"
    ) {


        futureMiniGames
            .filter(
                function(
                    game
                ) {

                    return (
                        game.enabled ===
                        false
                    );

                }
            )
            .forEach(
                function(
                    game
                ) {


                    gameLibraryGrid.appendChild(
                        createFutureCard(
                            game
                        )
                    );


                }
            );


    }


}



// ==========================================================
// FILTER BUTTONS
// ==========================================================

filterButtons.forEach(
    function(
        button
    ) {


        button.addEventListener(
            "click",
            function() {


                filterButtons.forEach(
                    function(
                        other
                    ) {

                        other.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                currentFilter =
                    button.dataset.filter
                    ||
                    "all";


                renderLibrary();


            }
        );


    }
);



// ==========================================================
// OPEN LIBRARY
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



// ==========================================================
// CLOSE LIBRARY
// ==========================================================

closeLibraryButton.addEventListener(
    "click",
    function() {


        libraryOverlay.classList.remove(
            "show"
        );


    }
);



// ==========================================================
// UNBAN ALL
// ==========================================================

unbanAllButton.addEventListener(
    "click",
    function() {


        unbanAllGames();


    }
);



// ==========================================================
// NO GAME POPUP
// ==========================================================

closeNoGameButton.addEventListener(
    "click",
    function() {


        noGameOverlay.classList.remove(
            "show"
        );


    }
);


openLibraryFromWarningButton.addEventListener(
    "click",
    function() {


        noGameOverlay.classList.remove(
            "show"
        );


        currentFilter =
            "banned";


        filterButtons.forEach(
            function(
                button
            ) {


                button.classList.toggle(
                    "active",
                    button.dataset.filter ===
                    "banned"
                );


            }
        );


        renderLibrary();


        libraryOverlay.classList.add(
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
// BACKGROUND CLICK CLOSE
// ==========================================================

helpOverlay.addEventListener(
    "click",
    function(
        event
    ) {


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
    function(
        event
    ) {


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


noGameOverlay.addEventListener(
    "click",
    function(
        event
    ) {


        if (
            event.target ===
            noGameOverlay
        ) {

            noGameOverlay.classList.remove(
                "show"
            );

        }


    }
);



// ==========================================================
// ESC
// ==========================================================

document.addEventListener(
    "keydown",
    function(
        event
    ) {


        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        helpOverlay.classList.remove(
            "show"
        );


        libraryOverlay.classList.remove(
            "show"
        );


        noGameOverlay.classList.remove(
            "show"
        );


    }
);



// ==========================================================
// MOBILE RANK
// ==========================================================

rankCard.addEventListener(
    "click",
    function(
        event
    ) {


        if (
            window.innerWidth <=
            760
        ) {


            event.stopPropagation();


            rankList.classList.toggle(
                "open"
            );


        }


    }
);


document.addEventListener(
    "click",
    function(
        event
    ) {


        if (
            window.innerWidth >
            760
        ) {

            return;

        }


        if (
            rankCard.contains(
                event.target
            )
        ) {

            return;

        }


        rankList.classList.remove(
            "open"
        );


    }
);



// ==========================================================
// LOBBY
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
        1100
    );


    rewardOverlay.classList.remove(
        "show"
    );


    renderHUD();


}



// ==========================================================
// INITIALIZE
// ==========================================================

function initializeHome() {


    loadCharacter();


    renderHUD();


    renderLibrary();


    checkWinAnimation();


    console.log(
        "🏠 HOME READY"
    );


    console.log(
        "🎮 ACTIVE GAMES:",
        getActiveMiniGames().length
    );


    console.log(
        "🚫 BANNED:",
        getBannedGames()
    );


}


initializeHome();