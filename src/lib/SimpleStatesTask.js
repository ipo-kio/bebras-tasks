import {StatefulElement} from "../lib/StatefulElement";
import {appendCanvas} from "../lib/ContainerHelpers";
import {StatefulElementsScene} from "../lib/StatefulElementsScene";

export class SimpleStatesTask {

    //container - is an id of element
    constructor(container, width, height, draw_bg) {
        this.enabled = true;
        this.initCallback = null;

        this.WIDTH = width;
        this.HEIGHT = height;

        this.canvas = appendCanvas(container, this.WIDTH, this.HEIGHT);
        this.ctx = this.canvas.getContext('2d');

        this.scene = new StatefulElementsSceneDecorator(this.canvas, this.createElements(), draw_bg);
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
        if (this.initCallback)
            this.initCallback();
    };

    getSolution() {
        return this.scene.getSolution();
    }

    loadSolution(solution) {
        this.scene.loadSolution(solution);
    }

    getAnswer() {
        return 2;
    }

    createElements() {
        //intended to be overridden
    }
}

export class RectangleStatefulElement extends StatefulElement {

    constructor(ctx, states_count, states_transitions, x, y, width, height) {
        super(ctx, states_count, states_transitions);

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    begin_outline_path() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + this.width, this.y);
        this.ctx.lineTo(this.x + this.width, this.y + this.height);
        this.ctx.lineTo(this.x, this.y + this.height);
        this.ctx.closePath();
    }

    hit_test({x, y}) {
        return this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height;
    }

}

class StatefulElementsSceneDecorator extends StatefulElementsScene {

    constructor(canvas, elements, draw_bg) {
        super(canvas, elements);
        this.draw_bg = draw_bg;
    }

    drawBg() {
        super.drawBg();
        if (this.draw_bg)
            this.draw_bg(this.ctx);
    }
}