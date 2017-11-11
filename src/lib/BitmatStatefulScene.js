import {StatefulElementsScene} from "./StatefulElementsScene";
import {StatefulElement} from "./StatefulElement";

export class BitmatStatefulScene extends StatefulElementsScene {
    constructor(canvas, bg, sourceX, sourceY, elements) {
        super(canvas, elements);
        this.bg = bg;
        this.sourceX = sourceX;
        this.sourceY = sourceY;
    }

    drawBg() {
        this.ctx.drawImage(
            this.bg,
            this.sourceX, this.sourceY, this.width, this.height,
            0, 0, this.width, this.height
        );
    }
}

export class BitmapState {
    constructor(bg, x, y, width, height) {
        this.bg = bg;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx, x, y) {
        ctx.drawImage(
            this.bg,
            this.x, this.y, this.width, this.height,
            x, y, this.width, this.height
        );
    }
}

export class BitmapElement extends StatefulElement {
    constructor(ctx, x, y, bitmap_states, states_transitions) {
        super(ctx, bitmap_states.length, states_transitions);

        this.x = x;
        this.y = y;
        this.width = bitmap_states[0].width;
        this.height = bitmap_states[0].height;
        this.bitmap_states = bitmap_states;
    }

    draw() {
        this.bitmap_states[this.state].draw(this.ctx, this.x, this.y);
    }

    begin_outline_path() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x + this.width, this.y);
        this.ctx.lineTo(this.x + this.width, this.y + this.height);
        this.ctx.lineTo(this.x, this.y + this.height);
        this.ctx.closePath();
    }

    hit_test({x, y}) {
        return this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height;
    }
}