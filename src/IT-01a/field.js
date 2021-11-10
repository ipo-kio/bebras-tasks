import {HEIGHT, StackView, WIDTH} from "./stack";
import mouse_coordinates from "../lib/MouseCoordinates";

const STACK_Y_BOTTOM = 300;
const STACK_X_BOTTOMS = [10, 10 + WIDTH + 16];

export class Field {

    selected_view = null;

    stacks = [[], []]; // indexes of views
    current_stack_position = null;

    constructor(canvas, stacks) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        this.views = [];
        let x = STACK_X_BOTTOMS[0];
        for (let stack of stacks) {
            let new_x = x;
            x += WIDTH + 8;
            let new_y = STACK_Y_BOTTOM + (5 - stack.colors.length) * HEIGHT;
            let view = new StackView(this.ctx, stack, new_x, new_y);

            this.views.push(view);
        }

        this.canvas.addEventListener("mousedown", e => this.mousedown(mouse_coordinates(this.canvas, e)));
        this.canvas.addEventListener("mouseup", e => this.mouseup(mouse_coordinates(this.canvas, e)));
        this.canvas.addEventListener("mousemove", e => this.mousemove(mouse_coordinates(this.canvas, e)));
        this.canvas.addEventListener("mouseleave", e => this.mouseleave(mouse_coordinates(this.canvas, e)));
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

        this.drag_dx = x - this.selected_view.x;
        this.drag_dy = y - this.selected_view.y;
    }

    mousemove({x, y}) {
        if (this.selected_view === null)
            return;

        this.selected_view.x = x - this.drag_dx;
        this.selected_view.y = y - this.drag_dy;

        let position = this.find_position(this.selected_view);
        if (position !== this.current_stack_position) {
            this.current_stack_position = position;

            for (let stack_index = 0; stack_index <= 1; stack_index++) {
                let x = STACK_X_BOTTOMS[stack_index];
                let y = STACK_Y_BOTTOM;
                let i = 0;
                for (let view of this.stacks[stack_index]) {
                    view.x = x;
                    view.y = y;
                    y -= HEIGHT * view.lines;

                    if (position !== null && position.stack_index === stack_index && position.index_in_stack === i)
                        y -= HEIGHT * this.selected_view.lines;

                    i++;
                }
            }
        }


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
            view.y = y;
            y -= HEIGHT * view.lines;
            let y1 = y + view.lines * HEIGHT / 2;
            if (y1 < y0)
                return {
                    stack_index,
                    index_in_stack
                };

            index_in_stack++;
        }

        return {
            stack_index,
            index_in_stack
        };
    }

    mouseup({x, y}) {
        if (this.selected_view === null)
            return;

        let position = this.find_position(this.selected_view);
        if (position === null)
            this.selected_view.move_back();
        else {
            let {stack_index, index_in_stack} = position;
            this.stacks[stack_index].splice(index_in_stack, 0, this.selected_view);
            this.selected_view.x = STACK_X_BOTTOMS[stack_index];
            if (index_in_stack === 0)
                this.selected_view.y = STACK_Y_BOTTOM;
            else
                this.selected_view.y = this.stacks[stack_index][index_in_stack - 1].y - this.selected_view.length * HEIGHT;
        }
        this.selected_view = null;

        this.redraw();
    }

    mouseleave({x, y}) {
        //do nothing
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // draw stacks
        this.ctx.strokeStyle = 'blue';
        this.ctx.beginPath();
        let d = 4;
        for (let stack_index = 0; stack_index <= 1; stack_index++) {
            this.ctx.moveTo(STACK_X_BOTTOMS[stack_index] - d, 0);
            this.ctx.lineTo(STACK_X_BOTTOMS[stack_index] - d, STACK_Y_BOTTOM);
            this.ctx.lineTo(STACK_X_BOTTOMS[stack_index] + WIDTH + d, STACK_Y_BOTTOM);
            this.ctx.lineTo(STACK_X_BOTTOMS[stack_index] + WIDTH + d, 0);
        }
        this.ctx.stroke();

        for (let view of this.views)
            view.draw();
    }
}

// TODO drag always on top
