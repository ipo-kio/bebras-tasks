/*
 new Place(0, 0, 245, 135, 's3', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 245, height: 135}}),
 new Place(0, 0, 245, 135, 's4', 2, {imageId: 'bg', crop: {x: 245, y: 0, width: 245, height: 135}}),
 new Place(0, 0, 76, 135, 'p1', 2, {imageId: 'bg', crop: {x: 980, y: 0, width: 76, height: 135}}),
 new Place(0, 0, 76, 135, 'p2', 2, {imageId: 'bg', crop: {x: 1056, y: 0, width: 76, height: 135}}),
 new Place(0, 0, 76, 135, 'p3', 2, {imageId: 'bg', crop: {x: 1132, y: 0, width: 76, height: 135}}),
 new Place(0, 0, 76, 135, 'p4', 2, {imageId: 'bg', crop: {x: 1208, y: 0, width: 76, height: 135}}),
 new Place(0, 0, 245, 135, 's1', 2, {imageId: 'bg', crop: {x: 490, y: 0, width: 245, height: 135}}),
 new Place(0, 0, 245, 135, 's2', 2, {imageId: 'bg', crop: {x: 735, y: 0, width: 245, height: 135}}),
 */

// <p><img src="/~res/cg-DW0PxtsFbbs-KvD411570525330341.svg" alt="an image" /></p>

export class Task {

    //container - is an id of element
    constructor(container, pictures) {
        let WIDTH = 600;
        let HEIGHT = 570;

        let places = [
            new Place(260, 0, 245, 135, 's1', 1, {imageId: 'bg', crop: {x: 490, y: 0, width: 245, height: 135}}),
            new Place(260, 140, 245, 135, 's2', 1, {imageId: 'bg', crop: {x: 735, y: 0, width: 245, height: 135}}),
            new Place(260, 280, 245, 135, 's3', 1, {imageId: 'bg', crop: {x: 0, y: 0, width: 245, height: 135}}),
            new Place(260, 420, 245, 135, 's4', 1, {imageId: 'bg', crop: {x: 245, y: 0, width: 245, height: 135}}),

            new Place(4, 0, 76, 135, 'p1', 2, {imageId: 'bg', crop: {x: 980, y: 0, width: 76, height: 135}}),
            new Place(4, 140, 76, 135, 'p2', 2, {imageId: 'bg', crop: {x: 1056, y: 0, width: 76, height: 135}}),
            new Place(4, 280, 76, 135, 'p3', 2, {imageId: 'bg', crop: {x: 1132, y: 0, width: 76, height: 135}}),
            new Place(4, 420, 76, 135, 'p4', 2, {imageId: 'bg', crop: {x: 1208, y: 0, width: 76, height: 135}}),

            new Place(170, 0, 76, 135, 'x1', 0, {stroke: 'black', strokeWidth: 1, dashArray: [4, 4]}),
            new Place(170, 140, 76, 135, 'x2', 0, {stroke: 'black', strokeWidth: 1, dashArray: [4, 4]}),
            new Place(170, 280, 76, 135, 'x3', 0, {stroke: 'black', strokeWidth: 1, dashArray: [4, 4]}),
            new Place(170, 420, 76, 135, 'x4', 0, {stroke: 'black', strokeWidth: 1, dashArray: [4, 4]})
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