import {SimpleStatesTask} from "../lib/SimpleStatesTask";
import {StatefulElement} from "../lib/StatefulElement";

const X0 = 12;
const Y0 = 12;
const D = 42;
const M = 6;
const N = 6;
const R = 8;
const LINE_WIDTH = 3;
const CARPET_WIDTH = 8;
const CIRCLE_COLOR = '#009d95';
const LINE_COLOR = '#f0ce51';
const CARPET_COLOR = '#b65200';

export class Task extends SimpleStatesTask {

    //container - is an id of element
    constructor(container, images) {
        super(container, 2 * X0 + (N - 1) * D, 2 * Y0 + (M - 1) * D, draw_bg, true);

        function draw_bg(ctx) {
            ctx.save();
            ctx.translate(X0, Y0);

            ctx.beginPath();
            ctx.strokeStyle = LINE_COLOR;
            ctx.lineWidth = LINE_WIDTH;
            for (let i = 0; i < M; i++) {
                ctx.moveTo(0, i * D);
                ctx.lineTo((N - 1) * D, i * D);
            }
            for (let j = 0; j < N; j++) {
                ctx.moveTo(j * D, 0);
                ctx.lineTo(j * D, (M - 1) * D);
            }
            ctx.stroke();

            ctx.fillStyle = CIRCLE_COLOR;
            for (let i = 0; i < M; i++) {
                for (let j = 0; j < N; j++) {
                    let x = j * D;
                    let y = i * D;
                    ctx.beginPath();
                    ctx.arc(x, y, R, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            ctx.restore();
        }

        this.enabled = true;
        this.initCallback = null;

        this.textDiv = document.createElement("div");
        this.textDiv.style.marginLeft = "4px";
        // document.getElementById(container).appendChild(this.textDiv);
    }

    check() {
        //0 means ok
        //1 means not connected
        //2 means not every path
        //3 means too many edges

        //Kraskal to check connectness
        let vertex_color = new Array(M * N);
        let vertex_type = new Array(M * N);
        for (let i = 0; i < M * N; i++) {
            vertex_color[i] = i + 1;
            vertex_type[i] = 0; //0 not visited
        }

        let count_edges = 0;
        for (let el of this.scene.elements) {
            if (el.state !== 1)
                continue;
            count_edges++;

            let ind1 = el.ind1();
            let ind2 = el.ind2();
            processType(el.i1, el.j1, ind1);
            processType(el.i2, el.j2, ind2);

            let c1 = vertex_color[ind1];
            let c2 = vertex_color[ind2];
            for (let v = 0; v < M * N; v++)
                if (vertex_color[v] === c1)
                    vertex_color[v] = c2;
        }

        function processType(i, j, ind) {
            vertex_type[ind] = 2;
            if (j > 0 && vertex_type[ind - 1] === 0)
                vertex_type[ind - 1] = 1;
            if (j < N - 1 && vertex_type[ind + 1] === 0)
                vertex_type[ind + 1] = 1;
            if (i > 0 && vertex_type[ind - N] === 0)
                vertex_type[ind - N] = 1;
            if (i < M - 1 && vertex_type[ind + N] === 0)
                vertex_type[ind + N] = 1;
        }

        let color = -1;
        for (let v = 0; v < M * N; v++) {
            if (vertex_type[v] === 0)
                return 2;

            if (vertex_type[v] === 2) {
                let new_color = vertex_color[v];
                if (color === -1)
                    color = new_color;
                else if (color !== new_color)
                    return 1;
            }
        }

        if (count_edges === Math.min(2 * (M - 1) + N - 3, 2 * (N - 1) + M - 3))
            return 0;
        else
            return 3;
    }

    updateText() {
        let c = this.check();

        let text = '';
        switch (c) {
            case 1:
                text = "По ковровой дорожке можно дойти не до всех фонтанов";
                break;
            case 2:
                text = "Ковровая дорожка не проходит мимо всех фонтанов";
                break;
        }

        this.textDiv.innerText = text;
        this.textDiv.style.color = "red";
    }

    loadSolution(solution) {
        super.loadSolution(solution);
        this.updateText();
    }

    createElements() {
        let el = [];

        for (let i = 0; i < M; i++)
            for (let j = 0; j < N - 1; j++)
                el.push(new Edge(this.ctx, this, i, j, i, j + 1));

        for (let i = 0; i < M - 1; i++)
            for (let j = 0; j < N; j++)
                el.push(new Edge(this.ctx, this, i, j, i + 1, j));

        console.log(el);

        return el;
    }

    getAnswer() {
        let c = this.check();
        return c === 0 ? 1 : 0;
    }
}

class Edge extends StatefulElement {

    constructor(ctx, task, i1, j1, i2, j2) {
        super(ctx, 2, [1, 0]);

        this.i1 = i1;
        this.i2 = i2;
        this.j1 = j1;
        this.j2 = j2;

        this.clickHandler = function() {
            task.updateText();
        }
    }

    begin_outline_path() {
        let c = this.ctx;
        c.beginPath();
        let x1 = X0 + this.j1 * D;
        let x2 = X0 + this.j2 * D;
        let y1 = Y0 + this.i1 * D;
        let y2 = Y0 + this.i2 * D;
        c.moveTo(x1, y1);
        let d = 6;
        if (this.i1 === this.i2) {
            c.lineTo(x1 + d, y1 - d);
            c.lineTo(x2 - d, y1 - d);
            c.lineTo(x2, y2);
            c.lineTo(x2 - d, y1 + d);
            c.lineTo(x1 + d, y1 + d);
            c.closePath();
        } else {
            c.lineTo(x1 + d, y1 + d);
            c.lineTo(x1 + d, y2 - d);
            c.lineTo(x1, y2);
            c.lineTo(x1 - d, y2 - d);
            c.lineTo(x1 - d, y1 + d);
            c.closePath();
        }
    }

    hit_test({x, y}) {
        this.begin_outline_path();
        return this.ctx.isPointInPath(x, y);
    }

    draw() {
        if (this.state === 0)
            return;

        this.ctx.save();
        this.ctx.translate(X0, Y0);
        this.ctx.beginPath();
        this.ctx.moveTo(this.j1 * D, this.i1 * D);
        this.ctx.lineTo(this.j2 * D, this.i2 * D);

        this.ctx.lineWidth = CARPET_WIDTH + 2;
        this.ctx.strokeStyle = 'black';
        this.ctx.stroke();
        this.ctx.lineWidth = CARPET_WIDTH;
        this.ctx.strokeStyle = CARPET_COLOR;
        this.ctx.stroke();

        this.ctx.restore();
    }

    ind1() {
        return this.i1 * N + this.j1;
    }

    ind2() {
        return this.i2 * N + this.j2;
    }
}
