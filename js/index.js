/*----- constants -----*/

const HUMAN_TILE_STATES = {
    0: '',
    1: 'darkgray',
    2: 'white',
    3: 'darkred'
};

const COMPUTER_TILE_STATES = {
    0: '',
    1: 'darkgray',
    2: 'white',
    3: 'darkred'
}

const ALPHABET_LOOKUP = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];


/*----- state variables -----*/
let humanBoard;
let computerBoard;
let selectedShip = null;
let computerAlreadyAttacked = [];
let selectedShipDiv = null;
let possibleCoordinates = [];
let winner = null;
let turn = 1;






let human = {
shipsPlaced: 0,

};

let computer = {
};


let humanShips = [
    {
        name: 'DESTROYER',
        vertical: false,
        column: 0,
        row: 0,
        length: 2,
        occupiedTiles: [],
        isSunk: false
    },

    {
        name: 'SUBMARINE',
        vertical: false,
        column: 0,
        row: 0,
        length: 3,
        occupiedTiles: [],
        isSunk: false
    },

    {
        name: 'CRUISER',
        vertical: false,
        column: 0,
        row: 0,
        length: 3,
        occupiedTiles: [],
        isSunk: false
    },
    {
        name: 'Battleship',
        vertical: false,
        column: 0,
        row: 0,
        length: 4,
        occupiedTiles: [],
        isSunk: false
    },
    {
        name: 'CARRIER',
        vertical: false,
        column: 0,
        row: 0,
        length: 5,
        occupiedTiles: [],
        isSunk: false
    }
];

let computerShips = [
    {
        name: 'DESTROYER',
        vertical: null,
        column: 0,
        row: 0,
        length: 2,
        occupiedTiles: [],
        isSunk: false
    },

    {
        name: 'SUBMARINE',
        vertical: null,
        column: 0,
        row: 0,
        length: 3,
        occupiedTiles: [],
        isSunk: false
    },

    {
        name: 'CRUISER',
        vertical: null,
        column: 0,
        row: 0,
        length: 3,
        occupiedTiles: [],
        isSunk: false
    },
    {
        name: 'BATTLESHIP',
        vertical: null,
        column: 0,
        row: 0,
        length: 4,
        occupiedTiles: [],
        isSunk: false
    },
    {
        name: 'CARRIER',
        vertical: null,
        column: 0,
        row: 0,
        length: 5,
        occupiedTiles: [],
        isSunk: false
    }
];





/*----- cached elements  -----*/

const humanGrid = [...document.querySelectorAll('#humanBoard > div')];
const computerGrid = [...document.querySelectorAll('#computerBoard > div')];
const messageBox = document.getElementById('messageBox');
const shipYard = [...document.querySelectorAll('#shipYard > div')];

const columnInput = document.getElementById('columnInput');
const rowInput = document.getElementById('rowInput');
const rotateBtn = document.getElementById('rotateBtn');
const confirmBtn = document.getElementById('confirm');
const shipName = document.getElementById('shipName');
const shipsDiv = document.getElementById('shipsDiv');
const showcaseShip = document.getElementById('showcaseShip');


let toggle = document.getElementById('toggle');








/*----- event listeners -----*/

shipYard.forEach(ship => {
    ship.addEventListener('click', selectShip);
});

confirmBtn.addEventListener('click', confirmPlacement);

rotateBtn.addEventListener('click', shipRotate);


toggle.addEventListener('click', handleComputerAttack);

computerGrid.forEach(cell =>{
    cell.addEventListener('click', handleHumanAttack);
})






/*----- functions -----*/
initalize();


function initalize(){
// generateComputerShips();
humanBoard =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 0
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 1
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 2
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 3
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 4
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 5
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 6
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 7
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 8
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // col 9
        ];

        computerBoard =
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 0
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 1
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 2
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 3
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 4
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 5
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 6
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 7
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 8
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // col 9
        ];

        renderHumanBoard();
        renderComputerBoard();
        renderMessage();

};

function renderMessage(){
if (human.shipsPlaced !== 5){
    messageBox.innerText = `Please add your ships to the board! You have ${human.shipsPlaced}/5 ships placed!`;
}

if (human.shipsPlaced === 5 && turn === 1){
messageBox.innerText = `IT IS YOUR TURN, PLEASE PICK A SPOT TO ATTACK!`
}


}






function renderControls(){
if (human.shipsPlaced !== 5){
    return;
}else
shipsDiv.style.visibility = 'hidden';


};



function renderHumanBoard() {

    humanBoard.forEach(function (columnArray, columnIndex) {
        columnArray.forEach(function (cellValue, rowIndex) {
            const cellId = `c${columnIndex}r${rowIndex}`;
            const cellElement = document.getElementById(cellId);
            cellElement.style.backgroundColor = HUMAN_TILE_STATES[cellValue];
        })
    })
};

