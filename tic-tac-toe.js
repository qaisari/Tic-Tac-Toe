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
        return false;
    }
    currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
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
