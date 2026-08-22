// ==========================================================
// ANIMAL PARTY - FIREBASE SUGGESTION SYSTEM
// STANDALONE / FINAL
// ==========================================================

import {
    initializeApp,
    getApps,
    getApp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";


// ==========================================================
// FIREBASE CONFIG
// ==========================================================

const firebaseConfig = {

    apiKey:
        "AIzaSyA9I1APypES3DKcu2JsavoHU-OxL6P9_BU",

    authDomain:
        "animalparty-11e.firebaseapp.com",

    projectId:
        "animalparty-11e",

    storageBucket:
        "animalparty-11e.firebasestorage.app",

    messagingSenderId:
        "618562397236",

    appId:
        "1:618562397236:web:2df61c02b201e833201661",

    measurementId:
        "G-Z475NC8XHT"

};


// ==========================================================
// FIREBASE START
// Reuse existing app if firebase.js already loaded
// ==========================================================

const app =
    getApps().length > 0
        ? getApp()
        : initializeApp(firebaseConfig);


const db =
    getFirestore(app);


console.log(
    "✉️ Animal Party suggestion system ready"
);


// ==========================================================
// OPEN SUGGESTION POPUP
// ==========================================================

function openSuggestionBoxFinal() {

    if (
        typeof window.openModal !== "function"
    ) {

        console.error(
            "❌ openModal() not found"
        );

        return;

    }


    window.openModal(
        "✉️",
        "ANIMAL PARTY COMMUNITY",
        "SEND A SUGGESTION",
        `
        <div class="suggestion-form">

            <label>
                SUGGESTION TYPE
            </label>

            <select
                id="suggestionType"
                class="suggestion-select"
            >

                <option value="minigame">
                    🎮 New Minigame
                </option>

                <option value="tycoon">
                    🏰 Tycoon Idea
                </option>

                <option value="feature">
                    ✨ New Feature
                </option>

                <option value="design">
                    🎨 Design Idea
                </option>

                <option value="bug">
                    🐛 Bug Report
                </option>

                <option value="other">
                    💬 Other
                </option>

            </select>


            <label>
                TITLE
            </label>

            <input
                type="text"
                id="suggestionTitle"
                class="suggestion-input"
                maxlength="50"
                placeholder="Give your suggestion a title..."
            >


            <label>
                YOUR SUGGESTION
            </label>

            <textarea
                id="suggestionMessage"
                class="suggestion-textarea"
                maxlength="600"
                placeholder="Tell us your idea..."
            ></textarea>


            <div
                id="suggestionStatus"
                class="suggestion-status"
            ></div>


            <button
                type="button"
                id="sendSuggestionFinal"
                class="send-suggestion"
            >
                ✉️ SEND SUGGESTION
            </button>

        </div>
        `
    );


    const sendButton =
        document.getElementById(
            "sendSuggestionFinal"
        );


    if (!sendButton) {

        console.error(
            "❌ Send suggestion button not found"
        );

        return;

    }


    sendButton.onclick =
        submitSuggestionFinal;

}


// ==========================================================
// GET PLAYER NAME
// ==========================================================

function getSuggestionPlayerName() {

    try {

        if (
            typeof window.playerDisplayName !==
            "undefined" &&
            window.playerDisplayName
        ) {

            return window.playerDisplayName;

        }

    }

    catch(error) {}


    try {

        const mode =
            localStorage.getItem(
                "animalPartyMode"
            );


        const save =
            mode === "guest"
                ? sessionStorage
                : localStorage;


        return (
            save.getItem(
                "playerDisplayName"
            )
            ||
            save.getItem(
                "selectedCharacterName"
            )
            ||
            "Player"
        );

    }

    catch(error) {

        return "Player";

    }

}


// ==========================================================
// GET CHARACTER
// ==========================================================

function getSuggestionCharacter() {

    try {

        if (
            typeof window.selectedIcon !==
            "undefined" &&
            window.selectedIcon
        ) {

            return window.selectedIcon;

        }

    }

    catch(error) {}


    try {

        const mode =
            localStorage.getItem(
                "animalPartyMode"
            );


        const save =
            mode === "guest"
                ? sessionStorage
                : localStorage;


        return (
            save.getItem(
                "selectedCharacterIcon"
            )
            ||
            "🐾"
        );

    }

    catch(error) {

        return "🐾";

    }

}


// ==========================================================
// SUBMIT TO FIRESTORE
// ==========================================================

async function submitSuggestionFinal() {

    console.log(
        "📨 Suggestion submit clicked"
    );


    const typeInput =
        document.getElementById(
            "suggestionType"
        );


    const titleInput =
        document.getElementById(
            "suggestionTitle"
        );


    const messageInput =
        document.getElementById(
            "suggestionMessage"
        );


    const status =
        document.getElementById(
            "suggestionStatus"
        );


    const button =
        document.getElementById(
            "sendSuggestionFinal"
        );


    if (
        !typeInput ||
        !titleInput ||
        !messageInput ||
        !status ||
        !button
    ) {

        console.error(
            "❌ Suggestion form incomplete"
        );

        return;

    }


    const type =
        typeInput.value;


    const title =
        titleInput
            .value
            .trim();


    const message =
        messageInput
            .value
            .trim();


    // ======================================================
    // VALIDATION
    // ======================================================

    if (
        title.length < 2
    ) {

        status.textContent =
            "⚠️ Please enter a title.";

        return;

    }


    if (
        message.length < 3
    ) {

        status.textContent =
            "⚠️ Please write your suggestion.";

        return;

    }


    // ======================================================
    // SENDING UI
    // ======================================================

    button.disabled =
        true;


    button.textContent =
        "⏳ SENDING...";


    status.textContent =
        "Sending your suggestion...";


    // ======================================================
    // PLAYER DATA
    // ======================================================

    const playerName =
        getSuggestionPlayerName();


    const character =
        getSuggestionCharacter();


    const playMode =
        localStorage.getItem(
            "animalPartyMode"
        )
        ||
        "player";


    // ======================================================
    // FIRESTORE
    // ======================================================

    try {

        const documentReference =
            await addDoc(
                collection(
                    db,
                    "suggestions"
                ),
                {

                    playerName:
                        playerName,

                    character:
                        character,

                    type:
                        type,

                    title:
                        title,

                    message:
                        message,

                    playMode:
                        playMode,

                    createdAt:
                        serverTimestamp()

                }
            );


        console.log(
            "✅ Suggestion saved:",
            documentReference.id
        );


        // IMPORTANT:
        // Success popup ONLY happens after Firestore succeeds.

        showSuggestionSuccess();


        launchSuggestionConfetti();

    }

    catch(error) {

        console.error(
            "❌ Suggestion Firestore error:",
            error
        );


        status.textContent =
            "❌ Could not send your suggestion. Please try again.";


        button.disabled =
            false;


        button.textContent =
            "✉️ TRY AGAIN";

    }

}


// ==========================================================
// SUCCESS POPUP
// ==========================================================

function showSuggestionSuccess() {

    window.openModal(
        "💌",
        "THANK YOU!",
        "SUGGESTION SENT!",
        `
        <div class="suggestion-success">

            <div class="suggestion-success-heart">
                💖
            </div>

            <h2>
                THANK YOU!
            </h2>

            <p>
                Your suggestion has been received.
            </p>

            <p class="suggestion-success-small">
                Thanks for helping make Animal Party better!
            </p>

        </div>
        `
    );

}


// ==========================================================
// CONFETTI
// ==========================================================

function launchSuggestionConfetti() {

    const oldContainer =
        document.querySelector(
            ".suggestion-confetti"
        );


    if (oldContainer) {

        oldContainer.remove();

    }


    const container =
        document.createElement(
            "div"
        );


    container.className =
        "suggestion-confetti";


    document.body.appendChild(
        container
    );


    const symbols = [
        "🎉",
        "✨",
        "⭐",
        "💖",
        "🎊",
        "🌟",
        "💫"
    ];


    for (
        let i = 0;
        i < 60;
        i++
    ) {

        const piece =
            document.createElement(
                "span"
            );


        piece.className =
            "suggestion-confetti-piece";


        piece.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        piece.style.left =
            (
                Math.random() *
                100
            )
            +
            "vw";


        piece.style.animationDelay =
            (
                Math.random() *
                0.7
            )
            +
            "s";


        piece.style.animationDuration =
            (
                2 +
                Math.random() *
                1.5
            )
            +
            "s";


        piece.style.fontSize =
            (
                13 +
                Math.random() *
                19
            )
            +
            "px";


        container.appendChild(
            piece
        );

    }


    setTimeout(
        function() {

            container.remove();

        },
        4500
    );

}


// ==========================================================
// CONNECT MAIL BUTTON
// ==========================================================

function connectSuggestionButton() {

    const button =
        document.getElementById(
            "suggestionButton"
        );


    if (!button) {

        console.error(
            "❌ #suggestionButton not found"
        );

        return;

    }


    /*
        Clone the button.
        This removes ALL old click listeners
        from your previous broken suggestion code.
    */

    const cleanButton =
        button.cloneNode(
            true
        );


    button.parentNode.replaceChild(
        cleanButton,
        button
    );


    cleanButton.onclick =
        openSuggestionBoxFinal;


    console.log(
        "✅ Suggestion button connected"
    );

}


// ==========================================================
// START
// ==========================================================

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        connectSuggestionButton
    );

}

else {

    connectSuggestionButton();

}