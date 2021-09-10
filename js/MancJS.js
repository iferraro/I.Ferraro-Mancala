/*----- constants -----*/

const stores = {
    player: document.querySelector("#playerStore"),
    computer: document.querySelector("#compStore")
}

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
    one: document.querySelector("#seven"),
    two: document.querySelector("#eight"),
    three: document.querySelector("#nine"),
    four: document.querySelector("#ten"),
    five: document.querySelector("#eleven"),
    six: document.querySelector("#twelve"),
    seven: document.querySelector("#one"),
    eight: document.querySelector("#two"),
    nine: document.querySelector("#three"),
    ten: document.querySelector("#four"),
    eleven: document.querySelector("#five"),
    twelve: document.querySelector("#six")  
}

const[]
/*----- app's state (variables) -----*/
let scores;
let playerTurn;
let computerTurn;
/*----- cached element references -----*/
/*----- event listeners -----*/
let allPits = document.querySelectorAll(".pit");
allPits.forEach(function(pit) {
    pit.addEventListener("mouseenter", function() {
        this.style.height = "175px";
    });
    pit.addEventListener("mouseleave", function() {
        this.style.height = "125px";
    });
});

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", function() {
    init();
});

/*----- functions -----*/
init();
function init() {
    scores = {
        player: 0,
        computer: 0
    }
    for (let pit in pits) {
        pits[pit].innerText = 4;
    }
    playerTurn = true;
    computerTurn = false;
    render(); 
}

function render() {
    stores.player.innerText = scores.player;
    stores.computer.innerText = scores.computer;
    endCheck();
}

function advance(player) {
// player or computer picks up stones and continues collecting and dropping into pits unitl their turn is done

}

function endCheck() {
    if (stores.player.innerText + stores.computer.innerText === 48) {
        playerTurn = false;
        computerTurn = false;
    }
// returns sum of stores. if 48, then game is over.
}


