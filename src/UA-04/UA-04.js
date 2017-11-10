export class Task {

    /*
    Old images:
    <p><img src="/~res/yxR3-XzKi7pTQfTUCGaD1510040084434.svg" alt="an image" /><img src="/~res/4VTZCNd65oX-1PgkwfcG1510040091344.svg" alt="an image" /><img src="/~res/oo7KDZOBLzaui0lBqh6A1510040096969.svg" alt="an image" /><img src="/~res/tEFdz6KdQSfpYvZLymtf1510040104537.svg" alt="an image" /><img src="/~res/1NGM02bHy7OO2SvwNUih1510040116970.svg" alt="an image" /><img src="/~res/M7j9fObXoqzdIwKQgKo-1510040134173.svg" alt="an image" /></p>
     */

    //container - is an id of element
    constructor(container, pictures) {
        let WIDTH = 120 + 7 * 72 + 2;
        let HEIGHT = 500;

        let coins_pull_height = 200;

        let cnt1 = 0;
        let mulx = 0.4;
        let muly = 0.12;

        function mvx(x) {
            return Math.round(x * mulx) - 20;
        }

        function mvy(y) {
            return Math.round(y * muly) - 20;
        }

        function coin1(x, y) {
            return new Place(mvx(x), mvy(y), 70, 70, 'c1' + (cnt1++), 2, {
                imageId: 'bg',
                crop: {x: 440, y: 0, width: 70, height: 70}
            });
        }

        let cnt2 = 0;

        function coin2(x, y) {
            return new Place(mvx(x), mvy(y), 70, 70, 'c2' + (cnt2++), 2, {
                imageId: 'bg',
                crop: {x: 370, y: 0, width: 70, height: 70}
            });
        }

        let cnt3 = 0;

        function coin3(x, y) {
            return new Place(mvx(x), mvy(y), 70, 70, 'c3' + (cnt3++), 2, {
                imageId: 'bg',
                crop: {x: 300, y: 0, width: 70, height: 70}
            });
        }

        let places = [
            new Place(0, coins_pull_height, 100, 100, 'pirate3', 1, {
                imageId: 'bg',
                crop: {x: 0, y: 0, width: 100, height: 100}
            }),
            new Place(0, coins_pull_height + 100, 100, 100, 'pirate2', 1, {
                imageId: 'bg',
                crop: {x: 100, y: 0, width: 100, height: 100}
            }),
            new Place(0, coins_pull_height + 200, 100, 100, 'pirate1', 1, {
                imageId: 'bg',
                crop: {x: 200, y: 0, width: 100, height: 100}
            }),

            coin1(882, 384),
            coin1(456, 576),
            coin1(180, 696),
            coin1(966, 942),
            coin1(756, 1038),
            coin1(366, 1068),
            coin1(186, 1224),

            coin2(870, 1206),
            coin2(264, 942),
            coin2(474, 834),
            coin2(1050, 612),
            coin2(1200, 402),
            coin2(228, 438),
            coin2(762, 204),

            coin3(582, 1206),
            coin3(1188, 1170),
            coin3(1194, 852),
            coin3(732, 738),
            coin3(576, 414),
            coin3(192, 216),
            coin3(1092, 222)
        ];

        for (let pirate = 0; pirate < 3; pirate++)
            for (let col = 0; col < 7; col++)
                places.push(new Place(120 + 72 * col, 15 + coins_pull_height + 100 * pirate, 72, 72, 'p' + pirate + col,
                    0, {stroke: '#000000', strokeWidth: 2}));

        this.ddlib = new App(container, WIDTH, HEIGHT, pictures, places, true);

        // setTimeout(() => this.loadSolution('{"24":20,"25":19,"26":23,"27":12,"28":6,"29":3,"30":4,"31":18,"32":21,"33":10,"34":11,"35":13,"36":8,"37":9,"38":17,"39":22,"40":14,"41":15,"42":7,"43":16,"44":5}'), 1000);
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
            solution = '';
        return this.ddlib.loadSolution(solution);
    }

    getAnswer() { //-1 no answer, 0 wrong, 1 correct, 2 - server check
        let o = this.ddlib.getOutput();

        for (let pirate = 0; pirate < 3; pirate++) {
            let sum = 0;
            for (let col = 0; col < 7; col++) {
                let id = 'p' + pirate + col;
                let c = o[id];
                if (c === -1)
                    return 0;
                sum += +c[1];
            }

            if (sum !== 14)
                return 0;
        }

        return 1;
    }
}