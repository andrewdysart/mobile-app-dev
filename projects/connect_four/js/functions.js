"use strict";

// Variables
let turns = 0;
let boardArray = [
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
    ["_", "_", "_", "_", "_", "_"],
];

// Function for testing the play action. Works for both players, using the turn variable to track whose turn it is.
function play(id) {

    const MARKER = document.getElementById(id);

    let X = parseInt(id.substring(0, 1));
    let Y = parseInt(id.substring(2));

    //    console.log("Coordinates before gravity: " + X + ", " + Y);

    if (turns % 2 == 0) {
        for (let i = Y; i > 0; i--) {
            if (boardArray[X][i - 1] == "_") {
                Y = i - 1;
            }
        }
        boardArray[X][Y] = "R";
        document.getElementById(X + "-" + Y).style.backgroundColor = "red";
        document.getElementById(X + "-" + Y).style.color = "red";
    } else {
        for (let i = Y; i > 0; i--) {
            if (boardArray[X][i - 1] == "_") {
                Y = i - 1;
            }
        }
        boardArray[X][Y] = "B";
        document.getElementById(X + "-" + Y).style.backgroundColor = "black";
        document.getElementById(X + "-" + Y).style.color = "black";
    }

    //    console.log("Coordinates after gravity: " + X + ", " + Y);

    console.log(boardArray);

    checkForWin(X, Y, turns);

    //Increment turns
    turns++;
}

function checkForWin(X, Y, turns) {
    let inRow = 1;
    let inColumn = 1;
    let inFrontDiag = 1;
    let inBackDiag = 1;
    let color;
    if (turns % 2 == 0)
        color = "R";
    else
        color = "B";

    checkRow(X, Y, inRow, color);
    checkColumn(X, Y, inColumn, color);
    checkFrontDiag(X, Y, inFrontDiag, color);
    checkBackDiag(X, Y, inBackDiag, color);
    checkForBlanks();
}

function checkRow(X, Y, inRow, color) {
    // Check to the left of the marker (if it's not on the left edge)
    console.log("X: " + X + "  Y: " + Y);
    if (X > 0) {
        for (let i = X; i > 0; i--) {
            if (boardArray[i - 1][Y] == color)
                inRow++;
            else
                break;
        }
    }

    // Check to the right of the marker (if it's not on the right edge)
    if (X < 6) {
        for (let i = X; i < 6; i++) {
            if (boardArray[i + 1][Y] == color)
                inRow++;
            else
                break;
        }
    }

    console.log("In Row: " + inRow);

    // Check the total to see if it's four in a row
    if (inRow == 4) {
        if (color == "R")
            gameOverP1Win();
        else if (color == "B")
            gameOverP2Win();
        else
            console.log("Something went wrong with the victory...");
    }
}

function checkColumn(X, Y, inColumn, color) {
    // Check below the marker (if it's not at the bottom)
    if (Y > 0) {
        for (let i = Y; i > 0; i--) {
            if (boardArray[X][i - 1] == color)
                inColumn++;
            else
                break;
        }
    }

    //     Check above the marker (if it's not at the top)
    if (Y < 5) {
        for (let i = Y; i < 5; i++) {
            if (boardArray[X][Y + 1] == color)
                inColumn++;
            else
                break;
        }
    }

    console.log("In Column: " + inColumn);

    // Check the total to see if it's four in a row
    if (inColumn == 4) {
        if (color == "R")
            gameOverP1Win();
        else if (color == "B")
            gameOverP2Win();
        else
            console.log("Something went wrong with the victory...");
    }
}

function checkFrontDiag(X, Y, inFrontDiag, color) {
    // Create temporary variables to use for the loops
    let tempX = X;
    let tempY = Y;

    // Check up-right
    if (X < 6 && Y < 5) {
        while (tempX < 6 && tempY < 5) {
            if (boardArray[tempX + 1][tempY + 1] == color)
                inFrontDiag++;
            else
                break;
            tempX++;
            tempY++;
        }
    }

    // Reset temporary variables for next loop
    tempX = X;
    tempY = Y;

    // Check down-left
    if (X > 0 && Y > 0) {
        while (tempX > 0 && tempY > 0) {
            if (boardArray[tempX - 1][tempY - 1] == color)
                inFrontDiag++;
            else
                break;
            tempX--;
            tempY--;
        }
    }

    console.log("In Front Diagonal: " + inFrontDiag);

    // Check the total to see if it's four in a row
    if (inFrontDiag == 4) {
        if (color == "R")
            gameOverP1Win();
        else if (color == "B")
            gameOverP2Win();
        else
            console.log("Something went wrong with the victory...");
    }
}

function checkBackDiag(X, Y, inBackDiag, color) {
    // Create temporary variables to use for the loops
    let tempX = X;
    let tempY = Y;

    // Check up-left
    if (X > 0 && Y < 5) {
        while (tempX > 0 && tempY < 5) {
            if (boardArray[tempX - 1][tempY + 1] == color)
                inBackDiag++;
            else
                break;
            tempX--;
            tempY++;
        }
    }

    // Reset temporary variables for next loop
    tempX = X;
    tempY = Y;

    // Check down-right
    if (X < 6 && Y > 0) {
        while (tempX < 6 && tempY > 0) {
            if (boardArray[tempX + 1][tempY - 1] == color)
                inBackDiag++;
            else
                break;
            tempX++;
            tempY--;
        }
    }

    console.log("In Back Diagonal: " + inBackDiag);

    // Check the total to see if it's four in a row
    if (inBackDiag == 4) {
        if (color == "R")
            gameOverP1Win();
        else if (color == "B")
            gameOverP2Win();
        else
            console.log("Something went wrong with the victory...");
    }
}

// Checks to see if the board is full. If the board is full and no one won, the game is a draw. VERY IMPORTANT: This function should only be called after the board has been checked for player wins, not before!
function checkForBlanks() {
    let blanks;
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 5; j++) {
            if (boardArray[i][j] == "_")
                blanks++;
        }
    }
    if (blanks == 0) {
        gameOverDraw();
    }
}

// Displays the win screen for Player 1.
function gameOverP1Win() {

}

// Displays the win screen for Player 2
function gameOverP2Win() {

}

// Displays the draw screen, the board having filled up without either player getting four in a row.
function gameOverDraw() {

}
