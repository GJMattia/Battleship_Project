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
let startGame = false;
let humanBoard;
let computerBoard;
let selectedShip = null;
let computerAlreadyAttacked = [];
let selectedShipDiv = null;

let human = {
shipsPlaced: 0,

};

let computer = {
};


let humanShips = [
    {
        name: 'Destroyer',
        vertical: false,
        column: 0,
        row: 0,
        length: 2
    },

    {
        name: 'Submarine',
        vertical: false,
        column: 0,
        row: 0,
        length: 3
    },

    {
        name: 'Cruiser',
        vertical: false,
        column: 0,
        row: 0,
        length: 3
    },
    {
        name: 'Battleship',
        vertical: false,
        column: 0,
        row: 0,
        length: 4
    },
    {
        name: 'Carrier',
        vertical: false,
        column: 0,
        row: 0,
        length: 5
    }
];

let computerShips = [
    {
        name: 'Destroyer',
        vertical: false,
        column: 0,
        row: 0,
        length: 2
    },

    {
        name: 'Submarine',
        vertical: true,
        column: 0,
        row: 0,
        length: 3
    },

    {
        name: 'Cruiser',
        vertical: false,
        column: 0,
        row: 0,
        length: 3
    },
    {
        name: 'Battleship',
        vertical: false,
        column: 0,
        row: 0,
        length: 4
    },
    {
        name: 'Carrier',
        vertical: false,
        column: 0,
        row: 0,
        length: 5
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

};


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
let selectedDiv = event.target.id;
let columnIndex = selectedDiv[2];
let rowIndex = selectedDiv[4];

if (computerBoard[columnIndex][rowIndex] === 2 || computerBoard[columnIndex][rowIndex] === 3){
    console.log('pick another');
    return;
}
computerBoard[columnIndex][rowIndex]+= 2;
renderComputerBoard();
handleComputerAttack();

};




function handleComputerAttack(){

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
console.log(computerAlreadyAttacked);
humanBoard[columnCoordinates][rowCoordinates] += 2;

renderHumanBoard();

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
    if (selectShip === null){
messageBox.innerText = 'Please Select a Ship';
return;
    };
    selectedShip.column = parseInt(columnInput.value);
    selectedShip.row = parseInt(rowInput.value);
    addHumanShip(selectedShip);
    renderHumanBoard();
    selectedShip = null;
    showcaseShip.removeChild(selectedShipDiv);
    selectedShipDiv = null;
    human.shipsPlaced++;
    console.log(selectedShip);
    console.log(human);
    renderControls();
}





function addHumanShip(ship) {

    if (ship.vertical === false) {
        for (let i = 0; i < ship.length; i++) {
            humanBoard[ship.column + i][ship.row]++;
        }
    } else {
        for (let i = 0; i < ship.length; i++) {
            humanBoard[ship.column][ship.row + i]++;
        }
    }
};




function randomShipPlacement(shipsArray, board) {
    shipsArray.forEach(function(ship) {
        ship.vertical = Math.random() < 0.5;

        if (ship.length === 2) {
            ship.column = Math.floor(Math.random() * 9);
            ship.row = Math.floor(Math.random() * 9);
        } else if (ship.length === 3) {
            ship.column = Math.floor(Math.random() * 8);
            ship.row = Math.floor(Math.random() * 8);
        } else if (ship.length === 4) {
            ship.column = Math.floor(Math.random() * 7);
            ship.row = Math.floor(Math.random() * 7);
        } else if (ship.length === 5) {
            ship.column = Math.floor(Math.random() * 6);
            ship.row = Math.floor(Math.random() * 6);
        }

        if (ship.vertical === false) {
            for (let i = 0; i < ship.length; i++) {
                board[ship.column + i][ship.row]++;
            }
        } else {
            for (let i = 0; i < ship.length; i++) {
                board[ship.column][ship.row + i]++;
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



