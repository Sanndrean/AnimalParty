// ==========================================================
// ANIMAL PARTY INDEX
// INTRO → MODE → LOADING → CHARACTER SELECT
// ==========================================================



// ==========================================================
// CHARACTERS
// ==========================================================

const characters = [

    {
        id: "dandy",
        icon: "🐶",
        name: "Maximus"
    },

    {
        id: "claire",
        icon: "🐭",
        name: "Sidney"
    },

    {
        id: "bubu",
        icon: "🐰",
        name: "Ron"
    },

    {
        id: "janhe",
        icon: "🦊",
        name: "Mario"
    },

    {
        id: "lunar",
        icon: "🐼",
        name: "V"
    },

    {
        id: "lala",
        icon: "🐨",
        name: "Debora"
    },

    {
        id: "bara",
        icon: "🐻",
        name: "Andrea"
    },

    {
        id: "lex",
        icon: "🐺",
        name: "Shiendra"
    },

    {
        id: "will",
        icon: "🦁",
        name: "Lio"
    },

    {
        id: "coxie",
        icon: "🐮",
        name: "Sapidermen"
    },

    {
        id: "piglet",
        icon: "🐷",
        name: "Randy"
    },

    {
        id: "frogie",
        icon: "🐸",
        name: "Ongko"
    }

];



// ==========================================================
// ELEMENTS
// ==========================================================

const introScreen =
    document.getElementById(
        "introScreen"
    );


const playButton =
    document.getElementById(
        "playButton"
    );


const modeScreen =
    document.getElementById(
        "modeScreen"
    );


const guestButton =
    document.getElementById(
        "guestButton"
    );


const playerButton =
    document.getElementById(
        "playerButton"
    );


const backModeButton =
    document.getElementById(
        "backModeButton"
    );


const loadingScreen =
    document.getElementById(
        "loadingScreen"
    );


const loadingAnimal =
    document.getElementById(
        "loadingAnimal"
    );


const loadingMode =
    document.getElementById(
        "loadingMode"
    );


const loadingTitle =
    document.getElementById(
        "loadingTitle"
    );


const loadingSubtitle =
    document.getElementById(
        "loadingSubtitle"
    );


const loadingStatus =
    document.getElementById(
        "loadingStatus"
    );


const loadingPercent =
    document.getElementById(
        "loadingPercent"
    );


const loadingFill =
    document.getElementById(
        "loadingFill"
    );


const loadingTime =
    document.getElementById(
        "loadingTime"
    );


const characterScreen =
    document.getElementById(
        "characterScreen"
    );


const characterGrid =
    document.getElementById(
        "characterGrid"
    );


const characterContinue =
    document.getElementById(
        "characterContinue"
    );



// ==========================================================
// STATE
// ==========================================================

let selectedCharacter =
    null;


let currentMode =
    null;


let loadingActive =
    false;



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



// ==========================================================
// INTRO PLAY BUTTON
// ==========================================================

playButton.addEventListener(
    "click",
    function() {

        console.log(
            "🎮 PLAY clicked"
        );


        modeScreen.classList.add(
            "show"
        );

    }
);



// ==========================================================
// BACK
// ==========================================================

backModeButton.addEventListener(
    "click",
    function() {

        modeScreen.classList.remove(
            "show"
        );

    }
);



// ==========================================================
// GUEST
// ==========================================================

guestButton.addEventListener(
    "click",
    function() {

        currentMode =
            "guest";


        localStorage.setItem(
            "animalPartyMode",
            "guest"
        );


        /*
            New Guest session starts clean.
        */

        sessionStorage.removeItem(
            "selectedCharacter"
        );


        sessionStorage.removeItem(
            "selectedCharacterIcon"
        );


        sessionStorage.removeItem(
            "selectedCharacterName"
        );


        sessionStorage.setItem(
            "playerLevel",
            "1"
        );


        sessionStorage.setItem(
            "playerStars",
            "0"
        );


        sessionStorage.setItem(
            "playedMiniGames",
            JSON.stringify([])
        );


        startLoading(
            "guest"
        );

    }
);



// ==========================================================
// PLAYER
// ==========================================================

playerButton.addEventListener(
    "click",
    function() {

        currentMode =
            "player";


        localStorage.setItem(
            "animalPartyMode",
            "player"
        );


        /*
            For now this goes directly to Player mode.

            If you already have Firebase Google Login,
            its signInWithPopup can be inserted here later
            without changing this intro UI.
        */


        if (
            localStorage.getItem(
                "playerLevel"
            ) === null
        ) {

            localStorage.setItem(
                "playerLevel",
                "1"
            );

        }


        if (
            localStorage.getItem(
                "playerStars"
            ) === null
        ) {

            localStorage.setItem(
                "playerStars",
                "0"
            );

        }


        startLoading(
            "player"
        );

    }
);



// ==========================================================
// LOADING
// ==========================================================

