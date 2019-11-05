/*
new Place(0, 0, 81, 88, 'chicken', 2, {imageId: 'bg', crop: {x: 369, y: 0, width: 81, height: 88}}),
new Place(0, 0, 108, 72, 'lisard', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 108, height: 72}}),
new Place(0, 0, 90, 94, 'wolf', 2, {imageId: 'bg', crop: {x: 108, y: 0, width: 90, height: 94}}),
new Place(0, 0, 66, 90, 'snake', 2, {imageId: 'bg', crop: {x: 450, y: 0, width: 66, height: 90}}),
new Place(0, 0, 89, 88, 'fox', 2, {imageId: 'bg', crop: {x: 198, y: 0, width: 89, height: 88}}),
new Place(0, 0, 82, 71, 'sheep', 2, {imageId: 'bg', crop: {x: 287, y: 0, width: 82, height: 71}}), */

export class Task {

    //container - is an id of element
    constructor(container, pictures) {
        let W = 300;
        let H = 300;
        let dw = 80;
        let dh = 70;
        let x0 = 20;
        let y0 = 20;

        let WIDTH = 540;
        let HEIGHT = H + 2 * y0;

        let places = [
            new Place(x0, y0, W / 3, H, 't11', 1, {stroke: "black", fill: "#ffccaa"}),
            new Place(x0 + W / 3, y0, W / 3, H / 2, 't21', 1, {stroke: "black", fill: "#ffd42a"}),
            new Place(x0 + W / 3, y0 + H / 2, W / 3, H / 2, 't22', 1, {stroke: "black", fill: "#808000"}),
            new Place(x0 + 2 * W / 3, y0, W / 3, H / 3, 't31', 1, {stroke: "black", fill: "#00ffff"}),
            new Place(x0 + 2 * W / 3, y0 + H / 3, W / 3, H / 3, 't32', 1, {stroke: "black", fill: "#ac9393"}),
            new Place(x0 + 2 * W / 3, y0 + 2 * H / 3, W / 3, H / 3, 't33', 1, {stroke: "black", fill: "#c83737"}),

            new Place(x0 + W / 6 - dw / 2, y0 + H / 2 - dh / 2, dw, dh, 'p11', 0, {}),
            new Place(x0 + W / 2 - dw / 2, y0 + H / 4 - dh / 2, dw, dh, 'p21', 0, {}),
            new Place(x0 + W / 2 - dw / 2, y0 + 3 * H / 4 - dh / 2, dw, dh, 'p22', 0, {}),
            new Place(x0 + 5 * W / 6 - dw / 2, y0 + H / 6 - dh / 2, dw, dh, 'p31', 0, {}),
            new Place(x0 + 5 * W / 6 - dw / 2, y0 + H / 2 - dh / 2, dw, dh, 'p32', 0, {}),
            new Place(x0 + 5 * W / 6 - dw / 2, y0 + 5 * H / 6 - dh / 2, dw, dh, 'p33', 0, {}),

            new Place(x0 + W + 30, 30 + y0, 64, 70, 'chicken', 2, {imageId: 'bg', crop: {x: 294, y: 0, width: 64, height: 70}}),
            new Place(x0 + W + 30, 110 + y0, 72, 75, 'wolf', 2, {imageId: 'bg', crop: {x: 86, y: 0, width: 72, height: 75}}),
            new Place(x0 + W + 30, 205 + y0, 53, 72, 'snake', 2, {imageId: 'bg', crop: {x: 358, y: 0, width: 53, height: 72}}),
            new Place(x0 + W + 130, 30 + y0, 86, 57, 'lizard', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 86, height: 57}}),
            new Place(x0 + W + 130, 110 + y0, 71, 70, 'fox', 2, {imageId: 'bg', crop: {x: 158, y: 0, width: 71, height: 70}}),
            new Place(x0 + W + 130, 210 + y0, 65, 57, 'sheep', 2, {imageId: 'bg', crop: {x: 229, y: 0, width: 65, height: 57}})

            // new Place(x0 + W + 10, 0, 81, 88, 'chicken', 2, {imageId: 'bg', crop: {x: 369, y: 0, width: 81, height: 88}}),
            // new Place(x0 + W + 10, 110, 108, 72, 'lizard', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 108, height: 72}}),
            // new Place(x0 + W + 10, 220, 90, 94, 'wolf', 2, {imageId: 'bg', crop: {x: 108, y: 0, width: 90, height: 94}}),
            // new Place(x0 + W + 10, 330, 66, 90, 'snake', 2, {imageId: 'bg', crop: {x: 450, y: 0, width: 66, height: 90}}),
            // new Place(x0 + W + 10, 440, 89, 88, 'fox', 2, {imageId: 'bg', crop: {x: 198, y: 0, width: 89, height: 88}}),
            // new Place(x0 + W + 10, 550, 82, 71, 'sheep', 2, {imageId: 'bg', crop: {x: 287, y: 0, width: 82, height: 71}})
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

    static eaters = [
        ["lizard", "snake"],
        ["chicken", "snake"],
        ["fox", "chicken"],
        ["wolf", "chicken"],
        ["wolf", "sheep"]
    ];

    static eats(a, b) {
        if (a === -1 || b === -1)
            return true;
        for (let e of Task.eaters)
            if (e[0] === a && e[1] === b || e[0] === b && e[1] === a)
                return true;

        return false;
    }

    getAnswer() { //-1 no answer, 0 wrong, 1 correct, 2 - server check
        let out = this.ddlib.getOutput();

        let eats =
            Task.eats(out['p11'], out['p21']) ||
            Task.eats(out['p11'], out['p22']) ||
            Task.eats(out['p21'], out['p22']) ||

            Task.eats(out['p21'], out['p31']) ||
            Task.eats(out['p21'], out['p32']) ||
            Task.eats(out['p22'], out['p32']) ||
            Task.eats(out['p22'], out['p33']) ||

            Task.eats(out['p31'], out['p32']) ||
            Task.eats(out['p22'], out['p33']);

        return eats ? 0 : 1;
    }
}