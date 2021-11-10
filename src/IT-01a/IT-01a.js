import {appendCanvas} from "../lib/ContainerHelpers";
import {Field} from "./field";
import {RED, Stack, WHITE} from "./stack";

export class Task {

    enabled = false;
    initCallback = null;

    constructor(container_id) {
        let canvas = appendCanvas(container_id, 400, 500);
        let field = new Field(canvas, [
            new Stack([RED, WHITE, RED]),
            new Stack([RED, RED, WHITE, RED]),
            new Stack([WHITE, RED]),
            new Stack([RED, WHITE])
        ]);
        field.redraw();
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
