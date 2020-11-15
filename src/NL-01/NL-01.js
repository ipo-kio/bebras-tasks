import {SimpleStatesTask} from "../lib/SimpleStatesTask";
import {StatefulElement} from "../lib/StatefulElement";

const X0 = 12;
const Y0 = 12;
const D = 36;
const M = 6;
const N = 6;
const R = 6;
const LINE_WIDTH = 4;
const CARPET_WIDTH = 6;
const CIRCLE_COLOR = '#009d95';
const LINE_COLOR = '#f0ce51';
const CARPET_COLOR = '#b65200';

export class Task extends SimpleStatesTask {

    //container - is an id of element
    constructor(container, images) {
        super(container, 2 * X0 + N * D, 2 * Y0 + M * D, draw_bg, true);

        function draw_bg(ctx) {
            ctx.save();
            ctx.translate(X0, Y0);

            ctx.beginPath();
            ctx.strokeStyle = LINE_COLOR;
            ctx.lineWidth = LINE_WIDTH;
            for (let i = 0; i < M; i++) {
                ctx.moveTo(0, i * D);
                ctx.lineTo((N - 1) * D, i * D);
            }
            for (let j = 0; j < N; j++) {
                ctx.moveTo(j * D, 0);
                ctx.lineTo(j * D, (M - 1) * D);
            }
            ctx.stroke();

            ctx.fillStyle = CIRCLE_COLOR;
            for (let i = 0; i < M; i++) {
                for (let j = 0; j < N; j++) {
                    let x = j * D;
                    let y = i * D;
                    ctx.beginPath();
                    ctx.arc(x, y, R, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            ctx.restore();
        }

        this.enabled = true;
        this.initCallback = null;

        this.textDiv = document.createElement("div");
        this.textDiv.style.marginLeft = "4px";
        document.getElementById(container).appendChild(this.textDiv);
    }

    updateText() {
        let cnt = 0;
        for (let el of this.scene.elements)
            if (el.state === 1)
                cnt++;
        switch (cnt) {
            case 0:
                this.textDiv.innerText = "Выберите 4 ячейки";
                break;
            case 1:
                this.textDiv.innerText = "Осталось выбрать 3 ячейки ";
                break;
            case 2:
                this.textDiv.innerText = "Осталось выбрать 2 ячейки";
                break;
            case 3:
                this.textDiv.innerText = "Осталось выбрать 1 ячейку";
                break;
            case 4:
                this.textDiv.innerText = "Выбрано 4 ячейки";
                break;
            default:
                this.textDiv.innerText = "Выбрано слишком много ячеек, нужно выбрать 4";
        }

        this.textDiv.style.color = cnt === 4 ? "black" : "red";
    }

    loadSolution(solution) {
        super.loadSolution(solution);
        this.updateText();
    }

    createElements() {
        let el = [];

        for (let i = 0; i < M; i++)
            for (let j = 0; j < N - 1; j++)
                el.push(new Edge(this.ctx, this, i, j, i, j + 1));

        for (let i = 0; i < M - 1; i++)
            for (let j = 0; j < N; j++)
                el.push(new Edge(this.ctx, this, i, j, i + 1, j));

        console.log(el);

        return el;
    }
}

class Edge extends StatefulElement {

    constructor(ctx, task, i1, j1, i2, j2) {
        super(ctx, 2, [1, 0]);

        this.i1 = i1;
        this.i2 = i2;
        this.j1 = j1;
        this.j2 = j2;

        this.clickHandler = function() {
            task.updateText();
        }
    }

    begin_outline_path() {
        console.log('here');

        let d = 6;
        let c = this.ctx;
        c.beginPath();
        let x1 = X0 + this.j1 * D;
        let x2 = X0 + this.j2 * D;
        let y1 = Y0 + this.i1 * D;
        let y2 = Y0 + this.i2 * D;
        c.moveTo(x1, x2);
        if (this.i1 === this.i2) {
            c.lineTo(x1 + d, y1 - d);
            c.lineTo(x2 - d, y1 - d);
            c.lineTo(x2, y2);
            c.lineTo(x2 - d, y1 + d);
            c.lineTo(x1 + d, y1 + d);
            c.closePath();
        } else {
            c.lineTo(x1 + d, y1 + d);
            c.lineTo(x1 + d, y2 - d);
            c.lineTo(x1, y2);
            c.lineTo(x1 - d, y2 - d);
            c.lineTo(x1 - d, y1 + d);
            c.closePath();
        }
    }

    hit_test({x, y}) {
        this.begin_outline_path();
        return this.ctx.isPointInPath(x, y);
    }

    draw() {
        if (this.state === 0)
            return;

        this.ctx.save();
        this.ctx.lineWidth = CARPET_WIDTH;
        this.ctx.strokeStyle = CARPET_COLOR;
        this.ctx.translate(X0, Y0);
        this.ctx.moveTo(this.j1 * D, this.i1 * D);
        this.ctx.lineTo(this.j2 * D, this.i2 * D);
        this.ctx.stroke();
        this.ctx.restore();
    }
}
