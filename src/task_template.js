export class Task {
    reset() {
    };

    isEnabled() {
        return enabled;
    };

    this.setEnabled = function (state) {
        enabled = state;
        redraw_canvas();
    };

    var initCallback;

    this.setInitCallback = function (_initCallback) {
        initCallback = _initCallback;

        //we are initialized just after creation, so any attempt to set up init callback is after we are initialized
        if (initCallback)
            initCallback();
    };

    this.getSolution = function () {
        var res = '';
        var hasElements = false;
        for (var i = 0; i < dragDestinations.length; i++) {
            var s = dragDestinations[i].source;
            if (s == null)
                res += '-';
            else {
                hasElements = true;
                res += s.direction;
            }
        }

        if (!hasElements)
            res = '';

        return res;
    };

    this.loadSolution = function (solution) {
        this.reset();

        if (solution == "")
            return;

        if (solution.length != dragDestinations.length)
            return;

        for (var i = 0; i < solution.length; i++) {
            var n = +solution[i];
            if (isNaN(n) || n < 0 || n >= 4)
                dragDestinations[i].source = null;
            else
                dragDestinations[i].source = draggables[n];
        }

        redraw_canvas();
    };

    this.getAnswer = function () {
        return 2;
    };
}