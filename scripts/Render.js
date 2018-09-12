// fil som skal ta seg av alt av rendering til canvasen
const TANK_BODY = 0;
const TANK_HEAD = 1;
const BULLET = 2;
const CAT_TYPE1 = 3;
const CAT_TYPE2 = 4;
const CAT_TYPE3 = 5;
const SCORECOUNTER = 6;
const POINTER = 7;
const TRYGVE_BODY = 8;
const TRYGVE_LEFT_EAR = 9;
const TRYGVE_RIGHT_EAR = 10;
const TRYGVE_LEFT_PAW = 11;
const TRYGVE_RIGHT_PAW = 12;
const COOKIE_BODY = 13;
const COOKIE_EYE1_LEFT = 14;
const COOKIE_EYE2_RIGHT = 15;
const COOKIE_JAW_TOP = 16;
const COOKIE_JAW_BOT = 17;

// objekt Referanse
var Render = {




    init: function(){
        console.log("initialiserer Render");
        
        // gradient for himmelen i bakgrunnen
        this.gradient = context.createLinearGradient(0,0,0,HEIGHT);
        this.gradient.addColorStop(0,"blue");
        this.gradient.addColorStop(1,"cyan");
        

        //spritepool som holder en referanse til alle sprite-ene i spillet (utenom font)
        this.spritePool = [
            new Sprite(73,0,26,12), // tank body
            new Sprite(63, 0,10,15), // tank head
            new Sprite( 0,32, 6,10), // bullet
            new Sprite( 0, 0,21,28), // cat type 1
            new Sprite(21, 0,21,28), // cat type 2
            new Sprite(42, 0,21,28), // cat type 3
            new Sprite( 6,28,13,14), // scoreCounter
            new Sprite(19,33, 9, 9), // pointer
            new Sprite(190,0,66,42), // trygve body
            new Sprite(89,25,11,14), // Trygve left ear
            new Sprite(89,39,11,14), // Trygve right ear
            new Sprite(66,25,23,30), // Trygve left paw
            new Sprite(66,55,23,30), // Trygve right paw
            new Sprite(208,42,48,47), // cookie body
            new Sprite(191,42,9,6), // cookie eye type 1 left
            new Sprite(199,42,9,6), // cookie eye type 1 right
            new Sprite(179,54,29,18), // cookie jaw top
            new Sprite(179,76,28,18), // cookie jaw bottom
        ];
    },

    drawSprite: function(index, x, y, r){
        this.spritePool[index].render(x,y,r);
    },

    drawImage: function(image, posX, posY, tileX, tileY, width, height, rotation){

        //COMPRESS keep save translate rotate drawImage restore
        context.save();
        context.scale(SCALE,SCALE);
        context.translate(posX,posY);
        context.rotate(rotation * Util.radian);
        context.drawImage(image,tileX,tileY,width,height,Math.ceil(-width/2),Math.ceil(-height/2),width,height);
        context.restore();
        //COMPRESS free save translate rotate drawImage restore
        
    },

    drawGround: function(image, tx, ty, w, h){
        //COMPRESS keep drawImage
        for (let x = 0; x < WIDTH/w; x++){
            context.drawImage(image,tx,ty,w,h,x*w*SCALE,HEIGHT*SCALE-h*SCALE,w*SCALE,h*SCALE);
        }
        //COMPRESS free drawImage
    },

    drawBullets: function(){
        //COMPRESS keep length
        for (let i = 0; i < Game.bullets.length; i++){
            Game.bullets[i].render();
        }
        //COMPRESS free length
    },
    drawKittens: function(){
        //COMPRESS keep length
        for (let i = 0; i < Game.kittens.length; i++){
            Game.kittens[i].render();
        }
        //COMPRESS free length
    },

    drawBackground: function(){
        //COMPRESS keep fillRect fillStyle
        context.fillStyle = this.gradient;
        context.fillRect(0,0,WIDTH*SCALE,HEIGHT*SCALE);
        //COMPRESS free fillRect fillStyle
    },

    drawScore: function(){
        this.drawSprite(SCORECOUNTER,6,7,0);
        this.drawText("" + Game.score,19,7);

        this.drawText("LEVEL " + Game.level,WIDTH - Text.getLength("LEVEL " + Game.level),4);
    },
	
	drawText: function(text, x, y){
        //COMPRESS keep length charAt
        let textWidth = 0;
        let size = 0;
        x = Math.floor(x);
        y = Math.floor(y);
		for (let i = 0; i < text.length; i++){

            
            let char = text.charAt(i);
            if (char == " "){
                textWidth+= 4;
                continue;
            }
            if (char == "<"){
                size = 1;
                continue;
            }
            if (char == ">"){
                size = 0;
                continue;
            }
            if (size == 0){
                textWidth+=Text.symbols.get(char).w1/2;
                Text.symbols.get(char).render(Math.floor(textWidth + x), y, 0);
                textWidth+= Text.symbols.get(char).w1/2 + 1;
            }
            else if (size == 1){
                textWidth+=Text.symbols.get(char).w2/2;
                Text.symbols.get(char).render(Math.floor(textWidth + x), y, 1);
                textWidth+= Text.symbols.get(char).w2/2 + 1;
            }
        }
        //COMPRESS free length charAt
    },
    
    drawBossHealthBar: function(){

        
        let max = Game.bossEntity.maxHealth;
        let cur = Game.bossEntity.currentHealth;

        let scaled = cur/max * 100;

        this.fillRect(WIDTH/2-51,20,102,6,"lightgray");
        this.fillRect(WIDTH/2 - 50,21,scaled,4,"green");
        
    },

    fillRect: function(x,y,w,h,c){
        //COMPRESS keep fillStyle fillRect
        context.fillStyle = c;
        context.fillRect(x*SCALE,y*SCALE,w*SCALE,h*SCALE);
         //COMPRESS free fillStyle fillRect
    },
};