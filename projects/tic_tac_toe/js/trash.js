//Current objective: Debug so that all markers appear on the board.

//Error: If the cpu plays in the same place as the player, the cpu will overwrite the player. The cpu consistently plays either in the same place as the player or a place where it previously played, overwriting either the player or itself.



// HTML Objects
let TL = document.getElementById("TL"),
    TC = document.getElementById("TC"),
    TR = document.getElementById("TR"),
    CL = document.getElementById("CL"),
    CC = document.getElementById("CC"),
    CR = document.getElementById("CR"),
    BL = document.getElementById("BL"),
    BC = document.getElementById("BC"),
    BR = document.getElementById("BR");

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

function mainGameLoop() {
    // After the player has played, check to see if the player has won or if the board is full.
    if (checkPlayerWin()) {
        // Hide the game board and show a "Player Wins" screen (see wireframe picture for design).
        alert("Player Wins!");
    }
    if (checkBoardFull()) {
        // End game.
        alert("This test is over.");
    }

    // Once the checks have been done for the player, let the computer play.
    compTest();

    // After the computer has played, check to see if the computer has won or the board is full.
    if (checkCompWin()) {
        // Hide the game board and show a "CPU Wins" screen.
        alert("CPU Wins!");
    }
    if (checkBoardFull()) {
        // End game.
        alert("This test is over.");
    }
}

// Assuming an onclick function has occured
function playerMove(id) {
    const SPOT = document.getElementById(id);
    console.log(SPOT.innerHTML); // Shows what the spot on the board contains prior to play (hopefully an underscore).
    if (SPOT.innerHTML == "_") { // !(SPOT.innerHTML == "O" || SPOT.innerHTML == "X")
        console.log("Player has placed a marker in " + id);

        // Overwrite the default underscore with the player's icon
        SPOT.innerHTML = "X";

        // Overwrite the default white font color (used to hide the underscore) with black
        SPOT.style.color = "#000000";

        //  I HAVE COMMENTED OUT THE PREVIOUS TWO LINES BECAUSE I WANT TO TRY TO MAKE THE UPDATEBOARD FUNCTION UNIVERSAL AND MORE USEFUL. IT WILL HANDLE ALL THE SYMBOLS; NOT JUST THE COMPUTER'S.

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
        //        console.log(boardArray);
    }

    // If the player or computer has already placed a marker in this spot, end the function there to stop the computer from playing.
    else {
        console.log("A marker is already in place.");
        return;
    }
    mainGameLoop();
}

function compTest() {
    if (!(checkRows() || checkColumns() || checkDiagonals())) {
        console.log("Player is supposedly not close to winning.");

        // Place an "O" in a random spot on the board using Math.random().
        let i = 0;
        let j = 0;
        do {
            i = Math.floor(Math.random() * 3);
            j = Math.floor(Math.random() * 3);
        } while (!(boardArray[i][j] == "_")); // !(boardArray[i][j] == "_" || boardArray[i][j] == "X")        boardArray[i][j] == "_" && !(boardArray[i][j] == "X" || boardArray[i][j] == "O")

        // Remove later
        console.log("Computer has placed a marker at " + i + ", " + j);

        boardArray[i][j] = "O";
    }
    console.log(boardArray);
    updateBoard(); // updateBoard(i, j);
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
            console.log("Your row is foiled!");
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
            console.log("Your column is foiled!");
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
        console.log("Your diagonal is foiled!");
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
        console.log("Your diagonal is foiled!");
        return true;
    }

    // If none of the previous tests have returned true, then return false
    return false;
}

