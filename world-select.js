// ==========================================================
// ANIMAL PARTY WORLD
// CHARACTER SELECT + BUILT-IN LOADING
// ==========================================================



// ==========================================================
// CHARACTER DATA
// ==========================================================

const characters = [


    // MARIO

    {

        id:
            "mario",

        name:
            "Mario",

        image:
            "./Mario.png",

        role:
            "ALL-ROUNDER",

        description:
            "Petualang pemberani dengan kemampuan yang seimbang. Cocok untuk memulai perjalanan di Animal Party World."

    },


    // LUIGI

    {

        id:
            "luigi",

        name:
            "Luigi",

        image:
            "./Luigi.png",

        role:
            "HIGH JUMPER",

        description:
            "Lincah dan memiliki kemampuan lompat yang hebat. Cocok untuk menjelajahi tempat yang sulit dijangkau."

    }


];



// ==========================================================
// DOM — CHARACTER SELECT
// ==========================================================

const characterGrid =
    document.getElementById(
        "characterGrid"
    );


const previewImage =
    document.getElementById(
        "previewImage"
    );


const previewName =
    document.getElementById(
        "previewName"
    );


const previewRole =
    document.getElementById(
        "previewRole"
    );


const previewDescription =
    document.getElementById(
        "previewDescription"
    );


const giantName =
    document.getElementById(
        "giantName"
    );


const chooseButton =
    document.getElementById(
        "chooseButton"
    );


const mobileChooseButton =
    document.getElementById(
        "mobileChooseButton"
    );


const mobileCharacterName =
    document.getElementById(
        "mobileCharacterName"
    );


const mobileBottom =
    document.getElementById(
        "mobileBottom"
    );


const selectScreen =
    document.getElementById(
        "selectScreen"
    );



// ==========================================================
// DOM — LOADER
// ==========================================================

const worldLoader =
    document.getElementById(
        "worldLoader"
    );


const loaderProgressFill =
    document.getElementById(
        "loaderProgressFill"
    );


const loaderText =
    document.getElementById(
        "loaderText"
    );


const normalLoading =
    document.getElementById(
        "normalLoading"
    );


const comingSoonContent =
    document.getElementById(
        "comingSoonContent"
    );


const selectedCharacterPill =
    document.getElementById(
        "selectedCharacterPill"
    );



// ==========================================================
// STATE
// ==========================================================

let selectedCharacter =
    null;


let loaderRunning =
    false;



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
// RENDER CHARACTERS
// ==========================================================

function renderCharacters() {


    characterGrid.innerHTML =
        "";


    characters.forEach(
        function(character) {


            const card =
                document.createElement(
                    "button"
                );


            card.type =
                "button";


            card.className =
                "character-card";


            card.dataset.id =
                character.id;


            card.innerHTML =
                `

                <img
                    class="character-thumb"
                    src="${character.image}"
                    alt="${character.name}"
                >


                <div class="character-card-name">

                    ${character.name}

                </div>

                `;


            card.addEventListener(
                "click",
                function() {


                    selectCharacter(
                        character
                    );


                }
            );


            characterGrid.appendChild(
                card
            );


        }
    );


}



// ==========================================================
// SELECT CHARACTER
// ==========================================================

function selectCharacter(
    character
) {


    selectedCharacter =
        character;



    // REMOVE OLD SELECTION

    document
        .querySelectorAll(
            ".character-card"
        )
        .forEach(
            function(card) {


                card.classList.remove(
                    "selected"
                );


            }
        );



    // SELECT CURRENT

    const selectedCard =
        document.querySelector(
            `[data-id="${character.id}"]`
        );


    if (
        selectedCard
    ) {


        selectedCard.classList.add(
            "selected"
        );


    }



    updatePreview(
        character
    );


}



// ==========================================================
// UPDATE PREVIEW
// ==========================================================

function updatePreview(
    character
) {


    previewImage.classList.add(
        "changing"
    );


    setTimeout(
        function() {


            previewImage.src =
                character.image;


            previewName.textContent =
                character.name;


            previewRole.textContent =
                character.role;


            previewDescription.textContent =
                character.description;


            giantName.textContent =
                character.name.toUpperCase();


            chooseButton.textContent =
                "PILIH "
                +
                character.name.toUpperCase();


            mobileCharacterName.textContent =
                character.name;


            previewImage.classList.remove(
                "changing"
            );


        },
        150
    );


}



// ==========================================================
// SAVE CHARACTER
// ==========================================================

