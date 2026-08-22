import {

    auth,
    googleProvider,
    signInWithPopup

}
from "./firebase-config.js";


window.startGoogleLogin =
    async function () {

        const result =
            await signInWithPopup(

                auth,

                googleProvider

            );


        return result.user;

    };


console.log(
    "FIREBASE LOGIN READY"
);