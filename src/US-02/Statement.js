import {StatefulElement} from "../lib/StatefulElement";

const SKIP = 8;
const LABEL_FONT = 'bold 18px sans-serif';
const TEXT_FONT = '16px sans-serif';

export class Statement extends StatefulElement {

    static width1 = 0;

    constructor(ctx, x, y, index, text) {
        super(ctx, 2, [1, 0]);
        this.x = x;
        this.y = y;

        this.index = index;
        this.text = text;

        ctx.save();
        ctx.font = LABEL_FONT;
        let labelMetrics = ctx.measureText(this.index + ".");
        let width1 = labelMetrics.width;

        ctx.font = TEXT_FONT;
        let width = ctx.measureText(this.text).width;
        ctx.restore();

        this.text_width = width;

        if (width1 > Statement.width1)
            Statement.width1 = width1;
    }

    draw() {
        let ctx = this.ctx;
        ctx.save();

        // ctx.textBaseline = 'top';

        if (this.state === 1) {
            ctx.beginPath();
            ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
            ctx.strokeStyle = 'rgba(0, 255, 0, 1)';
            ctx.lineWidth = 2;
            ctx.arc(this.x + 8, this.y - 6, 15, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }

        ctx.font = LABEL_FONT;
        ctx.fillStyle = 'red';
        ctx.fillText(this.index + ".", this.x, this.y);
        ctx.font = TEXT_FONT;
        ctx.fillStyle = 'black';
        ctx.fillText(this.text, this.x + Statement.width1 + SKIP, this.y);

        ctx.restore();
    }

    begin_outline_path() {
        this.ctx.beginPath();
        let M = 4;
        this.ctx.rect(this.x - M, this.y - M - 16, Statement.width1 + SKIP + this.text_width + 2 * M, 20 + 2 * M);
    }

    hit_test({x, y}) {
        this.begin_outline_path();
        return this.ctx.isPointInPath(x, y);
    }
}