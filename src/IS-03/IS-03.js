// correct answer: .6.14.9.3.7

import mouse_coordinates from "../lib/MouseCoordinates";
import {Cell, Item, WINDOW_SKIP_X, WINDOW_SKIP_Y, WINDOW_X0, WINDOW_Y0} from "./item";

const CANVAS_W = 485;
const CANVAS_H = 375;
const DRESSER_W = 485;
const DRESSER_H = 300;

const DRESSER_ITEMS = [
    [['diamond', 'heart'], ['star', 'tree'], ['heart', 'cross'], ['star', 'moon'], ['circle', 'heart']],
    [['pentagon', 'cross'], ['circle', 'pentagon'], ['moon', 'key'], ['diamond', 'tree'], ['triangle', 'star']],
    [['cross', 'tree'], ['heart', 'diamond'], ['square', 'star'], ['triangle', 'heart'], ['pentagon', 'triangle']]
];

const START_ITEM_NAME = 'circle';

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
        
        this.items = [
            new Item(this.bg, 'square', 140, 300, 25, 25),
            new Item(this.bg, 'diamond', 165, 300, 25, 25),
            new Item(this.bg, 'moon', 190, 300, 25, 25),
            new Item(this.bg, 'star', 215, 300, 25, 25),
            new Item(this.bg, 'tree', 240, 300, 25, 25),
            new Item(this.bg, 'cross', 265, 300, 25, 25),
            new Item(this.bg, 'circle', 290, 300, 25, 25),
            new Item(this.bg, 'key', 0, 300, 140, 64),
            new Item(this.bg, 'triangle', 315, 300, 25, 25),
            new Item(this.bg, 'pentagon', 340, 300, 25, 25),
            new Item(this.bg, 'heart', 365, 300, 25, 25)
        ];

        this.cells = [];
        this.all_cells = [];

        let y0 = WINDOW_Y0;
        let ind = 0;
        for (let line of DRESSER_ITEMS) {
            let x0 = WINDOW_X0;
            for (let [from, to] of line) {
                let cell = new Cell(x0, y0, from, to, ind++);
                this.all_cells.push(cell);
                x0 += WINDOW_SKIP_X;
            }
            y0 += WINDOW_SKIP_Y;
        }

        this.cells_list = [];
    }

    get_item_by_name(name) {
        for (let real_item of this.items)
            if (real_item.name === name)
                return real_item;
        return null;
    }

     get items_list() {
        let result = [this.get_item_by_name(START_ITEM_NAME)];
        for (let cell of this.cells_list)
            result.push(this.get_item_by_name(cell.item_name_to));
        return result;
     }

     get last_item_name() {
        if (this.cells_list.length === 0)
            return START_ITEM_NAME;
        return this.cells_list[this.cells_list.length - 1].item_name_to;
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
        let last_item_name = this.last_item_name;
        for (let cell of this.all_cells)
            if (cell.hit_test(this.cursor_x, this.cursor_y) && cell.item_name_from === last_item_name) {
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

        this.ctx.drawImage(this.bg, 0, 0, 485, 300, 0, 0, 485, 300);

        //draw items list
        let x0 = 16;
        let y0 = DRESSER_H + 10;
        let items_list = this.items_list;

        for (let item of items_list) {
            item.draw(this.ctx, x0, y0);
            x0 += 30;
            //TODO draw arrows from left to right
        }

        if (this.cursor_x >= 0 && this.cursor_y >= 0 && this.isEnabled()) {
            // draw item under cursor
            let last_item = items_list[items_list.length - 1];
            if (last_item.name !== 'key') {
                last_item.draw(this.ctx, this.cursor_x - 25, this.cursor_y - 25);
            }
            // draw highlighting
            for (let cell of this.all_cells) {
                if (cell.hit_test(this.cursor_x, this.cursor_y) && cell.item_name_from === last_item.name)
                    cell.draw_highlight(this.ctx);
            }
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
