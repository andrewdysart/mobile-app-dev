/*
Game Start:
Retrieve scores from local memory
Display blank board
"Coin flip" to see who goes first
    Pick a number between one and ten
    Player and CPU pick number
    Whoever is closest goes first
    Whoever wins coin flip chooses between Xs and Os

Main Game Loop:
    For each player turn:
    Wait for fingerUp.
    If space is not already occupied, place icon
    End turn

    For each cpu turn:
    Check for two in a row horizontally
    Check for two in a row vertically
    Check for two in a row in either diagonal
    If any of these are true, place an icon to block the player

If player gets three in a row:
Display victory
Increment player wins
Activate endgame

If cpu gets three in a row
Display loss
Increment cpu wins
Activate endgame

Endgame:
Display player and cpu wins
Display "Play Again" and "Quit" buttons

If "Play Again" is selected:
Display blank board
Coin flip
Start Main Game Loop

If "Quit" is selected:
Return to home screen (with title and start button)
*/

// DO NOT DO ANY MORE PROGRAMMING BEFORE YOU CHART OUT EVERYTHING, AND I MEAN EVERYTHING. EACH FUNCTION WILL DO ONE THING, AND ONE THING ONLY (FUNCTIONAL COHESION). YOU KNOW HOW TO DESIGN, BUT YOU DON'T KNOW HOW TO PROGRAM. DON'T JUST JUMP IN. TAKE IT SLOWLY, AND PLAN IT OUT.

// Variables
const START = document.getElementById("start_button");
let board = document.getElementById("game_board");

// Event listeners
START.addEventListener("touchend", main, false);

function main(evt) {
    // Hide the start button now that it has been pressed
    START.setAttribute("class", "hide");


    // Let the button start the game
    evt.preventDefault();
    console.log("Game initializing.");

    // Retrieve scores from local memory

    // Display a blank game board
    displayBoard();
}

function displayBoard() {
    // Make the game area visible on the screen
    board.setAttribute("class", "show")

    // Display a blank game board. The last line uses non-breaking spaces because normal ones won't show up in html.
//    board.innerHTML = "___|___|___<br>" +
//                      "___|___|___<br>" +
//        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
}
