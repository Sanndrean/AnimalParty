// ==========================================================
// ANIMAL PARTY
// CARD MATCH
//
// ROUND 1 = 12 CARDS / 6 PAIRS / 30 SEC
// ROUND 2 = 12 CARDS / 6 PAIRS / 30 SEC
// ROUND 3 = 15 CARDS / 5 TRIOS / 50 SEC
//
// STAR ONLY AFTER ROUND 3
// ==========================================================



// ==========================================================
// SETTINGS
// ==========================================================

const MEMORY_TIME =
    5;


const rounds = {


    // ======================================================
    // ROUND 1
    // ======================================================

    1: {

        cardCount:
            12,

        groupCount:
            6,

        matchSize:
            2,

        time:
            30,

        label:
            "PASANGAN"

    },


    // ======================================================
    // ROUND 2
    // ======================================================

    2: {

        cardCount:
            12,

        groupCount:
            6,

        matchSize:
            2,

        time:
            30,

        label:
            "PASANGAN"

    },


    // ======================================================
    // ROUND 3
    //
    // 15 cards cannot make complete pairs,
    // so this round uses 5 groups of 3.
    // ======================================================

    3: {

        cardCount:
            15,

        groupCount:
            5,

        matchSize:
            3,

        time:
            50,

        label:
            "SET"

    }
};



// ==========================================================
// SYMBOL POOL
// ==========================================================

const symbolPool = [

    "🦊",
    "🐼",
    "🐸",
    "🍓",
    "🍔",
    "🐯",
    "🐰",
    "🐻",
    "🐨",
    "🍎",
    "🍕",
    "🐶",
    "🦁",
    "🌈",
    "🍉",
    "🐵",
    "🦄",
    "🐮",
    "🐷",
    "🐙"

];



// ==========================================================
// DOM
// ==========================================================

const cardGrid =
    document.getElementById(
        "cardGrid"
    );


const timerText =
    document.getElementById(
        "timerText"
    );


const matchedText =
    document.getElementById(
        "matchedText"
    );


const targetText =
    document.getElementById(
        "targetText"
    );


const matchedLabel =
    document.getElementById(
        "matchedLabel"
    );


const roundHud =
    document.getElementById(
        "roundHud"
    );


const roundRule =
    document.getElementById(
        "roundRule"
    );


const memorizeBanner =
    document.getElementById(
        "memorizeBanner"
    );


const memorizeTime =
    document.getElementById(
        "memorizeTime"
    );


const gameMessage =
    document.getElementById(
        "gameMessage"
    );



// ==========================================================
// INSTRUCTION
// ==========================================================

const instructionOverlay =
    document.getElementById(
        "instructionOverlay"
    );


const readyButton =
    document.getElementById(
        "readyButton"
    );



// ==========================================================
// COUNTDOWN
// ==========================================================

const countdownOverlay =
    document.getElementById(
        "countdownOverlay"
    );


const countdownNumber =
    document.getElementById(
        "countdownNumber"
    );



// ==========================================================
// ROUND INTRO
// ==========================================================

const roundOverlay =
    document.getElementById(
        "roundOverlay"
    );


const roundSmallText =
    document.getElementById(
        "roundSmallText"
    );


const roundBigText =
    document.getElementById(
        "roundBigText"
    );


const roundDescription =
    document.getElementById(
        "roundDescription"
    );



// ==========================================================
// NEXT ROUND
// ==========================================================

const nextRoundOverlay =
    document.getElementById(
        "nextRoundOverlay"
    );


const nextRoundIcon =
    document.getElementById(
        "nextRoundIcon"
    );


const nextRoundTitle =
    document.getElementById(
        "nextRoundTitle"
    );


const nextRoundDescription =
    document.getElementById(
        "nextRoundDescription"
    );


const nextRoundButton =
    document.getElementById(
        "nextRoundButton"
    );



// ==========================================================
// RESULT
// ==========================================================

const resultOverlay =
    document.getElementById(
        "resultOverlay"
    );


const resultCard =
    document.getElementById(
        "resultCard"
    );


const resultIcon =
    document.getElementById(
        "resultIcon"
    );


const resultLabel =
    document.getElementById(
        "resultLabel"
    );


const resultTitle =
    document.getElementById(
        "resultTitle"
    );


