// ==========================================================
// ANIMAL PARTY - LOBBY
// CLEAN BUILD
// ==========================================================


// ==========================================================
// SETTINGS
// ==========================================================

const XP_PER_LEVEL = 100;
const XP_PER_ACHIEVEMENT = 25;
const XP_PER_DAILY = 10;


// ==========================================================
// CHARACTERS
// ==========================================================

const characters = {

    dandy: {
        name: "Maximus",
        icon: "🐶"
    },

    claire: {
        name: "Sidney",
        icon: "🐭"
    },

    bubu: {
        name: "Ron",
        icon: "🐰"
    },

    janhe: {
        name: "Mario",
        icon: "🦊"
    },

    lunar: {
        name: "V",
        icon: "🐼"
    },

    lala: {
        name: "Debora",
        icon: "🐨"
    },

    bara: {
        name: "Andrea",
        icon: "🐻"
    },

    lex: {
        name: "Shiendra",
        icon: "🐺"
    },

    will: {
        name: "Lio",
        icon: "🦁"
    },

    coxie: {
        name: "Sapidermen",
        icon: "🐮"
    },

    piglet: {
        name: "Randy",
        icon: "🐷"
    },

    frogie: {
        name: "Ongko",
        icon: "🐸"
    }

};


// ==========================================================
// ACCESSORIES
// ==========================================================

const accessories = [

    {
        id: "crown",
        icon: "👑",
        name: "Royal Crown",
        price: 700,
        type: "hat"
    },

    {
        id: "sunhat",
        icon: "👒",
        name: "Sun Hat",
        price: 350,
        type: "hat"
    },

    {
        id: "tophat",
        icon: "🎩",
        name: "Top Hat",
        price: 500,
        type: "hat"
    },

    {
        id: "graduation",
        icon: "🎓",
        name: "Graduation Hat",
        price: 450,
        type: "hat"
    },

    {
        id: "cap",
        icon: "🧢",
        name: "Party Cap",
        price: 250,
        type: "hat"
    },

    {
        id: "glasses",
        icon: "👓",
        name: "Classic Glasses",
        price: 300,
        type: "glasses"
    },

    {
        id: "sunglasses",
        icon: "🕶️",
        name: "Cool Shades",
        price: 450,
        type: "glasses"
    },

    {
        id: "goggles",
        icon: "🥽",
        name: "Adventure Goggles",
        price: 600,
        type: "glasses"
    }

];


// ==========================================================
// ACHIEVEMENTS
// ==========================================================

const achievements = [

    {
        id: "monkeybash",
        icon: "🐒",
        name: "Monkey Master",
        description: "Win Monkey Bash"
    },

    {
        id: "sprint",
        icon: "🏃",
        name: "Speedster",
        description: "Win Speed Sprint"
    },

    {
        id: "memory",
        icon: "🧠",
        name: "Perfect Memory",
        description: "Win Memory Mix"
    },

    {
        id: "skyjump",
        icon: "☁️",
        name: "Sky Walker",
        description: "Win Sky Jump"
    },

    {
        id: "mathquiz",
        icon: "➗",
        name: "Math Genius",
        description: "Win Math Quiz"
    },

    {
        id: "rps",
        icon: "✊",
        name: "Mr. T Slayer",
        description: "Beat Mr. T"
    },

    {
        id: "redlight",
        icon: "🚦",
        name: "Green Light",
        description: "Win Red Light Green Light"
    },

    {
        id: "number",
        icon: "🔢",
        name: "Number King",
        description: "Win Number Reorganizer"
    }

];


// ==========================================================
// DAILY REWARDS
// ==========================================================

const dailyRewards = [

    {
        coins: 100,
        diamonds: 0
    },

    {
        coins: 150,
        diamonds: 0
    },

    {
        coins: 200,
        diamonds: 0
    },

    {
        coins: 300,
        diamonds: 0
    },

    {
        coins: 500,
        diamonds: 1
    }

];


// ==========================================================
// STORAGE
// ==========================================================

function getPlayMode() {

    return (
        localStorage.getItem(
            "animalPartyMode"
        )
        ||
        "player"
    );

}


function getGameStorage() {

    if (
        getPlayMode() ===
        "guest"
    ) {

        return sessionStorage;

    }

    return localStorage;

}


const storage =
    getGameStorage();


// ==========================================================
// DEFAULT SAVE DATA
// ==========================================================

const defaultData = {

    animalPartyCoins: "0",

    animalPartyDiamonds: "0",

    playerXP: "0",

    playerStars: "0",

    ownedAccessories: "[]",

    wonMiniGames: "[]",

    rewardedAchievements: "[]",

    dailyRewardStreak: "0"

};


Object.entries(
    defaultData
).forEach(
    function(entry) {

        const key =
            entry[0];

        const value =
            entry[1];


        if (
            storage.getItem(
                key
            ) === null
        ) {

            storage.setItem(
                key,
                value
            );

        }

    }
);


// ==========================================================
// JSON HELPERS
// ==========================================================

