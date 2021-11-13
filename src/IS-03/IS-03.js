import mouse_coordinates from "../lib/MouseCoordinates";
import {Item} from "./item";

const CANVAS_W = 485;
const CANVAS_H = 300;

const M = 3;
const N = 5;
const WINDOW_W = 100;
const WINDOW_H = 100;
const WINDOW_X0 = 100;
const WINDOW_Y0 = 100;
const WINDOW_SKIP_X = 100;
const WINDOW_SKIP_Y = 100;

const ITEMS = [
    ['heart', 'tree', 'cross', 'moon', 'heart'],
    ['cross', 'pentagon', 'key', 'tree', 'star'],
    ['tree', 'diamond', 'star', 'heart', 'triangle'],
]

export class Task {

    canvas;
    info;
    ctx;
    bg;
    loaded;

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
            new Item(this.bg, 'square', 140, 5, 2, 5),
            new Item(this.bg, 'diamond', 165, 5, 2, 5),
            new Item(this.bg, 'moon', 190, 5, 2, 5),
            new Item(this.bg, 'star', 215, 5, 2, 5),
            new Item(this.bg, 'tree', 240, 5, 2, 5),
            new Item(this.bg, 'cross', 265, 5, 2, 5),
            new Item(this.bg, 'circle', 290, 5, 2, 5),
            new Item(this.bg, 'key', 0, 0, 6, 4),
            new Item(this.bg, 'triangle', 315, 5, 2, 5),
            new Item(this.bg, 'pentagon', 340, 5, 2, 5),
            new Item(this.bg, 'heart', 365, 5, 2, 5)
        ];
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
            if (e.buttons & 1 !== 0 && this.isEnabled())
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
        //TODO mouseleave
    }

    mousemove(xy) {
        //TODO mosemove
    }


    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.bg, 0, 0, 485, 300, 0, 0, 485, 300);
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
