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

export class Task {

    //container - is an id of element
    constructor(container, pictures) {
        let WIDTH = 600;
        let HEIGHT = 300;

        let places = [
            new Place(0, 0, 76, 135, 'p1', 2, {imageId: 'bg', crop: {x: 980, y: 0, width: 76, height: 135}}),
            new Place(0, 0, 76, 135, 'p2', 2, {imageId: 'bg', crop: {x: 1056, y: 0, width: 76, height: 135}}),
            new Place(0, 0, 76, 135, 'p3', 2, {imageId: 'bg', crop: {x: 1132, y: 0, width: 76, height: 135}}),
            new Place(0, 0, 76, 135, 'p4', 2, {imageId: 'bg', crop: {x: 1208, y: 0, width: 76, height: 135}}),
            new Place(0, 0, 245, 135, 's1', 2, {imageId: 'bg', crop: {x: 490, y: 0, width: 245, height: 135}}),
            new Place(0, 0, 245, 135, 's2', 2, {imageId: 'bg', crop: {x: 735, y: 0, width: 245, height: 135}}),
            new Place(0, 0, 245, 135, 's3', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 245, height: 135}}),
            new Place(0, 0, 245, 135, 's4', 2, {imageId: 'bg', crop: {x: 245, y: 0, width: 245, height: 135}})
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