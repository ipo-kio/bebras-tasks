import {SimpleStatesTask, RectangleStatefulElement} from "../lib/SimpleStatesTask";

let CIPHER = '12112233321';
let N = CIPHER.length;

let E = 16;
let W = 20;
let H = 50;
let FONT_SIZE = 20;
let eps = 4;
let STROKE_COLOR = '#FF6600';

export class Task extends SimpleStatesTask {

    constructor(container, pictures) {
        super(container, N * W + (N - 1) * H, H + 2 * eps, ctx => {
            ctx.save();
            for (let i = 0; i < N; i++) {
                let x0 = W / 2 + i * (W + E);
                let y0 = eps + H / 2;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = "24px Arial";
                ctx.fillText(CIPHER[i], x0, y0);
            }

            ctx.restore();
        });
    }

    createElements() {
        let elements = [];

        for (let i = 0; i < N - 1; i++)
            elements.push(new Tick(this.ctx, W + i * (W + E), eps));

        return elements;
    }

}

class Tick extends RectangleStatefulElement {

    constructor(ctx, x, y) {
        super(ctx, 2, [1, 0], x, y, E, H);
    }


    draw() {
        this.ctx.save();

        if (this.state === 1) {
            this.ctx.lineWidth = 4;
            this.ctx.strokeStyle = STROKE_COLOR;
        } else {
            this.ctx.lineWidth = 3;
            this.ctx.strokeStyle = "#EEEEEE";
        }
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.moveTo(this.x + E / 2, this.y + E / 2);
        this.ctx.lineTo(this.x + E / 2, this.y + H - E / 2);
        this.ctx.stroke();

        this.ctx.restore();
    }
}

//1011010100