const CELL_W = 25;
const CELL_H = 25;
const R = 4;

export class Table {

    constructor(m, n, x0, y0) {
        this.m = m;
        this.n = n;
        this.x0 = x0;
        this.y0 = y0;
    }

    draw(ctx, x, y, cells) {

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x + this.x0 * CELL_W, y + this.y0 * CELL_H);
        let x1 = this.x0, y1 = this.y0;
        for (let cell of cells) {
            x1 += cell.dx;
            y1 += cell.dy;

            ctx.lineTo(x + x1 * CELL_W, y + y1 * CELL_H);
        }
        ctx.stroke();

        ctx.fillStyle = "#888";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1;
        for (let j = 0; j <= this.m; j++) {
            for (let i = 0; i <= this.n; i++) {
                ctx.beginPath();
                ctx.arc(x + i * CELL_W, y + j * CELL_H, R, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
            }
        }
    }
}
