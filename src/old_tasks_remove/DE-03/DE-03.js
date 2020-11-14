/*
new Place(0, 0, 27, 29, 'a', 2, {imageId: 'bg', crop: {x: 0, y: 291, width: 27, height: 29}}),
new Place(0, 0, 21, 29, 'b', 2, {imageId: 'bg', crop: {x: 54, y: 291, width: 21, height: 29}}),
new Place(0, 0, 488, 291, 'frames', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 488, height: 291}}),
new Place(0, 0, 27, 35, 'd', 2, {imageId: 'bg', crop: {x: 27, y: 291, width: 27, height: 35}}),
new Place(0, 0, 21, 29, 'v', 2, {imageId: 'bg', crop: {x: 75, y: 291, width: 21, height: 29}}),
new Place(0, 0, 18, 29, 'g', 2, {imageId: 'bg', crop: {x: 96, y: 291, width: 18, height: 29}}),

{"6":2,"7":1,"8":3,"9":5,"10":4}{{{OR}}}{"6":5,"7":1,"8":3,"9":2,"10":4}
 */

export class Task {

    //container - is an id of element
    constructor(container, pictures) {
        let WIDTH = 580;
        let HEIGHT = 320;

        let v = 10;
        let s = 20;

        let places = [
            new Place(0, 0, 488, 291, 'frames', 1, {imageId: 'bg', crop: {x: 0, y: 0, width: 488, height: 291}}),

            new Place(v + 520, 4, 27, 29, 'a', 2, {imageId: 'bg', crop: {x: 0, y: 291, width: 27, height: 29}}),
            new Place(v + 524, 63, 21, 29, 'b', 2, {imageId: 'bg', crop: {x: 54, y: 291, width: 21, height: 29}}),
            new Place(v + 524, 126, 21, 29, 'v', 2, {imageId: 'bg', crop: {x: 75, y: 291, width: 21, height: 29}}),
            new Place(v + 524, 190, 18, 29, 'g', 2, {imageId: 'bg', crop: {x: 96, y: 291, width: 18, height: 29}}),
            new Place(v + 520, 252, 27, 35, 'd', 2, {imageId: 'bg', crop: {x: 27, y: 291, width: 27, height: 35}}),

            new Place(150 + s, 102, 80 - 2 * s, 30, 'x1', 0, {stroke: "green", strokeWidth: 2, dashArray: [4, 4]}),
            new Place(308 + s, 102, 80 - 2 * s, 30, 'x2', 0, {stroke: "green", strokeWidth: 2, dashArray: [4, 4]}),
            new Place(2 + s, 262, 80 - 2 * s, 30, 'x3', 0, {stroke: "green", strokeWidth: 2, dashArray: [4, 4]}),
            new Place(153 + s, 262, 80 - 2 * s, 30, 'x4', 0, {stroke: "green", strokeWidth: 2, dashArray: [4, 4]}),
            new Place(308 + s, 262, 80 - 2 * s, 30, 'x5', 0, {stroke: "green", strokeWidth: 2, dashArray: [4, 4]})
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