import {StatefulElement} from "../../lib/StatefulElement";

export const W = 85, N = 5;

export class Clicker extends StatefulElement {

    constructor(ctx, x, y, task) {
        super(ctx, 2, [1, 0]);
        this.x = x;
        this.y = y;
        this.task = task;

        this.clickHandler = () => task.scene.reset_all_except_one(this);
    }

    draw() {
        if (this.state === 1)
            //x: 74, y: 0, width: 60, height: 59
            this.ctx.drawImage(this.task.bg, 74, 0, 60, 59, this.x + (W - 60) / 2, this.y + (W - 59) / 2, 60, 59)
    }


    begin_outline_path() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, W, W);
    }

    hit_test({x, y}) {
        this.begin_outline_path();
        return this.ctx.isPointInPath(x, y);
    }
}
