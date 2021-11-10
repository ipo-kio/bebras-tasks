import {appendCanvas} from "../lib/ContainerHelpers";
import {BitmapStatefulScene} from "../lib/BitmapStatefulScene";

const WIDTH = 500;
const HEIGHT = 600;

export class Task {

    enabled = false;
    initCallback = null;

    constructor(container_id, images) {
        this.img = new Image();
        this.img.onload = () => this.bg_loaded();
        this.img.src = images.bg;
        this.container = container_id;

        this.loaded = false;
    }

    bg_loaded() {
        this.loaded = true;

        this.canvas = appendCanvas(this.container, WIDTH, HEIGHT);
        this.ctx = this.canvas.getContext('2d');
        this.scene = new BitmapStatefulScene(
            this.canvas,
            this.img,
            this.bg_position.x, this.bg_position.y,
            this.create_buttons(this.img, this.ctx)
        );

        if (this.initCallback)
            this.initCallback();
    }

    isEnabled() {
        return this.enabled;
    }

    setEnabled(state) {
        this.enabled = state;
        this._redraw();
    };

    setInitCallback(_initCallback) {
        this.initCallback = _initCallback;

        //we are initialized just after creation, so any attempt to set up init callback is after we are initialized
        if (this.initCallback)
            this.initCallback();
    };

    getSolution() {
        return "";
    };

    loadSolution(solution) {
        this._reset();

        if (solution === "")
            return;

        this._redraw();
    };

    getAnswer() {
        return 2;
    };

    // private methods

    _reset() {

    }

    _redraw() {

    }
}
