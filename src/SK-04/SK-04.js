/*
new Place(0, 0, 93, 39, 'a1', 2, {imageId: 'bg', crop: {x: 533, y: 0, width: 93, height: 39}}),
new Place(0, 0, 93, 39, 'a2', 2, {imageId: 'bg', crop: {x: 626, y: 0, width: 93, height: 39}}),
new Place(0, 0, 93, 39, 'a3', 2, {imageId: 'bg', crop: {x: 719, y: 0, width: 93, height: 39}}),
new Place(0, 0, 93, 39, 'a4', 2, {imageId: 'bg', crop: {x: 812, y: 0, width: 93, height: 39}}),
new Place(0, 0, 533, 134, 'ans', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 533, height: 134}}),

{"5":2,"6":1,"7":3,"8":-1}

<p><img src="/~res/T8NZgilTPA3d0F8fjNmT1570988636161.svg" alt="an image" /><img src="/~res/K0pjWhGGusv_Td0tMd361570988646120.svg" alt="an image" /><img src="/~res/9SdIyDAyKvqH4uwIaV3Y1570988653679.svg" alt="an image" /><img src="/~res/Kud16W96_JYyFfRkVW3v1570988661540.svg" alt="an image" /></p>
 */
export class Task {

    //container - is an id of element
    constructor(container, pictures) {
        let WIDTH = 650;
        let HEIGHT = 190;

        let dx = 532 / 4;

        let places = [
            new Place(0, 0, 533, 134, 'ans', 1, {imageId: 'bg', crop: {x: 0, y: 0, width: 533, height: 134}}),

            new Place(554, 10, 93, 39, 'a1', 2, {imageId: 'bg', crop: {x: 533, y: 0, width: 93, height: 39}}),
            new Place(554, 55, 93, 39, 'a2', 2, {imageId: 'bg', crop: {x: 626, y: 0, width: 93, height: 39}}),
            new Place(554, 100, 93, 39, 'a3', 2, {imageId: 'bg', crop: {x: 719, y: 0, width: 93, height: 39}}),
            new Place(554, 145, 93, 39, 'a4', 2, {imageId: 'bg', crop: {x: 812, y: 0, width: 93, height: 39}}),

            new Place(12, 150, 93, 39, 'x1', 0, {strokeWidth: 2, stroke: "#FF0000", dashArray: [4, 4]}),
            new Place(dx + 20, 150, 93, 39, 'x1', 0, {strokeWidth: 2, stroke: "#FF0000", dashArray: [4, 4]}),
            new Place(2 * dx + 2, 150, 93, 39, 'x1', 0, {strokeWidth: 2, stroke: "#FF0000", dashArray: [4, 4]}),
            new Place(3 * dx + 12, 150, 93, 39, 'x1', 0, {strokeWidth: 2, stroke: "#FF0000", dashArray: [4, 4]})
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