function getJSON(
    key,
    fallback = []
) {

    try {

        const value =
            JSON.parse(
                storage.getItem(
                    key
                )
            );


        return (
            Array.isArray(value)
                ?
                value
                :
                fallback
        );

    }

    catch(error) {

        return fallback;

    }

}


function setJSON(
    key,
    value
) {

    storage.setItem(
        key,
        JSON.stringify(
            value
        )
    );

}


// ==========================================================
// CHARACTER RECOVERY
// ==========================================================

let selectedCharacter =
    storage.getItem(
        "selectedCharacter"
    );


let selectedIcon =
    storage.getItem(
        "selectedCharacterIcon"
    );


let originalCharacterName =
    storage.getItem(
        "selectedCharacterName"
    );


if (
    selectedCharacter &&
    characters[
        selectedCharacter
    ]
) {

    selectedIcon =
        characters[
            selectedCharacter
        ].icon;


    originalCharacterName =
        characters[
            selectedCharacter
        ].name;

}

else if (
    selectedIcon
) {

    const found =
        Object.entries(
            characters
        ).find(
            function(entry) {

                return (
                    entry[1].icon ===
                    selectedIcon
                );

            }
        );


    if (found) {

        selectedCharacter =
            found[0];


        selectedIcon =
            found[1].icon;


        originalCharacterName =
            found[1].name;

    }

}


if (
    !selectedCharacter ||
    !characters[
        selectedCharacter
    ]
) {

    selectedCharacter =
        "dandy";


    selectedIcon =
        characters.dandy.icon;


    originalCharacterName =
        characters.dandy.name;

}


storage.setItem(
    "selectedCharacter",
    selectedCharacter
);


storage.setItem(
    "selectedCharacterIcon",
    selectedIcon
);


storage.setItem(
    "selectedCharacterName",
    originalCharacterName
);


// ==========================================================
// PLAYER DISPLAY NAME
// ==========================================================

let playerDisplayName =
    storage.getItem(
        "playerDisplayName"
    );


if (
    !playerDisplayName
) {

    playerDisplayName =
        originalCharacterName;


    storage.setItem(
        "playerDisplayName",
        playerDisplayName
    );

}


// ==========================================================
// ELEMENTS
// ==========================================================

const profileIcon =
    document.getElementById(
        "profileIcon"
    );


const profileName =
    document.getElementById(
        "profileName"
    );


const profileLevel =
    document.getElementById(
        "profileLevel"
    );


const levelFill =
    document.getElementById(
        "levelFill"
    );


const xpText =
    document.getElementById(
        "xpText"
    );


const starCurrency =
    document.getElementById(
        "starCurrency"
    );


const coinCurrency =
    document.getElementById(
        "coinCurrency"
    );


const diamondCurrency =
    document.getElementById(
        "diamondCurrency"
    );


const lobbyCharacter =
    document.getElementById(
        "lobbyCharacter"
    );


const characterAccessory =
    document.getElementById(
        "characterAccessory"
    );


const modalOverlay =
    document.getElementById(
        "modalOverlay"
    );


const modalIcon =
    document.getElementById(
        "modalIcon"
    );


const modalLabel =
    document.getElementById(
        "modalLabel"
    );


const modalTitle =
    document.getElementById(
        "modalTitle"
    );


const modalContent =
    document.getElementById(
        "modalContent"
    );


const modalClose =
    document.getElementById(
        "modalClose"
    );


const nameModal =
    document.getElementById(
        "nameModal"
    );


const nameInput =
    document.getElementById(
        "nameInput"
    );


const closeNameModal =
    document.getElementById(
        "closeNameModal"
    );


const saveNameButton =
    document.getElementById(
        "saveNameButton"
    );


const xpPopup =
    document.getElementById(
        "xpPopup"
    );


const xpPopupText =
    document.getElementById(
        "xpPopupText"
    );


const modeTransition =
    document.getElementById(
        "modeTransition"
    );


const transitionIcon =
    document.getElementById(
        "transitionIcon"
    );


const transitionTitle =
    document.getElementById(
        "transitionTitle"
    );


// ==========================================================
// ECONOMY
// ==========================================================

function getCoins() {

    return parseInt(
        storage.getItem(
            "animalPartyCoins"
        )
        ||
        "0",
        10
    );

}


function setCoins(
    value
) {

    storage.setItem(
        "animalPartyCoins",
        String(
            Math.max(
                0,
                Number(value)
            )
        )
    );

}


function getDiamonds() {

    return parseInt(
        storage.getItem(
            "animalPartyDiamonds"
        )
        ||
        "0",
        10
    );

}


function setDiamonds(
    value
) {

    storage.setItem(
        "animalPartyDiamonds",
        String(
            Math.max(
                0,
                Number(value)
            )
        )
    );

}


// ==========================================================
// XP SYSTEM
// ==========================================================

function getXP() {

    return parseInt(
        storage.getItem(
            "playerXP"
        )
        ||
        "0",
        10
    );

}


