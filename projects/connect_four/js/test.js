/*NOTE TO SELF: Focus on one problem at a time!
  Current Problems:
    How to rotate the two-dimensional array when rendering the game board. Is there a way I can adjust the id's of the buttons again to make it so the rotation happens automatically while still interacting seamlessly with the array?
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

    console.log(X + ", " + Y);

    //    if (turns % 2 == 0) {
    for (let i = X; i > 0; i--) {
        if (boardArray[i - 1][Y] == "_") {
            X = i - 1;
        }
    }
    boardArray[X][Y] = "R";
    document.getElementById(X + "-" + Y).style.backgroundColor = "red";
    document.getElementById(X + "-" + Y).style.color = "red";

    // Wait to re-enable turns until proper marker placement is working (using gravity to take the lowest available spot).
    //    } else {
    //        for (let i = X; i > 0; i--) {
    //            if (boardArray[i - 1][Y] == "_") {
    //                X = i - 1;
    //            }
    //        }
    console.log(boardArray);


    //Increment turns
    turns++;
}

//Idea for later use: animate the checker falling into place in the column when clicked.
