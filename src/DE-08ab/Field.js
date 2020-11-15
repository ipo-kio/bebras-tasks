import {RectangleStatefulElement} from "../lib/SimpleStatesTask";

export class Field {
    constructor(ctx, task, x0, y0, d, i, color) {
        this.ctx = ctx;
        this.task = task;
        this.x0 = x0;
        this.y0 = y0;
        this.d = d;
        this.i = i;
        this.color = color;

        this.createElements();
    }

    drawBg() {
        this.ctx.save();
        this.fillStyle = "black";
        this.lineWidth = 2;
        this.ctx.strokeRect(this.x0, this.y0, 3 * this.d, 3 * this.d);

        this.ctx.font = "1em sans-serif";
        this.ctx.textBaseline = "alphabetic";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.i, this.x0 + 1.5 * this.d, this.y0 - 8);

        this.ctx.restore();
    }

    createElements() {
        this.elements = [];
        this.elements_cell = [];
        for (let i = 0; i < 3; i++) {
            let row = [];
            for (let j = 0; j < 3; j++) {
                let cell = new Cell(
                    this.ctx, this.task,
                    this.x0 + j * this.d, this.y0 + i * this.d, this.d,
                    this.color
                );
                this.elements.push(cell);
                row.push(cell);
            }
            this.elements_cell.push(row);
        }
    }

    /**
     * gets bomino type
     * @returns {number}
     * -1 means not a 3-bomino at all
     * 0 means empty
     * 1, 2, 3 means types from the correct answer
     */
    getBominoType() {
        let cnt = 0;
        for (let el of this.elements)
            cnt += el.state;
        if (cnt === 0)
            return 0;
        if (cnt !== 3)
            return -1;

        let e = this.elements_cell;

        // check for the third type
        if (e[1][1].state === 1 && (e[0][0].state === 1 && e[2][2].state === 1 || e[0][2].state === 1 && e[2][0].state === 1))
            return 3;

        // check for the first type
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                if (e[i][j].state === 0) {
                    let c = 0;
                    if (i > 0) c += e[i - 1][j].state;
                    if (j > 0) c += e[i][j - 1].state;
                    if (i < 2) c += e[i + 1][j].state;
                    if (j < 2) c += e[i][j + 1].state;

                    if (c === 3)
                        return 1;
                }
    }
}

class Cell extends RectangleStatefulElement {

    constructor(ctx, task, x0, y0, d, color) {
        super(ctx, 2, [1, 0], x0, y0, d, d);

        this.clickHandler = function () {
            task.updateText();
        }

        this.color = color;
    }

    draw() {
        this.ctx.save();
        this.ctx.fillStyle = this.state === 0 ? '#EEE' : this.color;
        this.ctx.strokeStyle = '#AAA';
        this.ctx.lineWidth = 1;
        this.begin_outline_path();
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
    }
}
