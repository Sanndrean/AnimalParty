// ==========================================================
// ANIMAL PARTY - GOOGLE LOGIN
// ==========================================================


import {

    auth,
    googleProvider,
    signInWithPopup

}
from "./firebase-config.js";


import {

    setPlayMode,
    loadCloudProgress,
    saveCloudProgress

}
from "./save.js";



// ==========================================================
// GOOGLE LOGIN
// ==========================================================

window.animalPartyGoogleLogin =
    async function () {

        try {

            console.log(
                "🔐 Opening Google Login..."
            );


            // ==================================================
            // GOOGLE POPUP
            // ==================================================

            const result =
                await signInWithPopup(
                    auth,
                    googleProvider
                );


            const user =
                result.user;


            if (
                !user
            ) {

                throw new Error(
                    "Google tidak mengembalikan data user."
                );

            }


            console.log(
                "✅ Login berhasil:",
                user.displayName
            );


            // ==================================================
            // SET PLAYER MODE
            // ==================================================

            setPlayMode(
                "player"
            );


            // ==================================================
            // LOAD SAVE
            // ==================================================

            const hasProgress =
                await loadCloudProgress();


            // ==================================================
            // RETURN TO SCRIPT.JS
            // ==================================================

            return {

                user:
                    user,

                hasProgress:
                    hasProgress

            };

        }


        catch (
            error
        ) {

            console.error(
                "Firebase Google Login Error:",
                error
            );


            // ==================================================
            // COMMON FIREBASE ERRORS
            // ==================================================

            if (
                error.code ===
                "auth/popup-closed-by-user"
            ) {

                throw new Error(
                    "Login Google dibatalkan."
                );

            }


            if (
                error.code ===
                "auth/popup-blocked"
            ) {

                throw new Error(
                    "Popup Google diblokir browser. Izinkan popup lalu coba lagi."
                );

            }


            if (
                error.code ===
                "auth/unauthorized-domain"
            ) {

                throw new Error(
                    "Domain website belum diizinkan di Firebase Authentication."
                );

            }


            throw error;

        }

    };



// ==========================================================
// SAVE CURRENT PLAYER
// ==========================================================

window.animalPartySaveProgress =
    async function () {

        try {

            if (
                !auth.currentUser
            ) {

                console.warn(
                    "Save cloud dilewati karena user belum login."
                );


                return false;

            }


            await saveCloudProgress();


            return true;

        }


        catch (
            error
        ) {

            console.error(
                "Cloud save error:",
                error
            );


            throw error;

        }

    };



// ==========================================================
// DEBUG
// ==========================================================

console.log(
    "🔥 Animal Party Firebase Auth loaded"
);