function saveCharacter() {


    localStorage.setItem(
        "animalPartyWorldCharacter",
        selectedCharacter.id
    );


    localStorage.setItem(
        "animalPartyWorldCharacterName",
        selectedCharacter.name
    );


    localStorage.setItem(
        "animalPartyWorldCharacterImage",
        selectedCharacter.image
    );


    localStorage.setItem(
        "animalPartyWorldCharacterRole",
        selectedCharacter.role
    );


}



// ==========================================================
// LOADER RESET
// ==========================================================

function resetLoader() {


    normalLoading.style.display =
        "";


    comingSoonContent.classList.remove(
        "show"
    );


    worldLoader.classList.remove(
        "coming-mode"
    );


    loaderProgressFill.style.width =
        "0%";


}



// ==========================================================
// RUN RED MARIO LOADER
// ==========================================================

async function runLoader(
    mode
) {


    if (
        loaderRunning
    ) {


        return;


    }


    loaderRunning =
        true;


    resetLoader();



    // ======================================================
    // CHANGE TEXT
    // ======================================================

    if (
        mode ===
        "after"
    ) {


        loaderText.textContent =
            "Membuka Animal Party World...";


    }

    else {


        loaderText.textContent =
            "Menyiapkan petualanganmu...";


    }



    // ======================================================
    // SHOW
    // ======================================================

    worldLoader.classList.add(
        "show"
    );



    /*
     * Hide mobile bar while loader is active.
     */

    if (
        mobileBottom
    ) {


        mobileBottom.classList.add(
            "loader-hidden"
        );


    }



    // ======================================================
    // PROGRESS
    // ======================================================

    let progress =
        0;


    while (
        progress <
        100
    ) {


        progress +=
            Math.floor(
                Math.random() * 12
            )
            +
            5;


        if (
            progress >
            100
        ) {


            progress =
                100;


        }


        loaderProgressFill.style.width =
            progress
            +
            "%";


        await wait(
            110
            +
            Math.random() * 100
        );


    }



    await wait(
        350
    );



    // ======================================================
    // FIRST LOAD
    // ======================================================

    if (
        mode ===
        "before"
    ) {


        worldLoader.classList.remove(
            "show"
        );


        if (
            mobileBottom
        ) {


            mobileBottom.classList.remove(
                "loader-hidden"
            );


        }


        loaderRunning =
            false;


        return;


    }



    // ======================================================
    // AFTER CHARACTER SELECTION
    //
    // DO NOT REDIRECT.
    // SHOW COMING SOON ON SAME PAGE.
    // ======================================================

    showComingSoon();


}



// ==========================================================
// COMING SOON
// ==========================================================

async function showComingSoon() {


    normalLoading.style.display =
        "none";


    worldLoader.classList.add(
        "coming-mode"
    );


    selectedCharacterPill.textContent =
        "⭐ "
        +
        selectedCharacter.name.toUpperCase()
        +
        " SELECTED";


    comingSoonContent.classList.add(
        "show"
    );


    /*
     * Keep overlay open.
     */

    loaderRunning =
        false;


}



// ==========================================================
// CONFIRM CHARACTER
// ==========================================================

function confirmCharacter() {


    if (
        !selectedCharacter
    ) {


        return;


    }


    saveCharacter();


    runLoader(
        "after"
    );


}



// ==========================================================
// BUTTON EVENTS
// ==========================================================

chooseButton.addEventListener(
    "click",
    confirmCharacter
);


mobileChooseButton.addEventListener(
    "click",
    confirmCharacter
);



// ==========================================================
// LOAD SAVED CHARACTER
// ==========================================================

function loadSavedCharacter() {


    const savedId =
        localStorage.getItem(
            "animalPartyWorldCharacter"
        );


    const found =
        characters.find(
            function(character) {


                return (
                    character.id ===
                    savedId
                );


            }
        );


    if (
        found
    ) {


        selectCharacter(
            found
        );


        return;


    }


    /*
     * DEFAULT = MARIO
     */

    selectCharacter(
        characters[0]
    );


}



// ==========================================================
// IMAGE ERROR DEBUG
// ==========================================================

document.addEventListener(
    "error",
    function(event) {


        if (
            event.target
            &&
            event.target.tagName ===
            "IMG"
        ) {


            console.error(
                "❌ IMAGE TIDAK DITEMUKAN:",
                event.target.src
            );


        }


    },
    true
);



// ==========================================================
// INITIALIZE
// ==========================================================

async function initializeWorldSelect() {


    renderCharacters();


    loadSavedCharacter();



    /*
     * ALWAYS show the red Mario
     * loading screen before Character Select.
     */

    await runLoader(
        "before"
    );


    console.log(
        "🌎 Animal Party Character Select Ready"
    );


}


initializeWorldSelect();