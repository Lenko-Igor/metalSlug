import {loadImg} from "./loader.js";  // скрипт загрузки картинки спрайта
import {parametrs} from "./parametrs.js";
import AudioGame from "./audio.js";

// --- View --- //
export class LocationView{
  constructor(viewMain){
    this.viewMain = viewMain;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.img = null;
    this.linkImg = "./img/location1.png";
    this.init(this.linkImg);
  }

  async init(link){
    this.ctx.canvas.width = parametrs.canvas.width;
    this.ctx.canvas.height = parametrs.canvas.height;
    this.img = await loadImg(link);
  }

  drawLocation(sky,forest){
    this.clear();
    this.ctx.drawImage(this.img, sky.x,sky.y,  this.ctx.canvas.width,sky.h,  sky.pozX,sky.pozY,  this.ctx.canvas.width,sky.h); 
    this.ctx.drawImage(this.img, forest.x,forest.y,  this.ctx.canvas.width,forest.h,  forest.pozX,forest.pozY,   this.ctx.canvas.width,forest.h);  
    this.viewMain.drawUpdateCanvasGame();
  }

  clear(){
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}

// --- Model --- //
export class LocationModel extends AudioGame{
  constructor(locationView, modelHero){
    super();
    this.modelHero = modelHero;
    this.view = locationView;
    this.sky = {x: 0, y: 124, w: 1536, h: 295, pozX: 0, pozY: 0};
    this.forest = {x: 0, y: 297, w: 1536, h: 322, pozX: 0, pozY: 113};
    this.move = null;
    this.activeLoc = false;
    super.audio("forests");
  }

  start(){
    super.playAudio("forests");
    this.sky.x = 0; 
    this.forest.x = 0;
    this.activeLoc = false;
    this.view.drawLocation(this.sky, this.forest);
  }

  stopAudi(){
    super.pauseAudio("forests");
  }

  moveForestForward(){
    requestAnimationFrame(() => moveForward.call(this));
    
    function moveForward(){
      if(this.forest.x < this.forest.w - parametrs.canvas.width){
        this.activeLoc = true;
        this.sky.x += 0.5; 
        this.forest.x += 1;
        this.view.drawLocation(this.sky, this.forest);
        this.move = requestAnimationFrame(() => moveForward.call(this));
      }else{
        this.activeLoc = false;
      };
    };
  }

  moveForestBack(){
    requestAnimationFrame(() => moveBack.call(this));
    
    function moveBack(){
      if(this.forest.x > 0 && this.forest.x < this.forest.w - parametrs.canvas.width){
        this.activeLoc = true;
        this.sky.x -= 0.25; 
        this.forest.x -= 0.5;
        this.view.drawLocation(this.sky, this.forest);
        this.move = requestAnimationFrame(() => moveBack.call(this));
      }else{
        this.activeLoc = false;
      };
    };
  }
  
  stop(){
    cancelAnimationFrame(this.move);
  }
}