function renderComputerBoard(){

    computerBoard.forEach(function (columnArray, columnIndex) {
        columnArray.forEach(function (cellValue, rowIndex) {
            const cellId = `Cc${columnIndex}r${rowIndex}`;
            const cellElement = document.getElementById(cellId);
            cellElement.style.backgroundColor = COMPUTER_TILE_STATES[cellValue];
        })
    })

};

function handleHumanAttack(event){
if (turn === '-1' || winner !== null){
    return;
};

let selectedDiv = event.target.id;

let columnIndex = selectedDiv[2];
let rowIndex = selectedDiv[4];

if (computerBoard[columnIndex][rowIndex] === 2 || computerBoard[columnIndex][rowIndex] === 3){
    messageBox.innerHTML = 'YOU ALREADY ATTACKED THIS SPOT, PLEASE PICK ANOTHER!'
    return;
}

if(computerBoard[columnIndex][rowIndex] === 1){
    messageBox.innerHTML = 'HIT! YOU HAVE LANDED A SHOT ON AN ENEMY SHIP'
}else if (computerBoard[columnIndex][rowIndex] === 0){
    messageBox.innerHTML = 'MISS! BETTER LUCK NEXT TURN!'
}
computerBoard[columnIndex][rowIndex]+= 2;
renderComputerBoard();
checkSunk(computerShips, computerBoard);
checkWinner(computerShips);
turn *= '-1';
setTimeout(handleComputerAttack, 1500);

};




function handleComputerAttack(){

if (turn === 1 || winner !== null){
    return;
};

if (computerAlreadyAttacked.length === 100){
    return;
};

let columnCoordinates;
let rowCoordinates;
let fullCoordinates;

do {
    columnCoordinates = Math.floor(Math.random() * 10);
    rowCoordinates = Math.floor(Math.random() * 10);
    fullCoordinates = `${columnCoordinates}${rowCoordinates}`;
} while (computerAlreadyAttacked.includes(fullCoordinates));

computerAlreadyAttacked.push(fullCoordinates);
humanBoard[columnCoordinates][rowCoordinates] += 2;

if (humanBoard[columnCoordinates][rowCoordinates] === 2){
    messageBox.innerHTML = 'THE COMPUTER HAS MISSED! IT IS NOW YOUR TURN!'
} else if (humanBoard[columnCoordinates][rowCoordinates] === 3){
    messageBox.innerHTML = 'THE COMPUTER HAS HIT ONE OF YOUR SHIPS! IT IS NOW YOUR TURN!'
};


checkSunk(humanShips, humanBoard);
checkWinner(humanShips);
renderHumanBoard();
turn *= '-1';
};




function selectShip(event) {
    if (event.target.tagName === 'H1'){
        return;
    };
    if (showcaseShip.children.length > 1) {
        return;
    }
    let shipID = event.target.id.charAt(4);
    selectedShipDiv = event.target;
showcaseShip.appendChild(selectedShipDiv);
console.log(selectedShipDiv);
    selectedShip = humanShips[shipID];
    shipName.innerText = selectedShip.name;
    console.log(selectedShip);
    
};


function shipRotate(){
    selectedShip.vertical = !selectedShip.vertical;
    if (selectedShip.vertical === true){
        shipName.style.top = '10rem';
        shipName.style.left = '1rem';
    selectedShipDiv.style.transform = 'rotate(90deg)'}
    else {
    selectedShipDiv.style.transform = 'rotate(0deg)';
    shipName.style.top = '1rem';
    shipName.style.removeProperty('left');
    };
};




function confirmPlacement(){
    if (selectedShip === null){
messageBox.innerText = 'Please Select a Ship';
return;
    };

    maxGridSize = 10;

    possibleColumn = parseInt(columnInput.value);
    possibleRow = parseInt(rowInput.value);

    if (selectedShip.vertical === false){
        if (possibleColumn > maxGridSize - selectedShip.length || possibleRow >= maxGridSize){
            messageBox.innerText = 'THE SELECTED SHIP IS OUT OF BOUNDS! PICK ANOTHER SPOT!'
            return;
        }
    };
    
    if (selectedShip.vertical === true){
        if (possibleRow > maxGridSize - selectedShip.length || possibleColumn >= maxGridSize){
            messageBox.innerText = 'THE SELECTED SHIP IS OUT OF BOUNDS! PICK ANOTHER SPOT!';
            return;
        }
    };

    possibleCoordinates = [];
generatePossibleCoordinates(possibleColumn, possibleRow, selectedShip.vertical, selectedShip.length, possibleCoordinates);

if (collisionCheck(humanShips, possibleCoordinates) === false){
    selectedShip.column = parseInt(columnInput.value);
    selectedShip.row = parseInt(rowInput.value);
    addHumanShip(selectedShip);
    renderHumanBoard();
    selectedShip = null;
    showcaseShip.removeChild(selectedShipDiv);
    selectedShipDiv = null;
    human.shipsPlaced++;
    renderControls();
    renderMessage();
};
};


