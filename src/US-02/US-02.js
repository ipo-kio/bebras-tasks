import {SimpleStatesTask} from "../lib/SimpleStatesTask";
import {Statement} from "./Statement";

export class Task extends SimpleStatesTask {

    //container - is an id of element
    constructor(container, images) {
        super(container, 670, 160);
        this.enabled = true;
        this.initCallback = null;
    }

    reset() {
    };

    isEnabled() {
        return this.enabled;
    };

    setEnabled(state) {
        this.enabled = state;

        //redraw
    };

    setInitCallback(_initCallback) {
        this.initCallback = _initCallback;

        //if we are initialized just after creation, any attempt to set up init callback is after we are initialized
        if (this.initCallback)
            this.initCallback();
    };

    createElements() {
        let x = 12;
        let y = 24;
        let ctx = this.ctx;

        function st(index, text) {
            let statement = new Statement(ctx, x, y, index, text);
            y += 28;
            return statement;
        }

        return [
            st('А', "В этом списке ровно одно утверждение неверно"),
            st('Б', "В этом списке ровно два утверждения неверны"),
            st('В', "В этом списке ровно три утверждения неверны"),
            st('Г', "В этом списке ровно четыре утверждения неверны"),
            st('Д', "В этом списке ровно пять утверждений неверны")
        ];
    }
}