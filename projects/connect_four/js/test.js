/*NOTE TO SELF: Focus on one problem at a time!
  Current Problems:
    The checkRow() function is having difficulty checking to the right for unknown reasons. I've watched it run through the debugger, and I can't figure out what's wrong, so I've commented it out. I'm working on the other functions now and will return to the checkRow() function once I'm done with the diagonals. If I can finish these, I'm pretty much done!
*/

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

    let X = id.substring(0, 1);
    let Y = id.substring(2);

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
    //    checkFrontDiag(X, Y, inFrontDiag, color);
    //    checkBackDiag(X, Y, inBackDiag, color);
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
    //    if (X < 6) {
    //        for (let i = X; i < 6; i++) {
    //            if (boardArray[i + 1][Y] == color)
    //                inRow++;
    //            else
    //                break;
    //        }
    //    }

    console.log("In Row: " + inRow);

    // Check the total to see if it's four in a row
    if (inRow == 4) {
        if (color == "R")
            console.log("PLAYER 1 WINS!");
        else if (color == "B")
            console.log("PLAYER 2 WINS!");
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
            console.log("PLAYER 1 WINS!");
        else if (color == "B")
            console.log("PLAYER 2 WINS!");
        else
            console.log("Something went wrong with the victory...");
    }
}

function checkFrontDiag(X, Y, inFrontDiag, color) {

}

function checkBackDiag(X, Y, inBackDiag, color) {

}

//            console.log("X: " + X + "  i - 1: " + (i - 1));
//            console.log("X, Y: " + boardArray[X][Y] + "  X, i + 1: " + boardArray[i + 1][Y]);

//            console.log("X, Y - 1: " + X + " " + (Y - 1) + " " + boardArray[X][Y - 1]); // Goes past bottom of table. Undefined.
//            console.log("X, Y + 1: " + X + " " + (Y++) + " " + boardArray[X][Y + 1]); // Goes up one space when it works. It keeps doing string concatenation instead of incrementation, so something might be wrong with the substrings.
//            console.log("X - 1, Y: " + (X - 1) + " " + Y + " " + boardArray[X - 1][Y]); // Goes to the left one space.
//            console.log("X + 1, Y: " + (X + 1) + " " + Y + " " + boardArray[X + 1][Y]); // Should go to the right one space, but claims it's undefined and cannot read any values.
