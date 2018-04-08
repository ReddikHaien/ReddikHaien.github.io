// globale variabler som grunnmotoren skal bruke
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var WIDTH = 256
var HEIGHT = 128;

// bildefiler
images = [];
// teller for antall bilder som er lastet inn
var loadedImages = 0;
// liste med filene
var imageFiles = ["frontpage", "scoreboard", "entities", "font", "training"];



// preInit
context.canvas.width = WIDTH;
context.canvas.height = HEIGHT;
context.imageSmoothingEnabled = false;


for (let i = 0; i < imageFiles.length; i++){
    images.push(new Image());
    images[i].onload = function(){
        loadedImages++;
    }
    images[i].src = "images/" + imageFiles[i] + ".png";
}


// InputKontroller
var keys = new Map();

function keyDown(e){
    keys.set(e.keyCode,true);
}

function keyUp(e){
    keys.set(e.keyCode,false);
}


document.onkeydown = keyDown;
document.onkeyup = keyUp;


function run(){

    

    Game.update();
    Game.render();

    requestAnimationFrame(run);
}


function waiter(){

    if (loadedImages < imageFiles.length){
        requestAnimationFrame(waiter);
    }
    else
    {
        Text.init();
        Render.init();
        Particle.init();
        Game.init();
        Sound.init();
        requestAnimationFrame(run);
    }

}

waiter();