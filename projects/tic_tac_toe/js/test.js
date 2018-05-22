//Current objective: Write the checkColumns function and then allow the computer to place O's on the board. Once that is finished, start setting up the main game loop (player move, cpu move, repeat).


let TL = document.getElementById("TL"),
    TC = document.getElementById("TC"),
    TR = document.getElementById("TR"),
    CL = document.getElementById("CL"),
    CC = document.getElementById("CC"),
    CR = document.getElementById("CR"),
    BL = document.getElementById("BL"),
    BC = document.getElementById("BC"),
    BR = document.getElementById("BR");

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

//Assuming an onclick function has occured
function playerMove(id) {
    console.log("Player has placed a marker in " + id);

    // Overwrite the default underscore with the player's icon
    document.getElementById(id).innerHTML = "X";

    // Overwrite the default white font color (used to hide the underscore) with black
    document.getElementById(id).style.color = "#000000";

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
    console.log(boardArray);
}

function compTest() {
    if (!(checkRows() || checkColumns() || checkDiagonals())) {
//        while (boardArray[i][j] != "_") {
//            boardArray[Math.floor(Math.random() * 2)][Math.floor(Math.random() * 2)] = "O";
        console.log("Player is supposedly not close to winning.");
        //}
    }
    console.log(boardArray);
//    updateBoard();
}

function checkRows() {
    let x = 0;
    let blanks = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++){
            if (boardArray[i][j] == "X")
                x++;
            else if (boardArray[i][j] == "_")
                blanks++;
        }
        if (x == 2 && blanks == 1) {
            // Place an O in the blank space. LOOP THROUGH AGAIN LOOKING FOR THE UNDERSCORE. WHEN IT'S FOUND, REPLACE IT.
            console.log("Your row is foiled!");
            return true;
        }
        x = 0;
        blanks = 0;
    }
    return false;
}

function checkColumns() {
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
        console.log("Your diagonal is foiled!");
        return true;
    }

    // Reset variables for next test
    x = 0;
    blanks = 0;

    // Test diagonal from right to left
    let j = 2;
    for (let i = 0; i < 3; i++) {
        if (boardArray[i][j] == "X")
            x++;
        else if (boardArray[i][j] == "_")
            blanks++;
        j--;
    }
    if (x == 2 && blanks == 1) {
        // Place an O in the blank space. LOOP THROUGH AGAIN LOOKING FOR THE UNDERSCORE. WHEN IT'S FOUND, REPLACE IT.
        console.log("Your diagonal is foiled!");
        return true;
    }

    // If none of the previous tests have returned true, then return false
    return false;
}

//function updateBoard() {
//    switch (boardArray) {
//            case boardArray
//    }
//}
