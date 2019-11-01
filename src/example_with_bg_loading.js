import mouse_coordinates from "../lib/MouseCoordinates";

const CANVAS_W = 180;
const CANVAS_H = 100;

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
        this.canvas.addEventListener('mouseup', (e) => {
            if (e.button === 0 && this.isEnabled())
                this.mouseup(mouse_coordinates(this.canvas, e))
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

    mouseup(xy) {
        //TODO mouseup
    }

    mousemove(xy) {
        //TODO mosemove
    }


    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        //TODO redraw
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