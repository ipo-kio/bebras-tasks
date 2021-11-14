// <p><img src="/~res/NwAEzLl4XhX9qjq97BMm1634234389281.svg" alt="an image" /></p>
// new Place(0, 0, 63, 71, 'dasha', 2, {imageId: 'bg', crop: {x: 0, y: 71, width: 63, height: 71}}),
// new Place(0, 0, 64, 71, 'masha', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 64, height: 71}}),
// new Place(0, 0, 38, 38, 'stone', 2, {imageId: 'bg', crop: {x: 63, y: 71, width: 38, height: 38}}),

import mouse_coordinates from "../lib/MouseCoordinates";
import {Cell, CELL_SIZE_H, CELL_SIZE_W} from "./cell";

const PAD_W = 20, PAD_H = 36;

const WATER_COLOR = '#a1e8ec';
const LINE_COLOR = '#219ea7';

const MAPS = {
    b: ["ooo.oo.oo",
        "o.o...o.o",
        ".o.o.....",
        "....o.o.o",
        ".oo.o.o.o",
        ".....o.o.",
        "oo.o.o.oo"
    ],
    d: ["ooo.oo.o.o....o.oo",
        "o.o......oo.o..o.o",
        ".o.o...oo.o.o.oo..",
        ".....oo.o....o..o.",
        ".oo.o.o....o.o.o.o",
        "o.....oo.o....o.o.",
        "o..o......o.o...o.",
        "..o.oo.ooooo.oo.oo",
        "o.o...o.o..o...o.o",
        ".o.o......o.o.....",
        "....o.o.o....o.o.o",
        ".oo.o.o.o.oo.o...o",
        "o....o.o.o....o.o.",
        "oo.o.o.oooo.o.o.oo"
    ]
}

export class Task {

    canvas;
    undo;
    ctx;
    bg;
    loaded;

    cells_list;

    cursor_x = -1;
    cursor_y = -1;

    //container - is an id of element
    constructor(container, images, task_letter = 'b') {
        this.enabled = true;
        this.initCallback = null;
        this.container = container;

        this.loaded = false;

        this.bg = new Image();
        this.bg.src = images.bg;
        this.bg.onload = () => this.bgLoaded();
        this.map = MAPS[task_letter];

        this.all_cells = [];

        this.rows = this.map.length;
        this.columns = this.map[0].length;

        let y0 = PAD_H;
        let ind = 0;
        let row = 0;
        for (let line of this.map) {
            let x0 = PAD_W;
            for (let col = 0; col < line.length; col++) {
                if (line[col] === 'o') {
                    let cell = new Cell(this.bg, x0, y0, row, col, ind++);
                    this.all_cells.push(cell);

                    if (row === 0 && col === this.columns - 1)
                        this.finish_cell = cell;
                    if (row === this.rows - 1 && col === 0)
                        this.start_cell = cell;
                }
                x0 += CELL_SIZE_W;
            }
            y0 += CELL_SIZE_H;
            row++;
        }

        this.cells_list = [this.start_cell];
    }

