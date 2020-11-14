import {RectangleStatefulElement, SimpleStatesTask} from "../lib/SimpleStatesTask";

const MAP = [
    '111111111000000',
    '000000111111111',
    '000000111111111',
    '000000111111111',
    '111111111000000'
];

const D = 24;
const X0 = 4;
const Y0 = 4;

export class Task extends SimpleStatesTask {

    //container - is an id of element
    constructor(container, images) {
        super(container, 2 * X0 + MAP[0].length * D, 2 * Y0 + MAP.length * D, draw_bg, true);

        function draw_bg(ctx) {
            ctx.save();
            ctx.translate(X0, Y0);

            //draw border
            ctx.lineWidth = 2;
            ctx.strokeStyle = "black";
            for (let i = 0; i < MAP.length; i++) {
                for (let j = 0; j < MAP[i].length; j++) {
                    let x0 = j * D;
                    let y0 = i * D;

                    if (MAP[i][j] === '0')
                        continue;

                    //draw over
                    if (i === 0 || MAP[i - 1][j] === '0') {
                        ctx.beginPath();
                        ctx.moveTo(x0, y0);
                        ctx.lineTo(x0 + D, y0);
                        ctx.stroke();
                    }

                    //draw left
                    if (j === 0 || MAP[i][j - 1] === '0') {
                        ctx.beginPath();
                        ctx.moveTo(x0, y0);
                        ctx.lineTo(x0, y0 + D);
                        ctx.stroke();
                    }

                    //draw right
                    if (j === MAP[i].length - 1 || MAP[i][j + 1] === '0') {
                        ctx.beginPath();
                        ctx.moveTo(x0 + D, y0);
                        ctx.lineTo(x0 + D, y0 + D);
                        ctx.stroke();
                    }

                    //draw under
                    if (i === MAP.length - 1 || MAP[i + 1][j] === '0') {
                        ctx.beginPath();
                        ctx.moveTo(x0, y0 + D);
                        ctx.lineTo(x0 + D, y0 + D);
                        ctx.stroke();
                    }
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
        console.log(this);

        for (let i = 0; i < MAP.length; i++) {
            for (let j = 0; j < MAP[i].length; j++) {
                if (MAP[i][j] === '1')
                    el.push(new Cell(this.ctx, this, j, i));
            }
        }

        return el;
    }
}

class Cell extends RectangleStatefulElement {

    constructor(ctx, task, i, j) {
        super(ctx, 2, [1, 0], X0 + i * D, Y0 + j * D, D, D);

        this.clickHandler = function() {
            task.updateText();
        }
    }

    draw() {
        this.ctx.save();
        this.ctx.fillStyle = this.state === 0 ? '#EEE' : 'blue';
        this.ctx.strokeStyle = '#AAA';
        this.ctx.lineWidth = 1;
        this.begin_outline_path();
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
    }
}

// 001000000000000000010001000000000000001000000
