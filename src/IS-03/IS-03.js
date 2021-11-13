import mouse_coordinates from "../lib/MouseCoordinates";
import {Cell, Item, WINDOW_SKIP_X, WINDOW_SKIP_Y, WINDOW_X0, WINDOW_Y0} from "./item";

const CANVAS_W = 485;
const CANVAS_H = 400;
const DRESSER_W = 485;
const DRESSER_H = 300;

const DRESSER_ITEMS = [
    [['diamond', 'heart'], ['star', 'tree'], ['heart', 'cross'], ['star', 'moon'], ['circle', 'heart']],
    [['pentagon', 'cross'], ['circle', 'pentagon'], ['moon', 'key'], ['diamond', 'tree'], ['triangle', 'star']],
    [['cross', 'tree'], ['heart', 'diamond'], ['square', 'star'], ['triangle', 'heart'], ['pentagon', 'triangle']]
];

export class Task {

    canvas;
    info;
    ctx;
    bg;
    loaded;

    items_list;

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
        for (let line of DRESSER_ITEMS) {
            let items_line = [];
            this.cells.push(items_line);

            let x0 = WINDOW_X0;
            for (let [from, to] of line) {
                let cell = new Cell(x0, y0, from, to);
                items_line.push(cell);
                this.all_cells.push(cell);
                x0 += WINDOW_SKIP_X;
            }
            y0 += WINDOW_SKIP_Y;
        }

        this.items_list = [this.get_item_by_name('circle')];
    }

    get_item_by_name(name) {
        for (let real_item of this.items)
            if (real_item.name === name)
                return real_item;
        return null;
    }

    bgLoaded() {
        let containerElement = document.getElementById(this.container);
        this.canvas = document.createElement('canvas');
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_H;
        containerElement.appendChild(this.canvas);
        this.info = document.createElement('span');
        containerElement.appendChild(this.info);
        this.canvas.style = 'display: inline-block; vertical-align: middle';
        this.info.style = 'font-size: 1.4em; margin-left: 2em; ' +
            '  -webkit-touch-callout: none;' +
            '    -webkit-user-select: none;' +
            '     -khtml-user-select: none;' +
            '       -moz-user-select: none;' +
            '        -ms-user-select: none;' +
            '            user-select: none;';

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

        this.redraw();
    }

    mousedown(xy) {
        //TODO mousedown
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


    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.bg, 0, 0, 485, 300, 0, 0, 485, 300);

        //draw items list
        let x0 = 30;
        let y0 = DRESSER_H + 25;
        for (let item of this.items_list) {
            item.draw(this.ctx, x0, y0);
            x0 += 30;
            //TODO draw arrows from left to right
        }
        if (this.cursor_x >= 0 && this.cursor_y >= 0) {
            // draw item under cursor
            let last_item = this.items_list[this.items_list.length - 1];
            last_item.draw(this.ctx, this.cursor_x, this.cursor_y);
            // draw highlighting
            for (let cell of this.all_cells) {
                if (cell.hit_test(this.cursor_x, this.cursor_y) && cell.item_name_from === last_item.name)
                    cell.draw_highlight(this.ctx);
            }
        }
    }

    reset() {
        //TODO reset

        this.redraw();
    };

    isEnabled() {
        return this.enabled;
    };

    setEnabled(state) {
        this.enabled = state;

        this.redraw();
    };

    setInitCallback(_initCallback) {
        this.initCallback = _initCallback;

        //if we are initialized just after creation, any attempt to set up init callback is after we are initialized
        if (this.initCallback && this.loaded)
            this.initCallback();
    };

    getSolution() {
        //TODO return solution
    }

    loadSolution(solution) {
        this.reset();
        if (solution === '')
            return;

        //TODO load solution
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
