let gameBoard;
let currentPlayer = "❌";
let text;
let x = 0;
let o = 0;
let scoreX = document.getElementById("player-x-score");
let scoreO = document.getElementById("player-o-score");

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
        return;
    }
    
    if (checkWin() && window.location.href.includes("bot.html")) {
        if(currentPlayer === "❌") {
            text.innerHTML = "Player ❌ Won!";
        } else {
            text.innerHTML = "Bot ⭕ Won!"
        }
        score(currentPlayer);
        setCellsEnabled(false);
        setTimeout(() => {
            endGame();
        }, 1000);
        return;
    } else if (checkWin() && window.location.href.includes("index.html")) {
        text.innerHTML = `Player ${currentPlayer} Won!`;
        score(currentPlayer);
        setCellsEnabled(false);
        setTimeout(() => {
            endGame();
        }, 1000);
        return;
    }

    if (gameBoard.every(cell => cell.textContent !== "")) {
        text.innerHTML = "The game is draw";
        setCellsEnabled(false);
        setTimeout(() => {
            endGame();
        }, 1000);
        return;
    }
    currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
    if (window.location.href.includes('bot.html') && currentPlayer === "⭕") {
        let dots = 0;
        const thinkingInterval = setInterval(() => {
            dots = (dots % 4) + 1;
            text.innerHTML = "Bot is thinking" + ".".repeat(dots);
        }, 300);
        setTimeout(() => {
            clearInterval(thinkingInterval);
            botMove();
        }, 2500);
    } else {
        text.innerHTML = `Player ${currentPlayer} enter your move: `
    }
    
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
    text.innerHTML = `Player ${currentPlayer} enter your move: `;
}
function endGame() {
    gameBoard.forEach(cell => cell.textContent = "");
    setCellsEnabled(true);
    currentPlayer = "❌";
    text.innerHTML = "Start";
}
function score(winner) {
    if (winner === "❌") {
        x++;
        scoreX.innerHTML = x;
    } else {
        o++;
        scoreO.innerHTML = o;
    }
}
function resetGame() {
    x = 0;
    o = 0;
    scoreX.innerHTML = 0;
    scoreO.innerHTML = 0;
    endGame();
}
function setCellsEnabled(enabled) {
    gameBoard.forEach(cell => {
        cell.disabled = !enabled;
    });
}
function botMove() {
    const emptyCells = [];
    gameBoard.forEach((cell, index) => {
        if(cell.textContent === "") {
            emptyCells.push(index);
        }
    });
    if (emptyCells.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const botChoice = emptyCells[randomIndex];
        handleMove(botChoice);
    }
}
// function botGame() {
//     currentPlayer = "❌";
//     text.innerHTML = `Player ${currentPlayer} enter move: `;
//     setCellsEnabled(true);
//     //clear the board
//     gameBoard.forEach(cell => cell.textContent = "");
// }