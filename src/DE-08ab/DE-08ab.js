import {RectangleStatefulElement, SimpleStatesTask} from "../lib/SimpleStatesTask";
import {Field} from "./Field";

const D = 24;
const X0 = 4;
const Y0 = 32;
const SKIP = 20;

export let NUMBER_OF_FIELDS = 4;

export function setNumberOfFields(n) {
    NUMBER_OF_FIELDS = n;
}

export class Task extends SimpleStatesTask {

    //container - is an id of element
    constructor(container) {
        console.log("constructing", NUMBER_OF_FIELDS);
        super(container, 2 * X0 + SKIP * (NUMBER_OF_FIELDS - 1) + D * 3 * NUMBER_OF_FIELDS, 4 + Y0 + 3 * D, draw_bg, true);

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
        let {text, ok} = this.errorText();

        this.textDiv.style.color = ok ? "black" : "red";
        this.textDiv.innerText = text;
    }

    errorText() {
        let types;
        if (NUMBER_OF_FIELDS === 3)
            types = [0, 0, 0];
        else
            types = [0, 0, 0, 0];

        let text = '';

        let typeCount = [0, 0, 0, 0];
        for (let i = 0; i < NUMBER_OF_FIELDS; i++) {
            let ind = i + 1;
            let type = this.fields[i].getBominoType();
            if (type === -1) {
                text += "В поле " + ind + " не бомино\n";
            } else {
                typeCount[type]++;
            }
            if (type === 0 && NUMBER_OF_FIELDS === 3) {
                text += "В поле " + ind + " пусто\n";
            }
            types[i] = type;
        }

        if (typeCount[1] > 1 || typeCount[2] > 1 || typeCount[3] > 1) {
            text += "Есть одинаковые бомино\n";
            console.log('types', types);
        }

        return {text, ok: typeCount[1] === 1 && typeCount[2] === 1 && typeCount[3] === 1};
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

    getAnswer() {
        let {ok} = this.errorText();
        return ok ? 1 : 0;
    }
}
