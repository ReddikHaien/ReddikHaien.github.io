// fil som skal håndtere selve spillet


var Game = {
    // spilleren
    player: null,

    // kuler skutt av spilleren
    bullets: [],

    //kattene
    kittens:[],

    // spawnRate for katter
    spawnRate: 30,
    spawnCoolDown: 4,

    // scoren
    score: 0,
	

	// 	level
	// øker prosentvis-ish
	level: 1, 
	nextLevel: 0,
	// game state 0 - forside 1 - spill
	gameState: 0,
	
	// menyVariabler
	selected: 0,
	arrowClicked: false,

	// scoreBoard
	highScore: 0,
	

	// boss
	bossEntity: null,
	bosslevel: 3,
    init: function(){

		console.log("initialiserer spill variabler");
        this.player = new Player(128,128-7);
		
		
		if (!localStorage.getItem("highScore")){
			console.log("setter opp local storage variabler");
			localStorage.setItem("highScore",0);
		}
		this.highScore = localStorage.getItem("highScore");

		
    },


    update: function(){


		// 0 = tittelskjerm
		// 1 = spill
		// 2 = scoreboard
		// 3 = hvordan spille
		if (this.gameState == 0){
			if (keys.get(38) == true && !this.arrowClicked && this.selected > 0){
				this.selected--;
				this.arrowClicked = true;
			}
			else if (keys.get(40) == true && !this.arrowClicked && this.selected < 2){
				this.selected++;
				this.arrowClicked = true;
			}

			if (keys.get(38) != true && keys.get(40) != true ){
				this.arrowClicked = false;
			}
			
			if (keys.get(13) == true && !this.player.hit){
				if (this.selected == 0){
					this.reset(); 
					this.gameState = 1;
				}
				else if (this.selected == 1){
					this.player.hit = true;
					this.gameState = 2;
				}
				else if (this.selected == 2){
					this.player.hit = true;
					this.gameState = 3;
				}
			}

			if (!(keys.get(13) == true)){
				this.player.hit = false;
			}
		}
		else if (this.gameState == 1){
			this.spawnCoolDown++;
			this.player.tick();
			Util.UpdateBullets();
			Util.UpdateKittens();

			Particle.tick();
			if (this.spawnCoolDown >= this.spawnRate && this.kittens.length < 8 && this.level % this.bosslevel!=0){
				Util.CreateKitten(Math.floor(Math.random()*WIDTH),0,Math.floor(Math.random()*kittenSprites.length));
				this.spawnCoolDown = 0;
			}
			if (this.score > this.nextLevel){
				this.level++;
				this.nextLevel += Util.getRequiredScore();
			}

			if (this.level % this.bosslevel == 0){ // boss fight!!!!!!
				if (this.bossEntity == null){
					this.bossEntity = new BossCat();
				} 
				else{
					this.bossEntity.tick();
				}
			}


			if (keys.get(13) == true && this.player.hit){
				if (this.score > this.highScore){
					this.highScore = this.score;
					localStorage.setItem("highScore",this.score);
				}
				this.gameState = 0;
			}
		}
		else {
			if (keys.get(13) && !this.player.hit){
				this.player.hit = true;
				this.gameState = 0;
			}

			if (!keys.get(13) && this.player.hit){
				this.player.hit = false;
			}
		}
    },

    render: function(){
		//COMPRESS keep clearRect
        context.clearRect(0,0,WIDTH,HEIGHT);
		
		if (this.gameState == 0){
			Render.drawImage(images[0],WIDTH/2,HEIGHT/2,0,0,WIDTH,HEIGHT,0);
			Render.drawText("<PLAY GAME",WIDTH/2+10,HEIGHT/2);
			Render.drawText("<SCOREBOARD",WIDTH/2+10,HEIGHT/2+8);
			Render.drawText("<HOW TO PLAY",WIDTH/2+10,HEIGHT/2+16);
			Render.drawSprite("008",WIDTH/2,HEIGHT/2 + 8 * this.selected,0);
			Render.drawText("LAGET AV FREDRIK E. F.",4,4);
		}
        else if(this.gameState == 1){
			Render.drawBackground();
			Render.drawGround(images[2],0,42,32,8);
			if (this.bossEntity != null)
				this.bossEntity.render();
			Render.drawBullets();
			Render.drawKittens();
			
			this.player.render();



			Particle.render();
			Render.drawScore();
			if (this.bossEntity != null){
				Render.drawBossHealthBar();
			}
			if (this.player.hit){
				Render.drawText("GAME OVER",WIDTH/2 - Text.getLength("GAME OVER")/2,HEIGHT/2);
				Render.drawText("SCORE " + this.score,WIDTH/2 - Text.getLength("SCORE " + this.score)/2,HEIGHT/2+8);
				
				if (this.score > this.highScore){
					Render.drawText("NY TOPPSCORE " + this.score,WIDTH/2 - Text.getLength("NY TOPPSCORE " + this.score)/2,HEIGHT/2+16);
				}
				else{
					Render.drawText("TOPPSCORE " + this.highScore,WIDTH/2 - Text.getLength("TOPPSCORE " + this.highScore)/2,HEIGHT/2+16);	
				}
				Render.drawText("TRYKK <ENTER> FOR Å GÅ TIL MENYEN",WIDTH/2 - Text.getLength("TRYKK <ENTER> FOR Å GÅ TIL MENYEN")/2,HEIGHT/2+24);
				
			}
		}
		else if (this.gameState == 2){
			Render.drawImage(images[1],WIDTH/2,HEIGHT/2,0,0,WIDTH,HEIGHT,0);
			Render.drawText("" + this.highScore, 134 - Text.getLength("" + this.highScore)/2,67);
			Render.drawText("TRYKK <ENTER> FOR Å GÅ TILBAKE",WIDTH - Text.getLength("TRYKK <ENTER> FOR Å GÅ TILBAKE"),HEIGHT-7);
		}
		else if (this.gameState == 3){
			Render.drawImage(images[4],WIDTH/2,HEIGHT/2,0,0,WIDTH,HEIGHT,0);
			Render.drawText("BRUK <PILTASTENE> TIL Å ROTERE PÅ KANONEN",WIDTH/8,HEIGHT/4);
			Render.drawText("BRUK <A> OG <D> TIL Å STYRE TANKSEN",WIDTH/8,HEIGHT/4 + 10);
			Render.drawText("DU SKYTER MED <MELLOMROMSTASTEN",WIDTH/8,HEIGHT/4+20);
			Render.drawText("<ENTER> BRUKES TIL Å VELGE HANDLINGER",WIDTH/8,HEIGHT/4+30);
			Render.drawText("TRYKK <ENTER> FOR Å GÅ TILBAKE",WIDTH - Text.getLength("TRYKK <ENTER> FOR Å GÅ TILBAKE"),HEIGHT-7);
		}
		//COMPRESS free clearRect
	},
	
	reset: function(){
		this.kittens = [];
		this.bullets = [];
		this.score = [];
		this.player.x = 128;
		this.player.r = 40;
		this.level = 1;
		this.nextLevel = Util.getRequiredScore();
		this.bossEntity = null;
	},

};