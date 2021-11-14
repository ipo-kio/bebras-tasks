import {HEIGHT, StackView, WIDTH} from "./stack";
import mouse_coordinates from "../lib/MouseCoordinates";

const STACK_Y_BOTTOM = 260;
const STACK_X_BOTTOMS = [30, 30 + WIDTH + 40];
const SKIP = 0;
const BRACKETS_WIDTH = 4;
const BRACKETS_OUT = 6;

export class Field {

    selected_view = null;

    stacks = [[], []]; // indexes of views
    highlighted_stack = -1;

    _enabled = true;

    constructor(canvas, stacks) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.views = [];
        let x = 270;
        let ind = 0;
        for (let stack of stacks) {
            let new_x = x + (ind >= 4 ? 100 : 0);
            let new_y = 30 + (ind % 4) * 5 * HEIGHT;
            let view = new StackView(this.ctx, stack, new_x, new_y);

            this.views.push(view);
            ind++;
        }

        this.canvas.addEventListener("mousedown", e => {
            if (e.button === 0 && this.enabled)
                this.mousedown(mouse_coordinates(this.canvas, e));
        });
        this.canvas.addEventListener("mouseup", e => {
            if (e.button === 0 && this.enabled)
                this.mouseup(mouse_coordinates(this.canvas, e));
        });
        this.canvas.addEventListener("mousemove", e => {
            if (e.buttons & 1 !== 0 && this.enabled)
                this.mousemove(mouse_coordinates(this.canvas, e));
        });
    }

    mousedown({x, y}) {
        if (this.selected_view !== null)
            return;

        for (let view of this.views)
            if (view.hit_test(x, y)) {
                this.selected_view = view;
                break;
            }

        if (this.selected_view === null)
            return;

        //remove selected views from stacks
        for (let stack_index = 0; stack_index <= 1; stack_index++) {
            let ind = this.stacks[stack_index].indexOf(this.selected_view);
            if (ind >= 0)
                this.stacks[stack_index].splice(ind, 1);
        }

        this.drag_dx = x - this.selected_view.x;
        this.drag_dy = y - this.selected_view.y;
    }

    mousemove({x, y}) {
        if (this.selected_view === null)
            return;

        this.selected_view.x = x - this.drag_dx;
        this.selected_view.y = y - this.drag_dy;

        let position = this.find_position(this.selected_view);
        this.place_views(position, this.selected_view);

        if (position !== null)
            this.highlighted_stack = position.stack_index;
        else
            this.highlighted_stack = -1;

        this.redraw();
    }

    find_position(view) {

        function find_stack_index() {
            for (let stack_index = 0; stack_index <= 1; stack_index++) {
                let left = Math.max(STACK_X_BOTTOMS[stack_index], view.x);
                let right = Math.min(STACK_X_BOTTOMS[stack_index], view.x) + WIDTH;
                if (view.y < STACK_Y_BOTTOM && left < right && right - left >= WIDTH / 2)
                    return stack_index;
            }
            return -1;
        }

        let stack_index = find_stack_index();
        if (stack_index < 0)
            return null;

        let y0 = view.y + view.lines * HEIGHT / 2;

        let x = STACK_X_BOTTOMS[stack_index];
        let y = STACK_Y_BOTTOM;
        let index_in_stack = 0;
        for (let view of this.stacks[stack_index]) {
            view.x = x;
            y -= HEIGHT * view.lines + SKIP;
            view.y = y;
            let y1 = y; // + view.lines * HEIGHT / 2;
            if (y1 > y0)
                index_in_stack++;
        }

        return {
            stack_index,
            index_in_stack
        };
    }

    place_views(position, inner_view) {
        let skip_stack_index, skip_index_in_stack, skip_height;

        if (position === null) {
            skip_stack_index = -1;
            skip_index_in_stack = -1;
            skip_height = -1;
        } else {
            skip_stack_index = position.stack_index;
            skip_index_in_stack = position.index_in_stack;
            skip_height = inner_view.lines * HEIGHT;
        }

        for (let view of this.views)
            if (view !== inner_view) {
                view.x = view.initial_x;
                view.y = view.initial_y;
            }

        for (let stack_index = 0; stack_index <= 1; stack_index++) {
            let y = STACK_Y_BOTTOM;
            let x = STACK_X_BOTTOMS[stack_index];
            let i = 0;
            for (let view of this.stacks[stack_index]) {
                y -= view.lines * HEIGHT + SKIP;
                if (stack_index === skip_stack_index && i === skip_index_in_stack)
                    y -= skip_height + SKIP;
                if (view !== inner_view) {
                    view.x = x;
                    view.y = y;
                }
                i++;
            }
        }
    }

    mouseup({x, y}) {
        if (this.selected_view === null)
            return;

        let position = this.find_position(this.selected_view);

        if (position !== null)
            this.stacks[position.stack_index].splice(position.index_in_stack, 0, this.selected_view);

        this.place_views(null, null);
        this.selected_view = null;
        this.highlighted_stack = -1;

        this.redraw();
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // draw stacks
        let d = 8;
        for (let stack_index = 0; stack_index <= 1; stack_index++) {
            this.ctx.strokeStyle = this.highlighted_stack === stack_index ? 'orange' : 'blue';
            this.ctx.lineWidth = this.highlighted_stack === stack_index ? 4 : 2;
            this.ctx.beginPath();
            this.ctx.moveTo(STACK_X_BOTTOMS[stack_index] - d - BRACKETS_WIDTH - BRACKETS_OUT, 0);
            this.ctx.lineTo(STACK_X_BOTTOMS[stack_index] - d - BRACKETS_WIDTH - BRACKETS_OUT, STACK_Y_BOTTOM + d);
            this.ctx.lineTo(STACK_X_BOTTOMS[stack_index] + WIDTH + d, STACK_Y_BOTTOM + d);
            this.ctx.lineTo(STACK_X_BOTTOMS[stack_index] + WIDTH + d, 0);
            this.ctx.stroke();
        }

        for (let view of this.views)
            view.draw();

        let h = HEIGHT / 2;
        if (HEIGHT % 2 === 0)
            h += 0.5;
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 1;
        for (let stack_index = 0; stack_index <= 1; stack_index++) {
            for (let view of this.stacks[stack_index]) {
                let y0 = view.y + view.lines * HEIGHT;
                let y1 = view.y;
                this.ctx.beginPath();
                this.ctx.moveTo(0.5 + STACK_X_BOTTOMS[stack_index] - BRACKETS_OUT, y1 + h);
                this.ctx.lineTo(0.5 + STACK_X_BOTTOMS[stack_index] - BRACKETS_OUT - BRACKETS_WIDTH, y1 + h);
                this.ctx.lineTo(0.5 + STACK_X_BOTTOMS[stack_index] - BRACKETS_OUT - BRACKETS_WIDTH, y0 - h);
                this.ctx.lineTo(0.5 + STACK_X_BOTTOMS[stack_index] - BRACKETS_OUT, y0 - h);
                this.ctx.stroke();
            }
        }

        if (!this._enabled) {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    is_ok() {
        let level = ["", ""];
        let cnt = 0;
        for (let stack_index = 0; stack_index <= 1; stack_index++)
            for (let {stack} of this.stacks[stack_index]) {
                cnt++;
                for (let i = stack.colors.length - 1; i >= 0; i--)
                    level[stack_index] += stack.colors[i];
            }
        return cnt === this.views.length && level[0] === level[1];
    }

    get solution() {
        let s = "";
        for (let view of this.views) {
            //where is view
            let ind = this.stacks[0].indexOf(view);
            if (ind >= 0)
                s += 'L' + ind;
            else {
                ind = this.stacks[1].indexOf(view);
                if (ind >= 0)
                    s += 'R' + ind;
                else s += '-';
            }
        }
        return s;
    }

    load(solution) {
        //R3R1L0L1L2R2R0
        let cntL = 0;
        let cntR = 0;
        for (let i = 0; i < this.solution.length; i++)
            if (solution[i] === "L")
                cntL++;
            else if (solution[i] === "R")
                cntR++;
        this.stacks = [new Array(cntL), new Array(cntR)];

        let i = 0;
        for (let view of this.views) {
            let op = solution[i];
            if (op !== '-') {
                i++;
                let u = +solution[i];
                this.stacks[op === 'L' ? 0 : 1][u] = view;
            }
            i++;
        }

        this.place_views(null, null);
    }

    get enabled() {
        return this._enabled;
    }

    set enabled(value) {
        this._enabled = value;
        this.redraw();
    }
}

// TODO drag always on top
