export class Item {

    constructor(bg, x, y, w, h) {
        this.bg = bg;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.w2 = Math.trunc(w / 2);
        this.h2 = Math.trunc(h / 2);
    }

    draw(ctx, cx, cy) {
        ctx.drawImage(this.bg, this.x, this.y, this.w, this.h, cx - this.w2, cy - this.h2, this.w, this.h);
    }

}
