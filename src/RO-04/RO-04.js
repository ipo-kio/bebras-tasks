/*
new Place(0, 0, 271, 400, 'question', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 271, height: 400}}),
new Place(0, 0, 35, 35, 'r', 2, {imageId: 'bg', crop: {x: 271, y: 0, width: 35, height: 35}}),
new Place(0, 0, 35, 35, 'u', 2, {imageId: 'bg', crop: {x: 306, y: 0, width: 35, height: 35}}),
new Place(0, 0, 35, 35, 'l', 2, {imageId: 'bg', crop: {x: 341, y: 0, width: 35, height: 35}}),

{"1":6,"2":5,"3":4}
 */

export class Task {

    //container - is an id of element
    constructor(container, pictures) {
        let WIDTH = 320;
        let HEIGHT = 400;

        let places = [
            new Place(0, 0, 271, 400, 'question', 1, {imageId: 'bg', crop: {x: 0, y: 0, width: 271, height: 400}}),

            new Place(156, 162, 30, 30, 'x1', 0, {/*stroke: "red", strokeWidth: 2, dashArray: [4, 4]*/}),
            new Place(28, 96, 30, 30, 'x1', 0, {/*stroke: "red", strokeWidth: 2, dashArray: [4, 4]*/}),
            new Place(158, 236, 30, 30, 'x1', 0, {/*stroke: "red", strokeWidth: 2, dashArray: [4, 4]*/}),

            new Place(271, 285, 35, 35, 'r', 2, {imageId: 'bg', crop: {x: 271, y: 0, width: 35, height: 35}}),
            new Place(271, 325, 35, 35, 'u', 2, {imageId: 'bg', crop: {x: 306, y: 0, width: 35, height: 35}}),
            new Place(271, 365, 35, 35, 'l', 2, {imageId: 'bg', crop: {x: 341, y: 0, width: 35, height: 35}})
        ];

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