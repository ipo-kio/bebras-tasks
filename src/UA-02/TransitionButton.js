import {StatefulElement} from "../lib/StatefulElement";
import {Pattern} from "./Pattern";

const ARROW_WIDTH = 40;

export class TransitionButton extends StatefulElement {

    ind;

    constructor(task, ctx, ind, pat1, pat2, x, y) {
        super(ctx, 1, [0]);

        this.task = task;
        this.ind = ind;

        this.x = x;
        this.y = y;

        this.pat1 = new Pattern(ctx, this.x, this.y, pat1);
        this.pat2 = new Pattern(ctx, this.x + this.pat1.width + ARROW_WIDTH, this.y, pat2);

        this.force_highlighting = true;

        this.clickHandler = () => {
            this.task.do(this.ind);
        };
    }

    draw() {
        this.pat1.draw();
        this.pat2.draw();

        //draw arrow
        let ctx = this.ctx;
        ctx.save();

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.translate(this.x + this.pat1.width, this.y + Math.round(this.pat1.height / 2));

        const W = 3; //arrow thickness

        ctx.beginPath();
        ctx.moveTo(W, -W);
        ctx.lineTo(ARROW_WIDTH - 2 * W, -W);
        ctx.moveTo(ARROW_WIDTH - 2 * W, W);
        ctx.lineTo(W, W);
        ctx.moveTo(ARROW_WIDTH - 4 * W, -3 * W);
        ctx.lineTo(ARROW_WIDTH - W, 0);
        ctx.lineTo(ARROW_WIDTH - 4 * W, 3 * W);
        ctx.stroke();

        ctx.restore();
    }

    begin_outline_path() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.translate(this.x, this.y);
        this.ctx.rect(0, 0, this.pat1.width + ARROW_WIDTH + this.pat2.width, this.pat1.height);
        this.ctx.restore();
    }

    hit_test({x, y}) {
        this.begin_outline_path();
        return this.ctx.isPointInPath(x, y);
    }
}
