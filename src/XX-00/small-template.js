import {appendCanvas} from "../lib/ContainerHelpers";

export class Task {

    enabled = false;
    initCallback = null;

    constructor(container_id) {
        let canvas = appendCanvas(container_id, 400, 500);
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