// This function only exists for the CPU. When the CPU plays, it puts a value in the array, and then the game board that the user sees must be updated based off of the array using this function.
function updateBoard() { // updateBoard(i, j)
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

    //    if (i == 0 && j == 0) {
    //        TL.innerHTML = "O";
    //        TL.style.color = "#000000";
    //    }
    //    if (i == 0 && j == 1) {
    //        TC.innerHTML = "O";
    //        TC.style.color = "#000000";
    //    }
    //    if (i == 0 && j == 2) {
    //        TR.innerHTML = "O";
    //        TR.style.color = "#000000";
    //    }
    //    if (i == 1 && j == 0) {
    //        CL.innerHTML = "O";
    //        CL.style.color = "#000000";
    //    }
    //    if (i == 1 && j == 1) {
    //        CC.innerHTML = "O";
    //        CC.style.color = "#000000";
    //    }
    //    if (i == 1 && j == 2) {
    //        CR.innerHTML = "O";
    //        CR.style.color = "#000000";
    //    }
    //    if (i == 2 && j == 0) {
    //        BL.innerHTML = "O";
    //        BL.style.color = "#000000";
    //    }
    //    if (i == 2 && j == 1) {
    //        BC.innerHTML = "O";
    //        BC.style.color = "#000000";
    //    }
    //    if (i == 2 && j == 2) {
    //        BR.innerHTML = "O";
    //        BR.style.color = "#000000";
    //    }

    // THE ISSUE IS WITH THIS SWITCH ARGUMENT. I'M NOT SURE HOW IT'S SUPPOSED TO WORK.
    // Now the break statements are making it so that only one mark is shown, so I've commented out the X marks.
    //    switch (true) {
    ////        case boardArray[0][0] == "X":
    ////            TL.innerHTML = "X";
    ////            TL.style.color = "#000000";
    ////            break;
    //        case boardArray[0][0] == "O":
    //            TL.innerHTML = "O";
    //            TL.style.color = "#000000";
    //            break;
    ////        case boardArray[0][1] == "X":
    ////            TC.innerHTML = "X";
    ////            TC.style.color = "#000000";
    ////            break;
    //        case boardArray[0][1] == "O":
    //            TC.innerHTML = "O";
    //            TC.style.color = "#000000";
    //            break;
    ////        case boardArray[0][2] == "X":
    ////            TR.innerHTML = "X";
    ////            TR.style.color = "#000000";
    ////            break;
    //        case boardArray[0][2] == "O":
    //            TR.innerHTML = "O";
    //            TR.style.color = "#000000";
    //            break;
    ////        case boardArray[1][0] == "X":
    ////            CL.innerHTML = "X";
    ////            CL.style.color = "#000000";
    ////            break;
    //        case boardArray[1][0] == "O":
    //            CL.innerHTML = "O";
    //            CL.style.color = "#000000";
    //            break;
    ////        case boardArray[1][1] == "X":
    ////            CC.innerHTML = "X";
    ////            CC.style.color = "#000000";
    ////            break;
    //        case boardArray[1][1] == "O":
    //            CC.innerHTML = "O";
    //            CC.style.color = "#000000";
    //            break;
    ////        case boardArray[1][2] == "X":
    ////            CR.innerHTML = "X";
    ////            CR.style.color = "#000000";
    ////            break;
    //        case boardArray[1][2] == "O":
    //            CR.innerHTML = "O";
    //            CR.style.color = "#000000";
    //            break;
    ////        case boardArray[2][0] == "X":
    ////            BL.innerHTML = "X";
    ////            BL.style.color = "#000000";
    ////            break;
    //        case boardArray[2][0] == "O":
    //            BL.innerHTML = "O";
    //            BL.style.color = "#000000";
    //            break;
    ////        case boardArray[2][1] == "X":
    ////            BC.innerHTML = "X";
    ////            BC.style.color = "#000000";
    ////            break;
    //        case boardArray[2][1] == "O":
    //            BC.innerHTML = "O";
    //            BC.style.color = "#000000";
    //            break;
    ////        case boardArray[2][2] == "X":
    ////            BR.innerHTML = "X";
    ////            BR.style.color = "#000000";
    ////            break;
    //        case boardArray[2][2] == "O":
    //            BR.innerHTML = "O";
    //            BR.style.color = "#000000";
    //            break;
    //    }
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
    //    console.log("Number of blanks remaining: " + blanks);
    if (blanks == 0)
        return true;
    else
        return false;
}
