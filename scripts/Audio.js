//COMPRESS keep Audio play paused

class SoundBuffer{
    constructor(path, count){
        this.buffer = [];
        this.count = count;

        for (let i = 0; i < count; i++){
            this.buffer.push(new Audio(path));
        }
    }

    
    playSound(){
        for (let i = 0; i < this.count; i++){
            if (this.buffer[i].paused){
                this.buffer[i].play();
                return;
            }
        }
    }
}
var Sound = {
    init(){
        this.sounds = new Map();
        this.sounds.set("mjau1",new SoundBuffer("sounds/Mjau1.wav",3));
        this.sounds.set("mjau2",new SoundBuffer("sounds/Mjau2.wav",3));
        this.sounds.set("mjau3",new SoundBuffer("sounds/Mjau3.wav",3));
        this.sounds.set("mjau4",new SoundBuffer("sounds/Mjau4.wav",3));
        this.sounds.set("mjau5",new SoundBuffer("sounds/Mjau5.wav",3));
        this.sounds.set("mjau6",new SoundBuffer("sounds/Mjau6.wav",3));

        this.sounds.set("bossMjau1", new SoundBuffer("sounds/BossMjau1.wav",4));
        this.sounds.set("bossMjau2", new SoundBuffer("sounds/BossMjau2.wav",4));
        this.sounds.set("bossMjau3", new SoundBuffer("sounds/BossMjau3.wav",4));

        this.sounds.set("pang", new SoundBuffer("sounds/pang.wav",6));
        this.sounds.set("splatt", new SoundBuffer("sounds/splatt.wav",6));

    },

    playSound(sound){
        this.sounds.get(sound).playSound();
    }
};

//COMPRESS free Audio play paused