function generatePossibleCoordinates(possibleColumn, possibleRow, vertical, length, possibleCoordinatesArray){

    if (vertical === false){
        for (let i = 0; i < length; i++){
            possibleCoordinatesArray.push(`${possibleColumn + i}${possibleRow}`);
        }
    }else {
        for (let i = 0; i < length; i++){
            possibleCoordinatesArray.push(`${possibleColumn}${possibleRow + i}`)
        }
    }
    
    };



function collisionCheck(ships, possibleCoordinatesArray){
let collision = false;

    ships.forEach(function(ship){
        possibleCoordinatesArray.forEach(function(coords){
            if(ship.occupiedTiles.includes(coords)){
            messageBox.innerHTML = 'There is already a ship placed here! Pick another spot!';
                collision = true;
            }
        });
    });
    if (collision === true){
        return true;
    }else {
        return false;
    }
    };


function addHumanShip(ship) {

    if (ship.vertical === false) {
        for (let i = 0; i < ship.length; i++) {
            humanBoard[ship.column + i][ship.row]++;
            ship.occupiedTiles.push(`${ship.column + i}${ship.row}`);
        }
    } else {
        for (let i = 0; i < ship.length; i++) {
            humanBoard[ship.column][ship.row + i]++;
            ship.occupiedTiles.push(`${ship.column}${ship.row + i}`);
        }
    }
};



function randomShipPlacement(shipsArray, board) {
    shipsArray.forEach(function(ship) {
     ship.vertical = Math.random() < 0.5;


            if (ship.length === 2) {
                ship.column = Math.floor(Math.random() * 4) + 5;
                ship.row = Math.floor(Math.random() * 1) + 8;
            } else if (ship.length === 3 && ship.name === 'SUBMARINE') {
                ship.column = Math.floor(Math.random() * 2) ;
                ship.row = Math.floor(Math.random() * 2) + 6;
            }else if (ship.length === 3 && ship.name === 'CRUISER') {
                ship.column = Math.floor(Math.random() * 2) + 6;
                ship.row = Math.floor(Math.random() * 2);}
             else if (ship.length === 4) {
                ship.column = Math.floor(Math.random() * 1) + 4;
                ship.row = Math.floor(Math.random() * 1) + 4;
            } else if (ship.length === 5) {
                ship.column = Math.floor(Math.random() * 2);
                ship.row = Math.floor(Math.random() * 2);
            }
           

        if (ship.vertical === false) {
            for (let i = 0; i < ship.length; i++) {
                board[ship.column + i][ship.row]++;
                ship.occupiedTiles.push(`${ship.column + i}${ship.row}`);
            }
        } else {
            for (let i = 0; i < ship.length; i++) {
                board[ship.column][ship.row + i]++;
                ship.occupiedTiles.push(`${ship.column }${ship.row + i}`);
            }
        }
    });
    renderComputerBoard();
}


randomShipPlacement(computerShips, computerBoard);





function toggleShipYard() {
    if (shipsDiv.style.visibility === 'hidden') {
        shipsDiv.style.visibility = 'visible';
    } else {
        shipsDiv.style.visibility = 'hidden';
    }
};


function checkSunk(shipsArray, board){
    
    shipsArray.forEach(function(ship){
        let total = 0;
        ship.occupiedTiles.forEach(function(coordinate){
            let columnIndex = coordinate[0];
            let rowIndex = coordinate[1];

            total += board[columnIndex][rowIndex];

        
    
        });
        if (ship.isSunk === true){
        
            return
        };
        if (turn === 1 && total === ship.length * 3){
            messageBox.innerHTML =`YOU HAVE SUNK THE ENEMY ${ship.name}!`;
            ship.isSunk = true;
        }else if (turn === '-1' && total === ship.length * 3){
            messageBox.innerHTML =`THE COMPUTER HAS SUNK YOUR ${ship.name}!`;
        }
        
    });
};

function checkWinner(array){
    let count = 0;
    array.forEach(function(ship){
    if (ship.isSunk === true){
        count++
    }else return;
    });
    if (count === 5 && array === computerShips){
        winner = true;
        messageBox.innerText = `YOU HAVE SUNK ALL ENEMY SHIPS!!! YOU ARE THE WINNER!!!`
    }else if (count === 5 && array === humanShips){
        messageBox.innerText = `THE COMPUTER HAS SUNK ALL OF YOUR SHIPS!!! YOU LOSE!`
    }else{
        return;
    };
    };


