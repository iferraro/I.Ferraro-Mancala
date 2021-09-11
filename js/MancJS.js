/*----- constants -----*/
const stores = {
    player: document.querySelector("#playerStore"),
    computer: document.querySelector("#compStore")
}

/*----- app's state (variables) -----*/
let scores;
// let playerTurn;
// let computerTurn;

/*----- cached element references -----*/
const pits = {
    one: document.querySelector("#one"),
    two: document.querySelector("#two"),
    three: document.querySelector("#three"),
    four: document.querySelector("#four"),
    five: document.querySelector("#five"),
    six: document.querySelector("#six"),
    seven: document.querySelector("#seven"),
    eight: document.querySelector("#eight"),
    nine: document.querySelector("#nine"),
    ten: document.querySelector("#ten"),
    eleven: document.querySelector("#eleven"),
    twelve: document.querySelector("#twelve")
}

const pitOpposites = {
    one: pits.seven,
    two: pits.eight,
    three: pits.nine,
    four: pits.ten,
    five: pits.eleven,
    six: pits.twelve,
    seven: pits.one,
    eight: pits.two,
    nine: pits.three,
    ten: pits.four,
    eleven: pits.five,
    twelve: pits.six
}

const availableToPlayer = [
    pits.one, 
    pits.two, 
    pits.three,
    pits.four,
    pits.five,
    pits.six,
    stores.player,
    pits.twelve,
    pits.eleven,
    pits.ten,
    pits.nine,
    pits.eight,
    pits.seven,
]

const availableToComputer = [
    pits.one, 
    pits.two, 
    pits.three,
    pits.four,
    pits.five,
    pits.six,
    pits.twelve,
    pits.eleven,
    pits.ten,
    pits.nine,
    pits.eight,
    pits.seven,
    stores.computer,
]

const playerSide = availableToPlayer.slice(0, 6);
const computerSide = availableToComputer.slice(6, 12);

/*----- event listeners -----*/
const allPits = document.querySelectorAll(".pit");
// allPits.forEach(function(pit) {
//     pit.addEventListener("mouseenter", function() {
//         this.style.height = "175px";
//     });
//     pit.addEventListener("mouseleave", function() {
//         this.style.height = "125px";
//     });
// });

const allStores = document.querySelectorAll(".store");
allStores.forEach(function(store) {
    store.addEventListener("mouseenter", function() {
        this.style.width = "175px";
    });
    store.addEventListener("mouseleave", function() {
        this.style.width = "125px";
    });
});

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", function() {
    init();
});
resetButton.addEventListener("mouseenter", function() {
    this.style.width = "290px";
    this.style.height = "80px";
});
resetButton.addEventListener("mouseleave", function() {
    this.style.width = "270px";
    this.style.height = "60px";
});

/*----- functions -----*/
init();
function init() {
    // scores = {
    //     player: 0,
    //     computer: 0
    // }
    stores.player.innerText = 0;
    stores.computer.innerText = 0;
    for (let pit in pits) {
        pits[pit].innerText = 4;
        pits[pit].style.backgroundColor = "white"; // or theme color of choice
        pits[pit].style.height = "125px";
    }
    for (let store in stores) {
        stores[store].style.backgroundColor = "white";
    }
    winner = null;
    // playerTurn = true;
    // computerTurn = false;
    render(); 
}

function render() {
    // playerSide.forEach(function(pit) {
    //     if (pit.innerText === 0) {
    //          computerSide.forEach(function(compPit) {
    //              stores.computer.innerText += compPit.innerText;
    //              compPit.innerText = 0;
    //          });
    //     }
    // });
    // computerSide.forEach(function(pit) {
    //     if (pit.innerText === 0) {
    //          gameOver();
    //     }
    // });
    if (stores.player.innerText + stores.computer.innerText === 48) {
        if (stores.player.innerText > stores.computer.innerText) {
            winner = "Player";
        } else if (stores.player.innerText < stores.computer.innerText) {
            winner = "Computer";
        } else {
            winner = "Tie";
        }
        // console.log()
        // playerTurn = false;
        // computerTurn = false;
    }
    for (let pit in pits) {
        if (Number(pits[pit].innerText) === 0) {
            pits[pit].style.backgroundColor = "darkslategrey"; // or theme color of choice
            pits[pit].style.height = "125px";
        } else {
            pits[pit].style.backgroundColor = "white"; // or theme color of choice
        }
    }
}

// function gameOver() {
//     if ()
// }

// if pit.innerText !== 0, allow player/computer to choose it to go

function playerSow(pit) {
    let stonesInHand = pit.innerText;
    let pitInd = availableToPlayer.indexOf(pit) + 1;
    if (pitInd === availableToPlayer.length) {
        pitInd = 0;
    }
    pit.innerText = 0;
    while (stonesInHand > 0) {
        availableToPlayer[pitInd].innerText++;
        stonesInHand--;
        pitInd++;
        if (pitInd === availableToPlayer.length) {
            pitInd = 0;
        }
    } 
    let finalPit = availableToPlayer[pitInd-1];
    for (let pit in pits) {
        if (pits[pit] !== finalPit) {
            pits[pit].style.height = "125px";
        }
    }
    if (finalPit !== stores.player) {
        finalPit.style.height = "175px";
    }
    if (playerSide.includes(finalPit)) {
        if (Number(finalPit.innerText) === 1) {
            merge(finalPit, stores.player);
        }
    } else if (finalPit === stores.player) {
        playerTurn = true;
    }
    else {
        playerTurn = false;
        computerTurn = true;
    }
    // other conditions for ending turn
    render(); 
}

function merge(pit, store) {
    store.innerText += pit.innerText;
    pit.innerText = 0;
    store.innerText += pitOpposites[pit].innerText;        
    pitOpposites[pit].innerText = 0;
}

for (let pit in pits) {
    pits[pit].addEventListener("click", function() {
        playerSow(this);
    });
}




