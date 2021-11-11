import {appendCanvas} from "../lib/ContainerHelpers";
import {Field} from "./field";
import {RED, Stack, WHITE} from "./stack";

export class Task {

    enabled = false;
    initCallback = null;

    constructor(container_id) {
        let canvas = appendCanvas(container_id, 700, 500);
        let field = new Field(canvas, [
            new Stack([WHITE, RED, RED]),
            new Stack([WHITE, RED, WHITE]),
            new Stack([RED, WHITE, RED]),
            new Stack([RED, WHITE, WHITE]),
            new Stack([WHITE, RED]),
            new Stack([WHITE]),
            new Stack([RED])
        ]);
        field.redraw();

        this.field = field;
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
        return this.field.is_ok() ? 1 : -1;
    };

    // private methods

    _reset() {
    }

    _redraw() {
        this.field.redraw();
    }
}
