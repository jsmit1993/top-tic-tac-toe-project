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

    return {board, dropSymbol, printGameBoard};
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
    const board = gameBoard();
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

    const playRound = (columns, rows) => {
        console.log(`Filling column ${columns} and row ${rows} spot with ${getActivePlayer().symbol}`);
        const moveSuccessful = board.dropSymbol(columns, rows, getActivePlayer().symbol);

        if (moveSuccessful) {
            switchPlayerTurn();
            printNewRound();
        }
    }

    printNewRound();

    return {playRound, getActivePlayer};
}

const game = gameController();