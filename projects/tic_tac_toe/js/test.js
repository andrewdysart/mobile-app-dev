// Current objective: Get the touch events working for mobile. THEN, style the css and celebrate!

// Table of Contents
// 1. Variables
// 2. Background
// 3. Gameplay

/****************************************************************
 1. Variables
 ***************************************************************/

// HTML Objects
const TL = document.getElementById("TL"),
      TC = document.getElementById("TC"),
      TR = document.getElementById("TR"),
      CL = document.getElementById("CL"),
      CC = document.getElementById("CC"),
      CR = document.getElementById("CR"),
      BL = document.getElementById("BL"),
      BC = document.getElementById("BC"),
      BR = document.getElementById("BR"),
      MENU = document.getElementById("title_screen"),
      BOARD = document.getElementById("game_board"),
      GAMEOVER = document.getElementById("game_over"),
      PLAYERWIN = document.getElementById("player_victory"),
      CPUWIN = document.getElementById("cpu_victory"),
      DRAW = document.getElementById("draw"),
      PLAYERSCORE = document.getElementById("player_wins"),
      CPUSCORE = document.getElementById("cpu_wins");

let playerWins = "playerWins";
let cpuWins = "cpuWins";
let playerScore = localStorage.getItem("playerWins");
let cpuScore = localStorage.getItem("cpuWins");
if (playerScore == null) {
    playerScore = 0;
}
if (cpuScore == null) {
    cpuScore = 0;
}

// This local storage stuff is really confusing, so I'm sorry for my terrible variable names
//if (localStorage.length == 0) {
//    playerScore = 0;
//    cpuScore = 0;
//    localStorage.setItem("playerWins", playerScore);
//    localStorage.setItem("cpuWins", cpuScore);
//}
//else {
//    playerScore = localStorage.getItem("playerWins");
//    cpuScore = localStorage.getItem("cpuWins");
//}

// Made solely for the updateBoard function. We'll see if it works, and then if it can be applied anywhere else.
let elementArray = [[TL, TC, TR], [CL, CC, CR], [BL, BC, BR]];

// Represents the game board, and is updated with every play
let boardArray = [["_", "_", "_"], ["_", "_", "_"], ["_", "_", "_"]];

// Have not been able to test touch functions yet, so these are commented out
//TL.addEventListener("touchend", playerMove());
//TC.addEventListener("touchend", playerMove());
//TR.addEventListener("touchend", playerMove());
//CL.addEventListener("touchend", playerMove());
//CC.addEventListener("touchend", playerMove());
//CR.addEventListener("touchend", playerMove());
//BL.addEventListener("touchend", playerMove());
//BC.addEventListener("touchend", playerMove());
//BR.addEventListener("touchend", playerMove());

/****************************************************************
 2. Background
 ***************************************************************/

function mainMenu() {
    MENU.setAttribute("class", "show");
    BOARD.setAttribute("class", "hide");
    GAMEOVER.setAttribute("class", "hide");
}

function startGame() {
    // Show the gameboard and nothing else
    MENU.setAttribute("class", "hide");
    GAMEOVER.setAttribute("class", "hide");
    PLAYERWIN.setAttribute("class", "hide");
    CPUWIN.setAttribute("class", "hide");
    DRAW.setAttribute("class", "hide");
    BOARD.setAttribute("class", "show");

    // Reset the gameboard and its array
    TL.innerHTML = "_";
    TL.style.color = "#ffffff";
    TC.innerHTML = "_";
    TC.style.color = "#ffffff";
    TR.innerHTML = "_";
    TR.style.color = "#ffffff";
    CL.innerHTML = "_";
    CL.style.color = "#ffffff";
    CC.innerHTML = "_";
    CC.style.color = "#ffffff";
    CR.innerHTML = "_";
    CR.style.color = "#ffffff";
    BL.innerHTML = "_";
    BL.style.color = "#ffffff";
    BC.innerHTML = "_";
    BC.style.color = "#ffffff";
    BR.innerHTML = "_";
    BR.style.color = "#ffffff";
    boardArray = [["_", "_", "_"], ["_", "_", "_"], ["_", "_", "_"]];
}

/****************************************************************
 3. Gameplay
 ***************************************************************/

