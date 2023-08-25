const HUMAN_TILE_STATES = {
  0: '',
  1: 'linear-gradient(315deg, #485461 0%, #28313b 74%)',
  2: 'linear-gradient(315deg, #ffffff 0%, #87fffb 74%)',
  3: 'linear-gradient(326deg, #030202 0%, #91221e 74%)'
};

const COMPUTER_TILE_STATES = {
  0: '',
  1: 'linear-gradient(315deg, #485461 0%, #28313b 74%)',
  2: 'linear-gradient(315deg, #ffffff 0%, #87fffb 74%)',
  3: 'linear-gradient(326deg, #030202 0%, #91221e 74%)'
}

/*----- sound constants -----*/
const miss = new Audio('../Battleship_Project/sound/Miss.mp3');
const shipSound = new Audio('../Battleship_Project/sound/shipSound.mp3');
const confirmSound = new Audio('../Battleship_Project/sound/confirm.mp3');
const invalid = new Audio('../Battleship_Project/sound/Invalid.mp3');
const lose = new Audio('../Battleship_Project/sound/Lose.mp3');
const win = new Audio('../Battleship_Project/sound/Win.mp3');
const hit = new Audio('../Battleship_Project/sound/Hit.mp3');
const backgroundMusic = new Audio('../Battleship_Project/sound/background.mp3');

hit.volume = 0.70;
win.volume = 0.70;
lose.volume = 0.50;
invalid.volume = 0.40;
shipSound.volume = 0.70;
miss.volume = 0.60;
backgroundMusic.volume = 0.60;

/*----- state variables -----*/
let humanBoard;
let computerBoard;
let selectedShip = null;
let computerAlreadyAttacked = [];
let selectedShipDiv = null;
let possibleCoordinates = [];
let winner = null;
let turn;
let shipsPlaced;
let musicOn = false;

