import {BitmapStatesTask} from "../lib/BitmapStatesTask";
import {RectangleStatefulElement} from "../lib/SimpleStatesTask";

export class Task extends BitmapStatesTask {
    constructor(container, pictures) {
        super(container, pictures, {x:0, y:0, width:480, height: 360});
    }

    create_elements(img, ctx) {
        let dx = -24, dy = -38;

        return [
            new Rect(ctx, 104 + dx, 112 + dy),
            new Rect(ctx, 150 + dx, 161 + dy),
            new Rect(ctx, 275 + dx, 185 + dy),
            new Rect(ctx, 333 + dx, 125 + dy),
            new Rect(ctx, 118 + dx, 242 + dy),
            new Rect(ctx, 284 + dx, 263 + dy),
            new Rect(ctx, 377 + dx, 195 + dy)
        ];
    }
}

class Rect extends RectangleStatefulElement {

    constructor(ctx, x1, y1) {
        let w = 46;
        let h = 66;
        super(ctx, 2, [1, 0], x1, y1, w, h);
        this.x = x1;
        this.y = y1;
        this.width = w;
        this.height = h;
    }

    draw() {
        if (this.state === 0)
            return;

        this.ctx.save();
        let mx = this.x + this.width / 2 - 2;
        let my = this.y + this.height / 2 + 5;
        // this.ctx.fillStyle = this.ctx.createRadialGradient(mx, my - 30, 4, mx, my, 50);
        // this.ctx.fillStyle.addColorStop(0, 'rgba(0, 0, 255, 0.8)');
        // this.ctx.fillStyle.addColorStop(1, 'rgba(0, 255, 255, 0.8)');
        // this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        // this.ctx.strokeStyle = 'white';
        // this.ctx.lineWidth = 3;
        // this.ctx.strokeRect(0.5 + this.x, 0.5 + this.y, this.width, this.height);
        // this.ctx.fillRect(0.5 + this.x, 0.5 + this.y, this.width, this.height);
        this.ctx.lineCap = 'square';

        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth = 11;
        this.ctx.beginPath();
        this.ctx.moveTo(mx - 6, my - 6);
        this.ctx.lineTo(mx, my);
        this.ctx.lineTo(mx + 16, my - 16);
        this.ctx.stroke();

        this.ctx.strokeStyle = '#000088';
        this.ctx.lineWidth = 8;
        this.ctx.beginPath();
        this.ctx.moveTo(mx - 6, my - 6);
        this.ctx.lineTo(mx, my);
        this.ctx.lineTo(mx + 16, my - 16);
        this.ctx.stroke();

        this.ctx.restore();
    }
}

