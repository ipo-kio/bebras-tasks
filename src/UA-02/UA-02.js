import {BitmapStatesTask} from "../lib/BitmapStatesTask";
import {BitmapElement, BitmapState} from "../lib/BitmatStatefulScene";

export class Task extends BitmapStatesTask {

    constructor(container, pictures) {
        super(container, pictures, {x: 0, y: 0, width: 500, height: 500});
    }

    create_elements(img, ctx) {
        let elements = [];

        //128(230),51(109) -- 38 20
        //87(188),72(131)  -- 21 39

        for (let i = 0; i < 7; i++)
            for (let j = 0; j < 3; j++) {
                let x = 128 + (230 - 128) * j - 19;
                let y = 51 + (109 - 51) * i;

                let bitmap_states = [
                    new BitmapState(img, x, y, 38 * 2, 20),
                    new BitmapState(img, x + 500, y, 38 * 2, 20),
                ];

                elements.push(new BitmapElement(ctx, x, y, bitmap_states, [1, 0]));
            }

        for (let i = 0; i < 6; i++)
            for (let j = 0; j < 4; j++) {
                let x = 87 + (188 - 87) * j;
                let y = 72 + (131 - 72) * i;

                let bitmap_states = [
                    new BitmapState(img, x, y, 21, 39),
                    new BitmapState(img, x + 500, y, 21, 39),
                ];

                elements.push(new BitmapElement(ctx, x, y, bitmap_states, [1, 0]));
            }

        return elements;
    }
}

//correct: 110001100000000010110101110000100010001000010
//old images: <p><img src="/~res/CVMgaYjeYIsNaLsXeODs1509785708501.svg" alt="an image" /></p>