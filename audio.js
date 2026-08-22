// ==========================================================
// ANIMAL PARTY GLOBAL MUSIC
// START FROM BEGINNING OF GAME
// ==========================================================

(function () {

    const MUSIC_PATH =
        "audio/animal-party-theme.mp3";


    // ======================================================
    // REUSE AUDIO ELEMENT IF IT ALREADY EXISTS
    // ======================================================

    let music =
        document.getElementById(
            "animalPartyMusic"
        );


    if (!music) {

        music =
            document.createElement(
                "audio"
            );


        music.id =
            "animalPartyMusic";


        music.src =
            MUSIC_PATH;


        music.loop =
            true;


        music.preload =
            "auto";


        music.playsInline =
            true;


        document.body.appendChild(
            music
        );

    }


    // ======================================================
    // SAVED SETTINGS
    // ======================================================

    let savedVolume =
        localStorage.getItem(
            "animalPartyVolume"
        );


    if (
        savedVolume === null
    ) {

        savedVolume =
            0.35;

    }

    else {

        savedVolume =
            Number(
                savedVolume
            );

    }


    savedVolume =
        Math.max(
            0,
            Math.min(
                1,
                savedVolume
            )
        );


    music.volume =
        savedVolume;


    music.muted =
        localStorage.getItem(
            "animalPartyMuted"
        ) === "true";


    // ======================================================
    // LOAD CHECK
    // ======================================================

    music.addEventListener(
        "canplay",
        function () {

            console.log(
                "🎵 Animal Party music ready"
            );

        }
    );


    music.addEventListener(
        "error",
        function () {

            console.error(
                "❌ Music failed:",
                MUSIC_PATH,
                music.error
            );

        }
    );


    // ======================================================
    // PLAY FUNCTION
    // ======================================================

    async function playMusic() {

        try {

            await music.play();


            console.log(
                "🎵 Music playing"
            );

        }

        catch (error) {

            console.log(
                "🔇 Autoplay blocked. Waiting for first interaction."
            );

        }

    }


    // ======================================================
    // TRY IMMEDIATELY
    // ======================================================

    window.addEventListener(
        "load",
        function () {

            playMusic();

        }
    );


    // ======================================================
    // FIRST USER ACTION UNLOCKS AUDIO
    // ======================================================

    function unlockAudio() {

        playMusic();


        document.removeEventListener(
            "pointerdown",
            unlockAudio
        );


        document.removeEventListener(
            "touchstart",
            unlockAudio
        );


        document.removeEventListener(
            "keydown",
            unlockAudio
        );


        document.removeEventListener(
            "click",
            unlockAudio
        );

    }


    document.addEventListener(
        "pointerdown",
        unlockAudio
    );


    document.addEventListener(
        "touchstart",
        unlockAudio
    );


    document.addEventListener(
        "keydown",
        unlockAudio
    );


    document.addEventListener(
        "click",
        unlockAudio
    );


    // ======================================================
    // PUBLIC API
    // ======================================================

    window.AnimalPartyAudio = {

        play() {

            return playMusic();

        },


        pause() {

            music.pause();

        },


        setVolume(value) {

            const volume =
                Math.max(
                    0,
                    Math.min(
                        1,
                        Number(value)
                    )
                );


            music.volume =
                volume;


            localStorage.setItem(
                "animalPartyVolume",
                String(volume)
            );


            if (
                volume > 0 &&
                !music.muted
            ) {

                playMusic();

            }

        },


        getVolume() {

            return music.volume;

        },


        setMuted(value) {

            music.muted =
                Boolean(value);


            localStorage.setItem(
                "animalPartyMuted",
                String(
                    music.muted
                )
            );


            if (
                !music.muted
            ) {

                playMusic();

            }

        },


        isMuted() {

            return music.muted;

        },


        toggleMute() {

            this.setMuted(
                !music.muted
            );


            return music.muted;

        }

    };


    console.log(
        "🎵 Audio system initialized:",
        MUSIC_PATH
    );

})();