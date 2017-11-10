export class Task {

    //container - is an id of element
    constructor(container, pictures) {
        let WIDTH = 600;
        let HEIGHT = 300;

        let places = [];

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
        return this.ddlib.loadSolution();
    }

    getAnswer() { //-1 no answer, 0 wrong, 1 correct, 2 - server check
        return 2;
    }
}