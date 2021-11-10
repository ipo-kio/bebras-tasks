import mouse_coordinates from "../lib/MouseCoordinates";

export const WHITE = 0;
export const RED = 1;

export const WIDTH = 80;
export const HEIGHT = 12;

export class Stack {
    constructor(colors) {
        this.colors = colors;
    }
}

export class StackView {

    constructor(ctx, stack, initial_x, initial_y) {
        this.ctx = ctx;
        this.stack = stack;
        this.x = initial_x;
        this.y = initial_y;
        this.initial_x = initial_x;
        this.initial_y = initial_y;
    }

    hit_test(x, y) {
        return this.x <= x && this.y <= y && x <= this.x + WIDTH && y <= this.y + HEIGHT * this.stack.colors.length;
    }

    draw() {
        let c = this.ctx;
        let colors = this.stack.colors;

        c.save();
        c.strokeStyle = "black";


        let y = this.y;
        c.lineWidth = 0.6;
        for (let color of colors) {
            c.fillStyle = color === 0 ? "white" : "red";
            c.fillRect(this.x, y, WIDTH, HEIGHT);
            c.strokeRect(this.x, y, WIDTH, HEIGHT);
            y += HEIGHT;
        }

        c.lineWidth = 4;
        c.strokeRect(this.x, this.y, WIDTH, HEIGHT * colors.length);

        c.restore();
    }

    move_back() {
        this.x = this.initial_x;
        this.y = this.initial_y;
    }

    get lines() {
        return this.stack.colors.length;
    }
}
