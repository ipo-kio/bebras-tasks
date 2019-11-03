import {SimpleStatesTask} from "../lib/SimpleStatesTask";
import {TransitionButton} from "./TransitionButton";
import {CIRCLE, Pattern, SQUARE, TRIANG} from "./Pattern";
import {UndoButton} from "./UndoButton";

const FINAL_PATTERN = [CIRCLE, CIRCLE, CIRCLE];

export class Task extends SimpleStatesTask {

    enabled = false;
    initCallback = null;

    currentPattern;
    finalPattern;

    steps = [];

    constructor(container_id, images) {
        super(container_id, 620, 320);

        this.ctx.font = 'bold 14px sans-serif';
        let w = this.ctx.measureText('Получить: ');

        this.currentPattern = new Pattern(this.ctx, 6, 180, [SQUARE, SQUARE], 1);
        this.finalPattern = new Pattern(this.ctx, 6 + w.width + 6, 240, FINAL_PATTERN, 0, false);

        this.scene.draw_bg = () => {
            let overElement = this.scene.over_element;
            if (overElement !== null && overElement.pat1)
                this.currentPattern.highlight(overElement.pat1.p);
            this.currentPattern.draw();

            this.ctx.fillStyle = 'black';
            this.ctx.textBaseline = "middle";
            this.ctx.font = 'bold 14px sans-serif';

            this.ctx.fillText('Получить:', 9, 240 + Pattern.height_by_size_id(1) / 2);
            let solved = this.currentPattern.is(FINAL_PATTERN);
            this.finalPattern.opaque = solved;
            this.finalPattern.draw();
            if (solved) {
                this.ctx.font = 'bold 16px sans-serif';
                this.ctx.fillStyle = '#ff2c1d';
                this.ctx.fillText('Готово! Сохраните ответ', 9, 300);
            }

            this.undo_button.x = 12 + this.currentPattern.x + this.currentPattern.width;
            this.undo_button.y = this.currentPattern.y + (this.currentPattern.height - this.undo_button.height) / 2;
            this.undo_button.visible = this.steps.length > 0;
        }
    }

    getSolution() {
        let r = "";
        for (let p of this.steps)
            r += p;
        return r;
    };

    loadSolution(solution) {
        this._reset();

        solution = "" + solution;

        this.steps = [];
        for (let i = 0; i < solution.length; i++) {
            let ind = +solution[i];
            if (ind >= 0 && ind < this.transition_buttons.length)
                this.steps.push(ind)
        }

        this.update_state_from_steps();

        this._redraw();
    };

    createElements() {
        let ind = 0;
        let ctx = this.ctx;
        let task = this;

        function transition_button(p1, p2) {
            let x = 6 + 300 * (ind % 2);
            let y = 6 + (Pattern.height_by_size_id(0) + 10) * Math.floor(ind / 2);

            let tb = new TransitionButton(task, ctx, ind, p1, p2, x, y);

            ind++;

            return tb;
        }

        this.undo_button = new UndoButton(this, this.ctx, 300, 300);
        this.transition_buttons = [
            transition_button([TRIANG], [CIRCLE, CIRCLE]),
            transition_button([SQUARE], [TRIANG, TRIANG]),
            transition_button([TRIANG, CIRCLE], [SQUARE]),
            transition_button([SQUARE, SQUARE], [TRIANG, CIRCLE, CIRCLE]),
            transition_button([CIRCLE, CIRCLE, CIRCLE], [])
        ];

        let elements = this.transition_buttons.slice();
        elements.push(this.undo_button);

        return elements;
    }

    getAnswer() {
        return this.currentPattern.is(FINAL_PATTERN) ? 1 : 0;
    }

// private methods

    _reset() {

    }

    _redraw() {
        this.scene.draw();
    }

    do(ind) {
        let b = this.transition_buttons[ind];
        let pat1 = b.pat1.p;
        let pat2 = b.pat2.p;
        if (this.do_no_push(pat1, pat2))
            this.steps.push(ind);
    }

    /**
     returns was pushed or not
     */
    do_no_push(pat1, pat2) {
        let pos = this.currentPattern.find_position(pat1);
        if (pos < 0)
            return false;

        this.currentPattern.substitute(pos, pat1.length, pat2);
        return true;
    }

    undo() {
        if (this.steps.length === 0)
            return;
        this.steps.splice(this.steps.length - 1, 1);

        this.update_state_from_steps();
    }

    update_state_from_steps() {
        this.currentPattern.p = [SQUARE, SQUARE];

        for (let ind of this.steps) {
            let transitionButton = this.transition_buttons[ind];
            this.do_no_push(transitionButton.pat1.p, transitionButton.pat2.p);
        }
    }
}