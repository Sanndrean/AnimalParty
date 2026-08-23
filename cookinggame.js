// ==========================================================
// ANIMAL PARTY
// KITCHEN RUSH - HARD
// ==========================================================


// ==========================================================
// SETTINGS
// ==========================================================

const TOTAL_TIME = 60;

const CUSTOMER_TIME = 15;

const CUSTOMERS_TO_WIN = 5;

const COOK_TIME = 1500;



// ==========================================================
// INGREDIENT DATA
// ==========================================================

const ingredients = {

    bun: {
        icon: "🍞",
        cookedIcon: "🍞",
        requiresCooking: false
    },

    patty: {
        icon: "🥩",
        cookedIcon: "🍖",
        requiresCooking: true
    },

    lettuce: {
        icon: "🥬",
        cookedIcon: "🥬",
        requiresCooking: false
    },

    tomato: {
        icon: "🍅",
        cookedIcon: "🍅",
        requiresCooking: false
    },

    cheese: {
        icon: "🧀",
        cookedIcon: "🧀",
        requiresCooking: false
    },

    fish: {
        icon: "🐟",
        cookedIcon: "🍣",
        requiresCooking: true
    },

    egg: {
        icon: "🍳",
        cookedIcon: "🍳",
        requiresCooking: false
    },

    avocado: {
        icon: "🥑",
        cookedIcon: "🥑",
        requiresCooking: false
    }

};



// ==========================================================
// RECIPES
// ==========================================================

const recipes = [

    {
        name: "CHEESE BURGER",

        display:
            "🍞 🍖 🧀 🥬",

        ingredients: [
            "bun",
            "patty",
            "cheese",
            "lettuce"
        ]
    },


    {
        name: "CLASSIC BURGER",

        display:
            "🍞 🍖 🍅 🥬",

        ingredients: [
            "bun",
            "patty",
            "tomato",
            "lettuce"
        ]
    },


    {
        name: "FISH PLATE",

        display:
            "🍣 🥬 🍅",

        ingredients: [
            "fish",
            "lettuce",
            "tomato"
        ]
    },


    {
        name: "AVOCADO BREAKFAST",

        display:
            "🍞 🍳 🥑",

        ingredients: [
            "bun",
            "egg",
            "avocado"
        ]
    },


    {
        name: "FRESH SALAD",

        display:
            "🥬 🍅 🧀 🥑",

        ingredients: [
            "lettuce",
            "tomato",
            "cheese",
            "avocado"
        ]
    }

];



// ==========================================================
// CUSTOMERS
// ==========================================================

const customers = [

    {
        icon: "🐼",
        name: "PANDA"
    },

    {
        icon: "🐰",
        name: "BUNNY"
    },

    {
        icon: "🐻",
        name: "BEAR"
    },

    {
        icon: "🐸",
        name: "FROGGY"
    },

    {
        icon: "🐯",
        name: "TIGER"
    },

    {
        icon: "🦊",
        name: "FOXY"
    },

    {
        icon: "🐨",
        name: "KOALA"
    },

    {
        icon: "🐶",
        name: "DOGGY"
    },

    {
        icon: "🐷",
        name: "PIGGY"
    }

];



// ==========================================================
// DOM
// ==========================================================

const instructionOverlay =
    document.getElementById(
        "instructionOverlay"
    );


const readyButton =
    document.getElementById(
        "readyButton"
    );


const countdownOverlay =
    document.getElementById(
        "countdownOverlay"
    );


const countdownNumber =
    document.getElementById(
        "countdownNumber"
    );


const gameTimer =
    document.getElementById(
        "gameTimer"
    );


const servedCount =
    document.getElementById(
        "servedCount"
    );


const customerZone =
    document.getElementById(
        "customerZone"
    );


const customer =
    document.getElementById(
        "customer"
    );


const customerName =
    document.getElementById(
        "customerName"
    );


const orderIcons =
    document.getElementById(
        "orderIcons"
    );


const orderName =
    document.getElementById(
        "orderName"
    );


const customerTimerText =
    document.getElementById(
        "customerTimerText"
    );


const patienceFill =
    document.getElementById(
        "patienceFill"
    );


const ingredientButtons =
    document.querySelectorAll(
        ".ingredient"
    );


