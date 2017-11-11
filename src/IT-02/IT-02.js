let line = l => {
    let ll = +l;
    if (ll >= 1 && ll <= 7)
        return ll - 1;
    return -1;
};

let column = c => {
    switch (c) {
        case 'А':
            return 0;
        case 'Б':
            return 1;
        case 'В':
            return 2;
        case 'Г':
            return 3;
        case 'A':
            return 0;
        case 'B':
            return 2;
    }
    return -1;
};

function revert(house) {
    for (let i = 0; i < 7; i++)
        for (let j = 0; j < 4; j++)
            house[i][j] = -house[i][j];
}

function set_column(house, c, val) {
    for (let i = 0; i < 7; i++)
        house[i][c] = val;
}

function set_line(house, l, val) {
    for (let j = 0; j < 4; j++)
        house[l][j] = val;
}

let parser = (text, need_actions = false) => {
    text = text.replace(/[\s,;]+/g, '');
    let actions = [];
    let l = text.length;
    for (let i = 0; i < l; i++) {
        let c = text[i];

        if (c === '+' || c === '-') {
            if (i + 1 >= l)
                return ['Нет символа после ' + c, null];
            let d = text[++i].toUpperCase();
            let lin = line(d);
            let col = column(d);
            if (lin === -1 && col === -1)
                return ['Неожиданный символ ' + d, null];
            if (need_actions)
                actions.push([c, lin, col]);
        } else if (c === '*') {
            if (need_actions)
                actions.push(['*', null, null]);
        } else
            return ['Неожиданный символ ' + c, null];
    }

    if (need_actions)
        return [false, actions];
    else
        return [false, null];
};

export class Task extends InputFieldDynProblem {

    //container - is an id of element
    constructor(container, pictures) {
        super(container, 32, text => parser(text)[0]);

        this.getAnswer = () => {
            let s = this.getSolution();
            let [error, actions] = parser(s, true);
            if (error)
                return 0;

            let house = [
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ];

            for (let [a, l, c] of actions) {
                if (a === '*')
                    revert(house);
                else if (l >= 0)
                    set_line(house, l, a === '+' ? 1 : -1);
                else
                    set_column(house, c, a === '+' ? 1 : -1);
            }

            let correct_house = [
                [-1, 2, 2, -1],
                [-1, -1, -1, -1],
                [1, -1, -1, 1],
                [1, 1, 1, 1],
                [1, -1, -1, 1],
                [1, 1, 1, 1],
                [-1, -1, -1, -1]
            ];

            for (let i = 0; i < 7; i++)
                for (let j = 0; j < 4; j++)
                    if (correct_house[i][j] !== 2 && correct_house[i][j] !== house[i][j])
                        return 0;

            return 1;
        };
    }

}

//<div style="display: inline-block; background-color: yellow; color: yellow; border: 1px solid black">m</div>
//<div style="display: inline-block; background-color: #48229b; color: #48229b; border: 1px solid black">m</div>