let humanShips = [{
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
      name: 'BATTLESHIP',
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

let computerShips = [{
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
const shipYardDiv = document.getElementById('shipYard');

const columnInput = document.getElementById('columnInput');
const rowInput = document.getElementById('rowInput');
const rotateBtn = document.getElementById('rotateBtn');
const confirmBtn = document.getElementById('confirm');
const shipName = document.getElementById('shipName');
const shipsDiv = document.getElementById('shipsDiv');
const showcaseShip = document.getElementById('showcaseShip');
const playAgainBtn = document.getElementById('playAgainBtn');
const musicBtn = document.getElementById('musicBtn');

/*----- event listeners -----*/
shipYard.forEach(ship => {
  ship.addEventListener('click', selectShip);
});
computerGrid.forEach(cell => {
  cell.addEventListener('click', handleHumanAttack);
});
confirmBtn.addEventListener('click', confirmPlacement);
rotateBtn.addEventListener('click', shipRotate);
playAgainBtn.addEventListener('click', initalize);
musicBtn.addEventListener('click', playMusic);

/*----- functions -----*/
initalize();

function initalize() {

  humanBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 0
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 1
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 3
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 4
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 5
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 6
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 7
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 8
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // col 9
  ];
  computerBoard = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 0
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 1
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 2
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 3
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 4
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 5
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 6
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 7
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // col 8
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] // col 9
  ];
  shipsPlaced = 0;
  computerAlreadyAttacked = [];
  shipsDiv.style.visibility = 'visible';
  playAgainBtn.style.visibility = 'hidden';
  winner = null;
  turn = 'human';
  COMPUTER_TILE_STATES[1] = '';
  initalizeShipYard(shipYard);
  shipDisplayReset(shipYard);
  clearShipsProperties(humanShips);
  clearShipsProperties(computerShips);
  renderHumanBoard();
  randomShipPlacement(computerShips, computerBoard);
  renderComputerBoard();
  renderMessage();
};

function playMusic(){
    if(musicOn === false){
       musicOn = true;
       backgroundMusic.play();
       musicBtn.innerText = '🔈';
    }else if (musicOn === true){
        musicOn = false;
        backgroundMusic.pause();
        musicBtn.innerText = '🔇';
    }
};

function renderMessage() {
  if (shipsPlaced !== 5) {
      messageBox.innerText = `PLEASE ADD YOUR SHIPS TO THE BOARD! YOU HAVE ${shipsPlaced}/5 SHIPS PLACED!`;
  }

  if (shipsPlaced === 5 && turn === 'human') {
      messageBox.innerText = `IT IS YOUR TURN, PLEASE PICK A SPOT TO ATTACK!`;
  }
};

function shipDisplayReset(shipsDivs) {
  shipsDivs.forEach(function(ship) {
      ship.style.transform = 'rotate(0deg)';
  })
  shipName.style.left = '';
};

function clearShipsProperties(shipsArray) {
  shipsArray.forEach(function(ship) {
      ship.isSunk = false;
      ship.occupiedTiles = [];
      ship.column = null;
      ship.row = null;
      ship.vertical = false;
  })
};

function renderControls() {
  if (shipsPlaced !== 5) {
      return;
  } else
      shipsDiv.style.visibility = 'hidden';
};

function renderHumanBoard() {
  humanBoard.forEach(function(columnArray, columnIndex) {
      columnArray.forEach(function(cellValue, rowIndex) {
          const cellId = `c${columnIndex}r${rowIndex}`;
          const cellElement = document.getElementById(cellId);
          cellElement.style.backgroundImage = HUMAN_TILE_STATES[cellValue];
      });
  });
};

function renderComputerBoard() {
  computerBoard.forEach(function(columnArray, columnIndex) {
      columnArray.forEach(function(cellValue, rowIndex) {
          const cellId = `Cc${columnIndex}r${rowIndex}`;
          const cellElement = document.getElementById(cellId);
          cellElement.style.backgroundImage = COMPUTER_TILE_STATES[cellValue];
      });
  });
};

function handleHumanAttack(event) {
  if (turn === 'computer' || winner !== null) {
      return;
  };

  let selectedDiv = event.target.id;
  let columnIndex = selectedDiv[2];
  let rowIndex = selectedDiv[4];

  if (computerBoard[columnIndex][rowIndex] === 2 || computerBoard[columnIndex][rowIndex] === 3) {
      messageBox.innerHTML = 'YOU ALREADY ATTACKED THIS SPOT, PLEASE PICK ANOTHER!'
      invalid.play();
      return;
  };

  if (computerBoard[columnIndex][rowIndex] === 1) {
      hit.play();
      messageBox.innerHTML = 'HIT! YOU HAVE LANDED A SHOT ON AN ENEMY SHIP'
  } else if (computerBoard[columnIndex][rowIndex] === 0) {
      miss.play();
      messageBox.innerHTML = 'MISS! BETTER LUCK NEXT TURN!'
  };
  computerBoard[columnIndex][rowIndex] += 2;
  renderComputerBoard();
  checkSunk(computerShips, computerBoard);
  checkWinner(computerShips);
  setTimeout(handleComputerAttack, 1200);
  turn = 'computer';
};

function handleComputerAttack() {
  if (turn === 'human' || winner !== null) {
      return;
  };

  if (computerAlreadyAttacked.length === 100) {
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

  if (humanBoard[columnCoordinates][rowCoordinates] === 2) {
      miss.play();
      messageBox.innerHTML = 'THE COMPUTER HAS MISSED! IT IS NOW YOUR TURN!';
  } else if (humanBoard[columnCoordinates][rowCoordinates] === 3) {
      hit.play();
      messageBox.innerHTML = 'THE COMPUTER HAS HIT ONE OF YOUR SHIPS! IT IS NOW YOUR TURN!';
  };
  checkSunk(humanShips, humanBoard);
  checkWinner(humanShips);
  renderHumanBoard();
  turn = 'human';
};

function selectShip(event) {
  if (event.target.tagName === 'H1') {
      return;
  };
  if (showcaseShip.children.length > 1) {
      return;
  };
  let shipID = event.target.id.charAt(4);
  selectedShipDiv = event.target;
  shipSound.play();
  showcaseShip.appendChild(selectedShipDiv);
  selectedShip = humanShips[shipID];
  shipName.innerText = selectedShip.name;
  shipName.style.left = '';
};


function shipRotate() {
  if (selectedShip === null){
      messageBox.innerHTML = 'PLEASE SELECT A SHIP!'
      invalid.play();
      return;
  }
  if (selectedShip.name === 'CARRIER') {
      shipName.style.left = '1rem';
  } else {
      shipName.style.left = '';
  }
  selectedShip.vertical = !selectedShip.vertical;
  if (selectedShip.vertical === true) {
      selectedShipDiv.style.transform = 'rotate(90deg)'
      shipSound.play();
  } else {
      selectedShipDiv.style.transform = 'rotate(0deg)';
      shipSound.play();
  };
};


function confirmPlacement() {
  if (selectedShip === null) {
      messageBox.innerText = 'PLEASE SELECT A SHIP';
      invalid.play();
      return;
  };

  maxGridSize = 10;
  possibleColumn = parseInt(columnInput.value);
  possibleRow = parseInt(rowInput.value);

  if (selectedShip.vertical === false) {
      if (possibleColumn > maxGridSize - selectedShip.length || possibleRow >= maxGridSize) {
          messageBox.innerText = 'THE SELECTED SHIP IS OUT OF BOUNDS! PICK ANOTHER SPOT!'
          invalid.play();
          return;
      }
  };

  if (selectedShip.vertical === true) {
      if (possibleRow > maxGridSize - selectedShip.length || possibleColumn >= maxGridSize) {
          messageBox.innerText = 'THE SELECTED SHIP IS OUT OF BOUNDS! PICK ANOTHER SPOT!';
          invalid.play();
          return;
      };
  };
  possibleCoordinates = [];
  generatePossibleCoordinates(possibleColumn, possibleRow, selectedShip.vertical, selectedShip.length, possibleCoordinates);

  if (collisionCheck(humanShips, possibleCoordinates) === false) {
      confirmSound.play();
      selectedShip.column = parseInt(columnInput.value);
      selectedShip.row = parseInt(rowInput.value);
      addHumanShip(selectedShip);
      renderHumanBoard();
      selectedShip = null;
      shipYardDiv.appendChild(selectedShipDiv);
      selectedShipDiv.style.visibility = 'hidden';
      selectedShipDiv.style.position = 'absolute';
      selectedShipDiv = null;
      shipsPlaced++;
      renderControls();
      renderMessage();
      columnInput.value = '0';
      rowInput.value = '0';
  };
};

function initalizeShipYard(shipYard) {
  shipYard.forEach(function(ship) {
      ship.style.visibility = 'visible';
      ship.style.position = '';
  });
};

function generatePossibleCoordinates(possibleColumn, possibleRow, vertical, length, possibleCoordinatesArray) {
  if (vertical === false) {
      for (let i = 0; i < length; i++) {
          possibleCoordinatesArray.push(`${possibleColumn + i}${possibleRow}`);
      };
  } else {
      for (let i = 0; i < length; i++) {
          possibleCoordinatesArray.push(`${possibleColumn}${possibleRow + i}`)
      };
  };

};


function collisionCheck(ships, possibleCoordinatesArray) {
  let collision = false;

  ships.forEach(function(ship) {
      possibleCoordinatesArray.forEach(function(coords) {
          if (ship.occupiedTiles.includes(coords)) {
              messageBox.innerHTML = 'THERE IS ALREADY A SHIP PLACED HERE! PICK ANOTHER SPOT!';
              invalid.play();
              collision = true;
          }
      });
  });
  if (collision === true) {
      return true;
  } else {
      return false;
  };
};


function addHumanShip(ship) {

  if (ship.vertical === false) {
      for (let i = 0; i < ship.length; i++) {
          humanBoard[ship.column + i][ship.row]++;
          ship.occupiedTiles.push(`${ship.column + i}${ship.row}`);
      };
  } else {
      for (let i = 0; i < ship.length; i++) {
          humanBoard[ship.column][ship.row + i]++;
          ship.occupiedTiles.push(`${ship.column}${ship.row + i}`);
      };
  };
};


function randomShipPlacement(shipsArray, board) {
  shipsArray.forEach(function(ship) {
      ship.vertical = Math.random() < 0.5;


      if (ship.length === 2) {
          ship.column = Math.floor(Math.random() * 4) + 5;
          ship.row = Math.floor(Math.random() * 1) + 8;
      } else if (ship.length === 3 && ship.name === 'SUBMARINE') {
          ship.column = Math.floor(Math.random() * 2);
          ship.row = Math.floor(Math.random() * 2) + 6;
      } else if (ship.length === 3 && ship.name === 'CRUISER') {
          ship.column = Math.floor(Math.random() * 2) + 6;
          ship.row = Math.floor(Math.random() * 2);
      } else if (ship.length === 4) {
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
          };
      };
  });
};


function checkSunk(shipsArray, board) {
  shipsArray.forEach(function(ship) {
      let total = 0;
      ship.occupiedTiles.forEach(function(coordinate) {
          let columnIndex = coordinate[0];
          let rowIndex = coordinate[1];
          total += board[columnIndex][rowIndex];
      });

      if (ship.isSunk === true) {
          return;
      };

      if (turn === 'human' && total === ship.length * 3) {
          messageBox.innerHTML = `YOU HAVE SUNK THE ENEMY ${ship.name}!`;
          ship.isSunk = true;
      } else if (turn === 'computer' && total === ship.length * 3) {
          messageBox.innerHTML = `THE COMPUTER HAS SUNK YOUR ${ship.name}!`;
          ship.isSunk = true;
      };
  });
};

function checkWinner(array) {
  let count = 0;
  array.forEach(function(ship) {
      if (ship.isSunk === true) {
          count++
      } else return;
  });

  if (count === 5 && array === computerShips) {
      winner = true;
      messageBox.innerText = `YOU HAVE SUNK ALL ENEMY SHIPS!!! YOU ARE THE WINNER!!!`
      win.play();
      playAgainBtn.style.visibility = 'visible';
      COMPUTER_TILE_STATES[1] = 'linear-gradient(315deg, #485461 0%, #28313b 74%)';
      renderComputerBoard();
  } else if (count === 5 && array === humanShips) {
      winner = true;
      messageBox.innerText = `THE COMPUTER HAS SUNK ALL OF YOUR SHIPS!!! YOU LOSE!`
      lose.play();
      playAgainBtn.style.visibility = 'visible';
      COMPUTER_TILE_STATES[1] = 'linear-gradient(315deg, #485461 0%, #28313b 74%)';
      renderComputerBoard();
  } else {
      return;
  };
};