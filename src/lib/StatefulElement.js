export class StatefulElement {

    constructor(ctx, states_count, states_transitions) {
        this.ctx = ctx;

        this.states_transitions = states_transitions;

        this.state = 0;
    }

    draw() {
    }

    begin_outline_path() {
    }

    hit_test({x, y}) {
    }

    next_state() {
        console.log(this.state, ' -> ', this.states_transitions[this.state]);
        this.state = this.states_transitions[this.state];
    }
}