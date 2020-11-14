/**
 * #6eb45d - line
 * #c1ffc9 - bg
 *
 * new Place(0, 0, 60, 59, 'here', 2, {imageId: 'bg', crop: {x: 74, y: 0, width: 60, height: 59}}),
 * new Place(0, 0, 74, 81, 'rabbit', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 74, height: 81}}),
 *
 *  <p><img src="/~res/P8aNbbKFHb8fw32FjATl1570990240082.svg" alt="an image" /><img src="/~res/SIK3mOXj2FrCdA5PHqg61570990273287.png" alt="an image" /></p>
 *
 */
import {SimpleStatesTask} from "../../lib/SimpleStatesTask";
import {Clicker, W, N} from "./Clicker";

const X0 = 6, Y0 = 6;

export class Task extends SimpleStatesTask{

    //container - is an id of element
    constructor(container, images) {
        super(container, 2 * X0 + W * N, 2 * X0 + W * N, draw_bg, false);

        function draw_bg(ctx) {
            ctx.save();

            ctx.translate(X0, Y0);

            ctx.beginPath();
            ctx.fillStyle = '#c1ffc9';
            ctx.strokeStyle = '#6eb45d';
            ctx.lineWidth = 4;
            ctx.rect(0, 0, N * W, N * W);
            ctx.fill();
            ctx.stroke();

            ctx.lineWidth = 2;
            for (let i = 1; i < N; i++) {
                ctx.beginPath();
                ctx.moveTo(0, i * W);
                ctx.lineTo(N * W, i * W);
                ctx.stroke();
            }
            for (let j = 1; j < N; j++) {
                ctx.beginPath();
                ctx.moveTo(j * W, 0);
                ctx.lineTo(j * W, N * W);
                ctx.stroke();
            }

            ctx.drawImage(bg_image, 0, 0, 74, 81, W + (W - 74) / 2, 3 * W + (W - 81) / 2, 74, 81);

            ctx.restore();
        }

        this.enabled = true;
        this.initCallback = null;

        this.loaded = false;

        let bg_image = new Image();
        this.bg = bg_image;
        this.bg.src = images.bg;
        this.bg.onload = () => this.bgLoaded();
    }

    bgLoaded() {
        if (this.initCallback)
            this.initCallback();

        this.loaded = true;
    }

    setInitCallback(_initCallback) {
        this.initCallback = _initCallback;

        //if we are initialized just after creation, any attempt to set up init callback is after we are initialized
        if (this.initCallback && this.loaded)
            this.initCallback();
    };

    createElements() {
        let el = [];
        for (let i = 0; i < N; i++)
            for (let j = 0; j < N; j++)
                if (i !== 3 || j !== 1)
                    el.push(new Clicker(this.ctx, X0 + j * W, Y0 + i * W, this));
        return el;
    }
}