function mainGameLoop() {
    // After the player has played, check to see if the player has won or if the board is full.
    if (checkPlayerWin()) {
        // Hide the game board and show a "Player Wins" screen (see wireframe picture for design).
        BOARD.setAttribute("class", "hide");
        GAMEOVER.setAttribute("class", "show");
        PLAYERWIN.setAttribute("class", "show");
        playerScore++;
        PLAYERSCORE.innerHTML = playerScore;
        CPUSCORE.innerHTML = cpuScore;
        localStorage.setItem("playerWins", playerScore);
//        console.log("Player victory screen should be displaying...");
        return;
    }
    if (checkBoardFull()) {
        // End game.
        BOARD.setAttribute("class", "hide");
        GAMEOVER.setAttribute("class", "show");
        DRAW.setAttribute("class", "show");
        PLAYERSCORE.innerHTML = playerScore;
        CPUSCORE.innerHTML = cpuScore;
//        console.log("Draw screen should be displaying...");
        return;
    }

    // Once the checks have been done for the player, let the computer play.
    compTest();

    // After the computer has played, check to see if the computer has won or the board is full.
    if (checkCompWin()) {
        // Hide the game board and show a "CPU Wins" screen.
        BOARD.setAttribute("class", "hide");
        GAMEOVER.setAttribute("class", "show");
        CPUWIN.setAttribute("class", "show");
        cpuScore++;
        PLAYERSCORE.innerHTML = playerScore;
        CPUSCORE.innerHTML = cpuScore;
        localStorage.setItem("cpuWins", cpuScore);
//        console.log("CPU victory screen should be displaying...");
        return;
    }
    if (checkBoardFull()) {
        // End game.
        BOARD.setAttribute("class", "hide");
        GAMEOVER.setAttribute("class", "show");
        DRAW.setAttribute("class", "show");
        PLAYERSCORE.innerHTML = playerScore;
        CPUSCORE.innerHTML = cpuScore;
//        console.log("Draw screen should be displaying...");
        return;
    }
}

// Assuming an onclick function has occured
function playerMove(id) {
    const SPOT = document.getElementById(id);
    if (SPOT.innerHTML == "_") {
//        console.log("Player has placed a marker in " + id);

        // Overwrite the default underscore with the player's icon
        SPOT.innerHTML = "X";

        // Overwrite the default white font color (used to hide the underscore) with black
        SPOT.style.color = "#000000";

        // Use a switch statement to input the value into the 2d array
        switch (id) {
            case "TL":
                boardArray[0][0] = "X";
                break;
            case "TC":
                boardArray[0][1] = "X";
                break;
            case "TR":
                boardArray[0][2] = "X";
                break;
            case "CL":
                boardArray[1][0] = "X";
                break;
            case "CC":
                boardArray[1][1] = "X";
                break;
            case "CR":
                boardArray[1][2] = "X";
                break;
            case "BL":
                boardArray[2][0] = "X";
                break;
            case "BC":
                boardArray[2][1] = "X";
                break;
            case "BR":
                boardArray[2][2] = "X";
                break;
        }
    }

    // If the player or computer has already placed a marker in this spot, end the function there to stop the computer from playing.
    else {
//        console.log("A marker is already in place.");
        return;
    }
    mainGameLoop();
}

function compTest() {
    if (!(checkRows() || checkColumns() || checkDiagonals())) {
//        console.log("Player is supposedly not close to winning.");

        // Place an "O" in a random spot on the board using Math.random().
        let i = 0;
        let j = 0;
        do {
            i = Math.floor(Math.random() * 3);
            j = Math.floor(Math.random() * 3);
        } while (!(boardArray[i][j] == "_"));

        // Remove later
//        console.log("Computer has placed a marker at " + i + ", " + j);

        boardArray[i][j] = "O";
    }
//    console.log(boardArray);
    updateBoard();
}

function checkRows() {
    let x = 0;
    let blanks = 0;

    // Loop through the rows checking for Xs and blanks, going from right to left, top to bottom.
    let i = 0;
    let j = 0;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (boardArray[i][j] == "X")
                x++;
            else if (boardArray[i][j] == "_")
                blanks++;
        }
        if (x == 2 && blanks == 1) {
            // Place an O in the blank space. LOOP THROUGH AGAIN LOOKING FOR THE UNDERSCORE. WHEN IT'S FOUND, REPLACE IT.
            j = 0;
            while (boardArray[i][j] != "_") {
                j++;
            }
            boardArray[i][j] = "O";
//            console.log("Your row is foiled!");
            return true;
        }

        // Reset variables for the next row.
        x = 0;
        blanks = 0;
    }
    return false;
}

function checkColumns() {
    let x = 0;
    let blanks = 0;

    // Loop through the columns, going top to bottom, right to left.
    let j = 0;
    let i = 0;
    for (j = 0; j < 3; j++) {
        for (i = 0; i < 3; i++) {
            if (boardArray[i][j] == "X")
                x++;
            else if (boardArray[i][j] == "_")
                blanks++;
        }
        if (x == 2 && blanks == 1) {
            // Place an O in the blank space. LOOP THROUGH AGAIN LOOKING FOR THE UNDERSCORE. WHEN IT'S FOUND, REPLACE IT.
            i = 0;
            while (boardArray[i][j] != "_") {
                i++;
            }
            boardArray[i][j] = "O";
//            console.log("Your column is foiled!");
            return true;
        }

        // Reset variables for the next column.
        x = 0;
        blanks = 0;
    }

    // If none of the previous tests have returned true, then return false
    return false;
}