const trashButton =
    document.getElementById(
        "trashButton"
    );


const plate =
    document.getElementById(
        "plate"
    );


const plateFood =
    document.getElementById(
        "plateFood"
    );


const plateStatus =
    document.getElementById(
        "plateStatus"
    );


const gameMessage =
    document.getElementById(
        "gameMessage"
    );


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
// STOVE ELEMENTS
// ==========================================================

const stoveElements = [

    document.getElementById(
        "stove1"
    ),

    document.getElementById(
        "stove2"
    )

];


const stoveFoodElements = [

    document.getElementById(
        "stoveFood1"
    ),

    document.getElementById(
        "stoveFood2"
    )

];


const stoveFillElements = [

    document.getElementById(
        "cookFill1"
    ),

    document.getElementById(
        "cookFill2"
    )

];


const stoveStatusElements = [

    document.getElementById(
        "stoveStatus1"
    ),

    document.getElementById(
        "stoveStatus2"
    )

];



// ==========================================================
// GAME STATE
// ==========================================================

let gameRunning =
    false;


let totalTimeLeft =
    TOTAL_TIME;


let customerTimeLeft =
    CUSTOMER_TIME;


let served =
    0;


let currentRecipe =
    null;


let currentCustomer =
    null;


let plateIngredients =
    [];


let totalTimerInterval =
    null;


let customerTimerInterval =
    null;


let lastRecipeName =
    "";


let lastCustomerName =
    "";



// ==========================================================
// STOVE STATE
// ==========================================================

const stoves = [

    {
        ingredient: null,
        state: "empty",
        timeout: null
    },

    {
        ingredient: null,
        state: "empty",
        timeout: null
    }

];



// ==========================================================
// HELPERS
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



function randomFrom(
    array
) {

    return array[
        Math.floor(
            Math.random()
            *
            array.length
        )
    ];

}



// ==========================================================
// MESSAGE
// ==========================================================

function showMessage(
    text,
    type = ""
) {

    gameMessage.textContent =
        text;


    gameMessage.className =
        "game-message";


    if (type) {

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

async function startCountdown() {

    countdownOverlay.classList.add(
        "show"
    );


    const values =
        [
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
                650
            );

        }

        else {

            await wait(
                800
            );

        }

    }


    countdownOverlay.classList.remove(
        "show"
    );

}



// ==========================================================
// PICK RECIPE
// ==========================================================

function chooseRecipe() {

    let available =
        recipes.filter(
            function(recipe) {

                return (
                    recipe.name !==
                    lastRecipeName
                );

            }
        );


    if (
        available.length ===
        0
    ) {

        available =
            recipes;

    }


    const recipe =
        randomFrom(
            available
        );


    lastRecipeName =
        recipe.name;


    return recipe;

}



// ==========================================================
// PICK CUSTOMER
// ==========================================================

function chooseCustomer() {

    let available =
        customers.filter(
            function(person) {

                return (
                    person.name !==
                    lastCustomerName
                );

            }
        );


    if (
        available.length ===
        0
    ) {

        available =
            customers;

    }


    const person =
        randomFrom(
            available
        );


    lastCustomerName =
        person.name;


    return person;

}



// ==========================================================
// NEW CUSTOMER
// ==========================================================

async function newCustomer() {

    if (
        !gameRunning
    ) {

        return;

    }


    resetPlate();


    currentRecipe =
        chooseRecipe();


    currentCustomer =
        chooseCustomer();


    customerZone.style.opacity =
        "0";


    customerZone.style.transform =
        "translateX(-50%) translateY(-18px)";


    await wait(
        170
    );


    if (
        !gameRunning
    ) {

        return;

    }


    customer.textContent =
        currentCustomer.icon;


    customerName.textContent =
        currentCustomer.name;


    orderIcons.textContent =
        currentRecipe.display;


    orderName.textContent =
        currentRecipe.name;


    customerTimeLeft =
        CUSTOMER_TIME;


    updatePatienceUI();


    customerZone.style.opacity =
        "1";


    customerZone.style.transform =
        "translateX(-50%) translateY(0)";


    startCustomerTimer();


    showMessage(
        "🧾 NEW ORDER!"
    );

}



// ==========================================================
// TOTAL TIMER
// ==========================================================

