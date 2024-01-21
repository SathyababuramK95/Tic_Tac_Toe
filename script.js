document.addEventListener('DOMContentLoaded', function () {
    const playerXInput = document.getElementById('playerX');
    const playerOInput = document.getElementById('playerO');
    const scoreXElement = document.getElementById('scoreX');
    const scoreOElement = document.getElementById('scoreO');
    const gameBoard = document.getElementById('game-board');

    // Initialize the player and board values, score
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let scores = { X: 0, O: 0 };

    //Rendering the grid board for the game
    function renderBoard() {
        gameBoard.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.textContent = board[i];
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }

    //Handle the event, when player click on the board
    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (board[index] === '') {
            board[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                scores[currentPlayer]++;
                updateScore();
                alert(`Player ${currentPlayer} wins!`);
                resetGame();
            } else if (board.every(cell => cell !== '')) {
                alert('It\'s a draw!');
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    //Checking winner in every click event
    function checkWinner() {
        const winningPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winningPatterns.some(pattern =>
            pattern.every(index => board[index] === currentPlayer)
        );
    }

    //updating score after every game for the player
    function updateScore() {
        scoreXElement.textContent = `${playerXInput.value}: ${scores.X}`;
        scoreOElement.textContent = `${playerOInput.value}: ${scores.O}`;
    }

    //reseting game to the start
    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        renderBoard();
    }


    //Calling render board function after html renders
    renderBoard();
});
