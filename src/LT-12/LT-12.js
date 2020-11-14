import {SimpleStatesTask} from "../lib/SimpleStatesTask";
import {StatefulElement} from "../lib/StatefulElement";
import {TailElement} from "./TailElement";

export class Task extends SimpleStatesTask {

    //container - is an id of element
    constructor(container, images) {
        super(container, 495 + 2 * 4, 245 + 2 * 4, draw_bg, false);

        function draw_bg(ctx) {
            ctx.save();

            ctx.drawImage(bg_image, 4, 4);

            ctx.restore();
        }

        this.enabled = true;
        this.initCallback = null;

        this.loaded = false;

        let bg_image = new Image();
        this.bg = bg_image;
        this.bg.src = images.bg;
        this.bg.onload = () => this.bgLoaded();
    }

    bgLoaded() {
        if (this.initCallback)
            this.initCallback();

        this.loaded = true;
    }

    setInitCallback(_initCallback) {
        this.initCallback = _initCallback;

        //if we are initialized just after creation, any attempt to set up init callback is after we are initialized
        if (this.initCallback && this.loaded)
            this.initCallback();
    };

    createElements() {
        let len1 = 42;
        return [
            new TailElement(this.ctx, [
                [47, 123],
                [29, 107],
                [23, 86],
                [23, 69],
                [30, 50],
                [37, 38],
                [56, 23],
                [77, 15],
                [92, 15],
                [104, 19],
                [110, 54],
                [67, 70],
                [78, 114]
            ], 51, 62, len1),
            new TailElement(this.ctx, [
                [110, 84],
                [144, 72],
                [149, 1],
                [186, 56],
                [217, 46],
                [228, 67],
                [209, 84],
                [218, 96],
                [221, 109],
                [219, 121],
                [207, 131],
                [189, 132],
                [177, 125],
                [169, 115],
                [152, 128]
            ], 174, 87, len1),
            new TailElement(this.ctx, [
                [249, 21],
                [302, 8],
                [360, 6],
                [353, 39],
                [286, 44],
                [344, 83],
                [338, 118],
                [296, 137],
                [274, 136],
                [248, 124],
                [238, 106],
                [237, 95],
                [247, 78],
                [271, 67]
            ], 292, 95, len1),
            new TailElement(this.ctx, [
                [362, 35],
                [383, 23],
                [415, 13],
                [436, 10],
                [463, 11],
                [447, 52],
                [470, 83],
                [424, 108],
                [409, 93],
                [423, 82],
                [428, 67],
                [424, 51],
                [408, 41],
                [397, 42],
                [381, 53]
            ], 437, 58, len1),
            new TailElement(this.ctx, [
                [0, 145],
                [53, 138],
                [56, 155],
                [68, 175],
                [81, 180],
                [93, 178],
                [110, 164],
                [117, 151],
                [123, 128],
                [133, 204],
                [105, 230],
                [73, 203],
                [45, 235],
                [9, 224],
                [2, 187],
            ], 73, 191, len1),
            // new TailElement(this.ctx, []),
            // new TailElement(this.ctx, []),
            // new TailElement(this.ctx, [])
        ];
    }
}
