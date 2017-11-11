import {BitmapElement, BitmapState, BitmatStatefulScene} from "../lib/BitmatStatefulScene";
import {appendCanvas} from "../lib/ContainerHelpers";

let field = [
    [1, 0, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 1, 1, 0],
    [0, 1, 1, 0, 0, 1, 1],
    [1, 0, 1, 1, 0, 0, 0],
    [0, 1, 1, 0, 1, 0, 1]
];

function create_elements(img, ctx) {
    let elements = [];

    let bitmap_states = [
        new BitmapState(img, 0, 0, 42, 42),
        new BitmapState(img, 294, 0, 42, 42),
    ];

    for (let i = 0; i < field.length; i++)
        for (let j = 0; j < field[i].length; j++)
            if (field[i][j] === 1)
                elements.push(new BitmapElement(
                    ctx, 42 * j, 42 * i,
                    bitmap_states,
                    [1, 0]
                ));

    return elements;
}

export class Task {

    //container - is an id of element
    constructor(container, images) {
        this.initCallback = null;
        this.container = container;

        this.img = new Image();
        this.img.onload = this.bgLoaded.bind(this);
        this.img.src = images.bg;

        this.loaded = false;
    }

    bgLoaded() {
        this.loaded = true;

        this.canvas = appendCanvas(this.container, 294, 210);
        this.ctx = this.canvas.getContext('2d');
        this.scene = new BitmatStatefulScene(
            this.canvas,
            this.img,
            0, 0,
            create_elements(this.img, this.ctx)
        );

        if (this.initCallback)
            this.initCallback();
    }

    //TODO the next methods (except he one setInitCallback) could not be called before the task is loded
    reset() {
        this.scene.reset();
    };

    isEnabled() {
        return this.scene.isEnabled();
    };

    setEnabled(state) {
        this.scene.setEnabled(state);
    };

    setInitCallback(_initCallback) {
        this.initCallback = _initCallback;

        //if we are initialized just after creation, any attempt to set up init callback is after we are initialized
        if (this.loaded)
            this.initCallback();
    };

    getSolution() {
        return this.scene.getSolution();
    }

    loadSolution(solution) {
        this.scene.loadSolution(solution);
    }

    getAnswer() { //-1 no answer, 0 wrong, 1 correct, 2 - server check
        return 2;
    }
}

/* all images
<p class="western"><img src="/~res/thPoV9uzYiPOxwAZuIu21509263840772.png" alt="an image" /></p><p class="western"><img src="/~res/l2T0GBswFpm8qRx_wO7e1509263931330.png" alt="an image" /><img src="/~res/1WDgqZuKjVVx6Q3Cxz1B1509263940636.png" alt="an image" /><img src="/~res/4LcH0m2F6cPjic3Ha4nh1509263952643.png" alt="an image" /><img src="/~res/tchR500CGRJuktB9l89k1509264019434.png" alt="an image" /></p>
 */