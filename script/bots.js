import {loadImg} from "./loader.js";  // скрипт загрузки картинки спрайта
import {parametrs} from "./parametrs.js";
import AudioGame from "./audio.js";


// --- View --- //
export class BotsView{
  constructor(viewMain){
    this.viewMain = viewMain;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.img = null;
    this.canvas1 = document.createElement("canvas");
    this.ctx1 = this.canvas1.getContext("2d");
    this.init();
  }
   
  async init(){
    this.ctx.canvas.width = parametrs.canvas.width;
    this.ctx.canvas.height = parametrs.canvas.height;
    this.img = await loadImg(parametrs.linkImage.bots);

    this.widthCtx1 = this.ctx1.canvas.width = parametrs.bot.widthWrap;
    this.heightCtx1 = this.ctx1.canvas.height = parametrs.bot.heightWrap;
  }

  drawBots({bot, bullet, wrapBot}){
    this.clear();

    bot.forEach(elem => {
      this.ctx1.drawImage(this.img, elem.x, elem.y, elem.w, elem.h, elem.x1, elem.y1, elem.w, elem.h);  
    });

    wrapBot.forEach(elem => {
      this.ctx.drawImage(this.canvas1, 0,0, this.widthCtx1,this.heightCtx1, elem.x,elem.y, this.widthCtx1,this.heightCtx1);
    });

    bullet.forEach(elem => {
      this.ctx.drawImage(this.img, elem.x, elem.y, elem.w, elem.h, elem.x1, elem.y1, elem.w, elem.h);  
    });

    this.viewMain.drawUpdateCanvasGame();
  }

  clear(){
    this.ctx.clearRect(0,0,this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx1.clearRect(0,0,this.ctx1.canvas.width, this.ctx1.canvas.height);
  }
}

// --- Model --- //
export class BotsModel extends AudioGame{
  constructor(botView){
    super();
    this.view = botView;
    this.items = null; 
    this.distance = 0;
    this.flagBullet = false;
    this.botDead = true;
    this.move1 = null;
    this.armor = false;
    super.audio("tank");
  }

  start(){
    this.items = {
      bot : [],
      bullet : [],
      wrapBot : [{x: parametrs.canvas.width, y: (parametrs.canvas.height - parametrs.bot.heightWrap) - 40}],
    };
    this.botDead = true; 
    this.view.clear();
  }

  actionBot(unit,x){
    if(unit === "tank") {
      super.playAudio("tank");
      this.armor = true;
    };
    this.botDead = false;
    const duration = parametrs[unit].duration[x],
          cooldown = duration / parametrs[unit][x].length;
    let i = 0,
        pTimestamp = 0,
        timer = 0;

    requestAnimationFrame((time) => render.call(this,time,x));

    function render(time,x){
      this.move1 = requestAnimationFrame((time) => render.call(this,time,x));   
      const delta = time - pTimestamp;
      pTimestamp = time;
      timer += delta;

      if(timer >= cooldown){
        if(i < parametrs[unit][x].length){
          this.items.bot = [parametrs[unit][x][i]];
          this.view.drawBots(this.items);
          if(unit === "bot" && this.items.bot[0].x === 441){
            this.bullet(unit);
          };
          if(unit === "tank" && this.items.bot[0].x === 1377){
            this.fireTank();
          };
          i++;
          timer = 0;
        }else{
          cancelAnimationFrame(this.move1);
        };
      };
    };
  }

  bullet(unit){
    if(unit === "bot"){
      super.getAudioEffects("shotBot");
    };
        
    this.flagBullet = true;
    this.items.bullet = [ parametrs.bot.bullet ];
    this.items.bullet[0].x1 = this.items.wrapBot[0].x;
    let move = requestAnimationFrame(() => bulletFly.call(this));

    function bulletFly(){
      if(this.items.bullet[0].x1 > -16){
        this.items.bullet[0].x1 -= 10;
        this.view.drawBots(this.items);
        requestAnimationFrame(() => bulletFly.call(this));
      }else{
        cancelAnimationFrame(move);
        this.flagBullet = false;
        this.items.bullet = [];
      };
    };
  }

  die(armor){
    let unit = null;
    if(!armor){
      super.getAudioEffects("dieBot");
      unit = "bot";
    };
    if(armor){
      super.pauseAudio("tank");
      unit = "tank";
      this.armor = false;

    }; 
    cancelAnimationFrame(this.move1);

    const duration = parametrs[unit].duration.die,
          cooldown = duration / parametrs[unit].die.length;
    let i = 0,
        pTimestamp = 0,
        timer = 0;

    requestAnimationFrame((time) => render.call(this,time));

    function render(time){
      const move = requestAnimationFrame((time) => render.call(this,time)),
            delta = time - pTimestamp;
      pTimestamp = time;
      timer += delta;
      if(timer >= cooldown){
        if(i < parametrs[unit].die.length){
          this.items.bot[0] = parametrs[unit].die[i];
          this.view.drawBots(this.items);
          i++;
          timer = 0;
        }else{
          cancelAnimationFrame(move);
          this.botDead = true;
          this.items.bot = [];

          this.items.wrapBot[0].x = parametrs.canvas.width - parametrs[unit].widthWrap/2;
        };
      };
    };
  }

  offsetBot(x){
    this.items.wrapBot.forEach(elem => {
      elem.x -= x;
    });
    this.view.drawBots(this.items); 
  }

  fireTank(){
    super.getAudioEffects("tankFire");

    const duration = parametrs.tank.duration.fire,
          cooldown = duration / parametrs.tank.fire.length;
    let i = 0,
        pTimestamp = 0,
        timer = 0;

    requestAnimationFrame((time) => render.call(this,time));

    function render(time){
      this.move1 = requestAnimationFrame((time) => render.call(this,time));   
      const delta = time - pTimestamp;
      pTimestamp = time;
      timer += delta;
      
      if(timer >= cooldown){
        if(i < parametrs.tank.fire.length){
          this.items.bullet = [parametrs.tank.fire[i]];
          this.items.bullet[0].x1 = this.items.wrapBot[0].x;
          this.items.bullet[0].y1 = parametrs.tank.fire[i].y1+10;
          this.view.drawBots(this.items);
          i++;
          timer = 0;
        }else{
          cancelAnimationFrame(this.move1);
          this.bullet();
        };
      };
    };
  }
}  


