import mouse_coordinates from "../lib/MouseCoordinates";
import {BUTTON_H, BUTTON_W, Cell, KEYBOARD_SKIP_X, KEYBOARD_SKIP_Y, KEYBOARD_X0, KEYBOARD_Y0} from "./cell";
import {Table} from "./table";

const CANVAS_W = 580;
const CANVAS_H = 220;

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
    constructor(container, images) {
        this.enabled = true;
        this.initCallback = null;
        this.container = container;

        this.loaded = false;

        this.bg = new Image();
        this.bg.src = images.bg;
        this.bg.onload = () => this.bgLoaded();

        this.all_cells = [];

        let y0 = KEYBOARD_Y0;
        let ind = 0;
        for (let dy = -1; dy <= 1; dy++) {
            let x0 = KEYBOARD_X0;
            for (let dx = -1; dx <= 1; dx++) {
                let cell = new Cell(this.bg, x0, y0, dx, dy, ind++);
                this.all_cells.push(cell);
                x0 += BUTTON_W + KEYBOARD_SKIP_X;
            }
            y0 += BUTTON_H + KEYBOARD_SKIP_Y;
        }

        this.cells_list = [];

        this.table = new Table(6, 6, 1, 3);
        this.example_path = [
            this.all_cells[1],
            this.all_cells[2],
            this.all_cells[8],
            this.all_cells[2],
            this.all_cells[8],
            this.all_cells[7],
            this.all_cells[6],
            this.all_cells[6],
            this.all_cells[0],
            this.all_cells[0]
        ];
    }

    bgLoaded() {
        let containerElement = document.getElementById(this.container);
        this.canvas = document.createElement('canvas');
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_H;
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

    mousedown({x, y}) {
        for (let cell of this.all_cells)
            if (cell.hit_test(this.cursor_x, this.cursor_y) && !this.last_element_is_go()) {
                this.cells_list.push(cell);
                this.redraw();
                this.update_back_button();
                return;
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
        this.undo.disabled = this.cells_list.length === 0 || !this.isEnabled();
    }

    go_back() {
        if (this.cells_list.length === 0 || !this.isEnabled())
            return;

        this.cells_list.splice(this.cells_list.length - 1, 1);
        this.redraw();
        this.update_back_button();
    }

    last_element_is_go() {
        if (this.cells_list.length === 0)
            return false;
        return this.cells_list[this.cells_list.length - 1] === this.all_cells[4];
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //draw items list
        let x0 = 6;
        let y0 = 174;

        for (let item of this.cells_list) {
            item.draw(this.ctx, x0, y0);
            x0 += BUTTON_W + 2;
        }

        for (let cell of this.all_cells) {
            cell.draw(this.ctx);
        }

        if (this.cursor_x >= 0 && this.cursor_y >= 0 && this.isEnabled()) {
            // draw highlighting
            for (let cell of this.all_cells) {
                if (cell.hit_test(this.cursor_x, this.cursor_y) && !this.last_element_is_go())
                    cell.draw_highlight(this.ctx);
            }
        }

        let user_path = this.last_element_is_go() ? this.cells_list : [];
        this.table.draw(this.ctx, 10, 10, user_path);
        this.table.draw(this.ctx, 380, 10, this.example_path);

        if (!this.isEnabled()) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    reset() {
        this.cells_list = [];

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
        for (let cell of this.cells_list)
            s += '.' + cell.ind;
        return s;
    }

    loadSolution(solution) {
        if (solution === '') {
            this.reset();
            return;
        }

        /*let n = this.all_cells.length;
        let e = START_ITEM_NAME;
        let cells_list = [];
        for (let a of solution.substring(1).split('.')) {
            a = +a;
            if (a < 0 || a >= n)
                return;
            let next_cell = this.all_cells[a];
            if (next_cell.item_name_from !== e)
                return;
            e = next_cell.item_name_to;
            cells_list.push(next_cell);
        }

        this.cells_list = cells_list;
        this.redraw();
        this.update_back_button();*/
    }

    getAnswer() { //-1 no answer, 0 wrong, 1 correct, 2 - server check
        return 2;
    }
}
