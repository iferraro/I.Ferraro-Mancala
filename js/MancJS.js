/*----- constants -----*/
const PLAYER_THEME = "#A61540"; // change color in final
const COMPUTER_THEME = "#C39428"; // change color in final
const ZERO_THEME = "darkslategrey"; // change color in final

const pits = {
    one: {
        self: document.querySelector("#one"),
        qty: null
    },
    two: {
        self: document.querySelector("#two"),
        qty: null
    }, 
    three: {
        self: document.querySelector("#three"),
        qty: null
    },
    four: {
        self: document.querySelector("#four"),
        qty: null
    },
    five: {
        self: document.querySelector("#five"),
        qty: null
    },
    six: {
        self: document.querySelector("#six"),
        qty: null
    },
    seven: {
        self: document.querySelector("#seven"),
        qty: null
    },
    eight: {
        self: document.querySelector("#eight"),
        qty: null
    },
    nine: {
        self: document.querySelector("#nine"),
        qty: null
    },
    ten: {
        self: document.querySelector("#ten"),
        qty: null
    },
    eleven: {
        self: document.querySelector("#eleven"),
        qty: null
    },
    twelve: {
        self: document.querySelector("#twelve"),
        qty: null
    }
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
    player: {
        self: document.querySelector("#playerStore"),
        qty: null
    },
    computer: {
        self: document.querySelector("#compStore"),
        qty: null
    }
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
    ]
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
    ]
}

/*----- app's state (variables) -----*/
let scores;
let playerTurn;
let computerTurn;

/*----- cached element references -----*/
const winScreen = document.querySelector("#winnerInd");

/*----- event listeners -----*/

// expand reset button
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

// player side functions
player.side.forEach(function(p) {
    p.self.addEventListener("click", function() {
        playerMove(p);
    });
    p.self.addEventListener("mouseenter", function() {
        if (p.qty > 0) {
            this.style.height = "175px";
        }
    });
    p.self.addEventListener("mouseleave", function() {
        this.style.height = "125px";
    });
});

/*----- functions -----*/
init();
function init() {
    for (let store in stores) {
        stores[store].qty = 0;
    }
    for (let pit in pits) {
        pits[pit].qty = 4;
    }
    colorAndLevel();
    winScreen.innerText = "";
    // scores = {
    //     player: stores.player.qty,
    //     computer: stores.computer.qty
    // }
    winner = null;
    // playerTurn = true;
    // computerTurn = false;
    render(); 
}

function render() {
    if (sideCount(player) === 0) {
        stores.computer.qty += sideCount(computer); 
        empty(computer);
        winnerCheck();
    } else if (sideCount(computer) === 0) {
        stores.player.qty += sideCount(player);
        empty(player);
        winnerCheck();
    } 
    updateNumbers(); 
}

function sideCount(user) {
    let count = 0;
    user.side.forEach(function(pit) {
        count += pit.qty;
    });
    return count;
}

function empty(user) {
    user.side.forEach(function(pit) {
        pit.qty = 0;
    });
}

function colorAndLevel() {
    player.side.forEach(function(p) {
        p.self.style.backgroundColor = PLAYER_THEME;
        p.self.style.height = "125px";
    });
    const playerStoreEl = stores.player.self;
    playerStoreEl.style.backgroundColor = PLAYER_THEME;
    playerStoreEl.style.width = "125px";
    playerStoreEl.style.height = "270px";
    computer.side.forEach(function(q) {
        q.self.style.backgroundColor = COMPUTER_THEME;
        q.self.style.height = "125px";
    });
    const computerStoreEl = stores.computer.self;
    computerStoreEl.style.backgroundColor = COMPUTER_THEME;
    computerStoreEl.style.width = "125px";
    computerStoreEl.style.height = "270px";
}

function winnerCheck() {
    if (stores.player.qty > stores.computer.qty) {
        winner = "Player";
    } else if (stores.player.qty < stores.computer.qty) {
        winner = "Computer"
    } else {
        winner = "Tie";
    }
    // playerTurn = false;
    // computerTurn = false;
    winScreen.innerText = winner;
}

