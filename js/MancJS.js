/*----- constants -----*/
const stores = {
    player: document.querySelector("#playerStore"),
    computer: document.querySelector("#compStore")
}
const sequence = [
    document.querySelector("#one"),
    document.querySelector("#two"),
    document.querySelector("#three"),
    document.querySelector("#four"),
    document.querySelector("#five"),
    document.querySelector("#six"),
    stores.player,
    document.querySelector("#twelve"),
    document.querySelector("#eleven"),
    document.querySelector("#ten"),
    document.querySelector("#nine"),
    document.querySelector("#eight"),
    document.querySelector("#seven"),
    stores.computer
]
/*----- app's state (variables) -----*/
let scores;
// let playerTurn;
// let computerTurn;
/*----- cached element references -----*/
const pits = {
    one: sequence[0],
    two: sequence[1],
    three: sequence[2],
    four: sequence[3],
    five: sequence[4],
    six: sequence[5],
    seven: sequence[12],
    eight: sequence[11],
    nine: sequence[10],
    ten: sequence[9],
    eleven: sequence[8],
    twelve: sequence[7]
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
allPits.forEach(function(pit) {
    pit.addEventListener("mouseenter", function() {
        this.style.height = "175px";
    });
    pit.addEventListener("mouseleave", function() {
        this.style.height = "125px";
    });
});

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
    }
    winner = null;
    // playerTurn = true;
    // computerTurn = false;
    render(); 
}

function render() {
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
}

function playerDist(pit) {
    let stonesInHand = pit.innerText;
    let pitInd = availableToPlayer.indexOf(pit) + 1;
    pit.innerText = 0;
    while (stonesInHand > 0) {
        availableToPlayer[pitInd].innerText++;
        stonesInHand--;
        if (pitInd > 12) {
            pitInd = 0;
        }
        pitInd++;
    } 
    let finalPit = availableToPlayer[pitInd-1];
    finalPit.style.backgroundColor = "green";
    if (finalPit.innerText === 1 && playerSide.includes(finalPit)) {
        stores.player.innerText += finalPit.innerText;
        finalPit.innerText = 0;
        stores.player.innerText += pitOpposites[finalPit].innerText;
        pitOpposites[finalPit].innerText = 0;
    }
    render(); 
}

pits.three.addEventListener("click", playerDist(pits.three));