    bgLoaded() {
        let containerElement = document.getElementById(this.container);
        this.canvas = document.createElement('canvas');
        this.canvas.width = 2 * PAD_W + this.columns * CELL_SIZE_W;
        this.canvas.height = 2 * PAD_H + this.rows * CELL_SIZE_H;
        containerElement.appendChild(this.canvas);
        this.undo = document.createElement('button');
        this.undo.innerText = '⮌ Назад';
        containerElement.appendChild(this.undo);
        this.canvas.style = 'display: block; vertical-align: middle';
        this.undo.style = 'padding: 0.6em; margin-left: 16px' +
            '  -webkit-touch-callout: none;' +
            '    -webkit-user-select: none;' +
            '     -khtml-user-select: none;' +
            '       -moz-user-select: none;' +
            '        -ms-user-select: none;' +
            '            user-select: none;';
        this.undo.addEventListener('click', e => this.go_back());

        this.ctx = this.canvas.getContext('2d');
        this.canvas.addEventListener('mousedown', (e) => {
            if (e.button === 0 && this.isEnabled())
                this.mousedown(mouse_coordinates(this.canvas, e))
        });
        this.canvas.addEventListener('mouseleave', (e) => {
            if (e.button === 0 && this.isEnabled())
                this.mouseleave(mouse_coordinates(this.canvas, e))
        });
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.isEnabled())
                this.mousemove(mouse_coordinates(this.canvas, e))
        });

        if (this.initCallback)
            this.initCallback();

        this.loaded = true;

        this.update_back_button();

        this.redraw();
    }

    last_cell() {
        return this.cells_list[this.cells_list.length - 1];
    }

    last_jump() {
        let len = this.cells_list.length;
        if (len <= 1)
            return 0;
        return this.cells_list[len - 2].jump_distance(this.cells_list[len - 1]);
    }

    may_jump_to(cell) {
        let jd = cell.jump_distance(this.last_cell());
        return jd > 0 && this.last_jump() + jd < 4;
    }

    mousedown({x, y}) {
        let last_cell = this.last_cell();
        for (let cell of this.all_cells) {
            if (cell.hit_test(this.cursor_x, this.cursor_y) && this.may_jump_to(cell)) {
                this.cells_list.push(cell);
                this.redraw();
                this.update_back_button();
                return;
            }
        }
    }

    mouseleave(xy) {
        this.cursor_x = -1;
        this.cursor_x = -1;
    }

    mousemove({x, y}) {
        this.cursor_x = x;
        this.cursor_y = y;

        this.redraw();
    }

    update_back_button() {
        this.undo.disabled = this.cells_list.length <= 1 || !this.isEnabled();
    }

    go_back() {
        if (this.cells_list.length <= 1 || !this.isEnabled())
            return;

        this.cells_list.splice(this.cells_list.length - 1, 1);
        this.redraw();
        this.update_back_button();
    }

    redraw() {
        let c = this.ctx;
        c.clearRect(0, 0, this.canvas.width, this.canvas.height);

        c.fillStyle = WATER_COLOR;
        c.strokeStyle = LINE_COLOR;
        c.lineWidth = 1;
        c.fillRect(PAD_W, PAD_H, this.columns * CELL_SIZE_W, this.rows * CELL_SIZE_H);
        c.beginPath();
        for (let x = 0; x <= this.columns; x++) {
            let w0 = PAD_W + x * CELL_SIZE_W + 0.5;
            c.moveTo(w0, PAD_H + 0.5);
            c.lineTo(w0, PAD_H + CELL_SIZE_H * this.rows + 0.5);
        }
        for (let cell of this.all_cells)
            cell.draw(c);
        for (let y = 0; y <= this.rows; y++) {
            let h0 = PAD_H + y * CELL_SIZE_H + 0.5;
            c.moveTo(PAD_W + 0.5, h0);
            c.lineTo(PAD_W + CELL_SIZE_W * this.columns + 0.5, h0);
        }
        c.stroke();

        //draw kangaroos
        // new Place(0, 0, 63, 71, 'dasha', 2, {imageId: 'bg', crop: {x: 0, y: 71, width: 63, height: 71}}),
        // new Place(0, 0, 64, 71, 'masha', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 64, height: 71}}),
        const KX = -10, KY = -40;
        let masha_cell = this.last_cell(); //this.start_cell;
        c.drawImage(this.bg, 0, 71, 63, 71, this.finish_cell.x + KX, this.finish_cell.y + KY, 63, 71);
        c.drawImage(this.bg, 0, 0, 64, 71, masha_cell.x + KX, masha_cell.y + KY, 64, 71);

        // draw path
        for (let cell of this.cells_list)
            cell.draw_highlight(c);
        for (let i = 1; i < this.cells_list.length; i++)
            this.cells_list[i - 1].draw_arrow(c, this.cells_list[i]);

        if (this.cursor_x >= 0 && this.cursor_y >= 0 && this.isEnabled()) {
            // draw highlighting
            for (let cell of this.all_cells) {
                if (cell.hit_test(this.cursor_x, this.cursor_y) && this.may_jump_to(cell))
                    cell.draw_highlight(this.ctx);
            }
            // if needed, draw item under cursor
        }

        if (!this.isEnabled()) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    reset() {
        this.cells_list = [this.start_cell];

        this.redraw();
        this.update_back_button();
    };

    isEnabled() {
        return this.enabled;
    };

    setEnabled(state) {
        this.enabled = state;

        this.redraw();
        this.update_back_button();
    };

    setInitCallback(_initCallback) {
        this.initCallback = _initCallback;

        //if we are initialized just after creation, any attempt to set up init callback is after we are initialized
        if (this.initCallback && this.loaded)
            this.initCallback();
    };

    getSolution() {
        let s = "";
        for (let i = 1; i < this.cells_list.length; i++)
            s += '.' + this.cells_list[i].ind;
        return s;
    }

    loadSolution(solution) {
        if (solution === '') {
            this.reset();
            return;
        }

        let n = this.all_cells.length;
        let e = this.start_cell;
        let cells_list = [e];
        let prev_jump = 0;
        for (let a of solution.substring(1).split('.')) {
            a = +a;
            if (a < 0 || a >= n)
                return;
            let next_cell = this.all_cells[a];
            let jd = e.jump_distance(next_cell);
            if (jd < 1 || jd + prev_jump >= 4)
                return;
            e = next_cell;
            prev_jump = jd;
            cells_list.push(next_cell);
        }

        this.cells_list = cells_list;
        this.redraw();
        this.update_back_button();
    }

    getAnswer() { //-1 no answer, 0 wrong, 1 correct, 2 - server check
        return this.last_cell() === this.finish_cell ? 1 : 0;
    }
}
