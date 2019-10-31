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
    }

    begin_outline_path() {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.pat1.width + ARROW_WIDTH + this.pat2.width, this.pat1.height);
    }

    hit_test({x, y}) {
        this.begin_outline_path()
    }
}
