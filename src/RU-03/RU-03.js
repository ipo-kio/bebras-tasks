export class Task {

    //container - is an id of element
    constructor(container, pictures) {
        var places = [
            new Place(0, 82, 504, 114, 'fr', 1, {imageId: 'bg', crop: {x: 0, y: 82, width: 504, height: 114}}),
            new Place(0, 82 + 16, 63, 82, 'm0', 1, {imageId: 'bg', crop: {x: 63 * 7, y: 0, width: 63, height: 82}}),
            new Place(63 * 7, 82 + 16, 63, 82, 'm7', 1, {imageId: 'bg', crop: {x: 63 * 6, y: 0, width: 63, height: 82}})
        ];

        for (var i = 1; i < 7; i++)
            places.push(
                new Place(i * 63, 0, 63, 82, 'm' + i, 2, {imageId: 'bg', crop: {x: 63 * (i - 1), y: 0, width: 63, height: 82}}),
                new Place(i * 63, 82 + 16, 63, 82, 'd' + i, 0, {})
            );

        this.ddlib = new App(container, 504, 82 + 114, pictures, places, true);
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

//correct: {"4":13,"6":7,"8":9,"10":5,"12":11,"14":3}

//old images: <p><img src="/~res/7rgmvKzCFToR9w89zoy51509269498858.png" alt="an image" /><img src="/~res/Rz-Y2amzPE_oUKMABzJi1509269507701.png" alt="an image" /><img src="/~res/cJUU705lde_8BFo92nVK1509269515955.png" alt="an image" /><img src="/~res/iYrl2fn7hYF2tcujs-g91509269522794.png" alt="an image" /><img src="/~res/33QOYSGq-TFsVFQPi-Jb1509269529025.png" alt="an image" /><img src="/~res/UT0w4jbufQlxw_BosMzY1509269535226.png" alt="an image" /><img src="/~res/JSyr04zM5wHzMMZzAWm61509269540091.png" alt="an image" /><img src="/~res/wtfXXStlzYd7-qA4hrOB1509269547099.png" alt="an image" /></p><p><img src="/~res/Ag79M8AsSl26bVYwYBUJ1509269582795.svg" alt="an image" /></p>