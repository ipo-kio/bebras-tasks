import {StatefulElement} from "../lib/StatefulElement";

export class TailElement extends StatefulElement {

    points;
    x0;
    y0;
    xLen;

    constructor(ctx, points, x0, y0, xLen) {
        super(ctx, 2, [1, 0]);
        this.points = points;
        this.x0 = x0 + 4;
        this.y0 = y0 + 4;
        this.xLen = xLen;
    }

    draw() {
        if (this.state === 0)
            return;

        this.ctx.save();
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(this.x0 - this.xLen, this.y0 - this.xLen);
        this.ctx.lineTo(this.x0 + this.xLen, this.y0 + this.xLen);
        this.ctx.moveTo(this.x0 - this.xLen, this.y0 + this.xLen);
        this.ctx.lineTo(this.x0 + this.xLen, this.y0 - this.xLen);
        this.ctx.lineWidth = 9;
        this.ctx.strokeStyle = "black";
        this.ctx.stroke();
        this.ctx.lineWidth = 8;
        this.ctx.strokeStyle = "red";
        this.ctx.stroke();
        this.ctx.restore();
    }

    begin_outline_path() {
        this.ctx.beginPath();

        let first = true;
        for (let point of this.points) {
            if (first) {
                this.ctx.moveTo(point[0] + 4, point[1] + 4);
                first = false;
            } else
                this.ctx.lineTo(point[0] + 4, point[1] + 4);
        }

        this.ctx.closePath();
    }

    hit_test({x, y}) {
        this.begin_outline_path();
        return this.ctx.isPointInPath(x, y);
    }
}
