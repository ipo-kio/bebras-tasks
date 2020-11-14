import {SimpleStatesTask} from "../../lib/SimpleStatesTask";
import {TransitionButton} from "./TransitionButton";
import {CIRCLE, Pattern, SQUARE, TRIANG} from "./Pattern";
import {UndoButton} from "./UndoButton";

const FINAL_PATTERN = [CIRCLE, CIRCLE, CIRCLE];

export class Task extends SimpleStatesTask {

    enabled = false;
    initCallback = null;

    initialPattern;
    currentPattern;
    finalPattern;

    steps = [];

    constructor(container_id, images) {
        super(container_id, 620, 320);

        this.ctx.font = '14px sans-serif';
        let w = this.ctx.measureText('Получить: ').width + 4;

        this.initialPattern = new Pattern(this.ctx, 6 + w + 6, 180, [SQUARE, SQUARE], 0, false);
        this.currentPattern = new Pattern(this.ctx, 6 + w + 6, 224, [SQUARE, SQUARE], 1);
        this.finalPattern = new Pattern(this.ctx, 6 + w + 6, 280, FINAL_PATTERN, 0, false);

        this.scene.draw_bg = () => {
            this.initialPattern.draw();

            let overElement = this.scene.over_element;
            if (overElement !== null && overElement.pat1)
                this.currentPattern.highlight(overElement.pat1.p);
            this.currentPattern.draw();

            this.ctx.fillStyle = 'black';
            this.ctx.textBaseline = "middle";
            this.ctx.textAlign = "right";
            this.ctx.font = '14px sans-serif';
            this.ctx.fillText('Начало:', w, 180 + Pattern.height_by_size_id(1) / 2);
            this.ctx.fillText('Текущее:', w, 228 + Pattern.height_by_size_id(1) / 2);
            this.ctx.fillText('Получить:', w, 276 + Pattern.height_by_size_id(1) / 2);

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
        if (this.getSolution() === "")
            return -1;
        return this.currentPattern.is(FINAL_PATTERN) ? 1 : 0;
    }

// private methods

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

/*
<p>Начальная последовательность фигурок такова:&#160;<img style="height:30px; vertical-align: middle" src="/~res/tIJfS6jIl9LgUdfj_Agt1570989084854.svg" alt="an image" /></p><p>Нажатие каждой из кнопок заменяет первое вхождение набора фигурок, нарисованного слева от стрелки, на набор нарисованный справа.</p><p>Кнопка 1:&#160;<img style="height:30px; vertical-align: middle" src="/~res/xdjsu_APfc0hcPUxvFuZ1570988953571.svg" alt="an image" /></p><p>Кнопка 2:&#160;<img style="height:30px; vertical-align: middle" src="/~res/dqIVAV9W9xTG4-XLMPg21570989008516.svg" alt="an image" /></p><p>Кнопка 3:&#160;<img style="height:30px; vertical-align: middle" src="/~res/HZPGxx-ezMZcNAnuXVsr1570989024961.svg" alt="an image" /></p><p>Кнопка 4:&#160;<img style="height:30px; vertical-align: middle" src="/~res/fAYcDbXqiO7NIk3ubG621570989039138.svg" alt="an image" /></p><p>Кнопка 5:&#160;<img style="height:30px; vertical-align: middle" src="/~res/L8oFG9h9Ez5XELk3oVb_1570989053596.svg" alt="an image" /></p><p>Преврати начальную последовательность фигурок, нажимая кнопки, в такую последовательность:</p><p><img style="height:30px; vertical-align: middle" src="/~res/woLZF3GGkMePwPkVKhSD1570989070171.svg" alt="an image" /></p>
*/
