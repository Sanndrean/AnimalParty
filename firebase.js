// ==========================================================
// ANIMAL PARTY - FIREBASE / FIRESTORE
// ==========================================================

import {
    initializeApp
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
// INITIALIZE FIREBASE
// ==========================================================

console.log("🔥 Connecting to Firebase...");


const app =
    initializeApp(
        firebaseConfig
    );


const db =
    getFirestore(
        app
    );


console.log(
    "✅ Firebase connected"
);


// ==========================================================
// GLOBAL SEND FUNCTION
// ==========================================================

window.sendAnimalPartySuggestion =
    async function(data) {

        console.log(
            "📨 Sending to Firestore:",
            data
        );


        try {

            const documentReference =
                await addDoc(
                    collection(
                        db,
                        "suggestions"
                    ),
                    {

                        playerName:
                            data.playerName
                            || "Player",

                        character:
                            data.character
                            || "🐾",

                        type:
                            data.type
                            || "other",

                        title:
                            data.title
                            || "",

                        message:
                            data.message
                            || "",

                        playMode:
                            data.playMode
                            || "unknown",

                        createdAt:
                            serverTimestamp()

                    }
                );


            console.log(
                "✅ FIRESTORE SAVED!"
            );


            console.log(
                "📄 Document ID:",
                documentReference.id
            );


            return {

                success: true,

                id:
                    documentReference.id

            };

        }

        catch(error) {

            console.error(
                "❌ FIRESTORE ERROR:",
                error
            );


            return {

                success: false,

                error:
                    error

            };

        }

    };


// ==========================================================
// READY
// ==========================================================

window.animalPartyFirebaseReady =
    true;


console.log(
    "🔥 Animal Party Firebase READY"
);