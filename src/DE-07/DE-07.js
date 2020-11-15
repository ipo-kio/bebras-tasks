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
               this.updateText();
        });

        this.textDiv = document.createElement("div");
        this.textDiv.style.marginLeft = "4px";
        document.getElementById(container).appendChild(this.textDiv);

        this.updateText();
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
        let result = this.ddlib.loadSolution(solution);
        this.updateText();
        return result;
    }

    getAnswer() { //-1 no answer, 0 wrong, 1 correct, 2 - server check
        return this.scores() === 32 ? 1 : 0;
    }

    scores() {
        let o = this.ddlib.getOutput();

        if (!o["h00"])
            return -1;

        let s = 0;
        let sc = (c1, c2) => {
            if (c1 === 'r' && c2 === 'y' || c1 === 'y' && c2 === 'r')
                return 3;
            if (c1 === 'o' && c2 === 'y' || c1 === 'y' && c2 === 'o')
                return 1;
            return 0;
        };

        let colors = {o: 0, y: 0, r: 0};

        for (let i = 0; i < 3; i++)
            for (let j = 0; j < 3; j++) {
                let c1 = o["h" + i + j];
                if (c1 === -1)
                    continue;
                c1 = c1[0];
                colors[c1]++;
                if (j < 2) {
                    let c2 = o["h" + i + (j + 1)];
                    if (c2 !== -1)
                        s += sc(c1, c2[0]);
                }
                if (i < 2) {
                    let c2 = o["h" + (i + 1) + j];
                    if (c2 !== -1)
                        s += sc(c1, c2[0]);
                }
            }

        if (colors['y'] === 0 || colors['r'] === 0 || colors['o'] === 0)
            return -1;

        return s;
    }

    updateText() {
        let s = this.scores();
        this.textDiv.style.color = s >= 0 ? "black" : "red";
        let text;
        if (s < 0)
            text = 'Использованы не все цвета';
        else
            text = 'Очков: ' + s;
        this.textDiv.innerText = text;
    }
}
