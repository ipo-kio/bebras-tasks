var container_height = 300;
var container_width = 500;

var draggables = [];
var dragDestinations = [];
var ctx;
var mouseX = 0;
var mouseY = 0;

var dragged = null;
var selectedDest = null;

function Drawer(draw) {
    this.draw = draw;
}

Drawer.prototype.drawAt = function (x0, y0) {
    ctx.save();
    ctx.translate(x0, y0);
    this.draw();
    ctx.restore();
};

function Draggable(x0, y0, w, h, drawer) {
    this.x0 = x0;
    this.y0 = y0;
    this.w = w;
    this.h = h;
    this.drawer = drawer;

    this.dragging = false;
    this.dragDx = 0;
    this.dragDy = 0;

    this.dragX = 0;
    this.dragY = 0;

    this.mouseOver = false;
}

Draggable.prototype.test = function (x, y) {
    return x >= this.x0 && x <= this.x0 + this.w && y >= this.y0 && y <= this.y0 + this.h;
};

Draggable.prototype.mousedownHandler = function (e) {
    if (e.button != 0)
        return;
    if (!this.mouseOver)
        return;

    dragged = this;
    this.mouseOver = false;
    this.dragDx = mouseX - this.x0;
    this.dragDy = mouseY - this.y0;
    this.dragX = this.x0;
    this.dragY = this.y0;
};

Draggable.prototype.mouseupHandler = function (e) {
    if (!this.isDragging())
        return;
    dragged = null;

    if (selectedDest !== null) {
        selectedDest.source = this;
        selectedDest = null;
    }
};

Draggable.prototype.intersects = function (x0, y0, w, h) {
    var x1 = Math.max(x0, this.dragX);
    var x2 = Math.min(x0 + w, this.dragX + this.w);
    var y1 = Math.max(y0, this.dragY);
    var y2 = Math.min(y0 + h, this.dragY + this.h);

    return x1 <= x2 && y1 <= y2;
};

Draggable.prototype.isDragging = function () {
    return this == dragged;
};

Draggable.prototype.mousemoveHandler = function (e) {
    var leftButton = e.buttons % 2 != 0;
    if (dragged && !leftButton)
        dragged = null;

    if (!leftButton)
        this.mouseOver = this.test(mouseX, mouseY);

    if (!this.isDragging())
        return;

    this.dragX = mouseX - this.dragDx;
    this.dragY = mouseY - this.dragDy;

    //find nearest drag dest
    var intersected_dest = null;
    var min_dist = Infinity;
    for (var i = 0; i < dragDestinations.length; i++) {
        var dd = dragDestinations[i];
        if (this.intersects(dd.x0, dd.y0, this.w, this.h)) { //TODO now dest has the same size as a dragged object
            var distX = mouseX - (dd.x0 + this.w / 2);
            var distY = mouseX - (dd.y0 + this.h / 2);
            var dist = distX * distX + distY * distY;
            if (dist < min_dist) {
                min_dist = dist;
                intersected_dest = dd;
            }
        }
    }

    selectedDest = intersected_dest; //may become null
};

Draggable.prototype.draw = function () {
    ctx.save();

    //draw source
    this.drawer.drawAt(this.x0, this.y0);
    if (this.mouseOver) {
        ctx.strokeStyle = "#FFD900";
        ctx.lineWidth = 4;
        ctx.strokeRect(this.x0 + 0.5, this.y0 - 0.5, this.w, this.h);
    }

    ctx.restore();
};

Draggable.prototype.drawDraggable = function () {
    ctx.save();
    //draw dragged
    if (this.isDragging()) {
        this.drawer.drawAt(this.dragX, this.dragY);
        ctx.strokeStyle = "#FFD900";
        ctx.lineWidth = 4;
        ctx.strokeRect(this.dragX + 0.5, this.dragY - 0.5, this.w, this.h);
    }
    ctx.restore();
};

function DragDest(x0, y0, drawer) {
    this.x0 = x0;
    this.y0 = y0;
    this.drawer = drawer;
    this.source = null;
}

