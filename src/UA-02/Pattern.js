export const TRIAG = 0, CIRCLE = 1, SQUARE = 2;

const SIZE = 40, MARGIN = 6;
const TRIAG_HEIGHT = SIZE / Math.sqrt(3) * 2;

export class Pattern {
    constructor(ctx, p) {
        this.ctx = ctx;
        this.p = p;
    }

    draw(x, y) {
        let ctx = this.ctx;
        ctx.save();
        ctx.translate(x + MARGIN, y + MARGIN);

        for (let fig of p) {
            switch (fig) {
                case TRIAG:
                    ctx.fillStyle = "blue";
                    ctx.moveTo(SIZE / 2, 0);
                    ctx.lineTo(SIZE, TRIAG_HEIGHT);
                    ctx.lineTo(0, TRIAG_HEIGHT);
                    ctx.fill();
                    break;
                case CIRCLE:
                    ctx.fillStyle = "green";
                    ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2, 0, 2 * Math.PI);
                    ctx.fill();
                    break;
                case SQUARE:
                    ctx.fillStyle = "red";
                    ctx.fillRect(0, 0, SIZE, SIZE);
                    break;
            }

            ctx.translate(SIZE + 2 * MARGIN);
        }

        ctx.restore();
    }

    get width() {
        return this.p.length * (2 * MARGIN + SIZE);
    }

    get height() {
        return 2 * MARGIN + SIZE;
    }
}