import {loadImg} from "./loader.js";  // скрипт загрузки картинки спрайта
import {parametrs} from "./parametrs.js";
import AudioGame from "./audio.js";

// --- View --- //
  export  class HeroView{
    constructor(viewMain){
      this.viewMain = viewMain;
      this.canvasBuffer = document.createElement("canvas");
      this.ctxBuffer = this.canvasBuffer.getContext("2d");
      this.img = null;
      this.init();
    }

    async init(){
      this.ctxBuffer.canvas.width = parametrs.canvas.width;
      this.ctxBuffer.canvas.height = parametrs.canvas.height;
      this.img = await loadImg(parametrs.linkImage.hero);  // ждем пока загрузиться картинка спрайта
    }
    
    drawHero(items, bullet){
      let heroX = items.position.hero.x,
          heroY = items.position.hero.y,
          grenadeX = items.position.grenade.x,
          grenadeY = items.position.grenade.y,
          boomX = items.position.grenade.x - 6,
          boomY = items.position.boom.y;
      
      this.clearBuffer();
      this.ctxBuffer.drawImage(this.img, items.hero.x, items.hero.y, items.hero.w, items.hero.h, heroX, heroY, items.hero.w, items.hero.h); // герой
      this.ctxBuffer.drawImage(this.img, items.grenade.x, items.grenade.y, items.grenade.w, items.grenade.h,  grenadeX,grenadeY,   items.grenade.w, items.grenade.h); // граната
      this.ctxBuffer.drawImage(this.img, items.boom.x, items.boom.y, items.boom.w, items.boom.h,   boomX, boomY,  items.boom.w, items.boom.h); // взрыв
      if(bullet) this.ctxBuffer.drawImage(this.img, bullet.x, bullet.y, bullet.w, bullet.h,   bullet.x1, bullet.y1,  bullet.w, bullet.h);
      this.viewMain.drawUpdateCanvasGame();
    }

    clearBuffer(){
      this.ctxBuffer.clearRect(0, 0, this.ctxBuffer.canvas.width, this.ctxBuffer.canvas.height);
    }

  }
