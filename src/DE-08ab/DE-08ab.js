import {RectangleStatefulElement, SimpleStatesTask} from "../lib/SimpleStatesTask";
import {Field} from "./Field";

const D = 24;
const X0 = 4;
const Y0 = 32;
const SKIP = 20;

export let NUMBER_OF_FIELDS = 4;

export class Task extends SimpleStatesTask {

    //container - is an id of element
    constructor(container) {
        super(container, 2 * X0 + SKIP * (NUMBER_OF_FIELDS - 1) + D * 3 * NUMBER_OF_FIELDS, 2 * Y0 + 3 * D, draw_bg, true);

        let self = this;
        function draw_bg(ctx) {
            for (let field of self.fields) {
                field.drawBg();
            }
        }

        this.enabled = true;
        this.initCallback = null;

        this.textDiv = document.createElement("div");
        this.textDiv.style.marginLeft = "4px";
        document.getElementById(container).appendChild(this.textDiv);
    }

    updateText() {
        this.textDiv.innerText = "Выбрано слишком много ячеек, нужно выбрать 4\nasdf asdf";
    }

    loadSolution(solution) {
        super.loadSolution(solution);
        this.updateText();
    }

    createElements() {
        this.fields = [];
        let color = ["red", "blue", "green", "orange"];
        for (let i = 0; i < NUMBER_OF_FIELDS; i++) {
            let field = new Field(this.ctx, this, X0 + (3 * D + SKIP) * i, Y0, D, i + 1, color[i]);
            this.fields.push(field);
        }

        let el = [];

        for (let field of this.fields)
            el.push(...field.elements);

        return el;
    }
}
