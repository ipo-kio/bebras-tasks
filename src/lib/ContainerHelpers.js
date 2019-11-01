export function appendCanvas(container, width, height) {
    let canvas = document.createElement('canvas');

    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);

    document.getElementById(container).appendChild(canvas);

    return canvas;
}