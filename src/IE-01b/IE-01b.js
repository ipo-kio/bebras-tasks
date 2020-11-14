
export class Task {

    //container - is an id of element
    constructor(container, pictures) {
        let WIDTH = 610;
        let HEIGHT = 360;

        let dy = 4;
        let dh = 44;

        let places = [
            new Place(4, 50, 328, 137, 'data', 1, {imageId: 'bg', crop: {x: 0, y: 0, width: 328, height: 137}}),
            new Place(340, dy + 0 * dh, 268, 42, 'blanc1', 0, {imageId: 'bg', crop: {x: 1072, y: 137, width: 268, height: 42}}),
            new Place(340, dy + 1 * dh, 268, 42, 'blanc2', 0, {imageId: 'bg', crop: {x: 1072, y: 137, width: 268, height: 42}}),
            new Place(340, dy + 2 * dh, 268, 42, 'blanc3', 0, {imageId: 'bg', crop: {x: 1072, y: 137, width: 268, height: 42}}),
            new Place(340, dy + 3 * dh, 268, 42, 'blanc4', 0, {imageId: 'bg', crop: {x: 1072, y: 137, width: 268, height: 42}}),
            new Place(340, dy + 4 * dh, 268, 42, 'blanc5', 0, {imageId: 'bg', crop: {x: 1072, y: 137, width: 268, height: 42}}),
            new Place(7, 220, 268, 42, '0-2112411111', 2, {imageId: 'bg', crop: {x: 0, y: 137, width: 268, height: 42}}),
            new Place(310, 240, 268, 42, '1-321231111', 2, {imageId: 'bg', crop: {x: 268, y: 137, width: 268, height: 42}}),
            new Place(40, 263, 268, 42, '0-21212151', 2, {imageId: 'bg', crop: {x: 536, y: 137, width: 268, height: 42}}),
            new Place(20, 307, 268, 42, '1-3131331', 2, {imageId: 'bg', crop: {x: 804, y: 137, width: 268, height: 42}}),
            new Place(300, 290, 268, 42, '1-3213123', 2, {imageId: 'bg', crop: {x: 1340, y: 137, width: 268, height: 42}}),
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
