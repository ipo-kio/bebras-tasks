import {SimpleStatesTask} from "../lib/SimpleStatesTask";
import {TransitionButton} from "./TransitionButton";
import {CIRCLE, Pattern, SQUARE, TRIANG} from "./Pattern";

const FINAL_PATTERN = [CIRCLE, CIRCLE, CIRCLE];

export class Task extends SimpleStatesTask {

    enabled = false;
    initCallback = null;

    currentPattern;
    finalPattern;

    constructor(container_id, images) {
        super(container_id, 620, 400);

        this.currentPattern = new Pattern(this.ctx, 6, 180, [SQUARE, SQUARE], 1);
        this.finalPattern = new Pattern(this.ctx, 6, 240, FINAL_PATTERN, 1, false);

        this.scene.draw_bg = () => {
            let overElement = this.scene.over_element;
            if (overElement !== null)
                this.currentPattern.highlight(overElement.pat1.p);
            this.currentPattern.draw();
            this.finalPattern.draw();
        }
    }

    getSolution() {
        return "";
    };

    loadSolution(solution) {
        this._reset();

        if (solution === "")
            return;

        this._redraw();
    };

    createElements() {
        let ind = 0;
        let ctx = this.ctx;

        function transition_button(p1, p2) {
            let x = 6 + 300 * (ind % 2);
            let y = 6 + (Pattern.height_by_size_id(0) + 10) * Math.floor(ind / 2);
            ind++;

            return new TransitionButton(ctx, p1, p2, x, y);
        }

        this.transition_buttons = [
            transition_button([TRIANG], [CIRCLE, CIRCLE]),
            transition_button([SQUARE], [TRIANG, TRIANG]),
            transition_button([TRIANG, CIRCLE], [SQUARE]),
            transition_button([SQUARE, SQUARE], [TRIANG, CIRCLE, CIRCLE]),
            transition_button([CIRCLE, CIRCLE, CIRCLE], [])
        ];

        return this.transition_buttons;
    }

    // private methods

    _reset() {

    }

    _redraw() {
        this.scene.draw();
    }
}