const resultDescription =
    document.getElementById(
        "resultDescription"
    );


const starReward =
    document.getElementById(
        "starReward"
    );


const resultButton =
    document.getElementById(
        "resultButton"
    );



// ==========================================================
// GAME STATE
// ==========================================================

let currentRound =
    1;


let gameRunning =
    false;


let interactionLocked =
    true;


let changingRound =
    false;


let selectedCards =
    [];


let completedGroups =
    0;


let timeLeft =
    30;


let timerInterval =
    null;


let cardData =
    [];


let startingGame =
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
// SHUFFLE
// ==========================================================

function shuffle(
    array
) {

    const copy =
        [
            ...array
        ];


    for (
        let i =
            copy.length - 1;

        i >
        0;

        i--
    ) {

        const j =
            Math.floor(
                Math.random()
                *
                (
                    i + 1
                )
            );


        const temp =
            copy[
                i
            ];


        copy[
            i
        ] =
            copy[
                j
            ];


        copy[
            j
        ] =
            temp;

    }


    return copy;

}



// ==========================================================
// CREATE DECK
// ==========================================================

function createDeck() {

    const round =
        rounds[
            currentRound
        ];


    /*
     * Choose unique symbols for this round.
     */

    const selectedSymbols =
        shuffle(
            symbolPool
        ).slice(
            0,
            round.groupCount
        );


    const deck =
        [];


    /*
     * Round 1 / 2:
     * Each symbol appears twice.
     *
     * Round 3:
     * Each symbol appears three times.
     */

    selectedSymbols.forEach(
        function(symbol) {

            for (
                let i = 0;

                i <
                round.matchSize;

                i++
            ) {

                deck.push({

                    symbol:
                        symbol

                });

            }

        }
    );


    cardData =
        shuffle(
            deck
        );

}



// ==========================================================
// RENDER CARDS
// ==========================================================

function renderCards() {

    cardGrid.innerHTML =
        "";


    cardGrid.className =
        "card-grid round-"
        +
        currentRound;


    cardData.forEach(
        function(
            cardInfo,
            index
        ) {

            const card =
                document.createElement(
                    "button"
                );


            card.type =
                "button";


            card.className =
                "memory-card";


            card.dataset.symbol =
                cardInfo.symbol;


            card.dataset.index =
                String(
                    index
                );


            card.innerHTML =
                `

                <div class="card-inner">

                    <div class="card-back">
                    </div>


                    <div class="card-front">

                        <span class="card-symbol">
                            ${cardInfo.symbol}
                        </span>

                    </div>

                </div>

                `;


            card.addEventListener(
                "click",
                function() {

                    handleCardClick(
                        card
                    );

                }
            );


            cardGrid.appendChild(
                card
            );

        }
    );

}



// ==========================================================
// GET ALL CARDS
// ==========================================================

function getCards() {

    return Array.from(
        document.querySelectorAll(
            ".memory-card"
        )
    );

}



// ==========================================================
// MESSAGE
// ==========================================================

function showMessage(
    text,
    type =
        ""
) {

    gameMessage.textContent =
        text;


    gameMessage.className =
        "game-message";


    if (
        type
    ) {

        gameMessage.classList.add(
            type
        );

    }


    void gameMessage.offsetWidth;


    gameMessage.classList.add(
        "show"
    );

}



// ==========================================================
// COUNTDOWN
// ==========================================================

async function runCountdown() {

    countdownOverlay.classList.add(
        "show"
    );


    const values = [

        "3",
        "2",
        "1",
        "GO!"

    ];


    for (
        const value
        of values
    ) {

        countdownNumber.textContent =
            value;


        countdownNumber.classList.remove(
            "pop"
        );


        void countdownNumber.offsetWidth;


        countdownNumber.classList.add(
            "pop"
        );


        if (
            value ===
            "GO!"
        ) {

            await wait(
                550
            );

        }

        else {

            await wait(
                750
            );

        }

    }


    countdownOverlay.classList.remove(
        "show"
    );

}



// ==========================================================
// ROUND INTRO
// ==========================================================

