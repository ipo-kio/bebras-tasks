import mouse_coordinates from "./MouseCoordinates"

export class StatefulElementsScene {

    outlineWidth = 4;

    constructor(canvas, elements) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx = canvas.getContext('2d');
        this.elements = elements;

        this.enabled = true;

        canvas.addEventListener('mousemove', this.mousemove.bind(this));
        canvas.addEventListener('mouseleave', this.mouseout.bind(this));
        canvas.addEventListener('click', this.click.bind(this));

        this.over_element = null;

        this.draw();
    }

    click(e) {
        if (!this.enabled)
            return;

        let clicked_element = this.get_clicked_element(mouse_coordinates(this.canvas, e));
        if (!clicked_element)
            return;
        clicked_element.next_state();

        if (clicked_element.clickHandler)
            clicked_element.clickHandler();

        this.draw();

        e.preventDefault();
    }

    //Intended to be used when radio-button behaviour is needed
    reset_all_except_one(element) {
        for (let e of this.elements)
            if (e !== element)
                e.state = e.start_state;
    }

    mousemove(e) {
        if (!this.enabled)
            return;

        let over_element = this.get_clicked_element(mouse_coordinates(this.canvas, e));

        if (over_element !== this.over_element) {
            this.over_element = over_element;
            this.draw();
        }

        e.preventDefault();
    }

    mouseout(e) {
        if (!this.enabled)
            return;

        if (this.over_element !== null) {
            this.over_element = null;
            this.draw();
        }
    }

    get_clicked_element(p) {
        for (let e of this.elements)
            if (e.hit_test(p))
                return e;
        return null;
    }

    draw() {
        this.drawBg();
        for (let e of this.elements)
            e.draw();
        if (this.over_element !== null && (this.over_element.force_highlighting || this.over_element.states_count() > 1)) {
            this.over_element.begin_outline_path();
            this.ctx.strokeStyle = "rgba(240, 240, 0, 0.9)";
            this.ctx.lineWidth = this.outlineWidth;
            this.ctx.stroke();
        }

        if (!this.enabled) {
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
            this.ctx.fillRect(0, 0, this.width, this.height);
        }
        this.drawFg();
    }

    //intended to be overridden
    drawBg() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    //intended to be overridden
    drawFg() {
    }

    getStates() {
        let states = new Array(this.elements.length);
        for (let i = 0; i < states.length; i++)
            states[i] = this.elements[i].state;
        return states;
    }

    getSolution() {
        let solution = '';
        let all_zero = true;
        for (let i = 0; i < this.elements.length; i++) {
            let s = this.elements[i].state;
            solution += s;
            if (s !== 0)
                all_zero = false;
        }
        return all_zero ? '' : solution;
    }

    loadSolution(solution) {
        if (!solution || solution.length !== this.elements.length) {
            for (let i = 0; i < this.elements.length; i++)
                this.elements[i].state = 0;
        } else {
            for (let i = 0; i < solution.length; i++)
                this.elements[i].state = +solution.substr(i, 1);
        }
        this.draw();
    }

    reset() {
        for (let e of this.elements)
            e.state = 0;
        this.draw();
    }

    isEnabled() {
        return this.enabled;
    }

    setEnabled(enabled) {
        this.enabled = enabled;
        this.draw();
    }
}