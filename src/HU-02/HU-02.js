//correct answer
//132321323122
//<p>
// <img src="/~res/V-F_VEFuaInquyedFEfR1633610998234.svg" alt="no" style="vertical-align:middle"/>
// <img src="/~res/fl6hwxMoUlMqsQ08Orr61633611008433.svg" alt="zero" style="vertical-align:middle"/>
// <img src="/~res/dEfL9ZmdFgN80AbIMzvl1633611018347.svg" alt="unkn" style="vertical-align:middle"/>
// <img src="/~res/EhR3Ke66gOfoKyNaunjq1633611033658.svg" alt="yes" style="vertical-align:middle"/>
// </p><p><img src="/~res/cytf4oOU3OOAAEYkLJWE1633611045753.svg" alt="an image" /></p>

import {BitmapStatesTask} from "../lib/BitmapStatesTask";
import {BitmapElement, BitmapState} from "../lib/BitmapStatefulScene";

const POSITIONS = [
    [123, 120],
    [108, 148],
    [293, 152],
    [321, 107],
    [404, 132],
    [489, 124],
    [439, 160],
    [415, 187],
    [205, 192],
    [338, 230],
    [172, 237],
    [100, 206]
];


export class Task extends BitmapStatesTask {
    constructor(container, pictures) {
        super(container, pictures, {x: 0, y: 0, width: 572, height: 291});
    }

    create_elements(img, ctx) {
        let states = [
            new BitmapState(img, 48, 291, 24, 30),
            new BitmapState(img, 0, 291, 24, 30),
            new BitmapState(img, 24, 291, 24, 30),
            new BitmapState(img, 72, 291, 24, 30),
        ];

        let elements = [];
        for (let [x, y] of POSITIONS)
            elements.push(new BitmapElement(ctx, x - 12, y - 15, states, [1, 2, 3, 0]))
        return elements;
    }


    draw_bg() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (let [x, y] of POSITIONS) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, 15, 0, 2 * Math.PI);
            this.ctx.fill();
        }
    }
}