async function showRoundIntro() {

    const round =
        rounds[
            currentRound
        ];


    if (
        currentRound ===
        3
    ) {

        roundSmallText.textContent =
            "RONDE TERAKHIR";


        roundBigText.textContent =
            "FINAL ROUND";


        roundDescription.textContent =
            "15 KARTU • 5 SET • COCOKKAN 3";

    }

    else {

        roundSmallText.textContent =
            "BERSIAP!";


        roundBigText.textContent =
            "RONDE "
            +
            currentRound;


        roundDescription.textContent =
            "12 KARTU • 6 PASANGAN";

    }


    roundOverlay.classList.add(
        "show"
    );


    await wait(
        1200
    );


    roundOverlay.classList.remove(
        "show"
    );


    await wait(
        180
    );

}



// ==========================================================
// MEMORIZE
// ==========================================================

async function memorizePhase() {

    gameRunning =
        false;


    interactionLocked =
        true;


    const cards =
        getCards();


    /*
     * Reveal all.
     */

    cards.forEach(
        function(card) {

            card.classList.add(
                "flipped"
            );

        }
    );


    memorizeBanner.classList.add(
        "show"
    );


    for (
        let seconds =
            MEMORY_TIME;

        seconds >=
        1;

        seconds--
    ) {

        memorizeTime.textContent =
            seconds;


        await wait(
            1000
        );

    }


    memorizeBanner.classList.remove(
        "show"
    );


    /*
     * Hide all.
     */

    cards.forEach(
        function(card) {

            card.classList.remove(
                "flipped"
            );

        }
    );


    await wait(
        450
    );


    interactionLocked =
        false;


    gameRunning =
        true;


    if (
        currentRound ===
        3
    ) {

        showMessage(
            "🧠 CARI 3 KARTU YANG SAMA!"
        );

    }

    else {

        showMessage(
            "🧠 CARI PASANGANNYA!"
        );

    }


    startGameTimer();

}



// ==========================================================
// TIMER
// ==========================================================

function startGameTimer() {

    clearInterval(
        timerInterval
    );


    const round =
        rounds[
            currentRound
        ];


    timeLeft =
        round.time;


    timerText.textContent =
        timeLeft;


    timerInterval =
        setInterval(
            function() {

                if (
                    !gameRunning
                ) {

                    return;

                }


                timeLeft--;


                if (
                    timeLeft <
                    0
                ) {

                    timeLeft =
                        0;

                }


                timerText.textContent =
                    timeLeft;


                if (
                    timeLeft <=
                    0
                ) {

                    loseGame();

                }

            },
            1000
        );

}



// ==========================================================
// CARD CLICK
// ==========================================================

function handleCardClick(
    card
) {

    if (
        !gameRunning
        ||
        interactionLocked
        ||
        changingRound
        ||
        card.classList.contains(
            "matched"
        )
        ||
        card.classList.contains(
            "flipped"
        )
    ) {

        return;

    }


    const round =
        rounds[
            currentRound
        ];


    card.classList.add(
        "flipped",
        "selected"
    );


    selectedCards.push(
        card
    );


    /*
     * Wait until player selected the amount
     * required for this round.
     *
     * R1/R2 = 2 cards.
     * R3 = 3 cards.
     */

    if (
        selectedCards.length <
        round.matchSize
    ) {

        return;

    }


    interactionLocked =
        true;


    checkSelectedCards();

}



// ==========================================================
// CHECK SELECTED CARDS
// ==========================================================

async function checkSelectedCards() {

    const round =
        rounds[
            currentRound
        ];


    /*
     * Copy selection so async logic
     * doesn't get confused by later resets.
     */

    const cardsToCheck =
        [
            ...selectedCards
        ];


    const firstSymbol =
        cardsToCheck[
            0
        ].dataset.symbol;


    const allSame =
        cardsToCheck.every(
            function(card) {

                return (
                    card.dataset.symbol ===
                    firstSymbol
                );

            }
        );



    // ======================================================
    // CORRECT
    // ======================================================

    if (
        allSame
    ) {

        cardsToCheck.forEach(
            function(card) {

                card.classList.remove(
                    "selected"
                );


                card.classList.add(
                    "matched"
                );

            }
        );


        completedGroups++;


        matchedText.textContent =
            completedGroups;


        selectedCards =
            [];


        if (
            currentRound ===
            3
        ) {

            showMessage(
                "✨ 3 KARTU COCOK!",
                "good"
            );

        }

        else {

            showMessage(
                "✨ PASANGAN BENAR!",
                "good"
            );

        }


        await wait(
            220
        );


        interactionLocked =
            false;


        checkRoundComplete();


        return;

    }



    // ======================================================
    // WRONG
    // ======================================================

    cardsToCheck.forEach(
        function(card) {

            card.classList.add(
                "wrong"
            );

        }
    );


    if (
        currentRound ===
        3
    ) {

        showMessage(
            "❌ BUKAN 3 KARTU YANG SAMA!",
            "bad"
        );

    }

    else {

        showMessage(
            "❌ BUKAN PASANGAN!",
            "bad"
        );

    }


    await wait(
        700
    );


    cardsToCheck.forEach(
        function(card) {

            card.classList.remove(
                "flipped",
                "selected",
                "wrong"
            );

        }
    );


    selectedCards =
        [];


    interactionLocked =
        false;

}



