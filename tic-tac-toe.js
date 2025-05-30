const prompt = require("prompt-sync")();
const gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let currentPlayer = "";

function printBoard() {
    console.log(`
        ${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]}
        -------------
        ${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]}
        -------------
        ${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]}
        `);
}