function getLevel() {

    return (
        Math.floor(
            getXP() /
            XP_PER_LEVEL
        )
        +
        1
    );

}


function getCurrentLevelXP() {

    return (
        getXP() %
        XP_PER_LEVEL
    );

}


function addXP(
    amount,
    showPopup = true
) {

    const oldLevel =
        getLevel();


    const newXP =
        getXP()
        +
        amount;


    storage.setItem(
        "playerXP",
        String(
            newXP
        )
    );


    const newLevel =
        getLevel();


    renderLobby();


    if (
        showPopup
    ) {

        showXPPopup(
            "+"
            +
            amount
            +
            " XP ✨"
        );

    }


    if (
        newLevel >
        oldLevel
    ) {

        setTimeout(
            function() {

                showXPPopup(
                    "🎉 LEVEL "
                    +
                    newLevel
                    +
                    "!"
                );

            },
            900
        );

    }

}


// ==========================================================
// XP POPUP
// ==========================================================

let xpPopupTimer;


function showXPPopup(
    text
) {

    if (
        !xpPopup ||
        !xpPopupText
    ) {

        return;

    }


    clearTimeout(
        xpPopupTimer
    );


    xpPopupText.textContent =
        text;


    xpPopup.classList.add(
        "show"
    );


    xpPopupTimer =
        setTimeout(
            function() {

                xpPopup.classList.remove(
                    "show"
                );

            },
            1800
        );

}


// ==========================================================
// ACHIEVEMENT XP
// ==========================================================

function syncAchievementXP() {

    const wins =
        getJSON(
            "wonMiniGames"
        );


    const rewarded =
        getJSON(
            "rewardedAchievements"
        );


    let newAchievements =
        0;


    achievements.forEach(
        function(badge) {

            if (
                wins.includes(
                    badge.id
                )
                &&
                !rewarded.includes(
                    badge.id
                )
            ) {

                rewarded.push(
                    badge.id
                );


                newAchievements++;

            }

        }
    );


    setJSON(
        "rewardedAchievements",
        rewarded
    );


    if (
        newAchievements >
        0
    ) {

        addXP(
            newAchievements *
            XP_PER_ACHIEVEMENT,
            false
        );


        setTimeout(
            function() {

                showXPPopup(
                    "+"
                    +
                    (
                        newAchievements *
                        XP_PER_ACHIEVEMENT
                    )
                    +
                    " XP 🏆"
                );

            },
            400
        );

    }

}


// ==========================================================
// RENDER CHARACTER ACCESSORY
// ==========================================================

function renderAccessory() {

    if (
        !characterAccessory
    ) {

        return;

    }


    const equipped =
        storage.getItem(
            "equippedAccessory"
        );


    const item =
        accessories.find(
            function(accessory) {

                return (
                    accessory.id ===
                    equipped
                );

            }
        );


    characterAccessory.className =
        "character-accessory";


    if (
        !item
    ) {

        characterAccessory.textContent =
            "";

        return;

    }


    characterAccessory.textContent =
        item.icon;


    if (
        item.type ===
        "glasses"
    ) {

        characterAccessory.classList.add(
            "glasses"
        );

    }

}


// ==========================================================
// RENDER LOBBY
// ==========================================================

function renderLobby() {

    const level =
        getLevel();


    const currentXP =
        getCurrentLevelXP();


    const stars =
        parseInt(
            storage.getItem(
                "playerStars"
            )
            ||
            "0",
            10
        );


    if (profileIcon) {

        profileIcon.textContent =
            selectedIcon;

    }


    if (profileName) {

        profileName.textContent =
            playerDisplayName;

    }


    if (lobbyCharacter) {

        lobbyCharacter.textContent =
            selectedIcon;

    }


    if (profileLevel) {

        profileLevel.textContent =
            "LV. "
            +
            level;

    }


    if (xpText) {

        xpText.textContent =
            currentXP
            +
            " / "
            +
            XP_PER_LEVEL;

    }


    if (levelFill) {

        levelFill.style.width =
            (
                currentXP /
                XP_PER_LEVEL *
                100
            )
            +
            "%";

    }


    if (starCurrency) {

        starCurrency.textContent =
            stars;

    }


    if (coinCurrency) {

        coinCurrency.textContent =
            getCoins()
                .toLocaleString();

    }


    if (diamondCurrency) {

        diamondCurrency.textContent =
            getDiamonds()
                .toLocaleString();

    }


    renderAccessory();

}


// ==========================================================
// GENERIC MODAL
// ==========================================================

function openModal(
    icon,
    label,
    title,
    html
) {

    if (
        !modalOverlay
    ) {

        return;

    }


    modalIcon.textContent =
        icon;


    modalLabel.textContent =
        label;


    modalTitle.textContent =
        title;


    modalContent.innerHTML =
        html;


    modalOverlay.classList.add(
        "show"
    );

}


function closeModal() {

    modalOverlay.classList.remove(
        "show"
    );

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}


if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                modalOverlay
            ) {

                closeModal();

            }

        }
    );

}


// ==========================================================
// EDIT NAME
// ==========================================================