// ==========================================================
// CHECK ROUND COMPLETE
// ==========================================================

async function checkRoundComplete() {

    if (
        changingRound
    ) {

        return;

    }


    const round =
        rounds[
            currentRound
        ];


    /*
     * Not finished.
     */

    if (
        completedGroups <
        round.groupCount
    ) {

        return;

    }


    changingRound =
        true;


    gameRunning =
        false;


    interactionLocked =
        true;


    clearInterval(
        timerInterval
    );


    await wait(
        450
    );



    // ======================================================
    // ROUND 1 & 2
    //
    // DO NOT:
    // - WIN
    // - GIVE STAR
    // ======================================================

    if (
        currentRound <
        3
    ) {

        showNextRoundPopup();


        return;

    }



    // ======================================================
    // ROUND 3
    //
    // ONLY NOW WIN.
    // ======================================================

    if (
        currentRound ===
        3
    ) {

        winGame();

    }

}



// ==========================================================
// NEXT ROUND POPUP
// ==========================================================

function showNextRoundPopup() {

    if (
        currentRound ===
        1
    ) {

        nextRoundIcon.textContent =
            "🎉";


        nextRoundTitle.textContent =
            "RONDE 1 SELESAI!";


        nextRoundDescription.textContent =
            "Bagus! Ronde 2 masih memiliki 12 kartu, tapi semua posisi akan diacak lagi.";

    }


    else if (
        currentRound ===
        2
    ) {

        nextRoundIcon.textContent =
            "🔥";


        nextRoundTitle.textContent =
            "RONDE 2 SELESAI!";


        nextRoundDescription.textContent =
            "Final Round punya 15 kartu. Kali ini kamu harus mencari 3 kartu yang sama!";

    }


    nextRoundOverlay.classList.add(
        "show"
    );

}



// ==========================================================
// NEXT ROUND BUTTON
// ==========================================================

nextRoundButton.addEventListener(
    "click",
    async function() {

        nextRoundButton.disabled =
            true;


        nextRoundOverlay.classList.remove(
            "show"
        );


        currentRound++;


        changingRound =
            false;


        await startRound();


        nextRoundButton.disabled =
            false;

    }
);



// ==========================================================
// START ROUND
// ==========================================================

async function startRound() {

    const round =
        rounds[
            currentRound
        ];


    /*
     * Reset round-specific state.
     */

    gameRunning =
        false;


    interactionLocked =
        true;


    selectedCards =
        [];


    completedGroups =
        0;


    matchedText.textContent =
        "0";


    targetText.textContent =
        round.groupCount;


    matchedLabel.textContent =
        round.label;


    timerText.textContent =
        round.time;


    roundHud.textContent =
        "RONDE "
        +
        currentRound
        +
        " / 3";


    /*
     * Instruction chip above cards.
     */

    if (
        currentRound ===
        3
    ) {

        roundRule.textContent =
            "🔥 Cocokkan 3 kartu yang sama";

    }

    else {

        roundRule.textContent =
            "🧠 Cocokkan 2 kartu yang sama";

    }


    createDeck();


    renderCards();


    await showRoundIntro();


    await memorizePhase();

}



// ==========================================================
// START WHOLE GAME
// ==========================================================

async function startGame() {

    if (
        startingGame
    ) {

        return;

    }


    startingGame =
        true;


    readyButton.disabled =
        true;


    /*
     * Remove stale rewards from previous
     * game/session.
     */

    sessionStorage.removeItem(
        "justWon"
    );


    instructionOverlay.classList.remove(
        "show"
    );


    currentRound =
        1;


    changingRound =
        false;


    selectedCards =
        [];


    completedGroups =
        0;


    await runCountdown();


    await startRound();


    startingGame =
        false;

}



