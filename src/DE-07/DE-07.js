export class Task {

    //container - is an id of element
    constructor(container, pictures) {
        let WIDTH = 600;
        let HEIGHT = 376;
        let x0 = 4;
        let y0 = 4;

        let places = [
            new Place(x0, y0, 334, 334, 'box', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 334, height: 334}}),
        ];

        let flowers = [
            {color: 'r', imageId: 'bg', crop: {x: 67, y: 334, width: 66, height: 60}},
            {color: 'y', imageId: 'bg', crop: {x: 133, y: 334, width: 66, height: 60}},
            {color: 'o', imageId: 'bg', crop: {x: 0, y: 334, width: 67, height: 60}}
        ]

        const X0 = 350;
        const Y0 = 10;
        let line = 0;
        for (let flower of flowers) {
            line++;
            for (let i = 0; i < 6; i++) {
                let x0 = X0 + (i % 3) * 70 + Math.floor(i / 3) * 35;
                let y0 = Y0 + (2 * (line - 1) + Math.floor(i / 3)) * 60;
                places.push(new Place(x0, y0, flower.crop.width, flower.crop.height, flower.color + i, 2, flower));
            }
        }
        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++) {
                let x = 67 + j * 100 - 20;
                let y = 67 + i * 100 - 20;
                places.push(new Place(x, y, 40, 40, "h" + i + j, 0, {strokeWidth: 0}))
            }

        this.ddlib = new App(container, WIDTH, HEIGHT, pictures, places, true);
        this.ddlib.setDragendCallback(() => {
               console.log(this.ddlib.getOutput());
        });

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
