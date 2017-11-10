export class Task {

    //container - is an id of element
    constructor(container, images) {
        this.enabled = true;
        this.initCallback = null;
    }

    reset() {
    };

    isEnabled() {
        return this.enabled;
    };

    setEnabled(state) {
        this.enabled = state;

        //redraw
    };

    setInitCallback(_initCallback) {
        this.initCallback = _initCallback;

        //if we are initialized just after creation, any attempt to set up init callback is after we are initialized
        if (this.initCallback)
            this.initCallback();
    };

    getSolution() {
        return ''; //'' means no solution
    }

    loadSolution(solution) {

    }

    getAnswer() { //-1 no answer, 0 wrong, 1 correct, 2 - server check
        return 2;
    }
}