// correct answer 0000010000
// <p><img src="/~res/AQ9p4GednWoLwsmrPDxk1633607697853.svg" alt="an image" /></p>

import {SimpleStatesTask} from "../lib/SimpleStatesTask";
import {StatefulElement} from "../lib/StatefulElement";

const E = 2;
const VERTICES = [
    [40 * E, 9 * E, 0],
    [32 * E, 64 * E, 0],
    [95 * E, 63 * E, 0],

    [8 * E, 30 * E, 1],
    [62 * E, 40 * E, 1],
    [44 * E, 101 * E, 1],

    [99 * E, 24 * E, 2],
    [83 * E, 100 * E, 2]
];

const EDGES = [
    [0, 3],
    [0, 4],
    [1, 3],
    [1, 4],
    [1, 5],
    [2, 4],
    [2, 6],
    [2, 7],
    [4, 6],
    [5, 7]
];

const COLORS = ['#f05030', '#63acbe', '#601a4a'];

const EDGE_WIDTH = 8;

export class Task extends SimpleStatesTask {

    //container - is an id of element
    constructor(container, images) {
        super(container, 220, 220, draw_bg, true);

        function draw_bg(ctx) {
            //first draw edges
            ctx.strokeStyle = 'black';
            ctx.lineWidth = 5;
            ctx.beginPath();
            for (let [ui, vi] of EDGES) {
                let [x1, y1, c1] = VERTICES[ui];
                let [x2, y2, c2] = VERTICES[vi];
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
            }
            ctx.stroke();


            for (let [x, y, c] of VERTICES) {
                ctx.beginPath();
                ctx.fillStyle = COLORS[c];
                ctx.arc(x, y, 10, 0, 2 * Math.PI);
                ctx.fill();
            }
        }

        this.enabled = true;
        this.initCallback = null;
        this.scene.outlineWidth = 6;
    }

    createElements() {
        let el = [];

        for (let [ui, vi] of EDGES) {
            let [x1, y1, c1] = VERTICES[ui];
            let [x2, y2, c2] = VERTICES[vi];
            el.push(new Edge(this.ctx, this, x1, y1, x2, y2));
        }

        return el;
    }
}

class Edge extends StatefulElement {

    constructor(ctx, task, x1, y1, x2, y2) {
        super(ctx, 2, [1, 0]);

        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;

        this.clickHandler = function() {
            task.scene.reset_all_except_one(this);
        }
    }

    begin_outline_path() {
        let c = this.ctx;
        c.beginPath();
        let x1 = this.x1;
        let x2 = this.x2;
        let y1 = this.y1;
        let y2 = this.y2;

        let dx = x2 - x1;
        let dy = y2 - y1;
        let l = Math.sqrt(dx * dx + dy * dy);
        let vx = dx / l;
        let vy = dy / l;
        let ux = -dy / l;
        let uy = dx / l;

        let d = 6;

        c.moveTo(x1 - d * vx - d * ux, y1 - d * vy - d * uy);
        c.lineTo(x1 - d * vx + d * ux, y1 - d * vy + d * uy);
        c.lineTo(x2 + d * vx + d * ux, y2 + d * vy + d * uy);
        c.lineTo(x2 + d * vx - d * ux, y2 + d * vy - d * uy);
        c.closePath();
    }

    hit_test({x, y}) {
        this.begin_outline_path();
        return this.ctx.isPointInPath(x, y);
    }

    draw() {
        if (this.state === 0)
            return;

        let c = this.ctx;
        c.save();
        c.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        c.lineWidth = EDGE_WIDTH;
        c.lineCap = 'round';
        c.beginPath();
        c.moveTo(this.x1, this.y1);
        c.lineTo(this.x2, this.y2);
        c.stroke();

        c.strokeStyle = 'red';
        c.lineWidth = 4;
        let mx = (this.x1 + this.x2) / 2;
        let my = (this.y1 + this.y2) / 2;
        let d = 6;
        c.beginPath();
        c.moveTo(mx - d, my - d);
        c.lineTo(mx + d, my + d);
        c.moveTo(mx - d, my + d);
        c.lineTo(mx + d, my - d);
        c.stroke();
        c.restore();
    }
}
