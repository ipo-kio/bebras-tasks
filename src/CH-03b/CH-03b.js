/*
new Place(0, 0, 80, 80, 'c4', 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 80, height: 80}}),
new Place(0, 0, 80, 80, 'c8', 2, {imageId: 'bg', crop: {x: 80, y: 0, width: 80, height: 80}}),
new Place(0, 0, 80, 80, 'c16', 2, {imageId: 'bg', crop: {x: 160, y: 0, width: 80, height: 80}}),
new Place(0, 0, 80, 80, 'c1', 2, {imageId: 'bg', crop: {x: 240, y: 0, width: 80, height: 80}}),
new Place(0, 0, 80, 80, 'c2', 2, {imageId: 'bg', crop: {x: 320, y: 0, width: 80, height: 80}}),
*/

export class Task {

    //container - is an id of element
    constructor(container, pictures) {
        let WIDTH = (80 + 6) * 5;
        let HEIGHT = 280;

        let coin_gens = [
            j => new Place(0, 0, 80, 80, 'c0_' + j, 2, {imageId: 'bg', crop: {x: 240, y: 0, width: 80, height: 80}}),
            j => new Place(84, 0, 80, 80, 'c1_' + j, 2, {imageId: 'bg', crop: {x: 320, y: 0, width: 80, height: 80}}),
            j => new Place(168, 0, 80, 80, 'c2_' + j, 2, {imageId: 'bg', crop: {x: 0, y: 0, width: 80, height: 80}}),
            j => new Place(252, 0, 80, 80, 'c3_' + j, 2, {imageId: 'bg', crop: {x: 80, y: 0, width: 80, height: 80}}),
            j => new Place(336, 0, 80, 80, 'c4_' + j, 2, {imageId: 'bg', crop: {x: 160, y: 0, width: 80, height: 80}})
        ];

        let places = [];

        for (let i = 0; i < 2; i++)
            for (let j = 0; j < 4; j++)
                places.push(new Place(j * (80 + 6) + 32, i * (80 + 6) + 110, 80, 80, 'x_' + i + '_' + j, 0, {
                    stroke: "red", strokeWidth: 2, dashArray: [4, 4]
                }));

        for (let i = 0; i < coin_gens.length; i++)
            for (let j = 0; j < 5; j++)
                places.push(coin_gens[i](j));

        this.ddlib = new App(container, WIDTH, HEIGHT, pictures, places, true);

        this.text_info = document.createElement('div');
        this.text_info.style.font = 'bold 1em sans-serif red';
        this.text_info.style.margin = '0 32px';
        this.text_info.innerText = '';

        document.getElementById(container).appendChild(this.text_info);

        this.ddlib.setDragendCallback(() => this.updateText());

        this.updateText();
    }

    updateText() {
        let amount = this.amount();
        let text = ' ' + amount + ' ';
        let a = amount % 10;
        let b = Math.floor(amount / 10) % 10;

        if (a === 1 && b !== 1)
            text = 'Набран' + text + 'боброцент';
        else if ((a === 2 || a === 3 || a === 4) && b !== 1)
            text = 'Набраны' + text + 'боброцента';
        else
            text = 'Набрано' + text + 'боброцентов';

        this.text_info.innerText = text;
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
        let loadResult = this.ddlib.loadSolution(solution);
        this.updateText();
        return loadResult;
    }

    getAnswer() { //-1 no answer, 0 wrong, 1 correct, 2 - server check
        if (this.ddlib.getSolution() === "")
            return -1;

        let sum = this.amount();

        return sum === 13;
    }

    amount() {
        let output = this.ddlib.getOutput();

        let sum = 0;
        for (let f in output)
            if (output.hasOwnProperty(f) && output[f] !== -1 && output[f].length >= 2) {
                let c = output[f];
                switch (c[1]) {
                    case '0':
                        sum += 1;
                        break;
                    case '1':
                        sum += 2;
                        break;
                    case '2':
                        sum += 4;
                        break;
                    case '3':
                        sum += 8;
                        break;
                    case '4':
                        sum += 16;
                        break;
                }
            }
        return sum;
    }
}