function startTotalTimer() {

    clearInterval(
        totalTimerInterval
    );


    totalTimerInterval =
        setInterval(
            function() {

                if (
                    !gameRunning
                ) {

                    return;

                }


                totalTimeLeft--;


                if (
                    totalTimeLeft <
                    0
                ) {

                    totalTimeLeft =
                        0;

                }


                gameTimer.textContent =
                    totalTimeLeft;


                if (
                    totalTimeLeft <=
                    0
                ) {

                    loseGame(
                        "Time's up! You didn't serve 5 customers."
                    );

                }

            },
            1000
        );

}



// ==========================================================
// CUSTOMER TIMER
// ==========================================================

function startCustomerTimer() {

    clearInterval(
        customerTimerInterval
    );


    customerTimerInterval =
        setInterval(
            function() {

                if (
                    !gameRunning
                ) {

                    return;

                }


                customerTimeLeft -=
                    0.1;


                if (
                    customerTimeLeft <
                    0
                ) {

                    customerTimeLeft =
                        0;

                }


                updatePatienceUI();


                if (
                    customerTimeLeft <=
                    0
                ) {

                    clearInterval(
                        customerTimerInterval
                    );


                    customerLeaves();

                }

            },
            100
        );

}



// ==========================================================
// PATIENCE UI
// ==========================================================

function updatePatienceUI() {

    customerTimerText.textContent =
        Math.ceil(
            customerTimeLeft
        )
        +
        "s";


    const percent =
        Math.max(
            0,
            customerTimeLeft /
            CUSTOMER_TIME *
            100
        );


    patienceFill.style.width =
        percent
        +
        "%";


    if (
        percent >
        55
    ) {

        patienceFill.style.background =
            "#54dc78";

    }

    else if (
        percent >
        25
    ) {

        patienceFill.style.background =
            "#ffc13d";

    }

    else {

        patienceFill.style.background =
            "#ed4f5d";

    }

}



// ==========================================================
// CUSTOMER LEAVES
// ==========================================================

async function customerLeaves() {

    if (
        !gameRunning
    ) {

        return;

    }


    showMessage(
        "😡 CUSTOMER LEFT!",
        "bad"
    );


    customer.textContent =
        "😡";


    customerZone.style.transform =
        "translateX(-50%) translateX(50px)";


    await wait(
        500
    );


    if (
        gameRunning
    ) {

        newCustomer();

    }

}



// ==========================================================
// INGREDIENT CLICK
// ==========================================================

ingredientButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                if (
                    !gameRunning
                ) {

                    return;

                }


                const ingredientName =
                    button.dataset.ingredient;


                const data =
                    ingredients[
                        ingredientName
                    ];


                if (
                    !data
                ) {

                    return;

                }


                if (
                    data.requiresCooking
                ) {

                    putOnStove(
                        ingredientName
                    );


                    return;

                }


                addIngredientToPlate(
                    ingredientName
                );

            }
        );

    }
);



// ==========================================================
// STOVE
// ==========================================================

function putOnStove(
    ingredientName
) {

    const stoveIndex =
        stoves.findIndex(
            function(stove) {

                return (
                    stove.state ===
                    "empty"
                );

            }
        );


    if (
        stoveIndex ===
        -1
    ) {

        showMessage(
            "🔥 BOTH STOVES ARE BUSY!",
            "bad"
        );


        return;

    }


    startCooking(
        stoveIndex,
        ingredientName
    );

}



// ==========================================================
// START COOKING
// ==========================================================

function startCooking(
    stoveIndex,
    ingredientName
) {

    const stove =
        stoves[
            stoveIndex
        ];


    const data =
        ingredients[
            ingredientName
        ];


    stove.ingredient =
        ingredientName;


    stove.state =
        "cooking";


    stoveElements[
        stoveIndex
    ].classList.remove(
        "ready"
    );


    stoveElements[
        stoveIndex
    ].classList.add(
        "cooking"
    );


    stoveFoodElements[
        stoveIndex
    ].textContent =
        data.icon;


    stoveStatusElements[
        stoveIndex
    ].textContent =
        "COOKING...";


    const fill =
        stoveFillElements[
            stoveIndex
        ];


    fill.style.transition =
        "none";


    fill.style.width =
        "0%";


    void fill.offsetWidth;


    fill.style.transition =
        `width ${COOK_TIME}ms linear`;


    fill.style.width =
        "100%";


    stove.timeout =
        setTimeout(
            function() {

                finishCooking(
                    stoveIndex
                );

            },
            COOK_TIME
        );

}



