// fil som skal ta seg av alt av rendering til canvasen


// objekt Referanse
var Render = {




    init: function(){
        console.log("initialiserer Render");
        
        // gradient for himmelen i bakgrunnen
        this.gradient = context.createLinearGradient(0,0,0,HEIGHT);
        this.gradient.addColorStop(0,"blue");
        this.gradient.addColorStop(1,"cyan");
        

        //spritepool som holder en referanse til alle sprite-ene i spillet (utenom font)
        this.spritePool = new Map();

        this.spritePool.set("001", new Sprite(63,20,26,12)); // tank body
        this.spritePool.set("002", new Sprite(63, 0,10,20)); // tank head
        this.spritePool.set("003", new Sprite( 0,32, 6,10)); // bullet
        this.spritePool.set("004", new Sprite( 0, 0,21,28)); // cat1
        this.spritePool.set("005", new Sprite(21, 0,21,28)); // cat2
        this.spritePool.set("006", new Sprite(42, 0,21,28)); // cat3
        this.spritePool.set("007", new Sprite( 6,28,13,14)); // scoreCounter
        this.spritePool.set("008", new Sprite(19,33, 9, 9)); // pointer
        // 009 tom
        // 010 tom 
        this.spritePool.set("011", new Sprite( 0,70,66,42)); // Boss body
        this.spritePool.set("012", new Sprite(89,52,11,14)); // boss left ear
        this.spritePool.set("013", new Sprite(89,66,11,14)); // boss right ear
        this.spritePool.set("014", new Sprite(66,52,23,30)); // boss left paw
        this.spritePool.set("015", new Sprite(66,82,23,30)); // boss right paw

        
    },

    drawSprite: function(index, x, y, r){
        this.spritePool.get(index).render(x,y,r);
    },

    drawImage: function(image, posX, posY, tileX, tileY, width, height, rotation){

        //COMPRESS keep save translate rotate drawImage restore
        context.save();
        context.translate(posX,posY);
        context.rotate(rotation * Util.radian);
        context.drawImage(image,tileX,tileY,width,height,-width/2,-height/2,width,height);
        context.restore();
        //COMPRESS free save translate rotate drawImage restore
        
    },

    drawGround: function(image, tx, ty, w, h){
        //COMPRESS keep drawImage
        for (let x = 0; x < WIDTH/w; x++){
            context.drawImage(image,tx,ty,w,h,x*w,HEIGHT-h,w,h);
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
        context.fillRect(0,0,WIDTH,HEIGHT);
        //COMPRESS free fillRect fillStyle
    },

    drawScore: function(){
        this.drawSprite("007",6,7,0);
        this.drawText("" + Game.score,19,7);

        this.drawText("LEVEL " + Game.level,WIDTH - Text.getLength("LEVEL " + Game.level),4);
    },
	
	drawText: function(text, x, y){
        //COMPRESS keep length charAt
        let textWidth = 0;
        let size = 0;
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
                Text.symbols.get(char).render(textWidth + x, y, 0);
                textWidth+= Text.symbols.get(char).w1/2 + 1;
            }
            else if (size == 1){
                textWidth+=Text.symbols.get(char).w2/2;
                Text.symbols.get(char).render(textWidth + x, y, 1);
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
        context.fillRect(x,y,w,h);
        //COMPRESS free fillStyle fillRect
    },
};