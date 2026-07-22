function createPlayer(name, symbolChoice) {
    let roundsWon = 0;
    let symbol = symbolChoice.toUpperCase();
    return {name, roundsWon, symbol}
}

// const player1 = createPlayer('name', 'X');
// const player2 = createPlayer('name', 'O');

//need to put this is in a module instead of iife here.
const firstPlayer = (() => {
    if(player1.symbol === 'X') {
        return player1;
    } else {
        return player2;
    }
})();


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
    return board;
}