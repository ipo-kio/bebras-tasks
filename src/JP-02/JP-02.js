export class Task {

    //answer: {"0":15,"1":12,"2":9,"3":11,"4":14,"5":13,"6":10}

    //container - is an id of element
    constructor(container, pictures) {
        var WIDTH = 500;
        var HEIGHT = 311;

        var places = [];
        for (var i = 0; i < 2; i++)
            for (var j = 0; j < 4; j++) {
                var x = j * 100;
                var y = 110 + i * 100;

                var bottom_right = i === 1 && j === 3;

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

/*
old images

<table style="border: 1px solid black; border-collapse: collapse;" width="60%"><tbody>
<tr>
<td style="border: 1px solid black"><img src="/~res/4RuDCgRauIk-YB0GeJ8n1509210785862.svg" alt="an image" width="100%" /></td>
<td style="border: 1px solid black"><img src="/~res/P8aIq29odd0GXVdmdkh-1509210816918.svg" alt="an image" width="100%" /></td>
<td style="border: 1px solid black"><img src="/~res/iLPYx6Zgfvhue84-BfFv1509211119530.svg" alt="an image" width="100%/" /></td>
<td style="border: 1px solid black"><img src="/~res/7DoIEvF_yjQAwFMol4cP1509210866621.svg" alt="an image" width="100%" /></td>
<td style="border: 1px solid black"><img src="/~res/rb7n_ZUJtVj5_Bao4ZvC1509210881691.svg" alt="an image" width="100%" /></td>
<td style="border: 1px solid black"><img src="/~res/8WfSr46lx8UgjWwFJCFx1509210924330.svg" alt="an image" width="100%" /></td>
<td style="border: 1px solid black"><img src="/~res/QoMn7liMUKeyW9QklRwS1509210949003.svg" alt="an image" width="100%" /></td>
</tr>
</tbody></table>

<table style="border: 1px solid black; border-collapse: collapse;"><tbody>
<tr><td style="border: 1px solid black; width: 25%"><img src="/~res/D6DoaC8Lm4G3dXCvVBJv1509211371322.svg" alt="an image" width="100%" /></td>
<td style="border: 1px solid black; width: 25%"></td>
<td style="border: 1px solid black; width: 25%"></td>
<td style="border: 1px solid black; width: 25%"></td>
</tr>
<tr>
<td style="border: 1px solid black; width: 25%"></td>
<td style="border: 1px solid black; width: 25%"></td>
<td style="border: 1px solid black; width: 25%"></td>
<td style="border: 1px solid black; width: 25%"><img src="/~res/mHAm1xuA2O8HD2O32vXG1509210854972.svg" alt="an image" width="100%" /></td>
</tr>
</tbody></table>

 */
