export class Canvas{
    /**
     * 
     * @param {HTMLCanvasElement} canvas 
     */
    constructor(canvas){
        this.ctx = canvas.getContext("2d");
        this.ctx.canvas.width = window.innerWidth;
        this.ctx.canvas.height = window.innerHeight;
    }

    clear(){
        this.ctx.fillStyle = "lightblue";
        this.ctx.fillRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height);
        this.pus = new Image();
        this.sokker = [
            new Image(),
            new Image(),
            new Image(),
        ]
        this.innlastet = 0;

        this.pus.onload = () => {
            this.innlastet++;
        };

        this.sokker.forEach(x => {
            x.onload = () => {
                this.innlastet++;
            }
        });
        this.pus.src = "./pusen.png";
        this.sokker.forEach((x,i) => {
            x.src = "./sokker " + (i+1) + ".png";
        });

        this.sokkerRegn = [];
    }

    drawCable(dt){
        this.ctx.strokeStyle = "brown";
        this.ctx.lineWidth = "10px";
        let minx = 0;
        let miny = 0
        let maxx = this.ctx.canvas.width;
        let maxy = this.ctx.canvas.height*2/7 + Math.sin(dt) * 100;
        this.ctx.beginPath();
        this.ctx.moveTo(
            minx,miny,
        );
        this.ctx.bezierCurveTo(  
            minx,maxy,
            maxx,maxy,
            maxx,miny
        );
        
        this.ctx.stroke();
    }


    drawPusen(dt){
        let sw = this.pus.width/100;
        let sh = this.pus.height/100;
        let x = (this.ctx.canvas.width/2)-sw*5;
        let y = (this.ctx.canvas.height/100)*70 + Math.sin(dt)*70 - sh*13.5;

        let width = this.pus.width*0.4;
        let height = this.pus.height*0.4;

        console.log(width,height);

        this.ctx.drawImage(this.pus,x - width/2,y - height/2,width,height);
    }

    drawSokker(dt){
        if (Math.random() < 0.3){
            this.sokkerRegn.push({
                id: Math.floor(Math.random()*this.sokker.length),
                x: Math.random()*this.ctx.canvas.width,
                y: 0,
                r: Math.random()*Math.PI*2,
            });
        }

        this.sokkerRegn.forEach(x => {
            this.ctx.save();
            this.ctx.translate(x.x,x.y);
            this.ctx.rotate(dt + x.r);
            this.ctx.drawImage(this.sokker[x.id],-this.sokker[x.id].width/2,-this.sokker[x.id].height/2);
            this.ctx.restore();
        });

        this.sokkerRegn = this.sokkerRegn.filter(x => x.y > this.ctx.height + 300);
    }
}