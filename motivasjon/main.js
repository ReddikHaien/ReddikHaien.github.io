import { Canvas } from "./render/canvas.js";

const canvas = new Canvas(document.getElementsByTagName("canvas")[0]);


function run(){

    canvas.clear();
    canvas.drawCable(performance.now()/1000);
    canvas.drawPusen(performance.now()/1000);
    requestAnimationFrame(run);
}

run();