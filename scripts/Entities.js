// denne filen holder alle klassene som håndterer enties i spillet
// blandt dem er spillerklassen



// Spriteklasse for å håndtere spritene for enhetene
class Sprite{
    constructor(tx, ty, w, h){
        this.tx = tx;
        this.ty = ty;
        this.w = w;
        this.h = h;
    }

    tick(){

    }
    render(x, y, r){
        Render.drawImage(images[2],x,y,this.tx, this.ty, this.w, this.h, r);
    }
};

// liste med alle kittenSpritene
kittenSprites = ["004","005","006"];

class Player{
    constructor(x, y){
        // kroppen til tanken
        this.body = "001";
        // kanonen, aka hodet
        this.head = "002";

        this.x = x;
        this.y = y;
        this.r = 40;

        this.cannonCoolDown = 0;

        this.coolDownTime = 20;

		this.hit = false;
    }
    tick(){
		
		if (!this.hit){
			if (keys.get(37) == true){

				if (this.r > -80)
					this.r-=4;
			}
			if (keys.get(39) == true){
				if (this.r < 80)
					this.r+=4;
			}
	
			if (keys.get(65) == true && this.x > 13){
				this.x--;
			}
			if (keys.get(68) == true && this.x < WIDTH-13){
				this.x++;
			}

			if (keys.get(32) == true && this.cannonCoolDown == 0){
                Util.CreateBullet(this.x,this.y-6,this.r);
                Sound.playSound("pang");
				this.cannonCoolDown = this.coolDownTime;
			}

			if (this.cannonCoolDown > 0){
				this.cannonCoolDown--;
			}
		
		
			for (let i = 0; i < Game.kittens.length; i++){
				let d = (this.x - Game.kittens[i].x) * (this.x - Game.kittens[i].x) + (this.y - Game.kittens[i].y) * (this.y - Game.kittens[i].y);
				if (d < 100){
					this.hit = true;
				}
            }
            
            if (Game.bossEntity != undefined){
                let d = (this.x - Game.bossEntity.x) * (this.x - Game.bossEntity.x) + (this.y - Game.bossEntity.y) * (this.y - Game.bossEntity.y);

                if (d < 300){
                    this.hit = true;
                }
            }
        }
    }
    render(){

        Render.drawSprite(this.head,this.x+1,this.y-6,this.r);
        Render.drawSprite(this.body,this.x,this.y,0);
		
    }
};

// klasse for kulene som spilleren skyter. de har en posisjon, og retning samt sprite og rotasjon
// de har også partikkeeffekt
class Bullet{
    constructor(x,y,r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.dx = Math.sin(r * Util.radian)*3;
        this.dy =-Math.cos(r * Util.radian)*3;

        this.bullet = "003";

        this.used = false;
    }

    tick(){
        this.x += this.dx;
        this.y += this.dy;
    }
    render(){
        Render.drawSprite(this.bullet,this.x,this.y,this.r);
    }

    // funksjon som sjekker om denne kulen burde slettes
    // returnerer true eller false
    shouldDie(){

        if (this.x < 0 || this.y < 0 || this.x > WIDTH || this.y > HEIGHT || this.used){

            if (this.used)
                Particle.addPartices(5,"explosion",this.x,this.y);
            return true;
        }
        else{

            for (let i = 0; i < Game.kittens.length; i++){

                let d = (this.x - Game.kittens[i].x) * (this.x - Game.kittens[i].x) + (this.y - Game.kittens[i].y) * (this.y - Game.kittens[i].y);

                if (d < 100){
                    
                    Game.kittens[i].hit = true;
                    Particle.addPartices(5,"explosion",this.x,this.y);
                    return true;
                }
                
                
            }
            return false;
        }
    }
};

class Kitten{
    constructor(x, y, c){
        this.x = x;
        this.y = y;

        this.sprite = kittenSprites[c];
        this.hit = false;

        this.animationStep = 0;

        this.xDrift = Util.getDrift();
        this.driftTime = 0;

        this.health = Util.getHealthKitten();
    }

    tick(){
        this.y+=0.5;
        this.driftTime+=0.1;
        this.x+= Math.sin(this.driftTime)*this.xDrift;
    }
    render(){
        this.animationStep+= 5;
      Render.drawSprite(this.sprite, this.x,this.y,Math.sin(this.animationStep*Util.radian)*10);
    }

    shouldDie(){
        if (this.y > HEIGHT || Game.level% Game.bosslevel == 0){
            return true;
        }

        if (this.hit){
            
            this.health--;
            this.hit = false;
            if (this.health <= 0){
                Game.score++;
                Particle.addPartices(10,"smallCatSplat",this.x,this.y);
                Sound.playSound("splatt");
                return true;
            }
            else{
                //Sound.playSound("mjau" + (Math.floor(Math.random()*6)+1));
            }
        }
        
        return false;
    }

};


