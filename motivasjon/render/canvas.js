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
    }

    drawCable(dt){
        this.ctx.strokeStyle = "brown";
        this.ctx.lineWidth = "5px";
        let minx = 0;
        let miny = this.ctx.canvas.height/3;
        let maxx = this.ctx.canvas.width;
        let maxy = this.ctx.canvas.height*2/3
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
}