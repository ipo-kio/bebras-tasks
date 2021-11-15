export class Task {

    //container - is an id of element
    constructor(container, images) {
        this.enabled = true;
        this.initCallback = null;

        this.containerElement = document.getElementById(container);
        this.containerElement.innerHTML = `
        <div style='display:inline-block; vertical-align: middle; -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            font: 18px monospace'>
Розочка<br>
&nbsp;&nbsp;&nbsp;&nbsp;Повторить <input type="number" style="text-align: center; width:3em; font: 18px black monospace" placeholder="X"> раз<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ромб<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Повернуть вправо на <input type="number" style="text-align: center; width:3em; font: 18px black monospace" placeholder="Y"> градусов<br>
        </div><canvas width="200px" height="200px" style="display:inline-block; vertical-align: middle"></canvas>`;

        let inputs = this.containerElement.querySelectorAll('input');
        this.x_input = inputs[0];
        this.y_input = inputs[1];

        //draw star
        let canvas = this.containerElement.querySelector('canvas');
        let ctx = canvas.getContext('2d');
        ctx.strokeStyle = '#000088';
        ctx.lineWidth = 2;
        ctx.translate(canvas.width / 2, canvas.height / 2);

        ctx.beginPath();
        ctx.moveTo(0, 0);
        function rot(a) {
            ctx.rotate(a * Math.PI / 180);
        }
        function move(d) {
            ctx.translate(0, -d);
            ctx.lineTo(0, 0);
        }
        function rhombus() {
            for (let i = 0; i < 2; i++) {
                move(50);
                rot(60);
                move(50);
                rot(120);
            }
        }
        for (let i = 0; i < 15; i++) {
            rhombus();
            rot(24);
        }
        ctx.stroke();
    }

    reset() {
    };

    isEnabled() {
        return this.enabled;
    };

    setEnabled(state) {
        this.enabled = state;
        this.x_input.disabled = !state;
        this.y_input.disabled = !state;
        this.containerElement.style.backgroundColor = state ? 'inherit' : '#aaa';
    };

    setInitCallback(_initCallback) {
        this.initCallback = _initCallback;

        //if we are initialized just after creation, any attempt to set up init callback is after we are initialized
        if (this.initCallback)
            this.initCallback();
    };

    getSolution() {
        let vx = this.x_input.value;
        let vy = this.y_input.value;
        vx = vx.trim();
        vy = vy.trim();
        if (vx === '' && vy === '')
            return '';
        return vx + '|' + vy;
    }

    loadSolution(solution) {
        let vx = '';
        let vy = '';
        if (solution !== '' && solution.indexOf('|') >= 0) {
            let s = solution.split('|');
            vx = s[0];
            vy = s[1];
        }
        this.x_input.value = vx;
        this.y_input.value = vy;
    }

    getAnswer() { //-1 no answer, 0 wrong, 1 correct, 2 - server check
        return 2;
    }
}