// ==========================================================
// FINISH COOKING
// ==========================================================

function finishCooking(
    stoveIndex
) {

    const stove =
        stoves[
            stoveIndex
        ];


    if (
        stove.state !==
        "cooking"
    ) {

        return;

    }


    stove.state =
        "ready";


    const data =
        ingredients[
            stove.ingredient
        ];


    stoveFoodElements[
        stoveIndex
    ].textContent =
        data.cookedIcon;


    stoveStatusElements[
        stoveIndex
    ].textContent =
        "READY! TAP ME";


    stoveElements[
        stoveIndex
    ].classList.remove(
        "cooking"
    );


    stoveElements[
        stoveIndex
    ].classList.add(
        "ready"
    );


    showMessage(
        `✅ STOVE ${stoveIndex + 1} READY!`,
        "good"
    );

}



// ==========================================================
// STOVE CLICK
// ==========================================================

stoveElements.forEach(
    function(
        stoveElement,
        stoveIndex
    ) {

        stoveElement.addEventListener(
            "click",
            function() {

                if (
                    !gameRunning
                ) {

                    return;

                }


                const stove =
                    stoves[
                        stoveIndex
                    ];


                if (
                    stove.state ===
                    "empty"
                ) {

                    showMessage(
                        "🍳 STOVE IS EMPTY!"
                    );


                    return;

                }


                if (
                    stove.state ===
                    "cooking"
                ) {

                    showMessage(
                        "🔥 STILL COOKING!"
                    );


                    return;

                }


                if (
                    stove.state ===
                    "ready"
                ) {

                    takeFoodFromStove(
                        stoveIndex
                    );

                }

            }
        );

    }
);



// ==========================================================
// TAKE STOVE FOOD
// ==========================================================

function takeFoodFromStove(
    stoveIndex
) {

    const stove =
        stoves[
            stoveIndex
        ];


    const ingredientName =
        stove.ingredient;


    if (
        !ingredientName
    ) {

        return;

    }


    const added =
        addIngredientToPlate(
            ingredientName
        );


    if (
        !added
    ) {

        return;

    }


    clearStove(
        stoveIndex
    );


    showMessage(
        "🍽️ ADDED TO PLATE!",
        "good"
    );

}



// ==========================================================
// CLEAR STOVE
// ==========================================================

function clearStove(
    stoveIndex
) {

    const stove =
        stoves[
            stoveIndex
        ];


    if (
        stove.timeout
    ) {

        clearTimeout(
            stove.timeout
        );

    }


    stove.ingredient =
        null;


    stove.state =
        "empty";


    stove.timeout =
        null;


    stoveElements[
        stoveIndex
    ].classList.remove(
        "cooking",
        "ready"
    );


    stoveFoodElements[
        stoveIndex
    ].textContent =
        "";


    stoveStatusElements[
        stoveIndex
    ].textContent =
        "EMPTY";


    stoveFillElements[
        stoveIndex
    ].style.transition =
        "none";


    stoveFillElements[
        stoveIndex
    ].style.width =
        "0%";

}



// ==========================================================
// RESET STOVES
// ==========================================================

function resetStoves() {

    clearStove(
        0
    );


    clearStove(
        1
    );

}



// ==========================================================
// ADD TO PLATE
// ==========================================================

function addIngredientToPlate(
    ingredientName
) {

    if (
        !gameRunning
    ) {

        return false;

    }


    if (
        plateIngredients.includes(
            ingredientName
        )
    ) {

        showMessage(
            "⚠️ ALREADY ON PLATE!",
            "bad"
        );


        return false;

    }


    plateIngredients.push(
        ingredientName
    );


    renderPlate();


    return true;

}



// ==========================================================
// CLEAR PLATE
// ==========================================================

