class Maze {
    constructor(rows, cols, blocked, source, target) {
        this.maze = [];
        this.rows = rows;
        this.cols = cols;
        this.blocked = blocked;
        this.source = source;
        this.target = target;
        this.visited = [];

        for (let r = 0; r < this.rows; r++) {
            this.maze.push([]);
            for (let c = 0; c < this.cols; c++) {
                this.maze[r].push(0);
            }
        }

        for (let r = 0; r < this.rows; r++) {
            this.visited.push([]);
            for (let c = 0; c < this.cols; c++) {
                this.visited[r].push(0);
            }
        }

        for (let i = 0; i < this.blocked.length; i++) {
            const rBlocked = this.blocked[i][0];
            const cBlocked = this.blocked[i][1];
            this.maze[rBlocked][cBlocked] = 1;
        }

        this.drawMaze();
    }

    isValid(r, c) {
        if (r < 0 || c < 0 || r >= this.maze.length || c >= this.maze[r].length || this.maze[r][c] == 1) {
            return false;
        }
        return true;
    }

    pathfind(r, c) {
        if (r == this.target[0] && c == this.target[1]) {
            this.maze[r][c] = "x";
            return true;
        }

        if (this.maze[r][c] == 1 || this.visited[r][c] == 1) {
            return false;
        }

        this.visited[r][c] = 1;

        if (this.isValid(r, c + 1)) { // right
            if (this.pathfind(r, c + 1)) {
                this.maze[r][c] = "x";
                return true;
            }
        }
        if (this.isValid(r - 1, c)) { // up
            if (this.pathfind(r - 1, c)) {
                this.maze[r][c] = "x";
                return true;
            }
        }
        if (this.isValid(r, c - 1)) { // left
            if (this.pathfind(r, c - 1)) {
                this.maze[r][c] = "x";
                return true;
            }
        }
        if (this.isValid(r + 1, c)) { // down
            if (this.pathfind(r + 1, c)) {
                this.maze[r][c] = "x";
                return true;
            }
        }

        return false;
    }

    printMaze() {
        for (let r = 0; r < this.maze.length; r++) {
            for (let c = 0; c < this.maze[r].length; c++) {
                console.log(`${this.maze[r][c]} `);
            }
            console.log();
        }
    }

    drawMaze() {
        let maze = document.getElementById("maze");
        
        while (maze.firstChild) {
            maze.removeChild(maze.firstChild);
        }

        for (let r = 0; r < this.maze.length; r++) {
            let row = document.createElement("div");
            row.className = "row";

            for (let c = 0; c < this.maze[r].length; c++) {
                let cell = document.createElement("div");
                cell.className = "cell";

                if (this.maze[r][c] == 1) {
                    cell.classList.add("blocked");
                }
                else {
                    if (r == this.source[0] && c == this.source[1]) {
                        cell.innerText = "S";
                    }
                    else if (r == this.target[0] && c == this.target[1]) {
                        cell.innerText = "F";
                    }

                    if (this.maze[r][c] == "x") {
                        cell.classList.add("visited");
                    }
                }

                row.appendChild(cell);
            }

            maze.appendChild(row);
        }
    }
}

const blocked = [
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [3, 2],
    [4, 1],
    [5, 1],
    [6, 1],
    [7, 1],
    [8, 1],
    [1, 3],
    [3, 3],
    [5, 3],
    [6, 3],
    [7, 3],
    [8, 3],
    [9, 3],
    [5, 5],
    [8, 5],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
    [1, 8],
    [3, 4],
    [3, 5],
    [3, 6],
    [3, 8],
    [4, 8],
    [2, 8],
    [5, 4],
    [5, 6],
    [5, 7],
    [5, 8],
    [7, 5],
    [7, 6],
    [7, 7],
    [7, 8],
    [7, 9],
    [9, 7],
    [9, 8]
];
const source = [0, 0];
const target = [9, 9];
let m = new Maze(10, 10, blocked, source, target);
let solveButton = document.getElementById("solve");

function solve() {
    if (solveButton.innerText == "RESET") {
        m = new Maze(10, 10, blocked, source, target);
        solveButton.innerText = "SOLVE";
        return;
    }

    m.pathfind(source[0], source[1]);
    m.drawMaze();

    solveButton.innerText = "RESET";
}

// TODO: option to block cells
// TODO: option to change board size
// TODO: option to change source coords
// TODO: option to change target coords