async function startLoading(
    mode
) {

    if (
        loadingActive
    ) {

        return;

    }


    loadingActive =
        true;


    modeScreen.classList.remove(
        "show"
    );


    loadingScreen.classList.add(
        "show"
    );


    const animals = [

        "🐶",
        "🐭",
        "🐰",
        "🦊",
        "🐼",
        "🐨",
        "🐻",
        "🐺",
        "🦁",
        "🐮",
        "🐷",
        "🐸"

    ];


    if (
        mode === "guest"
    ) {

        loadingMode.textContent =
            "👤 GUEST MODE";


        loadingTitle.textContent =
            "PLAYING AS GUEST";

    }

    else {

        loadingMode.textContent =
            "🌟 PLAYER MODE";


        loadingTitle.textContent =
            "PLAYING AS PLAYER";

    }


    loadingSubtitle.textContent =
        "Getting the party ready...";


    loadingStatus.textContent =
        "Preparing animals...";


    loadingFill.style.width =
        "0%";


    loadingPercent.textContent =
        "0%";


    loadingTime.textContent =
        "10s";


    const duration =
        10000;


    const start =
        performance.now();


    let animalIndex =
        0;


    let previousAnimalChange =
        0;


    while (true) {

        const now =
            performance.now();


        const elapsed =
            now -
            start;


        const progress =
            Math.min(
                1,
                elapsed /
                duration
            );


        const percent =
            Math.floor(
                progress *
                100
            );


        const seconds =
            Math.ceil(
                Math.max(
                    0,
                    duration -
                    elapsed
                )
                /
                1000
            );


        loadingFill.style.width =
            percent +
            "%";


        loadingPercent.textContent =
            percent +
            "%";


        loadingTime.textContent =
            seconds > 0
                ?
                seconds +
                "s"
                :
                "READY";


        // ==========================================
        // CHANGE ANIMAL
        // ==========================================

        if (
            elapsed -
            previousAnimalChange >
            750
        ) {

            previousAnimalChange =
                elapsed;


            animalIndex =
                (
                    animalIndex +
                    1
                )
                %
                animals.length;


            loadingAnimal.textContent =
                animals[
                    animalIndex
                ];

        }


        // ==========================================
        // TEXT
        // ==========================================

        if (
            seconds >= 8
        ) {

            loadingStatus.textContent =
                "Preparing animals...";


            loadingSubtitle.textContent =
                "Getting the party ready...";

        }


        else if (
            seconds >= 6
        ) {

            loadingStatus.textContent =
                "Setting up mini games...";


            loadingSubtitle.textContent =
                "Building the party room...";

        }


        else if (
            seconds >= 4
        ) {

            loadingStatus.textContent =
                "Almost ready...";


            loadingSubtitle.textContent =
                "Gathering the animals 🐾";

        }


        else if (
            seconds === 3
        ) {

            loadingTitle.textContent =
                "READY!";


            loadingStatus.textContent =
                "Ready!";

        }


        else if (
            seconds <= 2
        ) {

            loadingTitle.textContent =
                "CHOOSE YOUR CHARACTER";


            loadingSubtitle.textContent =
                "Let's party! 🎉";


            loadingStatus.textContent =
                "Opening character select...";

        }


        if (
            progress >= 1
        ) {

            break;

        }


        await wait(
            40
        );

    }


    loadingFill.style.width =
        "100%";


    loadingPercent.textContent =
        "100%";


    loadingTime.textContent =
        "READY";


    loadingAnimal.textContent =
        "🎉";


    loadingTitle.textContent =
        "LET'S PARTY!";


    loadingSubtitle.textContent =
        "Choose your character...";


    await wait(
        550
    );


    introScreen.classList.add(
        "hidden"
    );


    loadingScreen.classList.remove(
        "show"
    );


    characterScreen.classList.add(
        "show"
    );


    loadingActive =
        false;

}



// ==========================================================
// CREATE CHARACTER CARDS
// ==========================================================

function renderCharacters() {

    characterGrid.innerHTML =
        "";


    characters.forEach(
        function(character) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "character-card";


            button.dataset.character =
                character.id;


            button.innerHTML =
                `
                <div class="character-card-icon">
                    ${character.icon}
                </div>

                <div class="character-card-name">
                    ${character.name}
                </div>
                `;


            button.addEventListener(
                "click",
                function() {

                    chooseCharacter(
                        character,
                        button
                    );

                }
            );


            characterGrid.appendChild(
                button
            );

        }
    );

}



// ==========================================================
// SELECT CHARACTER
// ==========================================================

function chooseCharacter(
    character,
    card
) {

    selectedCharacter =
        character;


    document
        .querySelectorAll(
            ".character-card"
        )
        .forEach(
            element => {

                element.classList.remove(
                    "selected"
                );

            }
        );


    card.classList.add(
        "selected"
    );


    characterContinue.disabled =
        false;


    characterContinue.textContent =
        "PLAY AS "
        +
        character.name.toUpperCase()
        +
        " ➜";

}



// ==========================================================
// CONTINUE
// ==========================================================

characterContinue.addEventListener(
    "click",
    function() {

        if (
            !selectedCharacter
        ) {

            return;

        }


        const storage =
            currentMode === "guest"
                ?
                sessionStorage
                :
                localStorage;


        storage.setItem(
            "selectedCharacter",
            selectedCharacter.id
        );


        storage.setItem(
            "selectedCharacterIcon",
            selectedCharacter.icon
        );


        storage.setItem(
            "selectedCharacterName",
            selectedCharacter.name
        );


        window.location.href =
            "lobby.html";

    }
);



// ==========================================================
// INITIALIZE
// ==========================================================

renderCharacters();


console.log(
    "🎉 Animal Party intro ready"
);