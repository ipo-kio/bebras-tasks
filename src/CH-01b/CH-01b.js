/*
340 37 --- 121 24
340 71
340 105
340 140
340 174
    209
    243
    277
 */

import {BitmapStatesTask} from "../lib/BitmapStatesTask";
import {BitmapElement, BitmapState} from "../lib/BitmatStatefulScene";

export class Task extends BitmapStatesTask {

    constructor(container, pictures) {
        super(container, pictures, {x: 0, y: 0, width: 540, height: 317});
    }

    create_elements(img, ctx) {
        let bitmap_states = [
            new BitmapState(img, 0, 317, 121, 24),
            new BitmapState(img, 121, 317, 121, 24),
            new BitmapState(img, 242, 317, 121, 24),
            new BitmapState(img, 363, 317, 121, 24)
        ];

        let elements = [];
        let y0 = [37, 71, 105, 140, 174, 209, 243, 277];

        for (let i = 0; i < 8; i++)
            elements.push(
                new BitmapElement(ctx, 340, y0[i], bitmap_states, [1, 2, 3, 1])
            )
        return elements;
    }

}

//correct answer 32213131
//old img: <p><img src="/~res/cfpIuoZAyUOKoUPOQjz61509326888570.svg" alt="an image" /><img src="/~res/6nqUZkIQcNWxybwYZooC1509326901642.svg" alt="an image" /></p>