let gameBoard;
let currentPlayer = "❌";
let text;

window.addEventListener('DOMContentLoaded', function() {
    gameBoard = [
        document.getElementById("cell-0"),
        document.getElementById("cell-1"),
        document.getElementById("cell-2"),
        document.getElementById("cell-3"),
        document.getElementById("cell-4"),
        document.getElementById("cell-5"),
        document.getElementById("cell-6"),
        document.getElementById("cell-7"),
        document.getElementById("cell-8")
    ];
    text = document.getElementById("text");
});

function submitMove(input) {
    if (input >= 0 && input <= 8) {
        handleMove(input);    
    } else {
        alert("Invalid move, try again!");
    }
}
function handleMove(position) {
    if (gameBoard[position].textContent === "") {
        gameBoard[position].textContent = currentPlayer;
    } else {
        alert("Current position is occupied");
    }
    
    if (checkWin()) {
        text.innerHTML = `Player ${currentPlayer} won!`;
        setTimeout(() => {
            endGame();
        }, 1000);
        return;
    }

    if (gameBoard.every(cell => cell.textContent !== "")) {
        text.innerHTML = "The game is draw";
        setTimeout(() => {
            endGame();
        }, 1000);
        return;
    }
    setTimeout(() => {
        currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
        text.innerHTML = `Player ${currentPlayer} enter your move (0-8): `;
    }, 100);
    
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
        return gameBoard[a].textContent === currentPlayer &&
               gameBoard[b].textContent === currentPlayer &&
               gameBoard[c].textContent === currentPlayer;
    })
}
function startGame() {
    text.innerHTML = `Player ${currentPlayer} enter your move (0-8): `;
}
function endGame() {
    gameBoard.forEach(cell => cell.textContent = "");
    text.innerHTML = "Start";
}