function updateNumbers() { 
    for (let store in stores) {
        stores[store].self.innerText = stores[store].qty;
    }
    for (let pit in pits) {
        pits[pit].self.innerText = pits[pit].qty;
        if (pits[pit].qty === 0) {
            pits[pit].self.style.backgroundColor = ZERO_THEME;
        }
    }
}

function playerMove(bowl) {  // prevent user clicks at wrong time
    // if playerTurn = true {}
    if (bowl.qty === 0) {
        return;
    }
    // playerTurn = false;
    let restP = sow(player, bowl);
    restP.self.style.backgroundColor = "blue"; // change to theme second turn color
    if (restP === stores.player) {
        render();
        // playerTurn = true;
        return;
    } else if (player.side.includes(restP)) {
        if (restP.qty === 1) {
            if (pitOpposites[String(restP.self.id)].qty > 0) {
                playerMerge(restP);
                render();
                // playerTurn = false?
                // computerTurn = true;
                setTimeout(function() {
                    computerMove();
                }, 2000);
            } 
        }
    }
    render();
    // playerTurn = false?
    // computerTurn = true;
    setTimeout(function() {
        computerMove();
    }, 2000);
}

function computerMove() {
    // if computerTurn === true? {}
    let restC = sow(computer, computerChoice());
    restC.self.style.backgroundColor = "red"; // change to theme second turn color
    if (restC === stores.computer) {
        render();
        setTimeout(function() {
            computerMove();
        }, 1000);
    } else if (computer.side.includes(restC)) {
        if (restC.qty === 1) {
            if (pitOpposites[String(restC.self.id)].qty > 0) {
                computerMerge(restC);
                render();
                // computerTurn = false?
                // playerTurn = true?
                return;
            } 
        }
    }
    render();
    // computerTurn = false?
    // playerTurn = true?
    return;
}

function computerChoice() {
    let availablePits = [];
    computer.side.forEach(function(p) {
        if (p.qty > 0 ) {
            availablePits.push(p);
        }
    });
    let choice = availablePits[Math.floor(Math.random()*availablePits.length)];
    return choice;
}

function sow(user, pit) {
    colorAndLevel();
    let stonesInHand = pit.qty;
    let pitInd = user.route.indexOf(pit) + 1;
    pit.qty = 0;
    for (let m = 1; stonesInHand > 0; m++) {
        let x = 200;
        let b = 200;
        let subPit = user.route[pitInd];
        subPit.qty++;
        if (subPit.self.classList.item(0) === "pit") { // if dropped into a pit 
            setTimeout(function() {
                subPit.self.style.height = "175px"; // expand
            }, m*x); 
            setTimeout(function() {
                subPit.self.style.height = "125px"; // close
            }, m*x + b);   
        } else { // if dropped into a store
            setTimeout(function() {
                subPit.self.style.width = "175px"; // expand
            }, m*x);
            setTimeout(function() {
                subPit.self.style.width = "125px"; // close
            }, m*x + b);
        }
        stonesInHand--;
        pitInd++;
        if (pitInd === user.route.length) {
            pitInd = 0;
        }      
    }
    let finalPit = user.route[pitInd-1];
    if (pitInd-1 < 0) {
        finalPit = user.route[user.route.length-1];
    }
    return finalPit;       
}

function playerMerge(pit) {
    stores.player.qty += pit.qty;
    pit.qty = 0;
    oppositePit = pitOpposites[String(pit.self.id)];
    stores.player.qty += oppositePit.qty;
    oppositePit.qty = 0;
}

function computerMerge(pit) {
    stores.computer.qty += pit.qty;
    pit.qty = 0;
    oppositePit = pitOpposites[String(pit.self.id)];
    stores.computer.qty += oppositePit.qty;
    oppositePit.qty = 0;
}



