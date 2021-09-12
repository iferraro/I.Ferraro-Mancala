/*----- constants -----*/
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

const stores = {
    player: document.querySelector("#playerStore"),
    computer: document.querySelector("#compStore")
}

const player = {
    side: [pits.one, pits.two, pits.three, pits.four, pits.five, pits.six],
    route: [
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
    ],
    turn: false
}
 
const computer = {
    side: [pits.twelve, pits.eleven, pits.ten, pits.nine, pits.eight, pits.seven],
    route: [
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
        stores.computer
    ],
    turn: false
}

/*----- app's state (variables) -----*/
let scores;
let playerTurn;
let computerTurn;

/*----- cached element references -----*/

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
    stores.player.style.backgroundColor = "white";
    stores.computer.style.backgroundColor = "white";
    winner = null;
    player.turn = true;
    computer.turn = false;
    render(); 
}

function render() {
    if (sideCount(player) === 0) {
        stores.computer.innerText += sideCount(computer);
        empty(computer);
        winnerCheck();
    } else if (sideCount(computer) === 0) {
        stores.player.innerText += sideCount(player);
        empty(player);
        winnerCheck();
    } else {
        for (let pit in pits) {
            if (Number(pits[pit].innerText) === 0) {
                pits[pit].style.backgroundColor = "darkslategrey"; // or theme color of choice
                pits[pit].style.height = "125px";
            }// } else {
            //     pits[pit].style.backgroundColor = "white"; // or theme color of choice
            // }
        }
    }
        // playerTurn = false;
        // computerTurn = false;
}

function sideCount(user) {
    let count = 0;
    user.side.forEach(function(pit) {
        count += Number(pit.innerText);
    });
    return count;
}

function empty(user) {
    user.side.forEach(function(pit) {
        pit.innerText = 0;
    });
}

function winnerCheck() {
    if (stores.player.innerText > stores.computer.innerText) {
        winner = "Player";
    } else if (stores.player.innerText < stores.computer.innerText) {
        winner = "Computer"
    } else {
        winner = "Tie";
    }
    // display winner in header
}

// if pit.innerText !== 0, allow player/computer to choose it to go

function sow(user, pit) {
    for (let p in pits) {
        pits[p].style.backgroundColor = "white";
    }
    let stonesInHand = pit.innerText;
    let pitInd = user.route.indexOf(pit) + 1;
    if (pitInd === user.route.length) {
        pitInd = 0;
    }
    pit.innerText = 0;
    while (stonesInHand > 0) {
        user.route[pitInd].innerText++;
        stonesInHand--;
        pitInd++;
        if (pitInd === user.route.length) {
            pitInd = 0;
        }
    } 
    let finalPit = user.route[pitInd-1];
    finalPit.style.backgroundColor = "blue";
    if (user.side.includes(finalPit)) {
        if (Number(finalPit.innerText) === 1) {
            merge(finalPit, stores[user]);
            user.turn = false;
            opponent.turn = true;

        } else {
            sow(user,finalPit);
        }
    } else if (finalPit === stores[user]) {
        // extra turn starting from available pits;
    } else {
        user.turn = false;
        opponent.turn = true;
    }
    // other conditions for ending turn?
    render(); 
}

function merge(pit, user) {
    stores[user].innerText += pit.innerText;
    pit.innerText = 0;
    stores[user].innerText += pitOpposites[pit].innerText;        
    pitOpposites[pit].innerText = 0;
}

for (let pit in pits) {
    pits[pit].addEventListener("click", function() {
        sow(player, this);
    });
}




