## BATTLESHIP

## Functionality

As a user, I want this feature because this reason:

- I want to be able to see both my screen and the computer's screen.
- I want the game to have alternating turns.
- I want to be able to place my 5 ships wherever I want on my grid and be able to rotate them (horizontally or vertically).
- I want to be able to click on a specific cell of the computers grid to generate one of two outcomes, a match on the computers ship location resulting in a hit, and a miss. Both of which will change a color on the board and display a message.
- I want a sound to play for both hits and misses.
- I want to display the name of the game above the boards.
- I want to display whose turn it is, and I also want to see a message indicating whether it's a hit or a miss, as well as if a ship is sunk.
- I want the computer to randomly pick coordinates on my grid until it gets a hit, and then have it shoot around the hit.
- I want a message to be displayed when there is a winner.
- I want to display a color change when hovering over an enemy cell to preview your turn.

If I have some time, I would like to add the following:

- A difficulty setting with options for easy, medium, and impossible.

- A little menu that will change the backgrounds of the boards, 7 options (each option is a picture of one of the oceans).

- Whenever it is the players turn there is a 1/1000 chance that a button appears to destroy the entire enemy grid (nuclear option).

## Look and Design of the App

- A blue grid representing water.
- Ships represented by grey tiles.
- Hits represented by red tiles.
- Misses represented by white tiles.
- A cool war-style font.

## Wireframe for the UI

- Wireframe will be created using 2 divs with 100 divs inside each, one for each tile on the player/computer board.
- Create an element for the players ship selection.
- Include an element for displaying scores.

## Pseudocode

- Constants

- const TILE_STATES = An object with three properties, 0, 1, 2, 3 each with a key represented by a color, which will determine the state of the tile (empty, sunk, hit, miss).

State Variables -

- let humanShips, computerShips: two seperate objects that will have 6 properties, 5 ships (with keys of coords (cXrX)) and a ships sunk property (0-5)
- let computerShips = an object that will have 6 properties, 5 ships (with keys of coords (cXrX)) and a ships sunk property (0-5)
- let humanBoard = will intialize when intialize is called
- let computerBoard = will intialize when intialize is called
- let winner = if computerships.shipssunk or humanShips.shipssunk = 5, they lose, other wins
- let turn = The variable turn will most likely be 1 or -1.

Cached Elements -

- const humanGrid = html div parent of 100 elements
- const computerGrid = html div parent of 100 elements
- const messageBox = html div displaying messages
- const playBtn = the play again button
- const rotateBtn = button to rotate ships before game
- const shipYard = where all player ships are before game starts
- const input = where the player can enter the cords for their ships
- const confirm = takes the input value, decides where to place ship on grid

Event Listeners -

-An event listener should be set to listen for clicks on the "Play Again" button to re-initialize the board elements.
-An event listener should be in place to listen for clicks on the Computer grid to select a specific cell.
-A click on a ship in the shipYard should make that specific ship the selected element and then let you manipulate it via the rotate button.
-Clicking on the rotate button should also trigger an event to rotate your ship.
-An Event listener on the input field confirm button.

Functions -

intialize()

- Make human and computer boards divs line up to values in an array of all 0s to indicate empty.
- Will put the players 'ships' in the shipYard.
- Reset turn to 1.
- Reset winner to null.
- Calls randomizeComputerShips() to set the grid location of comptuer ships.
- Calls the render() function to update the gamestate on DOM.

render()

- renderboard() lines up array values to div coordinate locaiton.
- renderMessage() Updates user interface with current info about state of game.
- renderControls() toggle play again button.

renderBoards()

- humanboard.foreach line up each div with array value.
- computerboard.foreach line up each div with array value.

renderMessages()

- Updates user interface with current info about state of game.

renderControls()

- Will determine whether the "Play Again" button is visible
- Will determine if the shipyard div is visible

handleAttack()

- When enemy div is clicked, it will compare its value to the value of the click, if there is a ship there it will indicate a hit, if not, a miss
- Won't be able to attack if game is over or spot has already been clicked.
- computerTurn()- computer attacks.
- checkWinner()- checks to see if one of the players has all 5 ships sunk
- render()

randomizeComputerShips()

- Will generate random column and index numbers to match against computership objects, and eventually the computerGrid
- Will decide if ship is horizontal or vertical
- Will NOT display for UI(defeats purpose of game).

computerTurn()

- generates 2 random numbers (column, row) for the computer to attack the players grid.
- if previous turn was hit, shrink scale on randomly generated numbers to the range of the hit. (if creating easy, medium, hard modes).

checkWin()

- will check to see if either player/computer objects shipsSunk property key value is 5 to determine winner.

## WireFrame Picture

![WireFrame](/images/wireframe.png)
