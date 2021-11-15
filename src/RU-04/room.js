export const WINDOW_W = 62;
export const WINDOW_H = 62;

export class Room {
    constructor(points, number, color, ind) {
        this.points = points;
        this.number = number;
        this.color = color;
        this.ind = ind;
    }

    outline_path(ctx) {
        ctx.beginPath();
        let first = true;
        for (let [x, y] of this.points)
            if (first)
                ctx.moveTo(x, y);
            else
                ctx.lineTo(x, y);
    }

    hit_test(ctx, x0, y0) {
        this.outline_path(ctx);
        return ctx.isPointInPath(x0, y0);
    }

    draw_highlight(ctx) {
        ctx.save();

        ctx.fillStyle = 'rgba(255, 255, 0, 0.4)';
        this.outline_path(ctx);
        ctx.fill();

        ctx.restore();
    }

    draw_at(ctx, x0, y0) {
        ctx.textBaseline = "top";
        ctx.font = 'bold 20px sans-serif';
        let text = '' + this.number;
        let m = ctx.measureText(text);

        ctx.fillStyle = this.color;
        ctx.drawRect(x0, y0, x0 + 6 + m.width, 26);

        ctx.fillStyle = 'black';
        ctx.fillText(text, x0 + 3, y0 + 3);
    }
}
