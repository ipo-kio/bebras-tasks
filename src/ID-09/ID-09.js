export class Task {

    //container - is an id of element
    constructor(container, pictures) {

        let dx = 55;
        let dy = 300;

        let x0 = 60;
        let y0 = 140;

        let WIDTH = 560;
        let HEIGHT = 320;

        let places = [
            new Place(x0 + 0 * y0 - 72 / 2, 0, 72, 94, 'beaver1', 1, {
                imageId: 'bg',
                crop: {x: 0, y: 0, width: 72, height: 94}
            }),
            new Place(x0 + 1 * y0 - 58 / 2, 94 - 77, 59, 77, 'beaver3', 1, {
                imageId: 'bg',
                crop: {x: 72, y: 0, width: 59, height: 77}
            }),
            new Place(x0 + 2 * y0 - 58 / 2, 94 - 77, 59, 77, 'beaver4', 1, {
                imageId: 'bg',
                crop: {x: 131, y: 0, width: 59, height: 77}
            }),
            new Place(x0 + 3 * y0 - 46 / 2, 94 - 62, 47, 62, 'beaver2', 1, {
                imageId: 'bg',
                crop: {x: 614, y: 0, width: 47, height: 62}
            }),
            new Place(0 * dx, dy - 70, 53, 70, 'eggs', 2, {imageId: 'bg', crop: {x: 190, y: 0, width: 53, height: 70}}),
            new Place(1 * dx, dy - 72, 53, 72, 'chicken', 2, {
                imageId: 'bg',
                crop: {x: 243, y: 0, width: 53, height: 72}
            }),
            new Place(2 * dx, dy - 63, 53, 63, 'spinach', 2, {
                imageId: 'bg',
                crop: {x: 296, y: 0, width: 53, height: 63}
            }),
            new Place(3 * dx, dy - 72, 53, 72, 'fruit', 2, {
                imageId: 'bg',
                crop: {x: 349, y: 0, width: 53, height: 72}
            }),
            new Place(4 * dx, dy - 64, 53, 64, 'fish', 2, {imageId: 'bg', crop: {x: 402, y: 0, width: 53, height: 64}}),
            new Place(5 * dx, dy - 70, 53, 70, 'beef', 2, {imageId: 'bg', crop: {x: 455, y: 0, width: 53, height: 70}}),
            new Place(6 * dx, dy - 72, 53, 72, 'rice', 2, {imageId: 'bg', crop: {x: 508, y: 0, width: 53, height: 72}}),
            new Place(7 * dx, dy - 67, 53, 67, 'sugar', 2, {
                imageId: 'bg',
                crop: {x: 561, y: 0, width: 53, height: 67}
            }),
        ];

        let ww = 56;
        let hh = 74;
        let o = 30;
        for (let i = 0; i < 4; i++) {
            let x = x0 + i * y0;
            for (let j = 0; j < 2; j++) {
                let vObject = {stroke: "green", strokeWidth: 2, dashArray: [4, 4]};
                let x1 = x - ww / 2 + o * (2 * j - 1);
                places.push(new Place(x1, 100, ww, hh, 'v' + i + j, 0, vObject));
            }
        }

        this.ddlib = new App(container, WIDTH, HEIGHT, pictures, places, true);
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
        return 2;
    }
}
