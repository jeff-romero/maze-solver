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

    getMaze() {
        return this.maze;
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
const MIN_ROWS = 3;
const MIN_COLS = 3;
const MAX_ROWS = 30;
const MAX_COLS = 30;
let source = [0, 0];
let rows = 10;
let cols = 10;
let target = [rows - 1, cols - 1];
let m = new Maze(rows, cols, blocked, source, target);
let solveButton = document.getElementById("solve");
// let settings = document.getElementById("settings");
const settingsWindow = document.getElementById("settings");


function toggleSettingsWindow() {
    if (settingsWindow.style.display == "block") {
        settingsWindow.style.display = "none";
    }
    else {
        settingsWindow.style.display = "block";
    }
}


class SettingsButton {
    constructor() {
        this.settingsButton = document.getElementById("settings-button");

        this.initializeSettingsButton();
    }

    initializeSettingsButton() {
        this.settingsButton.addEventListener("mouseover", (e) => {

        });

        this.settingsButton.addEventListener("mouseleave", (e) => {

        });

        this.settingsButton.addEventListener("mousedown", (e) => {

        });

        this.settingsButton.addEventListener("mouseup", (e) => {
            toggleSettingsWindow();
        });

        this.settingsButton.addEventListener("touchstart", (e) => {

        });

        this.settingsButton.addEventListener("touchend", (e) => {
            toggleSettingsWindow();
        });
    }
}


class CloseSettingsButton {
    constructor() {
        this.closeSettingsButton = document.getElementById("close");

        this.initializeCloseSettingsButton();
    }

    initializeCloseSettingsButton() {
        this.closeSettingsButton.addEventListener("mouseover", (e) => {

        });

        this.closeSettingsButton.addEventListener("mouseleave", (e) => {

        });

        this.closeSettingsButton.addEventListener("mousedown", (e) => {

        });

        this.closeSettingsButton.addEventListener("mouseup", (e) => {
            toggleSettingsWindow();
        });

        this.closeSettingsButton.addEventListener("touchstart", (e) => {

        });

        this.closeSettingsButton.addEventListener("touchend", (e) => {
            toggleSettingsWindow();
        });
    }
}


// element ids
const ROWS_ERR_ID = "rows-error";
const COLS_ERR_ID = "cols-error";
const SRC_R_ID = "source-r-error";
const SRC_C_ID = "source-c-error";
const SRC_R_ERR_ID = "source-r-error";
const SRC_C_ERR_ID = "source-c-error";
const SRC_WALL_ERR_ID = "source-wall-error";
const SRC_SAME_ERR_ID = "source-same-error";
const TGT_R_ERR_ID = "target-r-error";
const TGT_C_ERR_ID = "target-c-error";
const TGT_WALL_ERR_ID = "target-wall-error";
const TGT_SAME_ERR_ID = "target-same-error";
const ROWS_INPUT_ID = "rows";
const COLS_INPUT_ID = "columns";
const SOURCE_R_ID = "source-r";
const SOURCE_C_ID = "source-c";
const TARGET_R_ID = "target-r";
const TARGET_C_ID = "target-c";

// error messages
const ROWS_ERR_MSG = "Number of rows must be between 3 and 30";
const COLS_ERR_MSG = "Number of columns must be between 3 and 30";
const SRC_R_BOUNDS_ERR_MSG = "Source row coordinates must be between 0 and";
const SRC_C_BOUNDS_ERR_MSG = "Source column coordinates must be between 0 and";
const SRC_WALL_ERR_MSG = "Source coordinates cannot be placed on a wall";
const TGT_R_BOUNDS_ERR_MSG = "Target row coordinates must be between 0 and";
const TGT_C_BOUNDS_ERR_MSG = "Target column coordinates must be between 0 and";
const TGT_WALL_ERR_MSG = "Target coordinates cannot be placed on a wall";
const SAME_COORDS_ERR_MSG = "Source coordinates cannot be the same as the target coordinates";

// default values
const ROWS_DEFAULT = 10;
const COLS_DEFAULT = 10;
const SOURCE_R_DEFAULT = 0;
const SOURCE_C_DEFAULT = 0;
const ERR_MSG_COLOR = "oklch(46.946% 0.19265 29.223)";
const INV_MSG_COLOR = "oklch(77.748% 0.0948 215.788)";


class Settings {
    constructor() {
        // errors
        this.rowsErr = document.getElementById(ROWS_ERR_ID);
        this.colsErr = document.getElementById(COLS_ERR_ID);
        this.srcRError = document.getElementById(SRC_R_ERR_ID);
        this.srcCError = document.getElementById(SRC_C_ERR_ID);
        this.srcWallError = document.getElementById(SRC_WALL_ERR_ID);
        this.srcSameError = document.getElementById(SRC_SAME_ERR_ID);
        this.tgtRError = document.getElementById(TGT_R_ERR_ID);
        this.tgtCError = document.getElementById(TGT_C_ERR_ID);
        this.tgtWallError = document.getElementById(TGT_WALL_ERR_ID);
        this.tgtSameError = document.getElementById(TGT_SAME_ERR_ID);

        // inputs
        this.rowsInput = document.getElementById(ROWS_INPUT_ID);
        this.colsInput = document.getElementById(COLS_INPUT_ID);
        this.sourceRInput = document.getElementById(SOURCE_R_ID);
        this.sourceCInput = document.getElementById(SOURCE_C_ID);
        this.targetRInput = document.getElementById(TARGET_R_ID);
        this.targetCInput = document.getElementById(TARGET_C_ID);

        // configurables
        this.rows = ROWS_DEFAULT;
        this.cols = COLS_DEFAULT;
        this.source = [SOURCE_R_DEFAULT, SOURCE_C_DEFAULT];
        this.target = [this.rows - 1, this.cols - 1];

        this.setDefaultInputValues();
        this.handleRowsInput();
        this.handleColsInput();
        this.handleSourceRInput();
        this.handleSourceCInput();
    }

    setDefaultInputValues() {
        this.rowsInput.value = this.rows;
        this.colsInput.value = this.cols;

        // TODO: setup initial board and set source and target dynamically based on default sizes
        // for (let r = 0; r < this.rows; r++) {
        //     for (let c = 0; c < this.cols; c++) {

        //     }
        // }

        this.sourceRInput.value = this.source[0];
        this.sourceCInput.value = this.source[1];

        this.targetRInput.value = this.target[0];
        this.targetCInput.value = this.target[1];
    }

    setErrorMessage(e, text) {
        e.style.color = "oklch(46.946% 0.19265 29.223)";
        e.innerText = text;
    }

    unsetErrorMessage(e) {
        e.style.color = "oklch(77.748% 0.0948 215.788)";
        e.innerText = ".";
    }

    checkValidRowSize(r) {
        if (MIN_ROWS <= r && r <= MAX_ROWS) {
            this.unsetErrorMessage(this.rowsErr);
            this.rows = r;
        }
        else {
            this.setErrorMessage(this.rowsErr, ROWS_ERR_MSG);
        }
    }

    checkValidColSize(c) {
        if (MIN_COLS <= c && c <= MAX_COLS) {
            this.unsetErrorMessage(this.colsErr);
            this.cols = c;
        }
        else {
            this.setErrorMessage(this.colsErr, COLS_ERR_MSG);
        }
    }

    checkValidSourceR(r) {
        if (0 <= r && r <= rows) {
            this.unsetErrorMessage(this.srcRError);
        }
        else {
            let msg = SRC_R_BOUNDS_ERR_MSG + ` ${this.rows}`;
            this.setErrorMessage(this.srcRError, msg);
            return false;
        }
        return true;
    }

    checkValidSourceC(c) {
        if (0 <= c && c <= cols) {
            this.unsetErrorMessage(this.srcCError);
        }
        else {
            let msg = SRC_C_BOUNDS_ERR_MSG + ` ${this.cols}`;
            this.setErrorMessage(this.srcCError, msg);
            return false;
        }
        return true;
    }

    checkIfSourceOnWall(r, c) {
        if ((m.getMaze())[r][c] != 1) {
            this.unsetErrorMessage(this.srcWallError);
        }
        else {
            this.setErrorMessage(this.srcWallError, SRC_WALL_ERR_MSG);
            return false;
        }
        return true;
    }

    checkIfSourceSameAsTarget(r, c) {
        if (r == target[0] && c == target[1]) {
            this.setErrorMessage(this.srcSameError, SAME_COORDS_ERR_MSG);
            return false;
        }
        else {
            this.unsetErrorMessage(this.srcSameError);
        }
        return true;
    }

    checkIfTargetSameAsSource(r, c) {
        if (r != source[0] && c != source[1]) {

        }
        else {
            // TODO: display error msg - source and target coords cannot be the same
        }
    }

    checkValidTargetCoords(r, c) {
        if (!(0 <= r <= rows)) {
            // TODO: display out of bounds error msg
            return false;
        }
        else if (!(0 <= c <= cols)) {
            // TODO: display out of bounds error msg
            return false;
        }
        else if (m.getMaze().length > 0 && (m.getMaze())[r][c] == 1) {
            // TODO: display error msg - cannot place target coords on a wall
            return false;
        }
        else if (source[0] == r && source[1] == c) {
            // TODO: display error msg - source and target coords cannot be the same
            return false;
        }
        return true;
    }

    handleRowsInput() {
        this.rowsInput.addEventListener("change", (e) => {
            this.checkValidRowSize(e.target.value);
        });
    }

    handleColsInput() {
        this.colsInput.addEventListener("change", (e) => {
            this.checkValidColSize(e.target.value);
        });
    }

    handleSourceRInput() {
        this.sourceRInput.addEventListener("change", (e) => {
            let r = e.target.value;
            let c = this.sourceCInput.value;

            if (!this.checkValidSourceR(r)) {
                /**
                 * if coordinates are out of bounds,
                 * cannot check subsequent cases
                 */
                return;
            }

            if (!this.checkIfSourceOnWall(r, c)) {
                return;
            }

            if (!this.checkIfSourceSameAsTarget(r, c)) {
                return;
            }

            this.source[0] = r;
        });
    }

    handleSourceCInput() {
        this.sourceCInput.addEventListener("change", (e) => {
            let r = this.sourceRInput.value;
            let c = e.target.value;

            if (!this.checkValidSourceC(c)) {
                /**
                 * if coordinates are out of bounds,
                 * cannot check subsequent cases
                 */
                return;
            }

            if (!this.checkIfSourceOnWall(r, c)) {
                return;
            }

            if (!this.checkIfSourceSameAsTarget(r, c)) {
                return;
            }

            this.source[1] = c;
        });
    }
}


function solve() {
    // TODO: fix this
    if (solveButton.innerText == "RESET") {
        m = new Maze(rows, cols, blocked, source, target);
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

const settingsButton = new SettingsButton();
const closeSettingsButton = new CloseSettingsButton();
let settings = new Settings();
