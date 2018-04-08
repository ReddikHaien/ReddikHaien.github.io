
var Particle = {
    init: function(){

        console.log("initialiserer Particle engine");
        // kart med alle partikkeltypene;
        this.particleTypes = new Map();


        // forskjellige partikkeltyper
        
        // vanlig ekslosjon
        this.particleTypes.set("explosion", new ParticleSet( 0,0,40, [new Sprite(73,0,3,3),new Sprite(76,0,3,3),new Sprite(79,0,3,3)],1 ));
        this.particleTypes.set("smallCatSplat", new ParticleSet(0.05,0.01,300, [new Sprite(73,4,7,6), new Sprite(80,5,3,5),new Sprite(83,5,3,5), new Sprite(80,3,2,2), new Sprite(82,3,2,2), new Sprite(84,3,2,2)],2 ));
        this.particleTypes.set("bigCatSplat", new ParticleSet(0.05,0.1,300,[new Sprite(80,3,2,2), new Sprite(82,3,2,2), new Sprite(84,3,2,2)], 1));
        // liste med alle partiklene som er aktiv i scenen
        this.particles = [];
    },

    tick: function(){
        for (let i = 0; i < this.particles.length; i++){
            this.particles[i].tick();
            this.updateParticle(this.particles[i]);
        }


        for (let i = this.particles.length-1; i >= 0; i--){
            if (this.particles[i].shouldDie()){
                this.particles.splice(i,1);
            }
        }
    },

    render: function(){
        for (let i = 0; i < this.particles.length; i++){
            this.particles[i].tick();
            this.renderParticle(this.particles[i]);
        }
    },

    addPartices: function(count, set, x, y){

        let spawn = this.getParticleSet(set).spawnType;
        
        for (let i = 0; i < count; i++){
            let index = 0;
            if ( spawn == 0)
                index = 0;
            else if (spawn == 1)
                index = Math.floor(Math.random() * this.getParticleSet(set).sprites.length);
            else if (spawn == 2)
                if (i < this.getParticleSet(set).sprites.length){
                    index = i;
                }
                else
                    index = this.getParticleSet(set).sprites.length - 1;

            this.particles.push(new particle(x,y,Math.random()*3-1.5,Math.random()*3-1.5,index,set));
        }
    },

    updateParticle: function(particle){
        this.particleTypes.get(particle.particleSet).updateParticle(particle);
    },

    renderParticle: function(particle){
        this.particleTypes.get(particle.particleSet).renderParticle(particle);
    },

    getParticleSet: function(name){
        return this.particleTypes.get(name);
    }
}

class particle{

    constructor(x,y,dx,dy,spriteIndex, particleSet){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.spriteIndex = spriteIndex;
        this.ticked = 0;
        this.particleSet = particleSet;
    }

    tick(){
        this.x += this.dx;
        this.y += this.dy;
        
        this.ticked++;
    }

    shouldDie(){
        if (Particle.getParticleSet(this.particleSet).lifeTime < this.ticked){
            return true;
        }
        return false;
    }
}

class ParticleSet{
    constructor(gravity, airrestance, lifetime, sprites, spawnType){
        this.gravity = gravity;
        this.airrestance = airrestance;
        this.lifeTime = lifetime;
        this.sprites = sprites;

        // hvordan nye partikler skal spånes
        // 0 - første element 1 - random 2 - sekvens
        this.spawnType = spawnType;
    }   

    updateParticle(particle){
        particle.dy += this.gravity;

        if (particle.dx < 0){
            if (Math.abs(particle.dx) > this.airrestance){
                particle.dx += this.airrestance;
            }
            else{
                particle.dx = 0;
            }
        }
        else if (particle.dx > 0){
            if (particle.dx > this.airrestance){
                particle.dx -= this.airrestance;
            }
            else{
                particle.dx = 0;
            }
        }
    }

    renderParticle(particle){
        this.sprites[particle.spriteIndex].render(particle.x,particle.y,0);
    }
}