import {RectangleStatefulElement, SimpleStatesTask} from "../lib/SimpleStatesTask";

const MAP = [
    '00021000',
    '01111111',
    '02111112',
    '01111111',
    '11111111',
    '11111111',
    '00001211'
];

const D = 36;
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
            for (let i = 0; i < MAP.length; i++) {
                for (let j = 0; j < MAP[i].length; j++) {
                    let x0 = j * D;
                    let y0 = i * D;

                    if (MAP[i][j] === '0')
                        continue;

                    ctx.fillStyle = MAP[i][j] === '2' ? '#a05a2c' : '#66ff00';
                    ctx.fillRect(x0, y0, D, D);
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = "#AAA";
                    ctx.strokeRect(x0, y0, D, D);

                    ctx.lineWidth = 2;
                    ctx.strokeStyle = "black";

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
            if (el.state !== 0)
                cnt++;
        switch (cnt) {
            case 0:
                this.textDiv.innerText = "Выберите позиции для четырех роботов и их направления";
                break;
            case 1:
                this.textDiv.innerText = "Осталось выбрать три позиции";
                break;
            case 2:
                this.textDiv.innerText = "Осталось выбрать две позиции";
                break;
            case 3:
                this.textDiv.innerText = "Осталось выбрать одну позицию";
                break;
            case 4:
                this.textDiv.innerText = "Выбраны четыре позиции для роботов";
                break;
            default:
                this.textDiv.innerText = "Выбрано слишком много позиций, нужно выбрать четыре";
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

    constructor(ctx, task, i, j, color) {
        super(ctx, 5, [1, 2, 3, 4, 0], X0 + i * D, Y0 + j * D, D, D);

        this.clickHandler = function () {
            task.updateText();
        }
    }

    draw() {
        if (this.state === 0)
            return;

        let c = this.ctx;

        c.save();

        c.translate(this.x + D / 2, this.y + D / 2);

        c.beginPath();
        c.arc(0, 0, D / 2 - 4, 0, 2 * Math.PI);
        c.fillStyle = '#a05a2c';
        c.fill();

        c.rotate(this.state * Math.PI / 2);
        c.strokeStyle = "white";
        c.lineWidth = 4;
        c.beginPath();
        c.moveTo(-D / 2 + 8, 0);
        c.translate(D / 2 - 8 - 2, 0);
        c.lineTo(0, 0);
        c.moveTo(-7, -6);
        c.lineTo(0, 0);
        c.lineTo(-7, 6);
        c.stroke();

        c.restore();
    }
}

// 000001004000000000004000002000000000000
