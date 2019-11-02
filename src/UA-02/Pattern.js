export const TRIANG = 0, CIRCLE = 1, SQUARE = 2;

const SIZE = [32, 40], MARGIN = [4, 6];
const TRIANG_HEIGHT = [0, 0];
const TRIANG_SHIFT = [0, 0];

for (let i = 0; i < 2; i++) {
    TRIANG_HEIGHT[i] = SIZE[i] * Math.sqrt(3) / 2;
    TRIANG_SHIFT[i] = (SIZE[i] - TRIANG_HEIGHT[i]) / 2;
}

export class Pattern {
    constructor(ctx, x, y, p, size_ind = 0, opaque = true) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.p = p;
        this.size_ind = size_ind;
        this.opaque = opaque;
    }

    draw() {
        let x = this.x;
        let y = this.y;

        let ctx = this.ctx;
        ctx.save();

        let size = SIZE[this.size_ind];
        let triang_height = TRIANG_HEIGHT[this.size_ind];
        let triang_shift = TRIANG_SHIFT[this.size_ind];
        let margin = MARGIN[this.size_ind];

        ctx.translate(x + margin, y + margin);

        for (let fig of this.p) {
            ctx.beginPath();

            switch (fig) {
                case TRIANG:
                    ctx.fillStyle = this.opaque ? "blue" : "rgba(0,0,255,0.2)";
                    ctx.moveTo(size / 2, triang_shift);
                    ctx.lineTo(size, triang_height + triang_shift);
                    ctx.lineTo(0, triang_height + triang_shift);
                    ctx.fill();
                    break;
                case CIRCLE:
                    ctx.fillStyle = this.opaque ? "green" : "rgba(0,255,0,0.2)";
                    ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
                    ctx.fill();
                    break;
                case SQUARE:
                    ctx.fillStyle = this.opaque ? "red" : "rgba(255,0,0,0.2)";
                    ctx.fillRect(0, 0, size, size);
                    break;
            }

            ctx.translate(size + 2 * margin, 0);
        }

        ctx.restore();
    }

    find_position(q) {
        for (let i = 0; i < this.p.length - q.length + 1; i++) {
            let found = true;
            for (let j = 0; j < q.length; j++) {
                if (this.p[j + i] !== q[i]) {
                    found = false;
                    break;
                }
            }
            if (found)
                return i;
        }

        return -1;
    }

    highlight(q) {
        //highlight q over p
        let pos = this.find_position(q);

        if (pos === -1)
            return;

        let ctx = this.ctx;

        let size = SIZE[this.size_ind];
        let margin = MARGIN[this.size_ind];

        ctx.save();

        ctx.translate(this.x + (size + 2 * margin) * pos, this.y);

        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,255,0,0.5)';
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.rect(0, 0, (size + 2 * margin) * q.length, this.height);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

    get width() {
        if (this.p.length === 0)
            return 2 * MARGIN[this.size_ind] + 8;
        return this.p.length * (2 * MARGIN[this.size_ind] + SIZE[this.size_ind]);
    }

    get height() {
        return Pattern.height_by_size_id(this.size_ind);
    }

    static height_by_size_id(size_ind) {
        return 2 * MARGIN[size_ind] + SIZE[size_ind];
    }
}