const editNameButton =
    document.getElementById(
        "editNameButton"
    );


if (editNameButton) {

    editNameButton.addEventListener(
        "click",
        function() {

            nameInput.value =
                playerDisplayName;


            nameModal.classList.add(
                "show"
            );


            setTimeout(
                function() {

                    nameInput.focus();

                },
                100
            );

        }
    );

}


if (closeNameModal) {

    closeNameModal.addEventListener(
        "click",
        function() {

            nameModal.classList.remove(
                "show"
            );

        }
    );

}


function savePlayerName() {

    let newName =
        nameInput
            .value
            .trim();


    if (
        !newName
    ) {

        return;

    }


    newName =
        newName.substring(
            0,
            16
        );


    playerDisplayName =
        newName;


    storage.setItem(
        "playerDisplayName",
        playerDisplayName
    );


    nameModal.classList.remove(
        "show"
    );


    renderLobby();

}


if (saveNameButton) {

    saveNameButton.addEventListener(
        "click",
        savePlayerName
    );

}


if (nameInput) {

    nameInput.addEventListener(
        "keydown",
        function(event) {

            if (
                event.key ===
                "Enter"
            ) {

                savePlayerName();

            }

        }
    );

}


// ==========================================================
// TODAY
// ==========================================================

function getToday() {

    const date =
        new Date();


    return (
        date.getFullYear()
        +
        "-"
        +
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        )
        +
        "-"
        +
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        )
    );

}


// ==========================================================
// DAILY REWARD
// ==========================================================

function openDailyReward() {

    let streak =
        parseInt(
            storage.getItem(
                "dailyRewardStreak"
            )
            ||
            "0",
            10
        );


    if (
        streak >=
        5
    ) {

        streak =
            0;

    }


    const claimedToday =
        storage.getItem(
            "dailyRewardLastClaim"
        ) ===
        getToday();


    let html =
        `<div class="daily-grid">`;


    dailyRewards.forEach(
        function(reward, index) {

            html +=
                `
                <div class="daily-day">

                    <small>
                        DAY ${index + 1}
                    </small>

                    <div style="
                        font-size:34px;
                        margin-top:7px;
                    ">
                        ${
                            index === 4
                                ?
                                "💎"
                                :
                                "🪙"
                        }
                    </div>

                    <strong>
                        ${reward.coins} 🪙
                    </strong>

                    ${
                        reward.diamonds > 0
                            ?
                            `
                            <strong>
                                +${reward.diamonds} 💎
                            </strong>
                            `
                            :
                            ""
                    }

                    <small>
                        +${XP_PER_DAILY} XP
                    </small>

                </div>
                `;

        }
    );


    html +=
        `
        </div>

        <button
            type="button"
            class="claim-button"
            id="claimDailyButton"
            ${
                claimedToday
                    ?
                    "disabled"
                    :
                    ""
            }
        >
            ${
                claimedToday
                    ?
                    "✅ CLAIMED TODAY"
                    :
                    "🎁 CLAIM DAY "
                    +
                    (streak + 1)
            }
        </button>
        `;


    openModal(
        "🎁",
        "ANIMAL PARTY",
        "DAILY REWARD",
        html
    );


    const button =
        document.getElementById(
            "claimDailyButton"
        );


    if (
        button &&
        !claimedToday
    ) {

        button.addEventListener(
            "click",
            claimDailyReward
        );

    }

}


function claimDailyReward() {

    if (
        storage.getItem(
            "dailyRewardLastClaim"
        ) ===
        getToday()
    ) {

        return;

    }


    let streak =
        parseInt(
            storage.getItem(
                "dailyRewardStreak"
            )
            ||
            "0",
            10
        );


    if (
        streak >=
        5
    ) {

        streak =
            0;

    }


    const reward =
        dailyRewards[
            streak
        ];


    setCoins(
        getCoins()
        +
        reward.coins
    );


    setDiamonds(
        getDiamonds()
        +
        reward.diamonds
    );


    storage.setItem(
        "dailyRewardStreak",
        String(
            streak + 1
        )
    );


    storage.setItem(
        "dailyRewardLastClaim",
        getToday()
    );


    addXP(
        XP_PER_DAILY
    );


    renderLobby();


    openDailyReward();

}


// ==========================================================
// SHOP
// ==========================================================

function openShop() {

    const owned =
        getJSON(
            "ownedAccessories"
        );


    let html =
        `<div class="shop-grid">`;


    accessories.forEach(
        function(item) {

            const isOwned =
                owned.includes(
                    item.id
                );


            html +=
                `
                <div class="shop-item">

                    <span>
                        ${item.icon}
                    </span>

                    <strong>
                        ${item.name}
                    </strong>

                    <small>
                        ${
                            isOwned
                                ?
                                "OWNED"
                                :
                                item.price
                                +
                                " 🪙"
                        }
                    </small>

                    <button
                        type="button"
                        class="buy-button"
                        data-buy="${item.id}"
                        ${
                            isOwned
                                ?
                                "disabled"
                                :
                                ""
                        }
                    >
                        ${
                            isOwned
                                ?
                                "✅ OWNED"
                                :
                                "BUY"
                        }
                    </button>

                </div>
                `;

        }
    );


    html +=
        `</div>`;


    openModal(
        "🛍️",
        "PARTY STORE",
        "SHOP",
        html
    );


    document
        .querySelectorAll(
            "[data-buy]"
        )
        .forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        buyAccessory(
                            button.dataset.buy
                        );

                    }
                );

            }
        );

}