DragDest.prototype.isActive = function () {
    return selectedDest == this;
};

DragDest.prototype.draw = function () {
    ctx.save();
    this.drawer.drawAt(this.x0, this.y0);

    if (this.source != null)
        this.source.drawer.drawAt(this.x0, this.y0);
};

DragDest.prototype.drawHighlight = function () {
    if (this.isActive() && dragged != null) {
        ctx.strokeStyle = "#FFD900";
        ctx.lineWidth = 4;
        ctx.strokeRect(this.x0, this.y0, dragged.w, dragged.h);
    }
};

function TemplateProblem(container) {
    var program_len = 8; //TODO change here

    var $container = $('#' + container);
    var $canvas = $('<canvas>');
    $canvas.attr("height", container_height + "px");
    $canvas.attr("width", container_width + "px");
    $canvas.css('display', 'inline-block');
    $canvas.css('vertical-align', 'top');

    var $button = $('<button>Запустить</button>');
    $button.css('display', 'inline-block');
    $button.css('margin-left', '1em');
    $button.css('margin-top', '20px');
    $button.css('vertical-align', 'top');

    var $div = $('<div>');
    $div.append($canvas);
    $div.append($button);
    $container.append($div);

    var show_path = false;
    $button.click(function () {
        show_path = true;
        redraw_canvas();
    });

    var canvas = $canvas.get(0);
    ctx = canvas.getContext('2d');

    function drawArrow(w, h) {
        var th = Math.round(h / 4);
        var pad = Math.round(w / 5 + 0.5) - 0.5;

        ctx.save();

        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, w, h);

        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad, h / 2 - th / 2);
        ctx.lineTo(w / 2, h / 2 - th / 2);
        ctx.lineTo(w / 2, pad);
        ctx.lineTo(w - pad + 1, h / 2);
        ctx.lineTo(w / 2, h - pad);
        ctx.lineTo(w / 2, h / 2 + th / 2);
        ctx.lineTo(pad, h / 2 + th / 2);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "#DDDDDD";
        ctx.fill();
        ctx.strokeRect(0.5, 0.5, w, h);

        ctx.restore();
    }

    function arrowDrawer(w, h, angle) {
        return new Drawer(function () {
            ctx.save();
            ctx.translate(w / 2 + 0.5, h / 2 + 0.5);
            ctx.rotate(angle);
            ctx.translate(-w / 2 - 0.5, -h / 2 - 0.5);
            drawArrow(w, h);
            ctx.restore();
        });
    }

    var enabled = true;

    //create draggables
    var arrowW = 41;
    var arrowH = 41;
    var dragSkip = 10;
    var dragX0 = Math.round(container_width / 2 - (3 * dragSkip + 4 * arrowW) / 2);
    var dragY0 = 150;
    for (var i = 0; i < 4; i++) {
        var draggable = new Draggable(
            dragX0 + i * (arrowW + dragSkip),
            dragY0,
            arrowW,
            arrowH,
            arrowDrawer(arrowW, arrowH, i * Math.PI / 2)
        );
        draggable.direction = i;
        draggables.push(draggable);
    }
    //create draggable destinations
    var destX0 = Math.round(container_width / 2 - arrowW * program_len / 2);
    var destY0 = dragY0 + arrowH + 10;
    for (i = 0; i < program_len; i++) {
        var dest = new DragDest(destX0 + i * arrowW, destY0, new Drawer(function () {
            ctx.save();
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1;
            ctx.strokeRect(0.5, 0.5, arrowW, arrowH);
            ctx.restore();
        }));
        dragDestinations.push(dest);
    }

    //create field
    function createField1() {
        var m = 3;
        var n = 4 * 4;
        var field = [];
        for (var i = 0; i < m; i++) {
            field.push(new Array(n));
            for (var j = 0; j < n; j++)
                field[i][j] = 0;
        }
        var ones = [
            0, 1, 1, 1, 1, 3, 2, 3,
            0, 5, 1, 5, 1, 7, 2, 7,
            0, 9, 1, 9, 1, 11, 2, 11,
            0, 13, 1, 13, 1, 15, 2, 15
        ];
        for (i = 0; i < ones.length; i += 2)
            field[ones[i]][ones[i + 1]] = 1;
        return field;
    }

    function createField2() {
        var m = 4;
        var n = 5 * 4;
        var field = [];
        for (var i = 0; i < m; i++) {
            field.push(new Array(n));
            for (var j = 0; j < n; j++)
                field[i][j] = 0;
        }
        var ones = [0, 1, 0, 6, 0, 7, 1, 1, 1, 4, 1, 14, 2, 8, 2, 11, 2, 16, 2, 18, 3, 13, 3, 19];
        for (i = 0; i < ones.length; i += 2)
            field[ones[i]][ones[i + 1]] = 1;
        return field;
    }

    var field = createField1();

    var fieldM = field.length;
    var fieldN = field[0].length;

    var cellSize = 20;
    var fieldX0 = Math.round(container_width / 2 - cellSize * (fieldN + 2) / 2);
    var fieldY0 = 30;

    function draw_field() {
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";
        for (i = 0; i < fieldM + 2; i++)
            for (j = 0; j < fieldN + 2; j++)
                if (i == 0 || j == 0 || i == fieldM + 1 || j == fieldN + 1 || field[i - 1][j - 1] == 1) {
                    if (i == 1 && j == fieldN + 1)
                        continue;
                    ctx.fillStyle = '#888888';
                    ctx.fillRect(fieldX0 + j * cellSize, fieldY0 + i * cellSize, cellSize, cellSize);
                }
        for (var i = 0; i <= fieldM + 2; i++) {
            ctx.beginPath();
            ctx.moveTo(fieldX0, fieldY0 + i * cellSize + 0.5);
            ctx.lineTo(fieldX0 + (fieldN + 2) * cellSize, fieldY0 + i * cellSize + 0.5);
            ctx.stroke();
        }
        for (var j = 0; j <= fieldN + 2; j++) {
            ctx.beginPath();
            ctx.moveTo(fieldX0 + j * cellSize + 0.5, fieldY0);
            ctx.lineTo(fieldX0 + j * cellSize + 0.5, fieldY0 + (fieldM + 2) * cellSize);
            if ((j - 1) % (fieldN / 4) == 0) {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(fieldX0 + j * cellSize + 0.5, fieldY0 - 10);
                ctx.lineTo(fieldX0 + j * cellSize + 0.5, fieldY0 + (fieldM + 2) * cellSize + 10);
                ctx.stroke();
                ctx.restore();
            }
            ctx.stroke();
        }

        ctx.restore();
    }

    function Program() {
        var len = dragDestinations.length;
        this.prog = new Array(len);
        for (var i = 0; i < len; i++) {
            var source = dragDestinations[i].source;
            this.prog[i] = source == null ? -1 : source.direction;
        }
        var prevPos = [0, 0];
        this.pos = [prevPos];
        for (i = 0; i < len * 4; i++) {
            var step = i % len;
            var dir = this.prog[step];
            if (dir == -1)
                continue;
            if (dir == 0) //right
                prevPos = [prevPos[0], prevPos[1] + 1];
            else if (dir == 1) //down
                prevPos = [prevPos[0] + 1, prevPos[1]];
            else if (dir == 2) //left
                prevPos = [prevPos[0], prevPos[1] - 1];
            else //if (dir == 3) //up
                prevPos = [prevPos[0] - 1, prevPos[1]];
            this.pos.push(prevPos);

            var ppi = prevPos[0];
            var ppj = prevPos[1];
            if (ppi < 0 || ppi >= fieldM || ppj < 0 || ppj >= fieldN || field[ppi][ppj] == 1)
                break;
        }

        this.correct = prevPos[0] == 0 && prevPos[1] == fieldN;
    }

    Program.prototype.draw = function () {
        ctx.save();
        ctx.strokeStyle = this.correct ? "#008000" : "#FF0000";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0.5 + fieldX0 + cellSize * (this.pos[0][1] + 1.5), 0.5 + fieldY0 + cellSize * (this.pos[0][0] + 1.5));
        for (var i = 1; i < this.pos.length; i++)
            ctx.lineTo(0.5 + fieldX0 + cellSize * (this.pos[i][1] + 1.5), 0.5 + fieldY0 + cellSize * (this.pos[i][0] + 1.5));
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle = ctx.strokeStyle;
        ctx.arc(
            fieldX0 + cellSize * (this.pos[this.pos.length - 1][1] + 1.5) + 0.5,
            fieldY0 + cellSize * (this.pos[this.pos.length - 1][0] + 1.5) + 0.5,
            4,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
    };

    //
    function redraw_canvas() {
        ctx.clearRect(0, 0, container_width, container_height);

        //TODO draw a cycle with "4 times"

        if (show_path) {
            var prog = new Program();
            prog.draw();
        }

        draw_field();

        //draw 4x comment
        ctx.save();
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000000";
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        var outing = 20;
        ctx.moveTo(destX0 + program_len * arrowW + 1, destY0 + arrowH / 2);
        ctx.lineTo(destX0 + program_len * arrowW + outing, destY0 + arrowH / 2);
        ctx.lineTo(destX0 + program_len * arrowW + outing, destY0 + arrowH + outing);
        ctx.lineTo(destX0 - outing, destY0 + arrowH + outing);
        ctx.lineTo(destX0 - outing, destY0 + arrowH / 2);
        ctx.lineTo(destX0 - 1, destY0 + arrowH / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.lineTo(destX0 - 10, destY0 + arrowH / 2 - 5);
        ctx.lineTo(destX0 - 10, destY0 + arrowH / 2 + 5);
        ctx.lineTo(destX0, destY0 + arrowH / 2);
        ctx.fill();
        ctx.font = "18px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.lineWidth = 1;
        ctx.fillText("Повторить 4 раза", container_width / 2, destY0 + arrowH + outing + 4);
        ctx.restore();

        for (var i = 0; i < draggables.length; i++)
            draggables[i].draw();

        for (i = 0; i < dragDestinations.length; i++)
            dragDestinations[i].draw();
        for (i = 0; i < dragDestinations.length; i++)
            dragDestinations[i].drawHighlight();

        for (i = 0; i < draggables.length; i++)
            draggables[i].drawDraggable();

        //draw robot
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "#FFD900";
        ctx.strokeStyle = "#AAAAAA";
        ctx.lineWidth = 1;
        ctx.arc(0.5 + fieldX0 + cellSize * 1.5, 0.5 + fieldY0 + cellSize * 1.5, cellSize / 3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fill();
        ctx.restore();

        if (!enabled) {
            ctx.save();
            ctx.fillStyle = 'rgba(160, 160, 160, 0.3)';
            ctx.fillRect(0, 0, container_width, container_height);
            ctx.restore();
        }
    }

    redraw_canvas();

    $canvas.mousedown(function (e) {
        if (!enabled)
            return;

        show_path = false;

        for (var i = 0; i < draggables.length; i++)
            draggables[i].mousedownHandler(e);

        redraw_canvas();
    });
    $canvas.mouseup(function (e) {
        if (!enabled)
            return;

        for (var i = 0; i < draggables.length; i++)
            draggables[i].mouseupHandler(e);

        //mouse move again to find over
        for (i = 0; i < draggables.length; i++)
            draggables[i].mousemoveHandler(e);

        redraw_canvas();
    });
    $canvas.mousemove(function (e) {
        if (!enabled)
            return;

        var rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;

        for (var i = 0; i < draggables.length; i++)
            draggables[i].mousemoveHandler(e);

        redraw_canvas();
    });

    this.reset = function () {
        for (var i = 0; i < dragDestinations.length; i++)
            dragDestinations[i].source = null;
        redraw_canvas();
    };

    this.isEnabled = function () {
        return enabled;
    };

    this.setEnabled = function (state) {
        enabled = state;
        redraw_canvas();
    };

    this.reset();

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

export let Task = TemplateProblem;