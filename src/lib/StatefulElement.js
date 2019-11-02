export class StatefulElement {

    constructor(ctx, states_count, states_transitions, start_state = 0) {
        this.ctx = ctx;

        this.states_transitions = states_transitions;

        this.state = start_state;
        this.start_state = start_state;

        this.force_highlighting = false; // true = highlight even if one state
    }

    draw() {
    }

    begin_outline_path() {
    }

    hit_test({x, y}) {
    }

    next_state() {
        this.state = this.states_transitions[this.state];
    }

    states_count() {
        return this.states_transitions.length;
    }
}