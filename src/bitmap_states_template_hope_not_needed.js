import {BitmapElement, BitmapState, BitmatStatefulScene} from "../lib/BitmatStatefulScene";
import {appendCanvas} from "../lib/ContainerHelpers";

function create_elements(img, ctx) {
    //TODO create bitmap states
    let bitmap_states = [
    ];

    let elements = [];

    //TODO create elements

    return elements;
}

export class Task {

    //container - is an id of element
    constructor(container, images) {
        this.initCallback = null;
        this.container = container;

        this.img = new Image();
        this.img.onload = this.bgLoaded.bind(this);
        this.img.src = images.bg;

        this.loaded = false;
    }

    bgLoaded() {
        this.loaded = true;

        let WIDTH = 42; //TODO set width and height
        let HEIGHT = 42;

        this.canvas = appendCanvas(this.container, WIDTH, HEIGHT);
        this.ctx = this.canvas.getContext('2d');
        this.scene = new BitmatStatefulScene(
            this.canvas,
            this.img,
            0, 0,
            create_elements(this.img, this.ctx)
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

    getAnswer() { //-1 no answer, 0 wrong, 1 correct, 2 - server check
        return 2;
    }
}