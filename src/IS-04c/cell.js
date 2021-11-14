export const BUTTON_W = 42;
export const BUTTON_H = 42;
export const KEYBOARD_X0 = 200;
export const KEYBOARD_Y0 = 20;
export const KEYBOARD_SKIP_X = 4;
export const KEYBOARD_SKIP_Y = 4;

export class Cell {
    constructor(bg, x, y, dx, dy, ind) {
        this.bg = bg;
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.ind = ind;
    }

    hit_test(x0, y0) {
        return this.x <= x0 && x0 <= this.x + BUTTON_W && this.y <= y0 && y0 <= this.y + BUTTON_H;
    }

    // new Place(0, 0, 42, 42, 'diag', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 42, height: 42}}),
    // new Place(0, 0, 42, 42, 'go', 2, {imageId: 'bg', crop: {x: 0, y: 42, width: 42, height: 42}}),
    // new Place(0, 0, 42, 42, 'hor', 2, {imageId: 'bg', crop: {x: 42, y: 42, width: 42, height: 42}}),
    draw(ctx, x=-1, y=-1) {
        if (x === -1 && y === -1) {
            x = this.x;
            y = this.y;
        }

        ctx.save();
        ctx.translate(x + BUTTON_W / 2, y + BUTTON_H / 2);
        if (this.dx !== 0 && this.dy !== 0) {
            //draw diagonal
            let a = Math.atan2(this.dy, this.dx); // pi/4, 3pi/4, -pi/4, -3pi/4
            let b = a - Math.PI / 4; //0, pi/2, pi, 3pi/2
            ctx.rotate(b);
            ctx.drawImage(this.bg, 0, 0, 42, 42, -21, -21, 42, 42);
        } else if (this.dx === 0 && this.dy === 0) {
            //go button
            ctx.drawImage(this.bg, 0, 42, 42, 42, -21, -21, 42, 42);
        } else {
            //horizontal or vertical
            let a = Math.atan2(this.dy, this.dx);
            let b = a + Math.PI/2;
            ctx.rotate(b);
            ctx.drawImage(this.bg, 42, 42, 42, 42, -21, -21, 42, 42);
        }
        ctx.restore();
    }

    draw_highlight(ctx) {
        ctx.save();

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'yellow';

        ctx.strokeRect(this.x, this.y, BUTTON_W, BUTTON_H);

        ctx.restore();
    }
}
