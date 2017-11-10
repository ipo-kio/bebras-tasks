export class Task {

    //answer: {"0":15,"1":12,"2":9,"3":11,"4":14,"5":13,"6":10}

    //container - is an id of element
    constructor(container, pictures) {
        let WIDTH = 500;
        let HEIGHT = 311;

        let places = [];
        for (let i = 0; i < 2; i++)
            for (let j = 0; j < 4; j++) {
                let x = j * 100;
                let y = 110 + i * 100;

                let bottom_right = i === 1 && j === 3;

                places.push(new Place(x, y, 100, 100, 'p' + i + j, bottom_right ? 1 : 0, {
                    stroke: '#AAAAAA',
                    strokeWidth: 2
                }));
                if (bottom_right)
                    places.push(
                        new Place(x, y, 100, 100, 'q3', 1, {imageId: 'bg', crop: {x: 200, y: 0, width: 100, height: 100}})
                    );
            }

        places.push(
            new Place(0, 0, 100, 100, 'q1', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 100, height: 100}}),
            new Place(100, 0, 100, 100, 'q2', 2, {imageId: 'bg', crop: {x: 100, y: 0, width: 100, height: 100}}),
            new Place(200, 0, 100, 100, 'q4', 2, {imageId: 'bg', crop: {x: 300, y: 0, width: 100, height: 100}}),
            new Place(300, 0, 100, 100, 'q5', 2, {imageId: 'bg', crop: {x: 400, y: 0, width: 100, height: 100}}),
            new Place(400, 0, 100, 100, 'q6', 2, {imageId: 'bg', crop: {x: 500, y: 0, width: 100, height: 100}}),
            new Place(400, 100, 100, 100, 'q7', 2, {imageId: 'bg', crop: {x: 600, y: 0, width: 100, height: 100}}),
            new Place(400, 200, 100, 100, 'q8', 2, {imageId: 'bg', crop: {x: 700, y: 0, width: 100, height: 100}})
        );

        this.ddlib = new App(container, WIDTH, HEIGHT, pictures, places, true);

        console.log(places);
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