function buyAccessory(
    itemId
) {

    const item =
        accessories.find(
            function(accessory) {

                return (
                    accessory.id ===
                    itemId
                );

            }
        );


    if (!item) {

        return;

    }


    const owned =
        getJSON(
            "ownedAccessories"
        );


    if (
        owned.includes(
            itemId
        )
    ) {

        return;

    }


    if (
        getCoins() <
        item.price
    ) {

        alert(
            "Not enough coins! 🪙"
        );

        return;

    }


    setCoins(
        getCoins()
        -
        item.price
    );


    owned.push(
        itemId
    );


    setJSON(
        "ownedAccessories",
        owned
    );


    renderLobby();


    openShop();

}


// ==========================================================
// INVENTORY
// ==========================================================

function openInventory() {

    const owned =
        getJSON(
            "ownedAccessories"
        );


    const equipped =
        storage.getItem(
            "equippedAccessory"
        );


    if (
        owned.length ===
        0
    ) {

        openModal(
            "🎒",
            "YOUR COLLECTION",
            "INVENTORY",
            `
            <div class="empty-screen">

                <span>
                    🎒
                </span>

                <h2>
                    YOUR BAG IS EMPTY
                </h2>

                <p>
                    Buy an accessory from the Shop first.
                </p>

            </div>
            `
        );


        return;

    }


    let html =
        `<div class="inventory-grid">`;


    accessories
        .filter(
            function(item) {

                return (
                    owned.includes(
                        item.id
                    )
                );

            }
        )
        .forEach(
            function(item) {

                const isEquipped =
                    equipped ===
                    item.id;


                html +=
                    `
                    <div class="inventory-item">

                        <span>
                            ${item.icon}
                        </span>

                        <strong>
                            ${item.name}
                        </strong>

                        <small>
                            ${
                                isEquipped
                                    ?
                                    "EQUIPPED"
                                    :
                                    "READY TO WEAR"
                            }
                        </small>

                        <button
                            type="button"
                            class="equip-button"
                            data-equip="${item.id}"
                        >
                            ${
                                isEquipped
                                    ?
                                    "REMOVE"
                                    :
                                    "EQUIP"
                            }
                        </button>

                    </div>
                    `;

            }
        );


    html +=
        `</div>`;


    openModal(
        "🎒",
        "YOUR COLLECTION",
        "INVENTORY",
        html
    );


    document
        .querySelectorAll(
            "[data-equip]"
        )
        .forEach(
            function(button) {

                button.addEventListener(
                    "click",
                    function() {

                        toggleAccessory(
                            button.dataset.equip
                        );

                    }
                );

            }
        );

}


function toggleAccessory(
    itemId
) {

    if (
        storage.getItem(
            "equippedAccessory"
        ) ===
        itemId
    ) {

        storage.removeItem(
            "equippedAccessory"
        );

    }

    else {

        storage.setItem(
            "equippedAccessory",
            itemId
        );

    }


    renderLobby();


    openInventory();

}


// ==========================================================
// ACHIEVEMENTS
// ==========================================================

function openAchievements() {

    syncAchievementXP();


    const wins =
        getJSON(
            "wonMiniGames"
        );


    let html =
        `<div class="achievement-grid">`;


    achievements.forEach(
        function(badge) {

            const unlocked =
                wins.includes(
                    badge.id
                );


            html +=
                `
                <div
                    class="achievement-item"
                    style="
                        opacity:
                        ${
                            unlocked
                                ?
                                "1"
                                :
                                ".55"
                        };
                    "
                >

                    <span>
                        ${
                            unlocked
                                ?
                                badge.icon
                                :
                                "🔒"
                        }
                    </span>

                    <strong>
                        ${badge.name}
                    </strong>

                    <small>
                        ${badge.description}
                    </small>

                    <small>
                        +${XP_PER_ACHIEVEMENT} XP
                    </small>

                </div>
                `;

        }
    );


    html +=
        `</div>`;


    openModal(
        "🏆",
        "YOUR COLLECTION",
        "ACHIEVEMENTS",
        html
    );

}


// ==========================================================
// FRIENDS
// ==========================================================

function openFriends() {

    openModal(
        "👥",
        "ANIMAL PARTY SOCIAL",
        "FRIENDS",
        `
        <div class="empty-screen">

            <span>
                🚧
            </span>

            <h2>
                COMING SOON
            </h2>

            <p>
                Friends, multiplayer and party invites
                are planned for a future Animal Party update.
            </p>

        </div>
        `
    );

}


