const MIN_ROWS = 3;
const MIN_COLS = 3;
const MAX_ROWS = 30;
const MAX_COLS = 30;

let solveButton = document.getElementById("solve");


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

            if (rBlocked >= this.rows || cBlocked >= this.cols) {
                continue;
            }

            this.maze[rBlocked][cBlocked] = 1;
        }

        this.drawMaze();
    }

    getRows() {
        return this.rows;
    }

    getCols() {
        return this.cols;
    }

    getBlocked() {
        return this.blocked;
    }

    getSource() {
        return this.source;
    }

    getTarget() {
        return this.target;
    }

    isInbounds(r, c) {
        if ((0 <= r && r < this.rows) && (0 <= c && c < this.cols)) {
            return true;
        }
        return false;
    }

    isWall(r, c) {
        if (this.isInbounds(r, c) && this.maze[r][c] == 1) {
            return true;
        }
        return false;
    }

    isSource(r, c) {
        if (this.isInbounds(r, c) && r == this.source[0] && c == this.source[1]) {
            return true;
        }
        return false;
    }

    isTarget(r, c) {
        if (this.isInbounds(r, c) && r == this.target[0] && c == this.target[1]) {
            return true;
        }
        return false;
    }

    isValid(r, c) {
        if (r < 0 || c < 0 || r >= this.maze.length || c >= this.maze[r].length || this.maze[r][c] == 1) {
            return false;
        }
        return true;
    }

    removeWall(r, c) {
        for (let i = 0; i < this.blocked; i++) {
            const rBlocked = this.blocked[i][0];
            const cBlocked = this.blocked[i][1];

            if (r == rBlocked && c == cBlocked) {
                if (i == 0) {
                    this.blocked.shift();
                }
                else if (i == (this.blocked.length - 1)) {
                    this.blocked.pop();
                }
                else {
                    // wall coordinate is in the middle
                    let left = this.blocked.slice(0, i);
                    let right = this.blocked.slice(i + 1);
                    this.blocked = left.concat(right);
                }
            }
        }
    }

    validateBlocked() {

    }

    validateSource() {

    }

    validateTarget() {
        /**
         * when the board size changes, the target may be out of bounds.
         * if it is out of bounds, then a new target coordinate will be chosen.
         * the new target coordinate will be chosen by looking for the
         * bottom-right-most coordinate that is not a wall or a
         * source coordinate.
         */
        if (this.rows > this.target[0]) {
            return;
        }

        const oldTarget = [this.target[0], this.target[1]];

        let foundNewTarget = false;
        for (let r = this.rows - 1; !foundNewTarget && r >= 0; r--) {
            for (let c = this.cols - 1; !foundNewTarget && c >= 0; c--) {
                if (this.isWall(r, c) || this.isSource(r, c)) {
                    continue;
                }
                console.log(`new target: (${r}, ${c})`);
                this.target = [r, c];
                foundNewTarget = true;
            }
        }

        if (oldTarget[0] == this.target[0] && oldTarget[1] == this.target[1]) {
            console.log("removing wall and choosing target");
            /**
             * if entered, user tried to break the code by filling the maze
             * with walls and leaving no valid spot for a target coordinate.
             */
            for (let r = this.rows - 1; r >= 0; r--) {
                for (let c = this.cols - 1; c >= 0; c--) {
                    if (this.isSource(r, c)) {
                        continue;
                    }

                    this.removeWall(r, c);
                    this.target = [r, c];
                }
            }
        }
    }

    createMaze() {
        this.undrawMaze();

        this.maze = [];
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

        this.validateBlocked();
        this.validateSource();
        this.validateTarget();

        for (let i = 0; i < this.blocked.length; i++) {
            const rBlocked = this.blocked[i][0];
            const cBlocked = this.blocked[i][1];

            if (rBlocked >= this.rows || cBlocked >= this.cols) {
                continue;
            }

            this.maze[rBlocked][cBlocked] = 1;
        }

        this.drawMaze();
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

    undrawMaze() {
        let maze = document.getElementById("maze");

        while (maze.firstChild) {
            maze.removeChild(maze.firstChild);
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

    solve() {
        this.pathfind(this.source[0], this.source[1]);
        this.drawMaze();
    }
}


let blocked = [
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
const DRAW_WALLS_ID = "draw-walls";

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
        this.drawWalls = document.getElementById(DRAW_WALLS_ID);

        this.maze = new Maze(ROWS_DEFAULT, COLS_DEFAULT, blocked, [SOURCE_R_DEFAULT, SOURCE_C_DEFAULT], [ROWS_DEFAULT - 1, COLS_DEFAULT - 1]);

        this.setDefaultInputValues();
        this.handleRowsInput();
        this.handleColsInput();
        this.handleSourceRInput();
        this.handleSourceCInput();
        this.handleTargetRInput();
        this.handleTargetCInput();
        this.handleDrawWalls();
    }

    setDefaultInputValues() {
        this.rowsInput.value = this.maze.rows;
        this.colsInput.value = this.maze.cols;

        this.sourceRInput.value = this.maze.source[0];
        this.sourceCInput.value = this.maze.source[1];

        this.targetRInput.value = this.maze.target[0];
        this.targetCInput.value = this.maze.target[1];
    }

    setErrorMessage(e, text) {
        e.style.color = "oklch(46.946% 0.19265 29.223)";
        e.innerText = text;
    }

    unsetErrorMessage(e) {
        if (e.style.color == "oklch(77.748% 0.0948 215.788)" || e.innerText == ".") {
            return;
        }

        e.style.color = "oklch(77.748% 0.0948 215.788)";
        e.innerText = ".";
    }

    checkValidRowSize(r) {
        if (MIN_ROWS <= r && r <= MAX_ROWS) {
            this.unsetErrorMessage(this.rowsErr);
            this.maze.rows = r;
            console.log(`checkValidRowSize: new rows - ${this.maze.rows}`);
            this.maze.createMaze();
        }
        else {
            this.setErrorMessage(this.rowsErr, ROWS_ERR_MSG);
        }
    }

    checkValidColSize(c) {
        if (MIN_COLS <= c && c <= MAX_COLS) {
            this.unsetErrorMessage(this.colsErr);
            // this.maze.cols = c;
        }
        else {
            this.setErrorMessage(this.colsErr, COLS_ERR_MSG);
        }
    }

    isValidR(r, e, msg) {
        if (0 <= r && r <= (this.maze.getMaze()).length - 1) {
            this.unsetErrorMessage(e);
            return true;
        }
        else {
            this.setErrorMessage(e, msg);
            return false;
        }
    }

    isValidC(c, e, msg) {
        if (0 <= c && c <= (this.maze.getMaze())[0].length - 1) {
            this.unsetErrorMessage(e);
            return true;
        }
        else {
            this.setErrorMessage(e, msg);
            return false;
        }
    }

    areCoordsOnWall(r, c, e, msg) {
        if ((this.maze.getMaze())[r][c] != 1) {
            this.unsetErrorMessage(e);
            return false;
        }
        else {
            this.setErrorMessage(e, msg);
            return true;
        }
    }

    areCoordsSame(r1, c1, r2, c2, e, msg) {
        if (r1 == r2 && c1 == c2) {
            this.setErrorMessage(e, msg);
            return true;
        }
        else {
            this.unsetErrorMessage(e);
            return false;
        }
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

            if (!this.isValidR(r, this.srcRError, SRC_R_BOUNDS_ERR_MSG + ` ${this.maze.getMaze().length - 1}`)) {
                /**
                 * if coordinates are out of bounds,
                 * cannot check subsequent cases
                 */
                return;
            }

            if (this.areCoordsOnWall(r, c, this.srcWallError, SRC_WALL_ERR_MSG)) {
                return;
            }

            if (this.areCoordsSame(r, c, this.maze.target[0], this.maze.target[1], this.srcSameError, SAME_COORDS_ERR_MSG)) {
                return;
            }

            this.maze.source[0] = r;
        });
    }

    handleSourceCInput() {
        this.sourceCInput.addEventListener("change", (e) => {
            let r = this.sourceRInput.value;
            let c = e.target.value;

            if (!this.isValidC(c, this.srcCError, SRC_C_BOUNDS_ERR_MSG + ` ${(this.maze.getMaze())[0].length - 1}`)) {
                /**
                 * if coordinates are out of bounds,
                 * cannot check subsequent cases
                 */
                return;
            }

            if (this.areCoordsOnWall(r, c, this.srcWallError, SRC_WALL_ERR_MSG)) {
                return;
            }

            if (this.areCoordsSame(r, c, this.maze.target[0], this.maze.target[1], this.srcSameError, SAME_COORDS_ERR_MSG)) {
                return;
            }

            this.maze.source[1] = c;
        });
    }

    handleTargetRInput() {
        this.targetRInput.addEventListener("change", (e) => {
            let r = e.target.value;
            let c = this.targetCInput.value;

            if (!this.isValidR(r, this.tgtRError, TGT_R_BOUNDS_ERR_MSG + ` ${this.maze.getMaze().length - 1}`)) {
                /**
                 * if coordinates are out of bounds,
                 * cannot check subsequent cases
                 */
                return;
            }

            if (this.areCoordsOnWall(r, c, this.tgtWallError, TGT_WALL_ERR_MSG)) {
                return;
            }

            if (this.areCoordsSame(r, c, this.maze.source[0], this.maze.source[1], this.tgtSameError, SAME_COORDS_ERR_MSG)) {
                return;
            }

            this.maze.target[0] = r;
        });
    }

    handleTargetCInput() {
        this.targetCInput.addEventListener("change", (e) => {
            let r = this.targetRInput.value;
            let c = e.target.value;

            if (!this.isValidC(c, this.tgtCError, TGT_C_BOUNDS_ERR_MSG + ` ${(this.maze.getMaze())[0].length - 1}`)) {
                /**
                 * if coordinates are out of bounds,
                 * cannot check subsequent cases
                 */
                return;
            }

            if (this.areCoordsOnWall(r, c, this.tgtWallError, TGT_WALL_ERR_MSG)) {
                return;
            }

            if (this.areCoordsSame(r, c, this.maze.source[0], this.maze.source[1], this.tgtSameError, SAME_COORDS_ERR_MSG)) {
                return;
            }

            this.maze.target[1] = c;
        });
    }

    toggleWall() {
        /**
         * check if cell is not source or target
         * re-draw at some point idk where yet
         * if removing, remove from this.blocked
         */
    }

    handleDrawWalls() {
        this.drawWalls.addEventListener("mouseup", (e) => {

        });

        this.drawWalls.addEventListener("touchend", (e) => {

        });
    }

    solve() {
        if (solveButton.innerText == "RESET") {
            this.maze.createMaze();
            solveButton.innerText = "SOLVE";
            return;
        }

        this.maze.solve();

        solveButton.innerText = "RESET";
    }
}


const settingsWindow = document.getElementById("settings");
function toggleSettingsWindow() {
    if (settingsWindow.style.display == "flex") {
        settingsWindow.style.display = "none";
    }
    else {
        settingsWindow.style.display = "flex";
    }
}

// TODO: option to block cells
// TODO: option to change board size
// TODO: option to change source coords
// TODO: option to change target coords

const settingsButton = new SettingsButton();
const closeSettingsButton = new CloseSettingsButton();
let settings = new Settings();