class BossCat{
    constructor(){
        this.head = "011";
        this.leftPaw = "014";
        this.rightPaw = "015";
        this.leftEar = "012";
        this.rightEar = "013";
    
        this.x = 128;
        this.y = 64;

        // angrep 0 - body smash, 2 - paw punch, 3 - super beam
        this.currentAttack = 0;
        
        this.attackState = 0;


        this.movementSpeed = 3;
        
        this.maxHealth = 10;
        this.currentHealth = this.maxHealth;
        
        // angrepsmeteret 
        // body smash -velger en tilfeldig plassering på banen, venter 1 sekund og utfører så angrepet, venter så i 2 sekund før den fortsetter
        // paw punch - svever over spiller, begynner å slå med en gang katten står i ro, gjør 3 slag og står i ro i 2 sekunder før den fortsetter å forfølge spilleren
        // super beam - svever over spiller, venter så i 3 sekunder og utfører så angrepet
        this.oldTime = new Date().getTime();
        this.currentTime = 0;
        this.destinationX = 128;
        this.destinationY = 64;


        this.animationTimer = 0;
    }


    tick(){

        this.currentTime = new Date().getTime();
        if (this.attackState == 0){ // stadie 1

            if (this.currentAttack == 0){ // angrep 1 2 sekunder idle
                
                if (this.currentTime - this.oldTime >= 2000){ // det har gått 2 sekunder
                    this.attackState = 1;
                    this.oldTime = this.currentTime;
                }
            }
        }
        else if (this.attackState == 1){ // stadie 2
            
            if (this.currentAttack == 0){ // angrep 1 tilfeldig posisjon(venstre, sentrum, høyre)
                this.destinationX = Game.player.x;
                this.attackState = 2;
            }
        }
        else if (this.attackState == 2){ // stadie 3
           
            if (this.currentAttack == 0){ // angrep 1 beveger seg mot målet
                if (this.x == this.destinationX){ // har bossen nådd målet sitt
                    this.oldTime = this.currentTime; // reset timeren
                    this.attackState = 3; // gå til stadie 4
                }
            }
        }
        else if (this.attackState == 3){ // stadie 4
            
            if (this.currentAttack == 0){
                if (this.currentTime-this.oldTime >= 1000){ // har han ventet i 1 sekund
                    this.destinationY = HEIGHT; // gå ned i bakken
                    this.attackState = 4;
                }
            }
        }
        else if (this.attackState == 4){ // stadie 5
            if(this.currentAttack == 0){
                if (this.destinationY == this.y){
                    this.destinationY = HEIGHT/2; // gå opp igjen
                    this.attackState = 5;
                }
            }
        }
        else if (this.attackState == 5){
            
            if(this.currentAttack == 0){
                if (this.destinationY == this.y){
                    this.oldTime = this.currentTime;
                    this.attackState = 0;
                }
            }
        }




        let dirX = Math.abs(this.x - this.destinationX);

        let dirY = Math.abs(this.y - this.destinationY);

        if (dirX > this.movementSpeed)
            dirX = this.movementSpeed;

        if (dirY > this.movementSpeed)
            dirY = this.movementSpeed;

        if (this.x < this.destinationX){
            this.x += dirX;
        }
        if (this.x > this.destinationX){
            this.x -= dirX;
        }
        if (this.y < this.destinationY){
            this.y += dirY;
        }
        if (this.y > this.destinationY){
            this.y -= dirY;
        }


        for (let i = 0; i < Game.bullets.length; i++){
            let d = (this.x - Game.bullets[i].x) * (this.x - Game.bullets[i].x) + (this.y - Game.bullets[i].y) * (this.y - Game.bullets[i].y);

            if (d <= 484){
                this.currentHealth--;
                Sound.playSound("bossMjau" + (Math.floor(Math.random()*3) + 1));
                if (this.currentHealth < 0){
                    this.currentHealth = 0;
                }

                Game.bullets[i].used = true;
            }

        }

        if (this.currentHealth <= 0){
            Game.level++;
            Game.nextLevel += Util.getRequiredScore();
            Particle.addPartices(100,"bigCatSplat",this.x,this.y);
            Game.bossEntity = null;
        }

    }

    render(){
        this.animationTimer+= 0.1;
        Render.drawSprite(this.leftEar , this.x-19 - Math.sin(this.animationTimer)*2,this.y-18 + Math.cos(this.animationTimer)*2,0);
        Render.drawSprite(this.rightEar, this.x+19 + Math.sin(this.animationTimer)*2,this.y-18 + Math.cos(this.animationTimer)*2,0);

        Render.drawSprite(this.leftPaw , this.x-19,this.y+18 + Math.sin(this.animationTimer),0);
        Render.drawSprite(this.rightPaw, this.x+19,this.y+18 + Math.sin(this.animationTimer),0);
        Render.drawSprite(this.head, this.x,this.y,0);
        
    }
}