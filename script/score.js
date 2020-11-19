import { parametrs } from "./parametrs.js";

export default class Score{
  constructor(viewMain){
    this.viewMain = viewMain;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.canvas.witdh = parametrs.canvas.width;
    this.ctx.canvas.height = parametrs.canvas.height / 10;
    this.data = {};
    this.interval = null;
  }
  
  drawScore(data){
    this.clearCanvas();
    this.ctx.font = "15px Arial";
    this.ctx.textAlign = "left";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`${data.name}`, 20, this.ctx.canvas.height -20, 100);
    this.ctx.fillText(`timer: ${data.min} min  ${data.sec} sec`, 20, this.ctx.canvas.height, 100);
    this.ctx.fillText(`score: ${data.score}`, this.ctx.canvas.witdh-400, this.ctx.canvas.height, 100);
    this.viewMain.drawUpdateCanvasGame();  
  }

  clearCanvas(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.witdh, this.ctx.canvas.height);
  }

  start(name){
    this.data.name = name;
    this.data.min = 0;
    this.data.sec = 0;
    this.data.score = 0;
    this.drawScore(this.data);
    this.startTimer();
  }

  countPoints(x){
    this.data.score += x;
    this.drawScore(this.data);
  }

  startTimer(){
    this.interval = setInterval(() => {
      this.data.sec ++;
      if(this.data.sec === 60){
        this.data.min ++;
        this.data.sec = 0;
      };
      this.drawScore(this.data);
    },1000);
  }

  stopTimer(){
    clearInterval(this.interval);
  }
}