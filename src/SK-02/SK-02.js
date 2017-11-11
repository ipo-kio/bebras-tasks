import {BitmatStatefulScene} from "../lib/BitmatStatefulScene";
import {appendCanvas} from "../lib/ContainerHelpers";

export class Task {

    //container - is an id of element
    constructor(container, images) {
        this.enabled = true;
        this.initCallback = null;
        this.container = container;

        this.img = new Image();
        this.img.onload = this.bgLoaded.bind(this);
        this.img.src = images.bg;

        this.loaded = false;
    }

    bgLoaded() {
        this.loaded = true;
        if (this.initCallback)
            this.initCallback();

        this.canvas = appendCanvas(this.container, 294, 210);
        this.scene = new BitmatStatefulScene(
            this.canvas,
            this.img,
            0, 0,
            []
        )
    }

    reset() {
    };

    isEnabled() {
        return this.enabled;
    };

    setEnabled(state) {
        this.enabled = state;

        //redraw
    };

    setInitCallback(_initCallback) {
        this.initCallback = _initCallback;

        //if we are initialized just after creation, any attempt to set up init callback is after we are initialized
        if (this.loaded)
            this.initCallback();
    };

    getSolution() {
        return ''; //'' means no solution
    }

    loadSolution(solution) {

    }

    getAnswer() { //-1 no answer, 0 wrong, 1 correct, 2 - server check
        return 2;
    }
}