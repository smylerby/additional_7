module.exports = function solveSudoku(matrix) {
    return solved(matrix, 0, 0);
}

function solved(init, row, col){
    if (row === 9) return init;

    if (init[row][col] === 0) {
        let aSolv = [];
        aSolv.push(Secvals(init, row, col));
        aSolv.push(Rowsval(init[row]));
        aSolv.push(Colvals(init, col));

        let solve = getSolved(aSolv);
        for (let i = 0, length = solve.length; i < length; i++) {
            init[row][col] = solve[i];
            if (col === 8) {
                if (solved(init, row + 1, 0))      return init;
            } else if (solved(init, row, col + 1)) return init;
            init[row][col] = 0;
        }

    } else {
        if (col === 8) {
            if (solved(init, row + 1, 0))   return init;
        } else {
            if (solved(init, row, col + 1)) return init;
            }
        }
        return false;
}

function getSolved(arrSolved) {
    arrSolved.sort(function(a,b){
        return a.length - b.length;
    });
    let value = [];
    arrSolved[0].map(function(elem) {
        if ((arrSolved[0].indexOf(elem) >= 0) && (arrSolved[1].indexOf(elem) >= 0) && (arrSolved[2].indexOf(elem) >= 0)) {
            value.push(elem);
        }
    });
    if (value.length !== 0) return value;
    return 0;
}
function Secvals(init, row, col) {
    let set = new Set();
    let rowPos, colPos = 0, value = [];

    if      (row === 0 || row === 1 || row === 2){        rowPos = 0;    }
    else if (row === 3 || row === 4 || row === 5) {        rowPos = 3;    }
    else {        rowPos = 6;    }

    if      (col === 0 || col === 1 || col === 2){        colPos = 0;    }
    else if (col === 3 || col === 4 || col === 5) {        colPos = 3;    }
    else {        colPos = 6;    }

    for (let i = rowPos; i < rowPos + 3; i++) {
        for (let j = colPos; j < colPos + 3; j++) {
            if (init[i][j] !== 0) {
                set.add(init[i][j]);
            }
        }
    }
    for ( let i = 1; i <= 9; i++) {
        if (!(set.has(i))) {
            value.push(i);
        }
    }
    return value;
}

function Rowsval(row) {
    let set = new Set();
    let value = [];
    for (let i = 0; i < row.length; i++) {
        if (row[i] !== 0) {
            set.add(row[i]);        }
    }
    for (let i = 1; i <= 9; i++) {
        if (!(set.has(i))) {
            value.push(i);        }
    }
    return value;
}

function Colvals(initial, col) {
    let set = new Set();
    let value = [];
    for (let i = 0; i < initial.length; i++) {
        if (initial[i][col] !== 0) {
            set.add(initial[i][col]);
        }
    }
    for ( let i = 1; i <= 9; i++) {
        if (!(set.has(i))) {
            value.push(i);
        }
    }
    return value;
}