// ==========================================================
// UPDATE CALENDAR
// ==========================================================

function openUpdateCalendar() {

    openModal(
        "📅",
        "ANIMAL PARTY",
        "UPDATE CALENDAR",
        `
        <div class="update-list">


            <div class="update-item latest">

                <div class="update-date">
                    LATEST UPDATE · AUG 22, 2026
                </div>

                <h3>
                    🏰 Party House Update
                </h3>

                <p>
                    New Party House lobby, editable player
                    name, XP system, Daily Reward, Shop,
                    Inventory, Badges and mode selection.
                </p>

                <span class="update-status">
                    LIVE
                </span>

            </div>


            <div class="update-item">

                <div class="update-date">
                    PREVIOUS UPDATE
                </div>

                <h3>
                    🎮 Minigame Expansion
                </h3>

                <p>
                    Added more minigames, difficulty filters,
                    game library and mobile improvements.
                </p>

                <span class="update-status">
                    RELEASED
                </span>

            </div>


            <div class="update-item">

                <div class="update-date">
                    PLANNED
                </div>

                <h3>
                    🏙️ Tycoon Mode
                </h3>

                <p>
                    A life simulation mode with money,
                    jobs, choices and long-term progression.
                </p>

                <span class="update-status">
                    IN DEVELOPMENT
                </span>

            </div>


            <div class="update-item">

                <div class="update-date">
                    FUTURE
                </div>

                <h3>
                    👥 Friends & Multiplayer
                </h3>

                <p>
                    Social features, friends and multiplayer
                    Party systems are planned.
                </p>

                <span class="update-status">
                    COMING SOON
                </span>

            </div>

        </div>


        <div class="social-section">

            <div class="social-card">

                <span>
                    📸
                </span>

                <strong>
                    INSTAGRAM
                </strong>

                <small>
                    @Sanndreann
                </small>

            </div>


            <div class="social-card">

                <span>
                    🎵
                </span>

                <strong>
                    TIKTOK
                </strong>

                <small>
                    @Sanndrean
                </small>

            </div>

        </div>
        `
    );

}


// ==========================================================
// SUGGESTION BOX
// ==========================================================

function openSuggestionBox() {

    openModal(
        "✉️",
        "ANIMAL PARTY COMMUNITY",
        "SEND A SUGGESTION",
        `
        <div class="suggestion-form">

            <label>
                SUGGESTION TYPE
            </label>

            <select
                class="suggestion-select"
                id="suggestionType"
            >

                <option value="minigame">
                    🎮 New Minigame
                </option>

                <option value="tycoon">
                    🏙️ Tycoon Idea
                </option>

                <option value="feature">
                    ✨ New Feature
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
                class="suggestion-input"
                id="suggestionTitle"
                maxlength="40"
                placeholder="Give your idea a title..."
            >


            <label>
                YOUR SUGGESTION
            </label>

            <textarea
                class="suggestion-textarea"
                id="suggestionMessage"
                maxlength="500"
                placeholder="Tell us your idea..."
            ></textarea>


            <button
                type="button"
                class="send-suggestion"
                id="sendSuggestionButton"
            >
                ✉️ SEND SUGGESTION
            </button>


            <div
                id="suggestionStatus"
                style="
                    min-height:16px;
                    margin-top:8px;
                    font-size:8px;
                    text-align:center;
                "
            ></div>

        </div>
        `
    );


    const sendButton =
        document.getElementById(
            "sendSuggestionButton"
        );


    if (sendButton) {

        sendButton.addEventListener(
            "click",
            saveSuggestion
        );

    }

}


// ==========================================================
// CONFETTI
// ==========================================================

function createConfetti() {

    const symbols =
        [
            "✨",
            "💖",
            "⭐",
            "🎉",
            "🌸",
            "💫"
        ];


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const confetti =
            document.createElement(
                "div"
            );


        confetti.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        confetti.style.position =
            "fixed";


        confetti.style.zIndex =
            "20000";


        confetti.style.left =
            Math.random() *
            100
            +
            "vw";


        confetti.style.top =
            "-40px";


        confetti.style.fontSize =
            (
                14
                +
                Math.random() *
                22
            )
            +
            "px";


        confetti.style.pointerEvents =
            "none";


        confetti.style.transition =
            `
            transform
            ${
                1.3 +
                Math.random()
            }s
            ease-in,
            opacity 1.8s
            ease
            `;


        document.body.appendChild(
            confetti
        );


        requestAnimationFrame(
            function() {

                confetti.style.transform =
                    `
                    translateY(
                        ${
                            window.innerHeight
                            +
                            100
                        }px
                    )
                    rotate(
                        ${
                            Math.random() *
                            700
                        }deg
                    )
                    `;


                confetti.style.opacity =
                    "0";

            }
        );


        setTimeout(
            function() {

                confetti.remove();

            },
            2400
        );

    }

}


// ==========================================================
// FIREBASE SUGGESTION
// ==========================================================

