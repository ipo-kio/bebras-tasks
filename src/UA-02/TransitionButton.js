import {StatefulElement} from "../lib/StatefulElement";

const ARROW_WIDTH = 40;

export class TransitionButton extends StatefulElement {

    constructor(ctx, pat1, pat2, x, y) {
        super(ctx, 1, [0]);

        this.pat1 = new Pattern(ctx, pat1);
        this.pat2 = new Pattern(ctx, pat2);

        this.x = x;
        this.y = y;
    }


    draw() {
        this.pat1.draw(this.x, this.y);
        this.pat2.draw(this.x + this.pat1.width + ARROW_WIDTH, this.y);

        //draw arrow
        let ctx = this.ctx;
        ctx.save();

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#000000';
        ctx.translate(this.x + this.pat1.width, this.y + Math.round(this.pat1.height / 2));

        const W = 5; //arrow thickness

        ctx.beginPath();
        ctx.moveTo(0, -W);
        ctx.lineTo(ARROW_WIDTH - W, -W);
        ctx.moveTo(ARROW_WIDTH - W, W);
        ctx.lineTo(0, W);
        ctx.move(ARROW_WIDTH - 2 * W, -W);
        ctx.lineTo(ARROW_WIDTH, 0);
        ctx.lineTo(ARROW_WIDTH - 2 * W, W);
        ctx.stroke();

        ctx.restore();
    }

    begin_outline_path() {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.pat1.width + ARROW_WIDTH + this.pat2.width, this.pat1.height);
    }

    hit_test({x, y}) {
        this.begin_outline_path();
        this.ctx.hit_test() // TODO how to test point is inside path
    }
}
