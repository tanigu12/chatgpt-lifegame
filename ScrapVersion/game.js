// ゲーム盤のセルの状態を管理する2次元配列
let gameBoard = [];
// ゲーム盤のサイズ
const BOARD_SIZE = 50;
// ゲームを更新する間隔（ミリ秒）
const UPDATE_INTERVAL = 500;
// ゲームが実行中かどうかを示すフラグ
let isRunning = false;

// ゲーム盤を初期化する関数
function initGameBoard() {
    // ゲーム盤の2次元配列を初期化する
    for (let i = 0; i < BOARD_SIZE; i++) {
        gameBoard[i] = [];
        for (let j = 0; j < BOARD_SIZE; j++) {
            gameBoard[i][j] = false;
        }
    }
    // ゲーム盤を描画する
    drawGameBoard();
}

// ゲーム盤を描画する関数
function drawGameBoard() {
    const gameBoardElement = document.getElementById('game-board');
    gameBoardElement.innerHTML = '';
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            if (gameBoard[i][j]) {
                cellElement.classList.add('alive');
            }
            cellElement.addEventListener('click', function () {
                gameBoard[i][j] = !gameBoard[i][j];
                drawGameBoard();
            });
            gameBoardElement.appendChild(cellElement);
        }
    }
}

// ゲームを開始する関数
function startGame() {
    isRunning = true;
    setInterval(function () {
        if (isRunning) {
            updateGame();
        }
    }, UPDATE_INTERVAL);
}

// ゲームを停止する関数
function stopGame() {
    isRunning = false;
}

// ゲームを更新する関数
function updateGame() {
    const newGameBoard = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        newGameBoard[i] = [];
        for (let j = 0; j < BOARD_SIZE; j++) {
            const neighbors = countNeighbors(i, j);
            if (gameBoard[i][j] && neighbors === 2 || neighbors === 3) {
                newGameBoard[i][j] = true;
            } else if (!gameBoard[i][j] && neighbors === 3) {
                newGameBoard[i][j] = true;
            } else {
                newGameBoard[i][j] = false;
            }
        }
    }
    gameBoard = newGameBoard;
    drawGameBoard();
}

// 指定されたセルの周囲の生きているセルの数を数える関数
function countNeighbors(row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const r = row + i;
            const c = col + j;
            if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE && !(i === 0 && j === 0)) {
                if (gameBoard[r][c]) {
                    count++;
                }
            }
        }
    }
    return count;
}

// ゲームを初期化する
initGameBoard();
// ゲームを開始する
startGame();