function checkDiagonals() {
    let x = 0;
    let blanks = 0;

    // Test diagonal from left to right
    for (let i = 0; i < 3; i++) {
        if (boardArray[i][i] == "X")
            x++;
        else if (boardArray[i][i] == "_")
            blanks++;
    }
    if (x == 2 && blanks == 1) {
        // Place an O in the blank space. LOOP THROUGH AGAIN LOOKING FOR THE UNDERSCORE. WHEN IT'S FOUND, REPLACE IT.
        let i = 0;
        while (boardArray[i][i] != "_") {
            i++;
        }
        boardArray[i][i] = "O";
//        console.log("Your diagonal is foiled!");
        return true;
    }

    // Reset variables for next test
    x = 0;
    blanks = 0;

    // Test diagonal from right to left
    for (let i = 0, j = 2; i < 3; i++, j--) {
        if (boardArray[i][j] == "X")
            x++;
        else if (boardArray[i][j] == "_")
            blanks++;
    }
    if (x == 2 && blanks == 1) {
        // Place an O in the blank space. LOOP THROUGH AGAIN LOOKING FOR THE UNDERSCORE. WHEN IT'S FOUND, REPLACE IT.
        let i = 0;
        let j = 2;
        while (boardArray[i][j] != "_") {
            i++;
            j--;
        }
        boardArray[i][j] = "O";
//        console.log("Your diagonal is foiled!");
        return true;
    }

    // If none of the previous tests have returned true, then return false
    return false;
}

// This function only exists for the CPU. When the CPU plays, it puts a value in the array, and then the game board that the user sees must be updated based off of the array using this function.
function updateBoard() {
    let i;
    let j;
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (boardArray[i][j] == "O") {
                elementArray[i][j].innerHTML = "O";
                elementArray[i][j].style.color = "#000000";
            }
        }
    }
}

function checkPlayerWin() {
    let x = 0;

    // Check rows
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (boardArray[i][j] == "X")
                x++;
        }

        // If three in a row, player wins. Otherwise, reset the variable.
        if (x == 3)
            return true;
        else
            x = 0;
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            if (boardArray[i][j] == "X")
                x++;
        }

        // If three in a row, player wins. Otherwise, reset the variable.
        if (x == 3)
            return true;
        else
            x = 0;
    }

    // Check diagonal from left to right
    for (let i = 0; i < 3; i++) {
        if (boardArray[i][i] == "X")
            x++;
    }

    // If three in a row, player wins. Otherwise, reset the variable.
    if (x == 3)
        return true;
    else
        x = 0;

    // Test diagonal from right to left
    for (let i = 0, j = 2; i < 3; i++, j--) {
        if (boardArray[i][j] == "X")
            x++;
    }
    // If three in a row, player wins. Otherwise, reset the variable.
    if (x == 3)
        return true;
    else
        return false;
}

function checkCompWin() {
    let o = 0;

    // Check rows
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (boardArray[i][j] == "O")
                o++;
        }

        // If three in a row, cpu wins. Otherwise, reset the variable.
        if (o == 3)
            return true;
        else
            o = 0;
    }

    // Check columns
    for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 3; i++) {
            if (boardArray[i][j] == "O")
                o++;
        }

        // If three in a row, cpu wins. Otherwise, reset the variable.
        if (o == 3)
            return true;
        else
            o = 0;
    }

    // Check diagonal from left to right
    for (let i = 0; i < 3; i++) {
        if (boardArray[i][i] == "O")
            o++;
    }

    // If three in a row, cpu wins. Otherwise, reset the variable.
    if (o == 3)
        return true;
    else
        o = 0;

    // Test diagonal from right to left
    for (let i = 0, j = 2; i < 3; i++, j--) {
        if (boardArray[i][j] == "O")
            o++;
    }

    // If three in a row, cpu wins. Otherwise, reset the variable.
    if (o == 3)
        return true;
    else
        return false;
}

function checkBoardFull() {
    let blanks = 0;
    for (let i = 0; i < boardArray.length; i++) {
        for (let j = 0; j < 3; j++) {
            if (boardArray[i][j] == "_")
                blanks++;
        }
    }
    //    console.log("Blanks: " + blanks);
    if (blanks == 0)
        return true;
    else
        return false;
}
