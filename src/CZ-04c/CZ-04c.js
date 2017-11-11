import {BitmapStatesTask} from "../lib/BitmapStatesTask";

export class Task extends BitmapStatesTask {

    constructor(container, pictures) {
        super(container, pictures, {x: 0, y: 0, width: 600, height: 250});
    }

    create_elements(img, ctx) {
        return super.create_elements(img, ctx);
    }
}