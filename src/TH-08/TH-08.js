/*
 new Place(0, 0, 50, 67, 'orange', 2, {imageId: 'bg', crop: {x: 54, y: 236, width: 50, height: 67}}),
 new Place(0, 0, 54, 67, 'gray', 2, {imageId: 'bg', crop: {x: 0, y: 236, width: 54, height: 67}}),
 new Place(0, 0, 506, 236, 'bg', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 506, height: 236}}),
 */

export class Task {

    //container - is an id of element
    constructor(container, pictures) {
        let WIDTH = 700;
        let HEIGHT = 350;

        let places = [
            new Place(0, 0, 506, 236, 'bg', 1, {imageId: 'bg', crop: {x: 0, y: 0, width: 506, height: 236}}),

            new Place(520, 20, 54, 67, 'g1', 2, {imageId: 'bg', crop: {x: 0, y: 236, width: 54, height: 67}}),
            new Place(520, 84, 54, 67, 'g2', 2, {imageId: 'bg', crop: {x: 0, y: 236, width: 54, height: 67}}),
            new Place(520, 148, 54, 67, 'g3', 2, {imageId: 'bg', crop: {x: 0, y: 236, width: 54, height: 67}}),
            new Place(580, 20, 50, 67, 'o1', 2, {imageId: 'bg', crop: {x: 54, y: 236, width: 50, height: 67}}),
            new Place(580, 84, 50, 67, 'o2', 2, {imageId: 'bg', crop: {x: 54, y: 236, width: 50, height: 67}}),
            new Place(580, 148, 50, 67, 'o3', 2, {imageId: 'bg', crop: {x: 54, y: 236, width: 50, height: 67}}),

            new Place(30, 240, 50, 70, 'f1', 0, {stroke: 'red', strokeWidth: 2, dashArray: [4, 4]}),
            new Place(115, 240, 50, 70, 'f2', 0, {stroke: 'red', strokeWidth: 2, dashArray: [4, 4]}),
            new Place(185, 240, 50, 70, 'f3', 0, {stroke: 'red', strokeWidth: 2, dashArray: [4, 4]}),
            new Place(280, 240, 50, 70, 'f4', 0, {stroke: 'red', strokeWidth: 2, dashArray: [4, 4]}),
            new Place(345, 240, 50, 70, 'f5', 0, {stroke: 'red', strokeWidth: 2, dashArray: [4, 4]}),
            new Place(460, 240, 50, 70, 'f6', 0, {stroke: 'red', strokeWidth: 2, dashArray: [4, 4]})
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
        let out = this.ddlib.getOutput();
        let res = [out['f1'], out['f2'], out['f3'], out['f4'], out['f5'], out['f6']];
        for (let a of res)
            if (a === -1)
                return 0;
        let ok = res[0][0] === 'o' && res[1][0] === 'o';
        ok = ok && res[4][0] === 'g' && res[5][0] === 'g';

        return ok ? 1 : 0;
    }
}