trashButton.addEventListener(
    "click",
    function() {

        if (
            !gameRunning
        ) {

            return;

        }


        if (
            plateIngredients.length ===
            0
        ) {

            showMessage(
                "🗑️ PLATE IS ALREADY EMPTY!"
            );


            return;

        }


        plateIngredients =
            [];


        renderPlate();


        showMessage(
            "🗑️ PLATE CLEARED!"
        );

    }
);



// ==========================================================
// RENDER PLATE
// ==========================================================

function renderPlate() {

    plateFood.innerHTML =
        "";


    plateIngredients.forEach(
        function(
            ingredientName
        ) {

            const data =
                ingredients[
                    ingredientName
                ];


            const food =
                document.createElement(
                    "span"
                );


            food.textContent =
                data.requiresCooking
                ?
                data.cookedIcon
                :
                data.icon;


            plateFood.appendChild(
                food
            );

        }
    );


    if (
        plateIngredients.length ===
        0
    ) {

        plateStatus.textContent =
            "ADD INGREDIENTS";


        plate.classList.remove(
            "ready"
        );


        return;

    }


    if (
        isPlateCorrect()
    ) {

        plateStatus.textContent =
            "READY TO SERVE!";


        plate.classList.add(
            "ready"
        );

    }

    else {

        plateStatus.textContent =
            "KEEP COOKING...";


        plate.classList.remove(
            "ready"
        );

    }

}



// ==========================================================
// CHECK ORDER
// ==========================================================

function isPlateCorrect() {

    if (
        !currentRecipe
    ) {

        return false;

    }


    if (
        plateIngredients.length !==
        currentRecipe.ingredients.length
    ) {

        return false;

    }


    const plateSorted =
        [
            ...plateIngredients
        ].sort();


    const recipeSorted =
        [
            ...currentRecipe.ingredients
        ].sort();


    return plateSorted.every(
        function(
            ingredient,
            index
        ) {

            return (
                ingredient ===
                recipeSorted[
                    index
                ]
            );

        }
    );

}



// ==========================================================
// RESET PLATE
// ==========================================================

function resetPlate() {

    plateIngredients =
        [];


    plate.classList.remove(
        "ready"
    );


    renderPlate();

}



// ==========================================================
// PLATE DRAG
// ==========================================================

let draggingPlate =
    false;


let originalPlateParent =
    null;


let originalPlateNextSibling =
    null;



plate.addEventListener(
    "pointerdown",
    function(event) {

        if (
            !gameRunning
        ) {

            return;

        }


        if (
            plateIngredients.length ===
            0
        ) {

            showMessage(
                "🍽️ PLATE IS EMPTY!",
                "bad"
            );


            return;

        }


        draggingPlate =
            true;


        originalPlateParent =
            plate.parentElement;


        originalPlateNextSibling =
            plate.nextSibling;


        document.body.appendChild(
            plate
        );


        plate.classList.add(
            "dragging"
        );


        movePlate(
            event.clientX,
            event.clientY
        );


        try {

            plate.setPointerCapture(
                event.pointerId
            );

        }

        catch (error) {

        }

    }
);



// ==========================================================
// MOVE PLATE
// ==========================================================

plate.addEventListener(
    "pointermove",
    function(event) {

        if (
            !draggingPlate
        ) {

            return;

        }


        movePlate(
            event.clientX,
            event.clientY
        );

    }
);


function movePlate(
    x,
    y
) {

    plate.style.left =
        x
        +
        "px";


    plate.style.top =
        y
        +
        "px";

}



// ==========================================================
// DROP PLATE
// ==========================================================

plate.addEventListener(
    "pointerup",
    function(event) {

        if (
            !draggingPlate
        ) {

            return;

        }


        draggingPlate =
            false;


        const customerRect =
            customerZone
                .getBoundingClientRect();


        const droppedOnCustomer =

            event.clientX >=
            customerRect.left

            &&

            event.clientX <=
            customerRect.right

            &&

            event.clientY >=
            customerRect.top

            &&

            event.clientY <=
            customerRect.bottom;


        restorePlate();


        if (
            droppedOnCustomer
        ) {

            attemptServe();

        }

    }
);


plate.addEventListener(
    "pointercancel",
    function() {

        if (
            !draggingPlate
        ) {

            return;

        }


        draggingPlate =
            false;


        restorePlate();

    }
);



// ==========================================================
// RESTORE PLATE
// ==========================================================

