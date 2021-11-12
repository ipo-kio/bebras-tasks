import {appendCanvas} from "../lib/ContainerHelpers";
import {Field} from "./field";
import {RED, Stack, WHITE} from "./stack";

export class Task {

    initCallback = null;

    constructor(container_id) {
        let canvas = appendCanvas(container_id, 470, 280);
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
        return this.field.enabled;
    }

    setEnabled(state) {
        this.field.enabled = state;
    };

    setInitCallback(_initCallback) {
        this.initCallback = _initCallback;

        //we are initialized just after creation, so any attempt to set up init callback is after we are initialized
        if (this.initCallback)
            this.initCallback();
    };

    getSolution() {
        let solution = this.field.solution;
        if (solution === "-------") // TODO number of '-' equals number of fields
            return "";
        return solution;
    };

    loadSolution(solution) {
        this._reset();

        if (solution !== "")
            this.field.load(solution);

        this._redraw();
    };

    getAnswer() {
        return this.field.is_ok() ? 1 : 0;
    };

    // private methods

    _reset() {
        this.field.load("-------"); // TODO number of '-' equals number of fields
    }

    _redraw() {
        this.field.redraw();
    }
}
