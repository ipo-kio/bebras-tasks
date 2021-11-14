export const CELL_SIZE_W = 38, CELL_SIZE_H = 38;
const ARROW_COLOR = 'red';
const SKIP_ALPHA = 0.1;
const ARROW_ALPHA = 0.15;

export class Cell {
    constructor(bg, x, y, row, col, ind) {
        this.bg = bg;
        this.x = x;
        this.y = y;
        this.row = row;
        this.col = col;
        this.ind = ind;
    }

    hit_test(x0, y0) {
        return this.x <= x0 && x0 <= this.x + CELL_SIZE_W && this.y <= y0 && y0 <= this.y + CELL_SIZE_H;
    }

    draw(ctx) {
        ctx.drawImage(this.bg, 63, 71, 38, 38, this.x, this.y, 38, 38);
    }

    draw_highlight(ctx) {
        ctx.save();

        ctx.lineWidth = 2;
        ctx.fillStyle = 'rgba(255, 255, 0, 0.3)';

        ctx.fillRect(this.x, this.y, CELL_SIZE_W, CELL_SIZE_H);

        ctx.restore();
    }

    //1, 2 or 0
    jump_distance(that) {
        let dx = Math.abs(this.col - that.col);
        let dy = Math.abs(this.row - that.row);
        if (dx > 0 && dy > 0)
            return 0;
        let d = dx + dy;
        if (d > 2)
            return 0;
        return d;
    }

    draw_arrow(ctx, that) {
        let dx = that.x - this.x;
        let dy = that.y - this.y;
        let d = Math.abs(this.row - that.row) + Math.abs(this.col - that.col);

        let sx = dx / d;
        let sy = dy / d;

        ctx.save();

        ctx.lineCap = "butt";
        ctx.lineWidth = 3;
        ctx.strokeStyle = ARROW_COLOR;
        let x1 = this.x + CELL_SIZE_W / 2 + dx * SKIP_ALPHA;
        let y1 = this.y + CELL_SIZE_H / 2 + dy * SKIP_ALPHA;
        let x2 = that.x + CELL_SIZE_W / 2 - dx * SKIP_ALPHA;
        let y2 = that.y + CELL_SIZE_H / 2 - dy * SKIP_ALPHA;
        let x22 = that.x + CELL_SIZE_W / 2;
        let y22 = that.y + CELL_SIZE_H / 2;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        ctx.fillStyle = ARROW_COLOR;
        ctx.beginPath();
        ctx.moveTo(x22, y22);
        //perp -dy, dx
        ctx.lineTo(x22 + ARROW_ALPHA * (-3*sx + sy), y22 + ARROW_ALPHA*(-3*sy - sx));
        ctx.lineTo(x22 + ARROW_ALPHA * (-3*sx - sy), y22 + ARROW_ALPHA*(-3*sy + sx));
        ctx.fill();

        ctx.restore();
    }
}