function restorePlate() {

    plate.classList.remove(
        "dragging"
    );


    plate.style.left =
        "";


    plate.style.top =
        "";


    if (
        !originalPlateParent
    ) {

        return;

    }


    if (
        originalPlateNextSibling
    ) {

        originalPlateParent.insertBefore(
            plate,
            originalPlateNextSibling
        );

    }

    else {

        originalPlateParent.appendChild(
            plate
        );

    }

}



// ==========================================================
// SERVE
// ==========================================================

async function attemptServe() {

    if (
        !gameRunning
    ) {

        return;

    }


    if (
        !isPlateCorrect()
    ) {

        showMessage(
            "❌ WRONG ORDER!",
            "bad"
        );


        const oldIcon =
            currentCustomer.icon;


        customer.textContent =
            "😕";


        await wait(
            450
        );


        if (
            gameRunning
        ) {

            customer.textContent =
                oldIcon;

        }


        return;

    }


    clearInterval(
        customerTimerInterval
    );


    served++;


    servedCount.textContent =
        served;


    customer.textContent =
        "😋";


    showMessage(
        `✨ SERVED! ${served}/5`,
        "good"
    );


    resetPlate();


    if (
        served >=
        CUSTOMERS_TO_WIN
    ) {

        await wait(
            500
        );


        winGame();


        return;

    }


    await wait(
        420
    );


    if (
        gameRunning
    ) {

        newCustomer();

    }

}



// ==========================================================
// START GAME
// ==========================================================

async function startGame() {

    instructionOverlay.classList.remove(
        "show"
    );


    totalTimeLeft =
        TOTAL_TIME;


    customerTimeLeft =
        CUSTOMER_TIME;


    served =
        0;


    gameTimer.textContent =
        TOTAL_TIME;


    servedCount.textContent =
        "0";


    resetPlate();


    resetStoves();


    /*
     * Game does NOT start yet.
     * Countdown first.
     */

    await startCountdown();


    gameRunning =
        true;


    startTotalTimer();


    newCustomer();

}



// ==========================================================
// STOP
// ==========================================================

function stopGameTimers() {

    clearInterval(
        totalTimerInterval
    );


    clearInterval(
        customerTimerInterval
    );


    stoves.forEach(
        function(stove) {

            if (
                stove.timeout
            ) {

                clearTimeout(
                    stove.timeout
                );

            }

        }
    );

}



// ==========================================================
// WIN
// ==========================================================

function winGame() {

    if (
        !gameRunning
    ) {

        return;

    }


    gameRunning =
        false;


    stopGameTimers();


    sessionStorage.setItem(
        "justWon",
        "true"
    );


    giveStar();


    resultCard.classList.remove(
        "lost"
    );


    resultIcon.textContent =
        "⭐";


    resultLabel.textContent =
        "KITCHEN COMPLETE";


    resultTitle.textContent =
        "YOU WON!";


    resultDescription.textContent =
        "Amazing! You served all 5 customers before time ran out!";


    starReward.style.display =
        "inline-block";


    resultOverlay.classList.add(
        "show"
    );

}



// ==========================================================
// LOSE
// ==========================================================

function loseGame(
    reason
) {

    if (
        !gameRunning
    ) {

        return;

    }


    gameRunning =
        false;


    stopGameTimers();


    resultCard.classList.add(
        "lost"
    );


    resultIcon.textContent =
        "💥";


    resultLabel.textContent =
        "KITCHEN CLOSED";


    resultTitle.textContent =
        "YOU LOST";


    resultDescription.textContent =
        reason;


    starReward.style.display =
        "none";


    resultOverlay.classList.add(
        "show"
    );

}



// ==========================================================
// STAR
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
// BUTTONS
// ==========================================================

readyButton.addEventListener(
    "click",
    function() {

        startGame();

    }
);


resultButton.addEventListener(
    "click",
    function() {

        window.location.href =
            "home.html";

    }
);



// ==========================================================
// PREVENT DEFAULT DRAG
// ==========================================================

document.addEventListener(
    "dragstart",
    function(event) {

        event.preventDefault();

    }
);



// ==========================================================
// INITIAL
// ==========================================================

gameTimer.textContent =
    TOTAL_TIME;


servedCount.textContent =
    "0";


renderPlate();


resetStoves();