import {StatefulElement} from "../../lib/StatefulElement";

const W = 30;
const H = 24;
const M = 4;
const L = 6;
const R = (H - 2 * M) / 2;
const UNDO_SKIP = 4;

export class UndoButton extends StatefulElement {

    _visible = false;

    constructor(task, ctx, x, y) {
        super(ctx, 1, [0]);
        this.x = x;
        this.y = y;
        this.task = task;
        this.force_highlighting = true;

        this.ctx.save();
        this.ctx.font = 'bold 14px sans-serif';
        this.undo_text_width = this.ctx.measureText('Отменить').width;
        this.ctx.restore();

        this.clickHandler = e => {
            this.task.undo();
        };
    }

    draw() {
        if (!this.visible)
            return;

        let ctx = this.ctx;
        ctx.save();

        ctx.strokeStyle = "#d68904";
        ctx.fillStyle = "#d68904";
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.translate(this.x, this.y);
        this.ctx.textAlign = "left";
        ctx.beginPath();
        ctx.moveTo(M + L, M);
        ctx.lineTo(W - M - R, M);
        ctx.arc(W - M - R, H / 2, R, -Math.PI / 2, Math.PI / 2);
        ctx.lineTo(2 * M, H - M);

        ctx.moveTo(2 * M + L, H - M - L);
        ctx.lineTo(2 * M, H - M);
        ctx.lineTo(2 * M + L, H - M + L);
        ctx.stroke();

        this.ctx.fillText('Отменить', W + UNDO_SKIP, (H + L) / 2);

        ctx.restore();
    }

    begin_outline_path() {
        if (!this._visible)
            return;

        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, W + this.undo_text_width + 2 * UNDO_SKIP, H + L);
    }

    hit_test({x, y}) {
        if (!this._visible)
            return false;

        this.begin_outline_path();
        return this.ctx.isPointInPath(x, y);
    }

    get height() {
        return H + L;
    }

    get visible() {
        return this._visible;
    }

    set visible(value) {
        this._visible = value;
    }
}
