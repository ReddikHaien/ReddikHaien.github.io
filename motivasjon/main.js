import { Canvas } from "./render/canvas.js";

const canvas = new Canvas(document.getElementsByTagName("canvas")[0]);


function run(){

    canvas.clear();
    canvas.drawCable(0);

    requestAnimationFrame(run);
}

run();