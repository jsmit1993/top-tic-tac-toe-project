function createPlayer(name, symbolChoice) {
    let roundsWon = 0;
    let symbol = symbolChoice.toUpperCase();
    return {name, roundsWon, symbol}
}

// const player1 = createPlayer('name', 'X');
// const player2 = createPlayer('name', 'O');



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

    return {board, availableCell};
}

function cell() {
    let value = 0;

    const addSymbol = (player) => {
        value = player;
    }

    const getSymbol = () => value;

    return {addSymbol, getSymbol};
}

//here is the module for the game controller
function gameController(playerOne = "Player 1", playerTwo = "Player 2") {
    const board = gameBoard();
    const players = [
        {
            name: playerOne,
            token: 'X'
        },
        {
            name: playerTwo,
            token: 'O'
        }
    ];

    let activePlayer = players[0];

    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn`);
    }
}