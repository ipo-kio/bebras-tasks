import {BitmapStatesTask} from "../lib/BitmapStatesTask";
import {BitmapElement, BitmapState} from "../lib/BitmatStatefulScene";

export class Task extends BitmapStatesTask {

    constructor(container, pictures) {
        super(container, pictures, {x: 0, y: 0, width: 728, height: 203});
    }

    create_elements(img, ctx) {
        let bitmap_states_45 = [
            new BitmapState(img, 200, 0, 29, 29),
            new BitmapState(img, 29, 203, 29, 29), //left 45
            new BitmapState(img, 0, 203, 29, 29), //right 45
        ];

        let bitmap_states_90 = [
            new BitmapState(img, 200, 0, 21, 21), //empty space
            new BitmapState(img, 58, 203, 21, 21), //left 90
            new BitmapState(img, 79, 203, 21, 21) //right 90
        ];

        return [
            new BitmapElement(ctx, 124, 96, bitmap_states_45, [1, 2, 1]),
            new BitmapElement(ctx, 116, 167, bitmap_states_90, [1, 2, 1]),
            new BitmapElement(ctx, 421, 167, bitmap_states_90, [1, 2, 1]),
            new BitmapElement(ctx, 421, 25, bitmap_states_90, [1, 2, 1]),
            new BitmapElement(ctx, 345, 100, bitmap_states_90, [1, 2, 1]),
            new BitmapElement(ctx, 495, 100, bitmap_states_90, [1, 2, 1]),
        ];
    }
}

//correct answer: 122211