// ==========================================================
// STOP GAME
// ==========================================================

function stopGame() {

    gameRunning =
        false;


    interactionLocked =
        true;


    clearInterval(
        timerInterval
    );

}



// ==========================================================
// WIN GAME
//
// ONLY ROUND 3 IS ALLOWED TO CALL THIS.
// ==========================================================

function winGame() {

    /*
     * Absolute protection against early win.
     */

    if (
        currentRound !==
        3
    ) {

        console.warn(
            "Early win blocked on round",
            currentRound
        );


        return;

    }


    stopGame();


    changingRound =
        true;



    // ======================================================
    // ONLY AFTER ALL 3 ROUNDS:
    // GIVE +1 STAR
    // ======================================================

    giveStar();


    sessionStorage.setItem(
        "justWon",
        "true"
    );


    resultCard.classList.remove(
        "lost"
    );


    resultIcon.textContent =
        "⭐";


    resultLabel.textContent =
        "MEMORY MASTER";


    resultTitle.textContent =
        "YOU WON!";


    resultDescription.textContent =
        "Hebat! Kamu berhasil menyelesaikan ketiga ronde Card Match!";


    starReward.style.display =
        "inline-block";


    resultOverlay.classList.add(
        "show"
    );

}



// ==========================================================
// LOSE GAME
// ==========================================================

function loseGame() {

    if (
        !gameRunning
    ) {

        return;

    }


    stopGame();


    changingRound =
        true;


    /*
     * No reward.
     */

    sessionStorage.removeItem(
        "justWon"
    );


    resultCard.classList.add(
        "lost"
    );


    resultIcon.textContent =
        "💥";


    resultLabel.textContent =
        "WAKTU HABIS";


    resultTitle.textContent =
        "YOU LOST";


    resultDescription.textContent =
        "Waktu habis di Ronde "
        +
        currentRound
        +
        ".";


    starReward.style.display =
        "none";


    resultOverlay.classList.add(
        "show"
    );

}



// ==========================================================
// GIVE STAR
//
// ONLY winGame() CALLS THIS.
// ==========================================================

function giveStar() {

    const mode =
        localStorage.getItem(
            "animalPartyMode"
        )
        ||
        "player";


    const storage =
        mode ===
        "guest"
        ?
        sessionStorage
        :
        localStorage;


    let stars =
        parseInt(
            storage.getItem(
                "playerStars"
            )
            ||
            "0",
            10
        );


    let level =
        parseInt(
            storage.getItem(
                "playerLevel"
            )
            ||
            "1",
            10
        );


    if (
        Number.isNaN(
            stars
        )
    ) {

        stars =
            0;

    }


    if (
        Number.isNaN(
            level
        )
    ) {

        level =
            1;

    }


    /*
     * ONE STAR FOR THE WHOLE MINIGAME.
     */

    stars++;


    if (
        stars >=
        3
    ) {

        stars =
            0;


        level++;


        storage.setItem(
            "playerLevel",
            String(
                level
            )
        );

    }


    storage.setItem(
        "playerStars",
        String(
            stars
        )
    );

}



// ==========================================================
// READY BUTTON
// ==========================================================

readyButton.addEventListener(
    "click",
    function() {

        startGame();

    }
);



// ==========================================================
// RESULT BUTTON
// ==========================================================

resultButton.addEventListener(
    "click",
    function() {

        window.location.href =
            "home.html";

    }
);



// ==========================================================
// PREVENT NATIVE DRAG
// ==========================================================

document.addEventListener(
    "dragstart",
    function(event) {

        event.preventDefault();

    }
);



// ==========================================================
// INITIAL PREVIEW
// ==========================================================

currentRound =
    1;


targetText.textContent =
    rounds[1].groupCount;


matchedLabel.textContent =
    rounds[1].label;


timerText.textContent =
    rounds[1].time;


roundHud.textContent =
    "RONDE 1 / 3";


roundRule.textContent =
    "🧠 Cocokkan 2 kartu yang sama";


createDeck();


renderCards();


console.log(
    "🃏 CARD MATCH 3 ROUNDS READY"
);