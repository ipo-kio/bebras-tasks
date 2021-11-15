// correct answer: .7.15.11.12.14.13.10.9.8.0.1.2.3.4.5.6

import mouse_coordinates from "../lib/MouseCoordinates";
import {D, Room} from "./room";

const CANVAS_W = 520;
const CANVAS_H = 320;

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

        function r(x1, y1, x2, y2) {
            return [
                [x1, y1], [x2, y1],
                [x2, y2], [x1, y2]
            ];
        }

        this.all_cells = [
            new Room(r(21, 71, 78, 132), 137, '#7fdaf1', 0),
            new Room(r(21, 133, 81, 189), 136, '#dedddf', 1),
            new Room(r(22, 192, 80, 223), 134, '#ffedc4', 2),
            new Room(r(19, 226, 82, 258), 133, '#dedddf', 3),
            new Room(r(20, 260, 94, 297), 132, '#f5e3d5', 4),
            new Room(r(96, 260, 142, 299), 131, '#eddde8', 5),
            new Room(r(146, 262, 181, 297), 130, '#7fdaf1', 6),
            new Room(r(183, 262, 231, 298), 129, '#f5e3d5', 7),
            new Room(r(83, 70, 155, 138), 138, '#dedddf', 8),
            new Room(r(154, 70, 208, 140), 140, '#eddde8', 9),
            new Room(r(209, 70, 338, 140), 142, '#b7e8f6', 10),
            new Room([[84, 140], [150, 140], [153, 190], [128, 190], [126, 164], [82, 164]], 139, '#f5e3d5', 11),
            new Room(r(154, 140, 206, 190), 141, '#7fdaf1', 12),
            new Room(r(208, 140, 261, 189), 143, '#f5e3d5', 13),
            new Room(r(263, 142, 339, 257), 144, '#eddde8', 14),
            new Room(r(83, 165, 128, 258), 135, '#cceef9', 15)
        ];

        this.cells_list = [];
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
            if (cell.hit_test(this.ctx, this.cursor_x, this.cursor_y) && this.cells_list.indexOf(cell) < 0) {
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

    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.bg, 0, 0, 360, 360, 0, D, 360, 360);

        //draw items list
        let x0 = 16;
        let y0 = 280;

        for (let cell of this.cells_list) {
            cell.draw_at(this.ctx, x0, y0);
            cell.draw_used(this.ctx);
            x0 += 30;
        }

        if (this.cursor_x >= 0 && this.cursor_y >= 0 && this.isEnabled()) {
            // draw highlighting
            for (let cell of this.all_cells)
                if (cell.hit_test(this.ctx, this.cursor_x, this.cursor_y) && this.cells_list.indexOf(cell) < 0)
                    cell.draw_highlight(this.ctx);
        }

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

        let n = this.all_cells.length;
        let cells_list = [];
        for (let a of solution.substring(1).split('.')) {
            a = +a;
            if (a < 0 || a >= n)
                return;
            let next_cell = this.all_cells[a];
            if (cells_list.indexOf(next_cell) >= 0)
                return;
            cells_list.push(next_cell);
        }

        this.cells_list = cells_list;
        this.redraw();
        this.update_back_button();
    }

    getAnswer() { //-1 no answer, 0 wrong, 1 correct, 2 - server check
        return 2;
    }
}

/*
new Place(0, 0, 25, 25, 'square', 2, {imageId: 'bg', crop: {x: 140, y: 300, width: 25, height: 25}}),
new Place(0, 0, 25, 25, 'diamond', 2, {imageId: 'bg', crop: {x: 165, y: 300, width: 25, height: 25}}),
new Place(0, 0, 25, 25, 'moon', 2, {imageId: 'bg', crop: {x: 190, y: 300, width: 25, height: 25}}),
new Place(0, 0, 25, 25, 'star', 2, {imageId: 'bg', crop: {x: 215, y: 300, width: 25, height: 25}}),
new Place(0, 0, 485, 300, 'dresser', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 485, height: 300}}),
new Place(0, 0, 25, 25, 'tree', 2, {imageId: 'bg', crop: {x: 240, y: 300, width: 25, height: 25}}),
new Place(0, 0, 25, 25, 'cross', 2, {imageId: 'bg', crop: {x: 265, y: 300, width: 25, height: 25}}),
new Place(0, 0, 25, 25, 'circle', 2, {imageId: 'bg', crop: {x: 290, y: 300, width: 25, height: 25}}),
new Place(0, 0, 140, 64, 'key', 2, {imageId: 'bg', crop: {x: 0, y: 300, width: 140, height: 64}}),
new Place(0, 0, 25, 25, 'triangle', 2, {imageId: 'bg', crop: {x: 315, y: 300, width: 25, height: 25}}),
new Place(0, 0, 25, 25, 'pentagon', 2, {imageId: 'bg', crop: {x: 340, y: 300, width: 25, height: 25}}),
new Place(0, 0, 25, 25, 'heart', 2, {imageId: 'bg', crop: {x: 365, y: 300, width: 25, height: 25}}),
 */
