// globale variabler som grunnmotoren skal bruke
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

const WIDTH = 256;
const HEIGHT = 128;

// bildefiler
images = [];
// teller for antall bilder som er lastet inn
var loadedImages = 0;
// liste med filene
var imageFiles = ["frontpage", "scoreboard", "entities", "font", "training"];



// preInit
//COMPRESS keep canvas width height imageSmoothingEnabled
context.canvas.width = WIDTH;
context.canvas.height = HEIGHT;
context.imageSmoothingEnabled = false;
//COMPRESS free canvas width height imageSmoothingEnabled

//COMPRESS keep length onload src Image
for (let i = 0; i < imageFiles.length; i++){
    images.push(new Image());
    images[i].onload = function(){
        loadedImages++;
    };
    images[i].src = "images/" + imageFiles[i] + ".png";
}
//COMPRESS free length onload src Image


// InputKontroller
var keys = new Map();

//COMPRESS keep keyCode

function keyDown(e){
    keys.set(e.keyCode,true);
}

function keyUp(e){
    keys.set(e.keyCode,false);
}
//COMPRESS free keyCode
//COMPRESS keep onkeydown onkeyup
document.onkeydown = keyDown;
document.onkeyup = keyUp;
//COMPRESS free onkeydown onkeyup

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