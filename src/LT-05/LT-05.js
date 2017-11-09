import {StatefulElement} from "../lib/StatefulElement";
import {appendCanvas} from "../lib/ContainerHelpers";
import {StatefulElementsScene} from "../lib/StatefulElementsScene";

export class Task {

    //container - is an id of element
    constructor(container, images) {
        this.enabled = true;
        this.initCallback = null;

        this.WIDTH = 300;
        this.HEIGHT = 180;

        this.canvas = appendCanvas(container, this.WIDTH, this.HEIGHT);
        this.ctx = this.canvas.getContext('2d');

        this.COLORS_LIST = [
            "rgb(240, 240, 240)",
            "#ffa500",
            "#ffff00",
            "#9370db"
        ];

        this.POINTS = [
            0, 0,              //0
            0.5, 0,            //1
            1, 0,              //2

            0.4, 0.18,         //3

            0.5, 0.25,         //4
            0.75, 0.25,        //5

            0.25, 0.5,         //6
            0.5, 0.5,          //7
            0.75, 0.5,         //8

            0.25, 0.75,        //9
            0.5, 0.75,         //10

            0.6, 0.82,         //11

            0, 1,              //12
            0.5, 1,            //13
            1, 1               //14
        ];

        this.PIECES = [
            [0, 1, 3],             //0
            [1, 2, 5, 4, 3],       //1
            [0, 3, 4, 7, 6],       //2
            [4, 5, 8, 7],          //3
            [6, 7, 10, 9],         //4
            [7, 8, 14, 11, 10],    //5
            [0, 6, 9, 12],         //6
            [2, 14, 8, 5],         //7
            [9, 10, 11, 13, 12],   //8
            [11, 14, 13]           //9
        ];

        this.find_edges();

        this.scene = new StatefulElementsScene(this.canvas, this.createElements());
    }

    reset() {
        this.scene.reset();
    };

    isEnabled() {
        return this.scene.enabled;
    };

    setEnabled(state) {
        this.scene.enabled = state;
    };

    setInitCallback(_initCallback) {
        this.initCallback = _initCallback;

        //if we are initialized just after creation, any attempt to set up init callback is after we are initialized
        if (this.initCallback)
            this.initCallback();
    };

    getSolution() {
        return this.scene.getSolution();
    }

    loadSolution(solution) {
        this.scene.loadSolution(solution);
    }

    getAnswer() { //-1 no answer, 0 wrong, 1 correct, 2 - server check
        let states = this.scene.getStates();

        for (let s of states)
            if (s === 0)
                return 0;

        for (let e = 0; e < this.EDGES.length; e += 2)
            if (states[this.EDGES[e]] === states[this.EDGES[e + 1]])
                return 0;

        return 1;
    }

    //         private elements

    createElements() {
        let elements = [];
        for (let piece of this.PIECES) {
            let points = new Array(piece.length * 2);
            for (let i = 0; i < piece.length; i++) {
                let point = piece[i];
                points[i * 2] = this.POINTS[point * 2] * this.WIDTH;
                points[i * 2 + 1] = this.POINTS[point * 2 + 1] * this.HEIGHT;
            }

            elements.push(new Piece(this.ctx, this.COLORS_LIST, points))
        }
        return elements;
    }

    find_edges() {
        this.EDGES = [];
        for (let i = 0; i < this.PIECES.length; i++)
            for (let j = i + 1; j < this.PIECES.length; j++) {
                let all = this.PIECES[i].concat(this.PIECES[j]);
                all.sort();
                let cnt = 0;
                for (let k = 0; k < all.length - 1; k++)
                    if (all[k] === all[k + 1])
                        cnt++;
                if (cnt >= 2)
                    this.EDGES.push(i, j);
            }
    }
}

class Piece extends StatefulElement {

    constructor(ctx, colors_list, points/*array of x, y of points*/) {
        let c = colors_list.length;
        let next_elements = new Array(c + 1);
        for (let i = 0; i < c - 1; i++)
            next_elements[i] = i + 1;
        next_elements[c - 1] = 1;
        super(ctx, c, next_elements);

        this.colors_list = colors_list;
        this.points = points;
    }

    draw() {
        this.ctx.save();
        this.begin_outline_path();
        this.ctx.fillStyle = this.colors_list[this.state];
        this.ctx.strokeStyle = "rgba(100, 100, 100, 0.6)";
        this.ctx.lineWidth = 2;
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.restore();
    }

    begin_outline_path() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.points[0], this.points[1]);
        for (let i = 2; i < this.points.length; i += 2)
            this.ctx.lineTo(this.points[i], this.points[i + 1]);
        this.ctx.closePath();
    }

    hit_test({x, y}) {
        let s = 0; //square
        let s_abs = 0; //sum of absolute

        let p = this.points;
        for (let i = 0; i + 1 < p.length; i += 2) {
            let v1x = p[i] - x;
            let v1y = p[i + 1] - y;

            let j = i + 2;
            if (j + 1 >= p.length)
                j = 0;
            let v2x = p[j] - x;
            let v2y = p[j + 1] - y;
            let s_triag = v1x * v2y - v1y * v2x;
            s += s_triag;
            s_abs += Math.abs(s_triag);
        }

        return Math.abs(Math.abs(s) - s_abs) < 1e-4;
    }
}