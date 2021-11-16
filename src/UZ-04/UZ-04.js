import {BitmapStatesTask} from "../lib/BitmapStatesTask";

const D = 28;
const PAD = 4;
const F = 2;

const MAP = [
    ".x...x.xxx.xx..",
    "..............x",
    "x....s........x",
    "x........s....x",
    "...ss.....s...x",
    "x.............x",
    "....s..s......x",
    "........s......",
    "...........s...",
    "x....s.s......x",
    "..s.......s....",
    ".....s......s..",
    "x.s.....s.....x",
    "x..............",
    ".xxx.xxx...x..."
];

let M = MAP.length;
let N = MAP[0].length;

export class Task extends BitmapStatesTask {
    constructor(container, pictures) {
        let w = 2 * PAD + N * D;
        let h = 2 * PAD + M * D;
        super(container, pictures, {x: w, y: h, width: w, height: h});

        this.sheeps = [];
        for (let i = 0; i < MAP.length; i++) {
            let line = MAP[i];
            for (let j = 0; j < line.length; j++)
                if (line[j] === 's')
                    this.sheeps.push([j, i]);
        }
    }

    draw_bg() {
        function b(z) {
            return PAD + z * D;
        }

        let c = this.ctx;

        c.fillStyle = '#ccffcc';
        c.fillRect(PAD, PAD, N * D, M * D);

        c.strokeStyle = '#cccccc';
        c.setLineDash([4, 4]);
        c.lineWidth = 1;
        c.beginPath();
        for (let x = 0; x <= N; x++) {
            c.moveTo(b(x) + 0.5, b(0));
            c.lineTo(b(x) + 0.5, b(N));
        }
        for (let y = 0; y <= M; y++) {
            c.moveTo(b(0), b(y) + 0.5);
            c.lineTo(b(M), b(y) + 0.5);
        }
        c.stroke();

        for (let [x, y] of this.sheeps) {
            c.drawImage(this.img, 0, D, D, D, b(x), b(y), D, D);
        }

        //draw fence
        c.strokeStyle = 'black';
        c.lineWidth = 1;
        c.setLineDash([]);

        function fence(x1, y1, x2, y2) {
            let xx1 = b(x1);
            let yy1 = b(y1);
            let xx2 = b(x2);
            let yy2 = b(y2);


            c.beginPath();
            c.moveTo(xx1 + 0.5, yy1 + 0.5);
            c.lineTo(xx2 + 0.5, yy2 + 0.5);
            c.stroke();

            c.fillStyle = '#996633';
            c.fillRect(xx1 - F, yy1 - F, 2 * F, 2 * F);
            c.fillRect(xx2 - F, yy2 - F, 2 * F, 2 * F);
            c.fillRect((xx1 + xx2) / 2 - F, (yy1 + yy2) / 2 - F, 2 * F, 2 * F);

            c.fillStyle = '#cc9933';
            c.fillRect((3 * xx1 + xx2) / 4 - F, (3 * yy1 + yy2) / 4 - F, 2 * F, 2 * F);
            c.fillRect((xx1 + 3 * xx2) / 4 - F, (yy1 + 3 * yy2) / 4 - F, 2 * F, 2 * F);
        }

        // draw fence at the left edge
        for (let y = 0; y < M; y++)
            if (MAP[y][0] !== 'x')
                fence(0, y, 0, y + 1);
        // draw fence at the right edge
        for (let y = 0; y < M; y++)
            if (MAP[y][N - 1] !== 'x')
                fence(N, y, N, y + 1);
        //draw fence at the top edge
        for (let x = 0; x < N; x++)
            if (MAP[0][x] !== 'x')
                fence(x, 0, x + 1, 0);
        //draw fence at the bottom edge
        for (let x = 0; x < N; x++)
            if (MAP[M - 1][x] !== 'x')
                fence(x, M, x + 1, M);
    }
}

/*
new Place(0, 0, 28, 28, 'dog', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 28, height: 28}}),
new Place(0, 0, 28, 28, 'sheep', 2, {imageId: 'bg', crop: {x: 0, y: 28, width: 28, height: 28}}),
 */
