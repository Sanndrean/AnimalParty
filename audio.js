// ==========================================================
// ANIMAL PARTY GLOBAL MUSIC
// ==========================================================

(function () {

    // ======================================================
    // MUSIC FILE
    // ======================================================

    const MUSIC_PATH =
        "./animal-party-theme-v2.mp3?v=2";


    // ======================================================
    // GET / CREATE AUDIO ELEMENT
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
    // FORCE NEW MUSIC SOURCE
    // ======================================================

    music.pause();


    music.src =
        MUSIC_PATH;


    music.load();


    console.log(
        "🎵 MUSIC SOURCE:",
        MUSIC_PATH
    );


    // ======================================================
    // SAVED VOLUME
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


    if (
        Number.isNaN(
            savedVolume
        )
    ) {

        savedVolume =
            0.35;

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


    // ======================================================
    // SAVED MUTE
    // ======================================================

    const savedMuted =
        localStorage.getItem(
            "animalPartyMuted"
        );


    music.muted =
        savedMuted === "true";


    // ======================================================
    // AUDIO STATUS
    // ======================================================

    music.addEventListener(
        "loadedmetadata",
        function () {

            console.log(
                "🎵 Music metadata loaded"
            );


            console.log(
                "🎵 Duration:",
                music.duration
            );

        }
    );


    music.addEventListener(
        "canplay",
        function () {

            console.log(
                "✅ Animal Party music ready"
            );

        }
    );


    music.addEventListener(
        "playing",
        function () {

            console.log(
                "▶️ Animal Party music playing"
            );

        }
    );


    music.addEventListener(
        "error",
        function () {

            console.error(
                "❌ MUSIC FAILED TO LOAD"
            );


            console.error(
                "Music path:",
                MUSIC_PATH
            );


            console.error(
                "Audio error:",
                music.error
            );

        }
    );


    // ======================================================
    // PLAY MUSIC
    // ======================================================

    async function playMusic() {

        if (
            music.muted
        ) {

            console.log(
                "🔇 Music currently muted"
            );

            return false;

        }


        try {

            await music.play();


            console.log(
                "🎵 Music playing successfully"
            );


            return true;

        }

        catch (error) {

            console.log(
                "🔇 Autoplay blocked."
            );


            console.log(
                "Waiting for user interaction..."
            );


            return false;

        }

    }


    // ======================================================
    // TRY AUTOPLAY WHEN PAGE LOADS
    // ======================================================

    function tryAutoPlay() {

        playMusic();

    }


    if (
        document.readyState ===
        "complete"
    ) {

        tryAutoPlay();

    }

    else {

        window.addEventListener(
            "load",
            tryAutoPlay,
            {
                once: true
            }
        );

    }


    // ======================================================
    // MOBILE / BROWSER AUDIO UNLOCK
    // ======================================================

    let audioUnlocked =
        false;


    async function unlockAudio() {

        if (
            audioUnlocked
        ) {

            return;

        }


        const success =
            await playMusic();


        if (
            success
        ) {

            audioUnlocked =
                true;


            removeUnlockEvents();

        }

    }


    function removeUnlockEvents() {

        document.removeEventListener(
            "pointerdown",
            unlockAudio
        );


        document.removeEventListener(
            "touchstart",
            unlockAudio
        );


        document.removeEventListener(
            "click",
            unlockAudio
        );


        document.removeEventListener(
            "keydown",
            unlockAudio
        );

    }


    document.addEventListener(
        "pointerdown",
        unlockAudio
    );


    document.addEventListener(
        "touchstart",
        unlockAudio,
        {
            passive: true
        }
    );


    document.addEventListener(
        "click",
        unlockAudio
    );


    document.addEventListener(
        "keydown",
        unlockAudio
    );


    // ======================================================
    // RESUME MUSIC WHEN RETURNING TO PAGE
    // ======================================================

    document.addEventListener(
        "visibilitychange",
        function () {

            if (
                document.visibilityState ===
                "visible" &&
                !music.muted &&
                audioUnlocked
            ) {

                playMusic();

            }

        }
    );


    // ======================================================
    // PUBLIC AUDIO API
    // ======================================================

    window.AnimalPartyAudio = {


        // ==================================================
        // PLAY
        // ==================================================

        play:
            function () {

                return playMusic();

            },


        // ==================================================
        // PAUSE
        // ==================================================

        pause:
            function () {

                music.pause();

            },


        // ==================================================
        // RESTART
        // ==================================================

        restart:
            function () {

                music.currentTime =
                    0;


                return playMusic();

            },


        // ==================================================
        // SET VOLUME
        // ==================================================

        setVolume:
            function (value) {

                let volume =
                    Number(
                        value
                    );


                if (
                    Number.isNaN(
                        volume
                    )
                ) {

                    volume =
                        0.35;

                }


                volume =
                    Math.max(
                        0,
                        Math.min(
                            1,
                            volume
                        )
                    );


                music.volume =
                    volume;


                localStorage.setItem(
                    "animalPartyVolume",
                    String(
                        volume
                    )
                );


                if (
                    volume > 0 &&
                    !music.muted
                ) {

                    playMusic();

                }

            },


        // ==================================================
        // GET VOLUME
        // ==================================================

        getVolume:
            function () {

                return music.volume;

            },


        // ==================================================
        // MUTE
        // ==================================================

        setMuted:
            function (value) {

                const muted =
                    Boolean(
                        value
                    );


                music.muted =
                    muted;


                localStorage.setItem(
                    "animalPartyMuted",
                    String(
                        muted
                    )
                );


                if (
                    !muted
                ) {

                    playMusic();

                }

            },


        // ==================================================
        // CHECK MUTE
        // ==================================================

        isMuted:
            function () {

                return music.muted;

            },


        // ==================================================
        // TOGGLE MUTE
        // ==================================================

        toggleMute:
            function () {

                const newValue =
                    !music.muted;


                this.setMuted(
                    newValue
                );


                return newValue;

            },


        // ==================================================
        // GET MUSIC SOURCE
        // ==================================================

        getSource:
            function () {

                return music.currentSrc;

            },


        // ==================================================
        // CURRENT TIME
        // ==================================================

        getCurrentTime:
            function () {

                return music.currentTime;

            }

    };


    // ======================================================
    // READY
    // ======================================================

    console.log(
        "🎵 Animal Party audio initialized"
    );


    console.log(
        "🎵 NEW MUSIC:",
        MUSIC_PATH
    );

})();