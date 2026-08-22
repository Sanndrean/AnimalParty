// ==========================================================
// ANIMAL PARTY FIREBASE
// ==========================================================

import {
    initializeApp
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";


import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup
}
from "https://www.gstatic.com/firebasejs/12.2.1/firebase-auth.js";


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
// INITIALIZE
// ==========================================================

const app =
    initializeApp(
        firebaseConfig
    );


const auth =
    getAuth(
        app
    );


const googleProvider =
    new GoogleAuthProvider();


googleProvider.setCustomParameters({

    prompt:
        "select_account"

});


export {

    auth,

    googleProvider,

    signInWithPopup

};