// --- Model --- //
  export  class HeroModel extends AudioGame{
    constructor(viewHero){
      super();
      this.viewHero = viewHero;
      this.interval = null;
      this.items = {
        hero : {},
        grenade : {},
        boom : {},
        position : {
          hero : {x:10, y: 112 + 208},
          grenade : {x:null, y:null},
          boom : {x:289, y: 112 + 123},
        },
      };
      this.bullet = null;
      this.move = null;
      this.moveH = null;
      this.flagBoom = false;
      super.audio("run");
      super.audio("back");
    }

    start(){
      this.items.hero = parametrs.hero.stop;
      this.items.position.hero.x = 10;
      this.viewHero.drawHero(this.items, this.bullet);
    }

    stop(){
      super.pauseAudio("run"); 
      super.pauseAudio("back"); 

      cancelAnimationFrame(this.moveH);
      this.items.hero = parametrs.hero.stop;
      this.items.grenate = parametrs.grenade.clear;
      this.items.detonation = parametrs.hero.boom[30];
      this.viewHero.drawHero(this.items, this.bullet);
    }

    actionCycle(x){
      if( x === "run"){
        super.playAudio("run");   
      };
      if( x === "back"){
        super.playAudio("back");    
      };
      //убираем задвоение клавиш
      this.stopMoveHeroPlace();
      cancelAnimationFrame(this.moveH); 
      
      const duration = parametrs.hero.duration[x],
            cooldown = duration / parametrs.hero[x].length;
      let i = 0,
          pTimestamp = 0,
          timer = 0;

      requestAnimationFrame((time) => render.call(this,time));

      function render(time){
        this.moveH = requestAnimationFrame((time) => render.call(this,time));
        const delta = time - pTimestamp;
        pTimestamp = time;
        timer += delta;

        if(timer >= cooldown){
          if(i < parametrs.hero[x].length){
            this.items.hero = parametrs.hero[x][i];
            this.viewHero.drawHero(this.items, this.bullet);
            i++;
            timer = 0;
          }else{
            i = 0;
            timer = 0;
          };
        };
      };      
    }

    action(x){
      if( x === "fire"){
        super.getAudioEffects(x);   
      };

      //убираем задвоение клавиш
      this.stopMoveHeroPlace();
      cancelAnimationFrame(this.moveH);

      
      const duration = parametrs.hero.duration[x],
            cooldown = duration / parametrs.hero[x].length;
      let i = 0,
          pTimestamp = 0,
          timer = 0;

      requestAnimationFrame((time) => render.call(this,time));

      function render(time){
        this.moveH = requestAnimationFrame((time) => render.call(this,time));
        const delta = time - pTimestamp;
        pTimestamp = time;
        timer += delta;

        if(timer >= cooldown){
          if(i < parametrs.hero[x].length){
            this.items.hero = parametrs.hero[x][i];
            this.viewHero.drawHero(this.items, this.bullet);
            i++;
            timer = 0;
          }else{
           cancelAnimationFrame(this.moveH);
          };
        };
      };
    }

    toFlyGrenade(){
      let x = 0,
          y = 0,
          x1 = 0;

      this.items.position.grenade.x = this.items.position.hero.x + 10;
      this.items.position.grenade.y = this.items.position.hero.y + 25;
      rotation.call(this);

      let move = requestAnimationFrame(() => fly.call(this));

      function rotation(){
        const duration = parametrs.grenade.duration,
              cooldown = duration / parametrs.grenade.frames.length;
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
            if(i < parametrs.grenade.frames.length){
              this.items.grenade = parametrs.grenade.frames[i];;
              this.viewHero.drawHero(this.items, this.bullet);
              i++;
              timer = 0;
            }else{
             cancelAnimationFrame(move);
            };
          };
        };
      }

      function fly(){
        if(y <= 20){
          this.items.position.grenade.x -= x1;
          this.items.position.grenade.y -=y;
          x += 0.1;
          x1 += 2.5;
          y = -(-0.2 * Math.pow(x - 5,2) + 5)*10;
          this.items.position.grenade.x += x1;
          this.items.position.grenade.y += y;
          this.viewHero.drawHero(this.items, this.bullet);
          move = requestAnimationFrame(() => fly.call(this));
        }else{
          cancelAnimationFrame(move);
          this.items.grenade = parametrs.grenade.clear;
          this.flagBoom = true;
          this.detonation("boom", this.items.position.grenade.x);
        };
      };
    }
    
    detonation(x, posBoom){
      super.getAudioEffects("boom");  
      this.items.position.boom.x = posBoom;
      const duration = parametrs.hero.duration[x],
            cooldown = duration / parametrs.hero[x].length;
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
          if(i < parametrs.hero.boom.length){
            this.items.boom = parametrs.hero.boom[i];
            this.viewHero.drawHero(this.items, this.bullet);
            i++;
            timer = 0;
          }else{
           cancelAnimationFrame(move);
           this.flagBoom = false;
          };
        };
      };
    }

    bulletFire(){
      this.bullet = parametrs.hero.bullet;
      this.bullet.x1 = this.items.position.hero.x + 80;

      let move = requestAnimationFrame(() => bulletFly.call(this));

      function bulletFly(){
        if(this.bullet.x1 < 600){
          this.bullet.x1 += 15;
          this.viewHero.drawHero(this.items, this.bullet);
          move = requestAnimationFrame(() => bulletFly.call(this));      
        }else{
          cancelAnimationFrame(move);
          this.bullet = null;
          this.viewHero.drawHero(this.items, this.bullet);
        };
      };
    }

    stopMoveHeroPlace(){
      cancelAnimationFrame(this.move);
    }
  }



