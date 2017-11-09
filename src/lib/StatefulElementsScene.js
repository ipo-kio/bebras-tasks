import mouse_coordinates from "./MouseCoordinates"

export class StatefulElementsScene {
    constructor(canvas, elements) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ctx = canvas.getContext('2d');
        this.elements = elements;

        canvas.addEventListener('mousemove', this.mousemove.bind(this));
        canvas.addEventListener('click', this.click.bind(this));

        this.over_element = null;

        this.draw();
    }

    click(e) {
        let clicked_element = this.get_clicked_element(mouse_coordinates(this.canvas, e));
        clicked_element.next_state();

        this.draw();

        e.preventDefault();
    }

    mousemove(e) {
        let over_element = this.get_clicked_element(mouse_coordinates(this.canvas, e));

        if (over_element !== this.over_element) {
            this.over_element = over_element;
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
        if (this.over_element !== null) {
            this.over_element.begin_outline_path();
            this.ctx.strokeStyle = "rgba(255, 255, 0, 0.5)";
            this.ctx.lineWidth = 4;
            this.ctx.stroke();
        }
    }

    //intended to be overridden
    drawBg() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}