/*
new Place(0, 0, 90, 90, 's00', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 90, height: 90}}),
new Place(0, 0, 90, 90, 's11', 2, {imageId: 'bg', crop: {x: 90, y: 0, width: 90, height: 90}}),
new Place(0, 0, 90, 90, 's10', 2, {imageId: 'bg', crop: {x: 180, y: 0, width: 90, height: 90}}),
new Place(0, 0, 90, 90, 's01', 2, {imageId: 'bg', crop: {x: 270, y: 0, width: 90, height: 90}}),
 */

export class Task {

    //container - is an id of element
    constructor(container, pictures) {
        let WIDTH = 540;
        let HEIGHT = 240;

        let x0 = 10;
        let y0 = 10;
        let skip = 10;
        let t = 60;

        let places_gens = [
            j => new Place(t, 140, 90, 90, 's00_' + j, 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 90, height: 90}}),
            j => new Place(t + 92, 140, 90, 90, 's10_' + j, 2, {imageId: 'bg', crop: {x: 180, y: 0, width: 90, height: 90}}),
            j => new Place(t + 184, 140, 90, 90, 's01_' + j, 2, {imageId: 'bg', crop: {x: 270, y: 0, width: 90, height: 90}}),
            j => new Place(t + 276, 140, 90, 90, 's11_' + j, 2, {imageId: 'bg', crop: {x: 90, y: 0, width: 90, height: 90}})
        ];

        let places = [
            new Place(x0 / 2, y0 / 2, (90 + skip) * 5, 90 + y0, 'b', 1, {fill: '#cccccc'}),
            new Place(x0, y0, 90, 90, 't1', 1, {imageId: 'bg', crop: {x: 0, y: 0, width: 90, height: 90}}),
            new Place(x0 + 90 + skip, y0, 90, 90, 't2', 0, {stroke: 'red', strokeWidth: 2, dashArray: [4, 4]}),
            new Place(x0 + (90 + skip) * 2, y0, 90, 90, 't3', 0, {stroke: 'red', strokeWidth: 2, dashArray: [4, 4]}),
            new Place(x0 + (90 + skip) * 3, y0, 90, 90, 't4', 0, {stroke: 'red', strokeWidth: 2, dashArray: [4, 4]}),
            new Place(x0 + (90 + skip) * 4, y0, 90, 90, 't5', 1, {imageId: 'bg', crop: {x: 90, y: 0, width: 90, height: 90}}),
        ];

        for (let i = 0; i < 4; i++)
            for (let j = 0; j < 3; j++)
                places.push(places_gens[i](j))

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
        let res = [out['t2'], out['t3'], out['t4']];
        for (let r of res)
            if (r === -1)
                return 0;

        let seq = ['s00', 's11'];
        seq.splice(1, 0, ...res);

        for (let i = 0; i < seq.length - 1; i++) {
            let s1 = seq[i];
            let s2 = seq[i + 1];
            let ok = s1[1] === s2[1] && s1[2] !== s2[2] || s1[2] === s2[2] && s1[1] !== s2[1];
            if (!ok)
                return 0;
        }

        return 1;
    }
}