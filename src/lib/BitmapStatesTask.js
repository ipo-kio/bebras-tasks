import {BitmatStatefulScene} from "../lib/BitmatStatefulScene";
import {appendCanvas} from "../lib/ContainerHelpers";

export class BitmapStatesTask {

    //container - is an id of element
    constructor(container, images, bg_position) {
        this.initCallback = null;
        this.container = container;
        this.bg_position = bg_position;

        this.img = new Image();
        this.img.onload = this.bgLoaded.bind(this);
        this.img.src = images.bg;

        this.loaded = false;
    }

    bgLoaded() {
        this.loaded = true;

        this.canvas = appendCanvas(this.container, this.bg_position.width, this.bg_position.height);
        this.ctx = this.canvas.getContext('2d');
        this.scene = new BitmatStatefulScene(
            this.canvas,
            this.img,
            this.bg_position.x, this.bg_position.y,
            this.create_elements(this.img, this.ctx)
        );

        if (this.initCallback)
            this.initCallback();
    }

    reset() {
        this.scene.reset();
    };

    isEnabled() {
        return this.scene.isEnabled();
    };

    setEnabled(state) {
        this.scene.setEnabled(state);
    };

    setInitCallback(_initCallback) {
        this.initCallback = _initCallback;

        //if we are initialized just after creation, any attempt to set up init callback is after we are initialized
        if (this.loaded)
            this.initCallback();
    };

    getSolution() {
        return this.scene.getSolution();
    }

    loadSolution(solution) {
        this.scene.loadSolution(solution);
    }

    //may probably be overridden
    getAnswer() { //-1 no answer, 0 wrong, 1 correct, 2 - server check
        return 2;
    }

    //intended to be overridden
    create_elements(img, ctx) {
        //TODO create bitmap states
        let bitmap_states = [
        ];

        let elements = [];

        //TODO create elements

        return elements;
    }
}