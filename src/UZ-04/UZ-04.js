import {BitmapStatesTask} from "../lib/BitmapStatesTask";

const D = 28;
const MAP = [
    ".x...x.xxx.xx..",
    "...............",
    "...............",
    "...............",
    "...............",
    "...............",
    "...............",
    "...............",
    "...............",
    "...............",
    "...............",
    "...............",
    "...............",
    "...............",
    "..............."
];

export class Task extends BitmapStatesTask {
    constructor(container, pictures) {
        super(container, pictures, {x: 100, y: 100})
    }
}
