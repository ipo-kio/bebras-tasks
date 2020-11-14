import {SimpleStatesTask} from "../lib/SimpleStatesTask";

export class Task extends SimpleStatesTask{

    //container - is an id of element
    constructor(container, images) {
        super(container, WIDTH, HEIGHT, draw_bg, false);

        function draw_bg(ctx) {
            ctx.save();

            ctx.drawImage(bg_image, 0, 0);

            ctx.restore();
        }

        this.enabled = true;
        this.initCallback = null;

        this.loaded = false;

        let bg_image = new Image();
        this.bg = bg_image;
        this.bg.src = images.bg;
        this.bg.onload = () => this.bgLoaded();
    }

    bgLoaded() {
        if (this.initCallback)
            this.initCallback();

        this.loaded = true;
    }

    setInitCallback(_initCallback) {
        this.initCallback = _initCallback;

        //if we are initialized just after creation, any attempt to set up init callback is after we are initialized
        if (this.initCallback && this.loaded)
            this.initCallback();
    };

    createElements() {
        let el = [];
        //add stateful elements
        return el;
    }
}
