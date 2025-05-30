const prompt = require("prompt-sync")();
const gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = "❌";
let gameActive = true;

function printBoard() {
    console.log(`
        ${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]}
        -------------
        ${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]}
        -------------
        ${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]}
        `);
}
function handleMove(position) {
    if (gameBoard[position] === " ") {
        gameBoard[position] = currentPlayer;
    } else {
        console.log("Current position is occupied");
    }
    if (checkWin()) {
        printBoard();
        gameActive = false;
        console.log(`Player ${currentPlayer} won!`);
    }
    if (gameBoard.every(cell => cell !== " ")) {
        printBoard();
        gameActive = false;
        console.log("The game is draw");
    }
    currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
}
function checkWin() {
    const conditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    return conditions.some(conditions => {
        let [a,b,c] = conditions;
        return gameBoard[a] === currentPlayer && gameBoard[b] === currentPlayer && gameBoard[c] === currentPlayer;
    })
}
while(gameActive) {
    printBoard();
    let playerInput = prompt(`Player ${currentPlayer} enter your move (0-8): `);
    if (playerInput >= 0 && playerInput <= 8) {
        handleMove(playerInput);    
    } else {
        console.log("Invalid move, try again!");
    }
}
