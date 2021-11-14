const CELL_W = 25;
const CELL_H = 25;
const R = 2;

export class Table {

    constructor(m, n, x0, y0) {
        this.m = m;
        this.n = n;
        this.x0 = x0;
        this.y0 = y0;
    }

    draw(ctx, x, y, cells) {
        ctx.beginPath();
        ctx.fillStyle = "black";
        for (let j = 0; j <= this.m; j++)
            for (let i = 0; i <= this.n; i++)
                ctx.arc(x + i * CELL_W, y + j * CELL_H, R, 0, 2 * Math.PI);
        ctx.fill();

        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        let x1 = this.x0, y1 = this.y0;
        ctx.beginPath();
        for (let cell of cells) {
            let x2 = x1 + cell.dx;
            let y2 = y1 + cell.dy;

            ctx.moveTo(x + x1 * CELL_W, y + y1 * CELL_H);
            ctx.lineTo(x + x2 * CELL_W, y + y2 * CELL_H);
        }
        ctx.stroke();
    }
}
