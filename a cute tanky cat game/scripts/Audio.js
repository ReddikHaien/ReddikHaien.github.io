var Sound = {
    init(){
        this.sounds = new Map();
        this.sounds.set("mjau1",new Audio("sounds/Mjau1.wav"));
        this.sounds.set("mjau2",new Audio("sounds/Mjau2.wav"));
        this.sounds.set("mjau3",new Audio("sounds/Mjau3.wav"));
        this.sounds.set("mjau4",new Audio("sounds/Mjau4.wav"));
        this.sounds.set("mjau5",new Audio("sounds/Mjau5.wav"));
        this.sounds.set("mjau6",new Audio("sounds/Mjau6.wav"));

        this.sounds.set("bossMjau1", new Audio("sounds/BossMjau1.wav"));
        this.sounds.set("bossMjau2", new Audio("sounds/BossMjau2.wav"));
        this.sounds.set("bossMjau3", new Audio("sounds/BossMjau3.wav"));

        this.sounds.set("pang", new Audio("sounds/pang.wav"));
        this.sounds.set("splatt", new Audio("sounds/splatt.wav"));

    },

    playSound(sound){
        this.sounds.get(sound).play();
    }
}