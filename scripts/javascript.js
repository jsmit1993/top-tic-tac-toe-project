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

