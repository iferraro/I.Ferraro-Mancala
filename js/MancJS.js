/*----- constants -----*/
const PLAYER_THEME = "#A61540";
const COMPUTER_THEME = "#C39428";

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
/*----- cached element references -----*/

/*----- event listeners -----*/
// const allPits = document.querySelectorAll(".pit");
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
function init() {
    for (let store in stores) {
        stores[store].qty = 0;
    }
    for (let pit in pits) {
        pits[pit].qty = 4;
    }
    colorAndLevel();
    // scores = {
    //     player: stores.player.qty,
    //     computer: stores.computer.qty
    // }
    winner = null;
    render(); 
}

function render() {
    if (sideCount(player) === 0) {
        stores.computer.qty += sideCount(computer); // remove event listener from empty pits
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
    const playerStore = stores.player;
    playerStore.self.style.backgroundColor = PLAYER_THEME;
    playerStore.self.style.width = "125px";
    computer.side.forEach(function(q) {
        q.self.style.backgroundColor = COMPUTER_THEME;
        q.self.style.height = "125px";
    });
    const computerStore = stores.computer;
    computerStore.self.style.backgroundColor = COMPUTER_THEME;
    computerStore.self.style.width = "125px";
}

function winnerCheck() {
    if (stores.player.qty > stores.computer.qty) {
        winner = "Player";
    } else if (stores.player.qty < stores.computer.qty) {
        winner = "Computer"
    } else {
        winner = "Tie";
    }
    const winScreen = document.querySelector("#winnerInd");
    winScreen.innerText = winner;
}

function updateNumbers() { // make dependent on each theme?
    for (let store in stores) {
        stores[store].self.innerText = stores[store].qty;
    }
    for (let pit in pits) {
        pits[pit].self.innerText = pits[pit].qty;
        if (pits[pit].qty === 0) {
            pits[pit].self.style.backgroundColor = "darkslategrey";
        }
    }
}

init();
player.side.forEach(function(p) {
    p.self.addEventListener("click", function() {
        playerMove(p);
    });
});

function playerMove(bowl) {
    if (bowl.qty === 0) {
        return;
    }
    let restP = sow(player, bowl);
    //render();
    restP.self.style.backgroundColor = "blue";
    if (restP === stores.player) {
        render();
        return;
    } else if (player.side.includes(restP)) {
        if (restP.qty === 1) {
            if (pitOpposites[String(restP.self.id)].qty > 0) {
                playerMerge(restP);
                render();
                computerMove();
            } 
        }
    }
    render();
    computerMove();
}

function computerMove() {
    let restC = sow(computer, computerChoice());
    //render();
    restC.self.style.backgroundColor = "red";
    if (restC === stores.computer) {
        render();
        computerMove();
    } else if (computer.side.includes(restC)) {
        if (restC.qty === 1) {
            if (pitOpposites[String(restC.self.id)].qty > 0) {
                computerMerge(restC);
                render();
                return;
            } 
        }
    }
    render();
    return;
}

function sow(user, pit) {
    colorAndLevel();
    let stonesInHand = pit.qty;
    let pitInd = user.route.indexOf(pit) + 1;
    if (pitInd === user.route.length) {
        pitInd = 0;
    }
    pit.qty = 0;
    while (stonesInHand > 0) {
        user.route[pitInd].qty++;
        stonesInHand--;
        pitInd++;
        if (pitInd === user.route.length) {
            pitInd = 0;
        }
    } 
    let finalPit = user.route[pitInd-1];
    if (pitInd-1 < 0) {
        finalPit = user.route[user.route.length-1];
    } // if 0, one backwards is user.route.length
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




