export const WINDOW_W = 62;
export const WINDOW_H = 62;
export const WINDOW_X0 = 40;
export const WINDOW_Y0 = 34;
export const WINDOW_SKIP_X = 85.5;
export const WINDOW_SKIP_Y = 85;

export class Item {

    constructor(bg, name, x, y, w, h) {
        this.bg = bg;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.name = name;
        this.w2 = Math.trunc(w / 2);
        this.h2 = Math.trunc(h / 2);
    }

    draw(ctx, cx, cy) {
        ctx.drawImage(this.bg, this.x, this.y, this.w, this.h, cx - this.w2, cy - this.h2, this.w, this.h);
    }

}

export class Cell {
    constructor(x, y, item_name_from, item_name_to) {
        this.x = x;
        this.y = y;
        this.item_name_from = item_name_from;
        this.item_name_to = item_name_to;
    }

    hit_test(x0, y0) {
        // console.log(x0, y0, this.x, this.y, WINDOW_W, WINDOW_H, this.x <= x0 && x0 <= this.x + WINDOW_W && this.y <= y0 && y0 <= this.y + WINDOW_H);
        return this.x <= x0 && x0 <= this.x + WINDOW_W && this.y <= y0 && y0 <= this.y + WINDOW_H;
    }

    draw_highlight(ctx) {
        ctx.save();

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'yellow';

        ctx.strokeRect(this.x, this.y, WINDOW_W, WINDOW_H);

        ctx.restore();
    }
}
