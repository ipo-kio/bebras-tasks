export class Task {

    // wrong upload:
    // /~res/aaZ_HYO7kNiixRb4fe8w1605355949839.png
    // <p><img src="/~res/bZx0VOuhwB_Y-M-KBtyU1605357881007.png" title="bg" alt="an image" /></p>

    //container - is an id of element
    constructor(container, pictures) {
        let WIDTH = 513 + 4 + 72 + 4;
        let HEIGHT = 321 + 4 + 72 + 4;

        let places = [
            new Place(4, 4, 513, 321, 'field', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 513, height: 321}}),
            new Place(0, 0, 72, 72, 'zebra', 2, {imageId: 'bg', crop: {x: 0, y: 321, width: 72, height: 72}}),
            new Place(0, 0, 72, 72, 'cat', 2, {imageId: 'bg', crop: {x: 360, y: 321, width: 72, height: 72}}),
            new Place(0, 0, 72, 72, 'crocodile', 2, {imageId: 'bg', crop: {x: 72, y: 321, width: 72, height: 72}}),
            new Place(0, 0, 72, 72, 'turtle', 2, {imageId: 'bg', crop: {x: 216, y: 321, width: 72, height: 72}}),
            new Place(0, 0, 72, 72, 'duck', 2, {imageId: 'bg', crop: {x: 288, y: 321, width: 72, height: 72}}),
            new Place(0, 0, 72, 72, 'elephant', 2, {imageId: 'bg', crop: {x: 504, y: 321, width: 72, height: 72}}),
            new Place(0, 0, 72, 72, 'fox', 2, {imageId: 'bg', crop: {x: 576, y: 321, width: 72, height: 72}}),
            new Place(0, 0, 72, 72, 'monkey', 2, {imageId: 'bg', crop: {x: 144, y: 321, width: 72, height: 72}}),
            new Place(0, 0, 72, 72, 'bear', 2, {imageId: 'bg', crop: {x: 432, y: 321, width: 72, height: 72}}),
            new Place(0, 0, 72, 72, 'penguin', 2, {imageId: 'bg', crop: {x: 648, y: 321, width: 72, height: 72}}),
            new Place(0, 0, 72, 72, 'lion', 2, {imageId: 'bg', crop: {x: 720, y: 321, width: 72, height: 72}}),
    ];

        let x0 = 513 + 4 + 4;
        let y0 = 321 + 4 + 4;
        for (let i = 1; i < places.length; i++) {
            if (i <= 5) {
                places[i].y = y0 - (i - 1) * 80;
                places[i].x = x0;
            } else {
                places[i].x = x0 - (i - 5) * 80;
                places[i].y = y0;
            }
        }

        let holes = [
            [56, 75],
            [157, 53],
            [146, 155],
            [157, 256],
            [56, 235],
            [275, 112],
            [274, 208],
            [398, 54],
            [499, 74],
            [408, 155],
            [398, 255],
            [499, 235]
        ];
        let i = 0;
        for (let hole of holes)
            {
                let x = Math.round(hole[0] * 4 / 5 + 4);
                let y = Math.round(hole[1] * 4 / 5 + 4);
                places.push(new Place(x, y, 72, 72, "h" + (i++), 0, {strokeWidth: 0}));
            }

        this.ddlib = new App(container, WIDTH, HEIGHT, pictures, places, true);

        this.sets = {
            zebra: 1,
            crocodile: 1,
            monkey: 1,
            lion: 1,
            turtle: 1,
            bear: 2,
            cat: 2,
            duck: 3,
            fox: 3,
            elephant: 3,
            penguin: 3
        }
    }

    reset() {
        this.ddlib.reset();
    };

    isEnabled() {
        return this.ddlib.isEnabled();
    };

    setEnabled(state) {
        this.ddlib.setEnabled(state);
    };

    setInitCallback(_initCallback) {
        this.ddlib.setInitCallback(_initCallback);
    };

    getSolution() {
        return this.ddlib.getSolution();
    }

    loadSolution(solution) {
        return this.ddlib.loadSolution(solution);
    }

    getAnswer() { //-1 no answer, 0 wrong, 1 correct, 2 - server check
        let answer = this.ddlib.getOutput();
        let countAnimals = 0;
        for (let i = 0; i < 12; i++) { // there are 12 holes
            let animal = answer["h" + i];
            if (animal === -1)
                continue;
            countAnimals++;
            let set = this.sets[animal];
            if (i <= 4 && set !== 1)
                return 0;
            if (5 <= i && i <= 6 && set !== 2)
                return 0;
            if (7 <= i && set !== 3)
                return 0;
        }

        return countAnimals === 11 ? 1 : 0;
    }
}
