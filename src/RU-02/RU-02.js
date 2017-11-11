import {RectangleStatefulElement, SimpleStatesTask} from "../lib/SimpleStatesTask";

let W = 100;
let E = 16;
let eps = 4;
let STROKE_COLORS = ['#CCCCCC', '#FF6600'];

export class Task extends SimpleStatesTask {

    constructor(container, pictures) {
        super(container, 2 * eps + W + 2 * E, 2 * eps + 2 * W + 3 * E);
    }

    createElements() {
        return [
            new Tick(this.ctx, 0, E, true),
            new Tick(this.ctx, E, 0, false),
            new Tick(this.ctx, W + E, E, true),

            new Tick(this.ctx, 0, 2 * E + W, true),
            new Tick(this.ctx, E, W + E, false),
            new Tick(this.ctx, W + E, W + 2 * E, true),

            new Tick(this.ctx, E, 2 * W + 2 * E, false)
        ];
    }

}

class Tick extends RectangleStatefulElement {

    constructor(ctx, x, y, is_vertical) {
        x += eps;
        y += eps;

        if (is_vertical)
            super(ctx, 2, [1, 0], x, y, E, W);
        else
            super(ctx, 2, [1, 0], x, y, W, E);

        this.is_vertical = is_vertical;
    }


    draw() {
        this.ctx.save();

        this.ctx.lineWidth = E;
        this.ctx.strokeStyle = STROKE_COLORS[this.state];
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + E / 2, this.y + E / 2);
        if (this.is_vertical)
            this.ctx.lineTo(this.x + E / 2, this.y + W - E / 2);
        else
            this.ctx.lineTo(this.x + W - E / 2, this.y + E / 2);
        this.ctx.stroke();

        this.ctx.restore();
    }
}

//correct answer 1111100

/*
<style type="text/css">
		@page { margin: 2cm }
		p { margin-bottom: 0.25cm; direction: ltr; color: #000000; line-height: 120%; orphans: 2; widows: 2 }
		p.western { font-family: "Liberation Serif", "Times New Roman", serif; font-size: 12pt; so-language: ru-RU }
		p.cjk { font-family: "SimSun"; font-size: 12pt; so-language: zh-CN }
		p.ctl { font-family: "Mangal"; font-size: 12pt; so-language: hi-IN }
		a:link { so-language: zxx }
	</style>
*/