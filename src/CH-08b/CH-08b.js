import {BitmapStatesTask} from "../lib/BitmapStatesTask";
import {BitmapElement, BitmapState} from "../lib/BitmatStatefulScene";

let positions = [
    {id: 1, x: 254, y: 163, width: 54, height: 72},
    {id: 2, x: 308, y: 163, width: 53, height: 71},
    {id: 3, x: 200, y: 163, width: 54, height: 72},
    {id: 4, x: 144, y: 163, width: 56, height: 81},
    {id: 5, x: 73, y: 163, width: 71, height: 81},
    {id: 6, x: 0, y: 163, width: 73, height: 81}
];

let posX = [31, 245, 317, 395, 474, 550, 636];
let posY = 92;

export class Task extends BitmapStatesTask {
    constructor(container, pictures) {
        super(container, pictures, {x: 0, y: 0, width: 723, height: 163});
    }

    create_elements(img, ctx) {
        let elements = [];

        this.elementsArray = [null];

        for (let i = 0; i < positions.length; i++) {
            let bitmap_states = [
                new BitmapState(img, positions[i].x, positions[i].y, positions[i].width, positions[i].height)
            ];

            let el = new BitmapElement(
                ctx, posX[i + 1], posY - positions[i].height, bitmap_states, [0]
            );
            el.id = positions[i].id;
            el.clickHandler = () => {
                let i_el = this.element_2_index(el);
                let i_null = this.element_2_index(null);
                if (i_el < 0 || i_null < 0) //not sure this can be true
                    return;

                this.put_element_at(el, i_null);
            };
            elements.push(el);
            this.elementsArray.push(el);
        }

        this.all_elements = elements;

        return elements;
    }

    element_2_index(el) {
        for (let i = 0; i < this.elementsArray.length; i++)
            if (this.elementsArray[i] === el)
                return i;
        return -1;
    }

    put_element_at(el, i_new) {
        let i_el = this.element_2_index(el);
        this.elementsArray[i_el] = null;
        this.elementsArray[i_new] = el;
        el.x = posX[i_new];
    }
}