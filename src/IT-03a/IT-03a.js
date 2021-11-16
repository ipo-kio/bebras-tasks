import {RectangleStatefulElement, SimpleStatesTask} from "../lib/SimpleStatesTask";

const D = 40;
const PAD = 4;

export class Task extends SimpleStatesTask {
    constructor(container, pictures) {
        super(container, 6 * D + 2 * PAD, 5 * D + 2 * PAD);
    }

    createElements() {
        return [
            new Rect(this.ctx, 0, 0, 0, 1), //A
            new Rect(this.ctx, 1, 0, 1, 0), //B
            new Rect(this.ctx, 2, 0, 5, 1), //C
            new Rect(this.ctx, 0, 2, 0, 2), //D
            new Rect(this.ctx, 1, 1, 1, 2), //E
            new Rect(this.ctx, 2, 2, 2, 4), //F
            new Rect(this.ctx, 3, 2, 3, 3), //G
            new Rect(this.ctx, 4, 2, 4, 3), //H
            new Rect(this.ctx, 5, 2, 5, 4), //I
            new Rect(this.ctx, 0, 3, 1, 3), //J
            new Rect(this.ctx, 0, 4, 1, 4), //K
            new Rect(this.ctx, 3, 4, 4, 4), //L
            // new Rect(),
            // new Rect(),
            // new Rect(),
            // new Rect(),
            // new Rect(),
            // new Rect(),
            // new Rect(),
            // new Rect(),
            // new Rect(),
        ];
    }
}

const COLORS = ['white', '#e10000', '#0577e8'];

class Rect extends RectangleStatefulElement {

    constructor(ctx, x1, y1, x2, y2) {
        super(ctx, 3, [1, 2, 0], PAD + x1 * D, PAD + y1 * D, (x2 - x1 + 1) * D, (y2 - y1 + 1) * D);
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
    }

    draw() {
        this.ctx.save();
        this.ctx.fillStyle = COLORS[this.state];
        this.ctx.strokeStyle = '#AAA';
        this.ctx.lineWidth = 1;
        this.begin_outline_path();
        this.ctx.fill();
        this.ctx.stroke();

        if (this.state === 2) {
            this.ctx.fillStyle = '#f1f10c';
            for (let x = this.x1; x <= this.x2; x++)
                for (let y = this.y1; y <= this.y2; y++) {
                    let xx = x * D + PAD + D / 2;
                    let yy = y * D + PAD + D / 2;
                    this.ctx.beginPath();
                    this.ctx.arc(xx, yy, 6, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
        }

        this.ctx.restore();
    }
}