async function saveSuggestion() {

    const typeElement =
        document.getElementById(
            "suggestionType"
        );


    const titleElement =
        document.getElementById(
            "suggestionTitle"
        );


    const messageElement =
        document.getElementById(
            "suggestionMessage"
        );


    const sendButton =
        document.getElementById(
            "sendSuggestionButton"
        );


    const status =
        document.getElementById(
            "suggestionStatus"
        );


    if (
        !typeElement ||
        !titleElement ||
        !messageElement
    ) {

        return;

    }


    const type =
        typeElement.value;


    const title =
        titleElement.value.trim();


    const message =
        messageElement.value.trim();


    if (
        !title ||
        !message
    ) {

        if (status) {

            status.textContent =
                "Please fill in the title and suggestion.";

        }


        return;

    }


    if (sendButton) {

        sendButton.disabled =
            true;


        sendButton.textContent =
            "SENDING...";

    }


    if (status) {

        status.textContent =
            "Sending your suggestion...";

    }


    try {

        /*
         * Wait for firebase.js if it has an
         * initialization promise.
         */

        if (
            window.animalPartyFirebaseReady
        ) {

            await window
                .animalPartyFirebaseReady;

        }


        if (
            typeof
            window.sendAnimalPartySuggestion
            !==
            "function"
        ) {

            throw new Error(
                "Firebase is not ready. Open the game through localhost."
            );

        }


        const result =
            await window
                .sendAnimalPartySuggestion(
                    {

                        playerName:
                            playerDisplayName,

                        character:
                            selectedIcon,

                        type:
                            type,

                        title:
                            title,

                        message:
                            message,

                        playMode:
                            getPlayMode()

                    }
                );


        if (
            !result ||
            !result.success
        ) {

            throw (
                result &&
                result.error
                    ?
                    result.error
                    :
                    new Error(
                        "Suggestion failed."
                    )
            );

        }


        createConfetti();


        openModal(
            "💌",
            "THANK YOU!",
            "SUGGESTION SENT!",
            `
            <div class="empty-screen">

                <span>
                    💖
                </span>

                <h2>
                    THANK YOU!
                </h2>

                <p>
                    Your suggestion was sent successfully.
                    Thanks for helping improve Animal Party!
                </p>

            </div>
            `
        );

    }

    catch(error) {

        console.error(
            "❌ Suggestion error:",
            error
        );


        if (status) {

            status.textContent =
                "Could not send: "
                +
                (
                    error.message
                    ||
                    "unknown error"
                );

        }


        if (sendButton) {

            sendButton.disabled =
                false;


            sendButton.textContent =
                "✉️ SEND SUGGESTION";

        }

    }

}


// ==========================================================
// SETTINGS
// ==========================================================

function openSettings() {

    const audio =
        window.AnimalPartyAudio;


    const currentVolume =
        audio
            ?
            audio.getVolume()
            :
            0.35;


    const muted =
        audio
            ?
            audio.isMuted()
            :
            false;


    openModal(
        "⚙️",
        "ANIMAL PARTY",
        "SETTINGS",
        `
        <div class="settings-list">


            <div class="
                setting-row
                volume-setting
            ">

                <div class="setting-name">

                    <strong>
                        🎵 MUSIC VOLUME
                    </strong>

                    <small>
                        Background music volume
                    </small>

                </div>


                <input
                    type="range"
                    class="volume-slider"
                    id="musicVolumeSlider"
                    min="0"
                    max="100"
                    step="1"
                    value="${
                        Math.round(
                            currentVolume *
                            100
                        )
                    }"
                >


                <div
                    class="volume-number"
                    id="volumeNumber"
                >
                    ${
                        Math.round(
                            currentVolume *
                            100
                        )
                    }%
                </div>

            </div>



            <div class="setting-row">

                <div class="setting-name">

                    <strong>
                        🔊 BACKGROUND MUSIC
                    </strong>

                    <small>
                        Turn lobby music on or off
                    </small>

                </div>


                <button
                    type="button"
                    id="musicToggle"
                    class="
                        setting-toggle
                        ${
                            !muted
                                ?
                                "on"
                                :
                                ""
                        }
                    "
                >
                    ${
                        muted
                            ?
                            "OFF"
                            :
                            "ON"
                    }
                </button>

            </div>



            <div class="setting-row">

                <div class="setting-name">

                    <strong>
                        ▶ MUSIC TEST
                    </strong>

                    <small>
                        Press if music has not started
                    </small>

                </div>


                <button
                    type="button"
                    id="musicTestButton"
                    class="
                        setting-toggle
                        on
                    "
                >
                    PLAY
                </button>

            </div>



            <div class="setting-row">

                <div class="setting-name">

                    <strong>
                        💾 SAVE MODE
                    </strong>

                    <small>
                        ${
                            getPlayMode() ===
                            "guest"
                                ?
                                "Guest progress is temporary"
                                :
                                "Player progress is saved"
                        }
                    </small>

                </div>


                <div style="
                    font-size:30px;
                ">
                    ${
                        getPlayMode() ===
                        "guest"
                            ?
                            "👤"
                            :
                            "☁️"
                    }
                </div>

            </div>

        </div>
        `
    );


    const slider =
        document.getElementById(
            "musicVolumeSlider"
        );


    const number =
        document.getElementById(
            "volumeNumber"
        );


    const toggle =
        document.getElementById(
            "musicToggle"
        );


    const test =
        document.getElementById(
            "musicTestButton"
        );


    if (slider) {

        slider.addEventListener(
            "input",
            function() {

                const value =
                    Number(
                        slider.value
                    );


                if (number) {

                    number.textContent =
                        value
                        +
                        "%";

                }


                if (
                    window.AnimalPartyAudio
                ) {

                    window
                        .AnimalPartyAudio
                        .setVolume(
                            value /
                            100
                        );

                }

            }
        );

    }


    if (toggle) {

        toggle.addEventListener(
            "click",
            function() {

                if (
                    !window.AnimalPartyAudio
                ) {

                    return;

                }


                const nowMuted =
                    window
                        .AnimalPartyAudio
                        .toggleMute();


                toggle.textContent =
                    nowMuted
                        ?
                        "OFF"
                        :
                        "ON";


                toggle.classList.toggle(
                    "on",
                    !nowMuted
                );

            }
        );

    }


    if (test) {

        test.addEventListener(
            "click",
            async function() {

                if (
                    !window.AnimalPartyAudio
                ) {

                    test.textContent =
                        "NO AUDIO";

                    return;

                }


                try {

                    await window
                        .AnimalPartyAudio
                        .play();


                    test.textContent =
                        "PLAYING ✓";

                }

                catch(error) {

                    test.textContent =
                        "FAILED";

                }

            }
        );

    }

}


