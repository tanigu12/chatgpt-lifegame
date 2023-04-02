const numRows = 50;
const numCols = 50;

// Initialize the grid with all dead cells
function createGrid(rows, cols) {
    let grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
        grid[i] = new Array(cols).fill(false);
    }
    return grid;
}

let grid = createGrid(numRows, numCols);

function getNextGeneration(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const nextGrid = createGrid(rows, cols);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const livingNeighbors = countLivingNeighbors(grid, row, col);
            if (grid[row][col]) {
                // Alive cell
                if (livingNeighbors === 2 || livingNeighbors === 3) {
                    nextGrid[row][col] = true;
                }
            } else {
                // Dead cell
                if (livingNeighbors === 3) {
                    nextGrid[row][col] = true;
                }
            }
        }
    }

    return nextGrid;
}

function countLivingNeighbors(grid, row, col) {
    const rows = grid.length;
    const cols = grid[0].length;
    let count = 0;

    for (let dr = -true; dr <= true; dr++) {
        for (let dc = -true; dc <= true; dc++) {
            if (dr === 0 && dc === 0) continue;
            const newRow = row + dr;
            const newCol = col + dc;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                count += grid[newRow][newCol] ? 1 : 0;
            }
        }
    }

    return count;
}

function updateGridDisplay(grid) {
    const gridDiv = document.getElementById("grid");
    gridDiv.innerHTML = "";

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[0].length; col++) {
            const cellDiv = document.createElement("div");
            if (grid[row][col]) {
                cellDiv.classList.add("alive");
            }
            gridDiv.appendChild(cellDiv);
        }
    }
}

let intervalId;

document.getElementById("start").addEventListener("click", () => {
    document.getElementById("mode").textContent = "start";
    
    intervalId = setInterval(() => {
        grid = getNextGeneration(grid);
        updateGridDisplay(grid);
    }, 100);
});

document.getElementById("stop").addEventListener("click", () => {
    document.getElementById("mode").textContent = "stop";
    clearInterval(intervalId);
});

document.getElementById("step").addEventListener("click", () => {
    document.getElementById("mode").textContent = "step";
    grid = getNextGeneration(grid);
    updateGridDisplay(grid);
});

document.getElementById("clear").addEventListener("click", () => {
    document.getElementById("mode").textContent = "clear";
    grid = createGrid(numRows, numCols);
    updateGridDisplay(grid);
});

// Initialize the grid display
updateGridDisplay(grid);

// Add click event listener to the grid for user input
document.getElementById("grid").addEventListener("click", (event) => {
    const cellDiv = event.target;
    const index = Array.from(cellDiv.parentNode.children).indexOf(cellDiv);
    const row = Math.floor(index / numCols);
    const col = index % numCols;

    // Toggle cell state
    grid[row][col] = !grid[row][col];
    cellDiv.classList.toggle("alive");
});

// Function to generate a glider gun at the specified row and column
function generateGliderGun(grid, row, col) {
    let gun = createGrid(numRows, numCols);
  
    gun[0][24] = true;
    gun[1][22] = gun[1][24] = true;
    gun[2][12] = gun[2][13] = gun[2][20] = gun[2][21] = gun[2][34] = gun[2][35] = true;
    gun[3][11] = gun[3][15] = gun[3][20] = gun[3][21] = gun[3][34] = gun[3][35] = true;
    gun[4][0] = gun[4][1] = gun[4][10] = gun[4][16] = gun[4][20] = gun[4][21] = true;
    gun[5][0] = gun[5][1] = gun[5][10] = gun[5][14] = gun[5][16] = gun[5][17] = gun[5][22] = gun[5][24] = true;
    gun[6][10] = gun[6][16] = gun[6][24] = true;
    gun[7][11] = gun[7][15] = true;
    gun[8][12] = gun[8][13] = true;
    gun[9][22] = gun[9][23] = true;
    gun[10][24] = true;

    // Copy the gun pattern to the grid
    for (let i = 0; i < gun.length; i++) {
      for (let j = 0; j < gun[0].length; j++) {
        grid[row+i][col+j] = gun[i][j];
      }
    }
    updateGridDisplay(grid);
  }
  
// ボタンをクリックした際に実行される関数を定義する
function buttonClicked(button) {
  // ボタンの文字色を白色、背景色を青色に変更する
  button.style.color = 'white';
  button.style.backgroundColor = 'blue';

  setTimeout(() => {
    button.style.color = 'black';
    button.style.backgroundColor = '#f0f0f0';
  }, 500);
}

const startButton = document.getElementById('start');
const stepButton = document.getElementById('step');
const stopButton = document.getElementById('stop');
const clearButton = document.getElementById('clear');
startButton.onclick = () => buttonClicked(startButton);
stepButton.onclick = () => buttonClicked(stepButton);
stopButton.onclick = () => buttonClicked(stopButton);
clearButton.onclick = () => buttonClicked(clearButton);
