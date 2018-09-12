// utilities
// her håndteres generelle funksjoner som skapelse og sletting av objekter
//COMPRESS keep length

const CAT_ENTITIES = 0;
const BULLET_ENTITIES = 1;

const CAT_TYPES = {

};

class EntityContainer{
    constructor(){
        this.type = undefined;
        this.active = false;
    }
};

var EntityManager = {
    kittens: [],
    inactiveKittens: [],
    bullets: [],
    inactiveBullets: [],
    player: undefined,

    init(){
        for (let i = 0; i < 30; i++){
            this.kittens.push(new EntityContainer());
            this.inactiveKittens.push(this.kittens[i]);
        }
        for (let i = 0; i < 30; i++){
            this.bullets.push(new EntityContainer());
            this.inactiveBullets.push(this.bullets[i]);
        }
        console.log("laget entity buffere");
    },
    spawnEntity(group, type){
        switch(group){
            case CAT_ENTITIES:
                let e = this.inactiveKittens.pop();
                e.type = type;
                e.active = true;
            break;
            case BULLET_ENTITIES:
                let e = this.inactiveBullets.pop();
                e.type = type;
                e.active = true;
            break;
        }
    },
    killEntity(group, entity){
        switch(group){
            case CAT_ENTITIES:
                this.inactiveKittens.push(entity);
                entity.active = false;
            break;
            case BULLET_ENTITIES:
                this.inactiveBullets.push(entity);
                entity.active = false;
            break;
        }
    }
};

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
    AddKitten(x, y, t){
        EntityManager.spawnEntity(CAT_ENTITIES,)
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