// ==========================================================
// GAME MODE
// ==========================================================

let switchingMode =
    false;


// ==========================================================
// MINIGAMES
// ==========================================================

function enterMinigames() {

    if (
        switchingMode
    ) {

        return;

    }


    switchingMode =
        true;


    transitionIcon.textContent =
        "🎯";


    transitionTitle.textContent =
        "MINIGAMES";


    modeTransition.classList.add(
        "show"
    );


    setTimeout(
        function() {

            window.location.href =
                "home.html";

        },
        1000
    );

}


// ==========================================================
// TYCOON COMING SOON
// ==========================================================

function openTycoonComingSoon() {

    openModal(
        "🏰",
        "LIFE MODE",
        "TYCOON",
        `
        <div class="empty-screen">

            <span>
                🚧
            </span>

            <h2>
                COMING SOON
            </h2>

            <p>
                Tycoon Mode is currently in development.
                Build your life, earn money and make
                choices in a future Animal Party update!
            </p>

        </div>
        `
    );

}


// ==========================================================
// MAIN BUTTON BINDINGS
// ==========================================================

function bindButton(
    id,
    callback
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.addEventListener(
            "click",
            callback
        );

    }

}


// DAILY

bindButton(
    "dailyButton",
    openDailyReward
);


bindButton(
    "dailyQuickButton",
    openDailyReward
);


// SHOP

bindButton(
    "shopButton",
    openShop
);


bindButton(
    "shopQuickButton",
    openShop
);


// INVENTORY

bindButton(
    "inventoryButton",
    openInventory
);


// BADGES

bindButton(
    "badgesButton",
    openAchievements
);


bindButton(
    "badgesQuickButton",
    openAchievements
);


// FRIENDS

bindButton(
    "friendsButton",
    openFriends
);


bindButton(
    "friendsQuickButton",
    openFriends
);


bindButton(
    "friendsTopButton",
    openFriends
);


// TOP BUTTONS

bindButton(
    "calendarButton",
    openUpdateCalendar
);


bindButton(
    "suggestionButton",
    openSuggestionBox
);


bindButton(
    "settingsButton",
    openSettings
);


// GAME MODE

bindButton(
    "minigamesButton",
    enterMinigames
);


bindButton(
    "tycoonButton",
    openTycoonComingSoon
);


// LOBBY BUTTON

bindButton(
    "lobbyButton",
    function() {

        renderLobby();

    }
);


// ==========================================================
// CLOSE NAME MODAL BY BACKGROUND
// ==========================================================

if (nameModal) {

    nameModal.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                nameModal
            ) {

                nameModal.classList.remove(
                    "show"
                );

            }

        }
    );

}


// ==========================================================
// ESC KEY
// ==========================================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key !==
            "Escape"
        ) {

            return;

        }


        modalOverlay.classList.remove(
            "show"
        );


        nameModal.classList.remove(
            "show"
        );

    }
);


// ==========================================================
// INITIALIZE
// ==========================================================

syncAchievementXP();


renderLobby();


console.log(
    "🏰 Animal Party Lobby ready"
);


console.log(
    "🐾 Character:",
    selectedCharacter,
    selectedIcon
);


console.log(
    "💾 Mode:",
    getPlayMode()
);


console.log(
    "🪙 Coins:",
    getCoins()
);


console.log(
    "💎 Diamonds:",
    getDiamonds()
);