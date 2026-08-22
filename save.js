// ==========================================================
// ANIMAL PARTY - SAVE SYSTEM
// GUEST  = sessionStorage
// PLAYER = localStorage + FIRESTORE
// ==========================================================


import {

    auth,
    db,
    doc,
    getDoc,
    setDoc

}
from "./firebase-config.js";



// ==========================================================
// KEYS YANG DISIMPAN
// ==========================================================

const SAVE_KEYS = [

    "selectedCharacter",
    "selectedCharacterName",
    "selectedCharacterIcon",

    "playerLevel",
    "playerStars",

    "playedMiniGames",

    "lastDisplayedLevel"

];



// ==========================================================
// DEFAULT PLAYER DATA
// ==========================================================

const DEFAULT_SAVE = {

    selectedCharacter:
        null,

    selectedCharacterName:
        null,

    selectedCharacterIcon:
        null,

    playerLevel:
        1,

    playerStars:
        0,

    playedMiniGames:
        [],

    lastDisplayedLevel:
        1

};



// ==========================================================
// PLAY MODE
// ==========================================================

export function getPlayMode() {

    return (
        localStorage.getItem(
            "animalPartyMode"
        )
        ||
        null
    );

}


export function setPlayMode(
    mode
) {

    localStorage.setItem(
        "animalPartyMode",
        mode
    );

}



// ==========================================================
// STORAGE
// ==========================================================

export function getGameStorage() {

    if (
        getPlayMode() ===
        "guest"
    ) {

        return sessionStorage;

    }


    return localStorage;

}



// ==========================================================
// SAFE READ
// ==========================================================

function readValue(
    storage,
    key
) {

    const value =
        storage.getItem(
            key
        );


    if (
        value === null
    ) {

        return null;

    }


    try {

        return JSON.parse(
            value
        );

    }

    catch {

        return value;

    }

}



// ==========================================================
// SAFE WRITE
// ==========================================================

function writeValue(
    storage,
    key,
    value
) {

    if (
        typeof value ===
        "string"
    ) {

        storage.setItem(
            key,
            value
        );

        return;

    }


    storage.setItem(
        key,
        JSON.stringify(
            value
        )
    );

}



// ==========================================================
// GET GAME DATA
// ==========================================================

export function getGameData(
    key,
    fallback = null
) {

    const storage =
        getGameStorage();


    const value =
        readValue(
            storage,
            key
        );


    if (
        value === null ||
        value === undefined
    ) {

        return fallback;

    }


    return value;

}



// ==========================================================
// SET GAME DATA
// ==========================================================

export async function setGameData(
    key,
    value
) {

    const storage =
        getGameStorage();


    writeValue(
        storage,
        key,
        value
    );


    // player mode → sync cloud

    if (
        getPlayMode() ===
        "player" &&
        auth.currentUser
    ) {

        await saveCloudProgress();

    }

}



// ==========================================================
// START GUEST
// ==========================================================

export function startGuestSession() {

    SAVE_KEYS.forEach(
        function (
            key
        ) {

            sessionStorage.removeItem(
                key
            );

        }
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


    sessionStorage.setItem(
        "lastDisplayedLevel",
        "1"
    );

}



// ==========================================================
// BUILD CURRENT SAVE
// ==========================================================

function buildSaveObject() {

    const data = {
        ...DEFAULT_SAVE
    };


    SAVE_KEYS.forEach(
        function (
            key
        ) {

            const value =
                readValue(
                    localStorage,
                    key
                );


            if (
                value !== null &&
                value !== undefined
            ) {

                data[key] =
                    value;

            }

        }
    );


    return data;

}



// ==========================================================
// SAVE TO FIRESTORE
// ==========================================================

export async function saveCloudProgress() {

    const user =
        auth.currentUser;


    if (
        !user
    ) {

        console.warn(
            "Tidak ada user login."
        );


        return false;

    }


    const data =
        buildSaveObject();


    data.updatedAt =
        Date.now();


    await setDoc(

        doc(
            db,
            "players",
            user.uid
        ),

        data,

        {
            merge:
                true
        }

    );


    console.log(
        "☁️ Progress saved."
    );


    return true;

}



// ==========================================================
// LOAD FROM FIRESTORE
// ==========================================================

export async function loadCloudProgress() {

    const user =
        auth.currentUser;


    if (
        !user
    ) {

        throw new Error(
            "User belum login."
        );

    }


    const playerRef =
        doc(
            db,
            "players",
            user.uid
        );


    const snapshot =
        await getDoc(
            playerRef
        );



    // ======================================================
    // NEW PLAYER
    // ======================================================

    if (
        !snapshot.exists()
    ) {

        console.log(
            "🌟 New Animal Party player"
        );


        // clean game cache

        SAVE_KEYS.forEach(
            function (
                key
            ) {

                localStorage.removeItem(
                    key
                );

            }
        );


        localStorage.setItem(
            "playerLevel",
            "1"
        );


        localStorage.setItem(
            "playerStars",
            "0"
        );


        localStorage.setItem(
            "playedMiniGames",
            JSON.stringify([])
        );


        localStorage.setItem(
            "lastDisplayedLevel",
            "1"
        );


        /*
            Kita TIDAK membuat save cloud
            dulu di sini.

            Save dibuat setelah player
            memilih karakter.
        */


        return false;

    }



    // ======================================================
    // EXISTING PLAYER
    // ======================================================

    const cloud =
        snapshot.data();


    SAVE_KEYS.forEach(
        function (
            key
        ) {

            if (
                cloud[key] ===
                undefined
            ) {

                return;

            }


            writeValue(
                localStorage,
                key,
                cloud[key]
            );

        }
    );


    console.log(
        "☁️ Progress loaded."
    );


    return true;

}