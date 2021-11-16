// <p><img src="/~res/Qp-NSyOvcZ5rKyqNLpYj1634225209532.svg" alt="an image" /><img src="/~res/ygFHgonKRIRzmmI_X1fh1634225227709.svg" alt="an image" /><img src="/~res/Ba20qnr5meXSQdUm221h1634225217425.svg" alt="an image" /></p>

import {BitmapStatesTask} from "../lib/BitmapStatesTask";
import {BitmapElement, BitmapState} from "../lib/BitmapStatefulScene";

const PAD = 6;
const WH = 42;
const NUM = 26;
const CELL = WH + 2 * PAD;

const COL_NUMBERS = [1, 1, 0];
const COL_ANIMALS = [1, 2, 2]
const ROW_NUMBERS = [0, 1, 0];
const ROW_ANIMALS = [3, 1, 3];

export class Task extends BitmapStatesTask {
    constructor(container, images) {
        super(container, images, {
            width: NUM + PAD + CELL * 4,
            height: NUM + PAD + CELL * 4,
            x: NUM + PAD + CELL * 4,
            y: NUM + PAD + CELL * 4
        });
    }

    create_elements(img, ctx) {
        let empty = new EmptyState(42, 42);
        let owl = new BitmapState(img, 0, 0, 42, 42);
        let cow = new BitmapState(img, 42, 0, 42, 42);
        let tri = new BitmapState(img, 84, 0, 42, 42);
        let all = [empty, owl, cow, tri];

        let el = [];

        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++)
                el.push(new BitmapElement(ctx, NUM + PAD + (j + 1) * CELL, NUM + PAD + (i + 1) * CELL, all, [1, 2, 3, 0]));

        el.push(
            new BitmapElement(ctx, NUM + PAD + 1 * CELL, NUM + PAD + 0 * CELL, [owl], [0]),
            new BitmapElement(ctx, NUM + PAD + 2 * CELL, NUM + PAD + 0 * CELL, [cow], [0]),
            new BitmapElement(ctx, NUM + PAD + 3 * CELL, NUM + PAD + 0 * CELL, [cow], [0]),

            new BitmapElement(ctx, NUM + PAD + 0 * CELL, NUM + PAD + 1 * CELL, [tri], [0]),
            new BitmapElement(ctx, NUM + PAD + 0 * CELL, NUM + PAD + 2 * CELL, [owl], [0]),
            new BitmapElement(ctx, NUM + PAD + 0 * CELL, NUM + PAD + 3 * CELL, [tri], [0]),
        );

        return el;
    }

    draw_bg() {
        this.ctx.save();

        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        for (let i = 0; i <= 3; i++) {
            this.ctx.moveTo(NUM + CELL, NUM + CELL * (i + 1));
            this.ctx.lineTo(NUM + 4 * CELL, NUM + CELL * (i + 1));
        }
        for (let i = 0; i <= 3; i++) {
            this.ctx.moveTo(NUM + CELL * (i + 1), NUM + CELL);
            this.ctx.lineTo(NUM + CELL * (i + 1), NUM + 4 * CELL);
        }
        this.ctx.stroke();


        this.ctx.fillStyle = 'black';
        this.ctx.font = '20px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'bottom';

        for (let i = 0; i < 3; i++)
            this.ctx.fillText('' + COL_NUMBERS[i], NUM + CELL / 2 + CELL * (i + 1), NUM);

        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        for (let i = 0; i < 3; i++)
            this.ctx.fillText('' + ROW_NUMBERS[i], NUM / 2, NUM + CELL / 2 + CELL * (i + 1));

        this.ctx.restore();
    }

    getAnswer() {
        let e = this.scene.elements;

        for (let row = 0; row < 3; row++) {
            let sum = 0;
            for (let col = 0; col < 3; col++) {
                let state = e[3 * row + col].state;
                if (state === 0)
                    return 0;
                if (state === ROW_ANIMALS[row])
                    sum++;
            }
            if (sum !== ROW_NUMBERS[row])
                return 0;
        }

        for (let col = 0; col < 3; col++) {
            let sum = 0;
            for (let row = 0; row < 3; row++)
                if (e[3 * row + col].state === COL_ANIMALS[col])
                    sum++;
            if (sum !== COL_NUMBERS[col])
                return 0;
        }

        return 1;
    }
}

class EmptyState {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    draw() {
    }
}
