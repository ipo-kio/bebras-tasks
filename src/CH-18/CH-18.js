// /~res/cav_qxP8X8p1Al8b8fKS1602604310156.svg

export class Task {

    //container - is an id of element
    constructor(container, pictures) {
        let R = 425 / 2;
        let r = 160;
        let d = 100;
        var dv = 8;
        let x0 = R + d;
        let y0 = R + dv;
        let vs = 105;

        let WIDTH = 2 * R + 2 * d;
        let HEIGHT = 425 + 2 * dv;

        let places = [
            new Place(100, dv, 425, 425, 'clock', 1, {imageId: 'bg', crop: {x: 0, y: 0, width: 425, height: 425}}),
            new Place(x0 + R, 0 * vs, 89, 102, '000', 2, {
                imageId: 'bg',
                crop: {x: 89, y: 425, width: 89, height: 102}
            }),
            new Place(x0 + R, 1 * vs, 88, 102, '100', 2, {
                imageId: 'bg',
                crop: {x: 267, y: 425, width: 88, height: 102}
            }),
            new Place(x0 + R, 2 * vs, 89, 103, '110', 2, {imageId: 'bg', crop: {x: 0, y: 425, width: 89, height: 103}}),
            new Place(x0 + R, 3 * vs, 89, 102, '010', 2, {
                imageId: 'bg',
                crop: {x: 178, y: 425, width: 89, height: 102}
            }),
            new Place(0, 3 * vs, 86, 102, '011', 2, {imageId: 'bg', crop: {x: 355, y: 425, width: 86, height: 102}}),
            new Place(0, 2 * vs, 86, 102, '001', 2, {imageId: 'bg', crop: {x: 527, y: 425, width: 86, height: 102}}),
            new Place(0, 1 * vs, 86, 102, '101', 2, {imageId: 'bg', crop: {x: 613, y: 425, width: 86, height: 102}}),
            new Place(0, 0 * vs, 86, 103, '111', 2, {imageId: 'bg', crop: {x: 441, y: 425, width: 86, height: 103}})
        ];

        for (var i = 0; i < 8; i++) {
            var a = Math.PI / 4 * (i + 0.5);
            var x = Math.round(x0 + r * Math.sin(a)) - 88 / 2;
            var y = Math.round(y0 - r * Math.cos(a)) - 102 / 2;
            var vObject = {}; //{stroke: "green", strokeWidth: 2, dashArray: [4, 4]};
            var p = new Place(x, y, 89, 103, 'p' + i, 0, vObject);
            places.push(p);
        }

        let ddlib = new App(container, WIDTH, HEIGHT, pictures, places, true, true);
        this.ddlib = ddlib;

        ddlib.setDragendCallback(this.updateOverlayInfo.bind(this));
        ddlib.setInitCallback(this.updateOverlayInfo.bind(this));

        //add circles to overlay layer
        var circles = [];
        this.circles = circles;
        var overlay = ddlib.getOverlayLayer();
        this.overlay = overlay;
        for (i = 0; i < 8; i++) {
            var alpha = Math.PI / 4 * (i + 1);
            var xx = x0 + R * Math.sin(alpha);
            var yy = y0 - R * Math.cos(alpha);

            var circle = new Kinetic.Circle({
                radius: 6,
                fill: 'red',
                stroke: 'black',
                strokeWidth: 2
            });
            circle.setX(xx);
            circle.setY(yy);
            circles.push(circle);
            overlay.add(circle);
        }
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
        if (!solution)
            solution = '{"9":1,"10":2,"11":3,"12":4,"13":5,"14":6,"15":7,"16":8}';

        var result = this.ddlib.loadSolution(solution);

        this.updateOverlayInfo();

        return result;
    }

    getAnswer() { //-1 no answer, 0 wrong, 1 correct, 2 - server check
        return this.testCorrectness() ? 1 : 0;
    }

    updateOverlayInfo() {
        var output = this.ddlib.getOutput();
        for (var i = 0; i < 8; i++) {
            var ind1 = 'p' + i;
            var ind2 = 'p' + ((i + 1) % 8);
            var v1 = output[ind1];
            var v2 = output[ind2];

            if (v1 !== -1 && v2 !== -1) {
                var diff = 0;
                for (var s = 0; s < 3; s++)
                    if (v1[s] !== v2[s])
                        diff++;
                var isOk = diff === 1;

                this.circles[i].setFill(isOk ? "green" : "red");

                this.circles[i].setVisible(true);
            } else
                this.circles[i].setVisible(false);

            this.overlay.draw();
        }
    }

    testCorrectness() {
        var output = this.ddlib.getOutput();
        for (var i = 0; i < 8; i++) {
            var ind1 = 'p' + i;
            var ind2 = 'p' + ((i + 1) % 8);
            var v1 = output[ind1];
            var v2 = output[ind2];

            if (v1 !== -1 && v2 !== -1) {
                var diff = 0;
                for (var s = 0; s < 3; s++)
                    if (v1[s] !== v2[s])
                        diff++;
                if (diff !== 1)
                    return false;
            } else
                return false;
        }

        return true;
    }
}
