function createPlayer(name, symbolChoice) {
    let roundsWon = 0;
    let symbol = symbolChoice.toUpperCase();
    return {name, roundsWon, symbol}
}

function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    }

    const availableCell = [];
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (board[i][j].getValue() === 0) {
                availableCell.push({row: i, col: j});
            }
        }
    }

    if (!availableCell.length) return null;

    const printGameBoard = () => {
        const boardWithCells = board.map((rows) => 
            rows.map((cell) => cell.getValue())
        );
        console.log(boardWithCells);
    }

    const dropSymbol = (columns, rows, player) => {
        if (!board[rows] || !board[rows][columns]) {
            console.log("Invalid Move");
            return false;
        }

        if (board[rows][columns].getValue() !== 0) {
            console.log("Spot taken! Try a different one.");
            return false;
        }

        board[rows][columns].addSymbol(player);
        return true;
    }

    const winCombo = (symbol) => {
        for (let i = 0; i < 3; i++) {
            if (board[i].every(cell => cell.getValue() === symbol)) return true;
            if ([board[0][i], board[1][i], board[2][i]].every(cell => cell.getValue() === symbol)) return true;
        }

        if (board[0][0].getValue() === symbol && board[1][1].getValue() === symbol && board[2][2].getValue() === symbol) return true;
        if (board[0][2].getValue() === symbol && board[1][1].getValue() === symbol && board[2][0].getValue() === symbol) return true;
        return false;
    }

    const boardFull = () => {
        return board.every(rows => rows.every(cell => cell.getValue() !== 0))
    }
    return {board, dropSymbol, boardFull, winCombo, printGameBoard};
}

function cell() {
    let value = 0;
    const addSymbol = (player) => {
        value = player;
    };

    const getValue = () => value;

    return {addSymbol, getValue};
}

function gameController() {
    let board = gameBoard();
    const players = [
        createPlayer('Player 1', 'X'),
        createPlayer('Player 2', 'O')
    ];

    let activePlayer = players[0].symbol === 'X' ? players[0] : players[1];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printGameBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const resetGameLogic = () => {
        board = gameBoard();
        activePlayer = players[0];
    }
    const playRound = (columns, rows) => {
        console.log(`Filling column ${columns} and row ${rows} spot with ${getActivePlayer().symbol}`);
        const moveSuccessful = board.dropSymbol(columns, rows, getActivePlayer().symbol);

        if (moveSuccessful) {
            if (board.winCombo(getActivePlayer().symbol)) {
                board.printGameBoard();
                console.log(`🎉 ${getActivePlayer().name} wins!`);
                const gameWon = `🎉 ${getActivePlayer().name} has won the game! 🎉`;
                gameWon;
                return "win";
            }
            if (board.boardFull()) {
                board.printGameBoard();
                console.log(`🤝 It's a tie!`);
                const gameTie = `🤝 It's a tie!`;
                gameTie;
                return "tie";
            }
            switchPlayerTurn();
            printNewRound();
        }      
    }
    printNewRound();
    const getBoard = () => board;
    return {playRound, getActivePlayer, getBoard, resetGameLogic};
}

const game = gameController();

function displayGame() {
    const gameInfo = document.querySelector('.gameInfo');
    const gameUI = document.querySelector('.gameBoard');
    const resetBtn = document.querySelector('.reset');

    const controller = gameController();

    let isGameOver = false;
    let endMessage = "";

    const updateDisplay = () => {
        gameUI.innerHTML = '';

        if (isGameOver) {
            gameInfo.textContent = endMessage;
        } else {
            const activePlayer = controller.getActivePlayer();
            gameInfo.textContent = `${activePlayer.name}'s turn (${activePlayer.symbol})`;
        }
        const boardInstance = controller.getBoard().board;

        boardInstance.forEach((row, rowIndex) =>{
            row.forEach((cell, columnIndex) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');

                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;

                const cellValue = cell.getValue();
                cellButton.textContent = cellValue === 0 ? '' : cellValue;

                if (cellValue === "X") {
                    cellButton.style.color = 'Red';
                }

                if (cellValue === "O") {
                    cellButton.style.color = 'Blue';
                }

                if (isGameOver || cellValue !== 0) {
                    cellButton.disabled = true;
                }

                gameUI.appendChild(cellButton);
            })
        });

        
    };
    gameUI.addEventListener('click', (e) => {
        if (!e.target.classList.contains('cell')) return;
        if (isGameOver) return; 

        const selectedRow = parseInt(e.target.dataset.row);
        const selectedColumn = parseInt(e.target.dataset.column);

        const roundLogic = controller.playRound(selectedColumn, selectedRow);
        
        if(roundLogic === "win") {
            isGameOver = true;
            endMessage = `🎉 ${controller.getActivePlayer().name} has won the game! 🎉`;
        } else if (roundLogic === "tie") {
            isGameOver = true;
            endMessage = `🤝 It's a tie!`;
        }

        updateDisplay();
    });

    resetBtn.addEventListener('click', () => {
        controller.resetGameLogic(); 
        isGameOver = false;          
        endMessage = "";             
        updateDisplay();             
    });

    updateDisplay();

    return {updateDisplay};
}
const userInterface = displayGame();
