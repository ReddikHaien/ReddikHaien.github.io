// utilities
// her håndteres generelle funksjoner som skapelse og sletting av objekter
//COMPRESS keep length
var Util = {

    radian: Math.PI/180,
    // opdaterer alle kulene i spiller
    UpdateBullets: function(){
        
        // doomBullets er en array som holder indexnummeret til alle kulene som skal fjernes.
        // grunnen til at de fjernes etter update er at den ikke skal hoppe over en kule i farten hvis mange fjernes
        
        let doomedBullets = [];
        for (let i = 0; i < Game.bullets.length; i++){
            Game.bullets[i].tick();

            if (Game.bullets[i].shouldDie()){
                doomedBullets.push(i);
            }
        }

        // selve kuleslettingen

        for (let j = doomedBullets.length-1; j >= 0; j--){
            Game.bullets.splice(doomedBullets[j],1);
        }

        
        
    },


    UpdateKittens: function(){

        let shot = [];
        for (let i = 0; i < Game.kittens.length; i++){
            Game.kittens[i].tick();

            if (Game.kittens[i].shouldDie()){
                shot.push(i);
            }
        }

        for (let j = shot.length-1; j >= 0; j--){
            Game.kittens.splice(shot[j],1);
        }


    },
    CreateBullet: function(x,y,r){
        Game.bullets.push(new Bullet(x,y,r));
    },
    CreateKitten: function(x, y, c){
        Game.kittens.push(new Kitten(x,y,c));
    },

    getRequiredScore: function(){
        return Math.pow(1.1,Game.level - 1) * 10;
    },

    getDrift(){
        return Math.pow(1.3,(Game.level - 1)%Game.bosslevel) - 1;
    },
    getHealthKitten(){
        return Math.floor(Game.level / Game.bosslevel) + 1;
    }
    

};
//COMPRESS free length