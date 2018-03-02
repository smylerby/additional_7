// ф*к мой мозг
module.exports = function solveSudoku(matrix) {
    let solv_arr = matrix;
    if (solved(matrix)) {
        for (let i = 0; i < 9; i++) {
            for (let y = 0; y < 9; y++) {
                solv_arr[i][y] = matrix[i][y];
            }
        }
    }
    return solv_arr;
}
function solved(arr) {
    let l = [0, 0];

    if (empty_loc(arr, l)) return true;
    let row = l[0];
    let col = l[1];
    
    for (let num = 1; num < 10; num++){
        if (loc_is_ok(arr, row, col, num)){
            arr[row][col] = num;
            if (solved(arr)) return true;
            arr[row][col] = 0;
        }
    }
    return false;
}
// проверка на отсутсвие в строке, столбце и боксе
function loc_is_ok(arr, row, col, num){
    return in_row(arr, row, num) && in_col(arr, col, num) && in_box(arr, row - row % 3, col - col % 3, num);
}
// 0?
function empty_loc(arr, l) {
    for (let row = 0; row < 9; row++){
        for (let col = 0; col < 9; col++){
            if (arr[row][col] === 0){
                l[0] = row;
                l[1] = col;
                return false;
            }
        }
    }
    return true;
}
// проверки:..
function in_row(arr, row, num) {
    for (let i = 0; i < 9; i++){
        if (arr[row][i] === num){
            return false;
        }
    }
    return true;
}

function in_col(arr, col, num) {
    for (let y = 0; y < 9; y++){
        if (arr[y][col] === num){
            return false;
        }
    }
    return true;
}

function in_box(arr, row, col, num) {
    for (let i = 0; i < 3; i++){
        for (let y = 0; y < 3; y++){
            if (arr[i + row][y + col] === num){
                return false;
            }
        }
    }
    return true;
}
// спасибо!