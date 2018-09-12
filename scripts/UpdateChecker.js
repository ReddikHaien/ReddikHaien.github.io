let Tester = {
    checkVersion(){
        let old = localStorage.getItem("gameVersion");
        console.log(old);
        // første gang spilles startes
        if (old === null || old === undefined){
            localStorage.setItem("gameVersion", VERSION);
            return;
        }
        else{
            if (old < VERSION){
                console.log("ny versjon");
            }
            else{
                console.log("samme versjonen");
            }
        }
    }
};