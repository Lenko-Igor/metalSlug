import WindModal from "./windowsModals.js";  // модел модальных окон
import {parametrs} from "./parametrs.js"; // объект с данными по игре
import {HeroView} from "./mainHero.js"; //  модель главного героя
import {HeroModel} from "./mainHero.js"; 
import {LocationView} from "./location.js"; 
import {LocationModel} from "./location.js"; 
import {BotsView} from "./bots.js";
import {BotsModel} from "./bots.js";
import Score from "./score.js";
import FireBase from "./data.js";
import AudioGame from "./audio.js";


export default function main(wrap){
  // --- View --- //  
  class MainView{
    constructor(wrap){
      this.wrap = wrap;
      this.canvas = document.createElement("canvas");
      this.ctx = this.canvas.getContext("2d");
      this.winModal = new WindModal(wrap);
      this.img = null;
      this.init();
    }

    init(){
      this.ctx.canvas.width = parametrs.canvas.width;
      this.ctx.canvas.height = parametrs.canvas.height;
      this.canvas.id = "canvas";
      this.img = new Image();
      this.img.src = parametrs.linkImage.fonModalStart;
      this.img.onload = () => {
        this.ctx.fillStyle= this.ctx.createPattern(this.img, "no-repeat");
        this.ctx.fillRect(0, 0, parametrs.canvas.width, parametrs.canvas.height);
        this.wrap.prepend(this.canvas);
        this.winModal.createContentModal(parametrs.content.nikName); // создаем контент после прогрузки canvas
      };
    }

    drawCanvasBackground(content){  // отрисовывает canvas фоном
      this.clearCanvas();
      this.ctx.fillStyle= this.ctx.createPattern(this.img, "no-repeat");
      this.ctx.fillRect(0, 0, parametrs.canvas.width, parametrs.canvas.height);
      this.wrap.prepend(this.canvas);
      this.winModal.createContentModal(content); // создаем контент после прогрузки canvas
    } 

    clearCanvas(){
      this.ctx.clearRect(0, 0, parametrs.canvas.width, parametrs.canvas.height);
    }

    firstLoad(content){
      this.drawCanvasBackground(content);
    }

    drawContent(content){
      this.winModal.setContentOfModal(content);
    }

    toCloseModal(){
      this.winModal.toCloseModal();
    }
    
    drawGameOver(text){
      this.clearCanvas();
      this.ctx.drawImage(locationView.canvas, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.drawImage(viewHero.canvasBuffer, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      
      this.ctx.beginPath();
      this.ctx.font = "70px Big Shoulders Stencil Text";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "red";
      this.ctx.fillText(`${text}`, 300, 150, 200);

      this.ctx.beginPath();
      this.ctx.font = "30px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(`you score: ${score.data.score}`, 300, 200, 200);

      this.ctx.beginPath();
      this.ctx.font = "30px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle = "white";
      this.ctx.fillText(`time: ${score.data.min} min  ${score.data.sec} sec`, 300, 250, 200);

      this.drawContent(parametrs.content.again);
      this.toCloseModal();
    }

    drawUpdateCanvasGame(){
      this.clearCanvas();
      this.ctx.drawImage(locationView.canvas, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.drawImage(botView.canvas, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.drawImage(viewHero.canvasBuffer, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.ctx.drawImage(score.canvas, 0, 0, this.ctx.canvas.width, score.ctx.canvas.height);
    }
  }
 
  // --- Model --- //
  class MainModel extends AudioGame{
    constructor(viewMain){
      super();
      this.view = viewMain;
      this.data = new FireBase();
      this.user = {
        username : null,
        email : null,
      };
      this.lockButton = false;
      this.countUnits = 0; // для ведения счета убитых юнитов
      this.move = null;
      this.activeHero = null;
      this.sitDown = false;
      this.countForWin = 5;
    }
    
    // обрабатываем вводные данные и работаем с модалками /////////
    
    inputUserName(value){
      this.view.winModal.checkUserName(value);
      this.user.username = this.view.winModal.userName;
    }
    
    inputUserMail(value){
      this.view.winModal.checkUserMail(value);
      this.user.email = this.view.winModal.userMail;
    }
    
    creatUser(){
      super.getAudioEffects("click");

      
      let checkNikname = Object.keys(this.data.listData).some((elem) => {
        if(elem === this.user.username){
          return true;
        }else{
          return false;
        };
      });

      if(checkNikname){
        this.view.winModal.massageError("errorInput", "this name is taken");
      }else if(!this.view.winModal.userMail){
        this.view.winModal.massageError("errorInput", "this e-mail name is not valid");
      }else{
        this.data.addUserData(this.user,0);
        this.view.winModal.setContentOfModal(parametrs.content.menuGame);
      };
    }

    enterUserNikname(){
      super.getAudioEffects("click");

      let checkNikname = Object.keys(this.data.listData).some((elem) => {
        if(elem === this.user.username && this.data.listData[elem].email === this.user.email){
          return true;
        }else{
          return false;
        };
      });

      if(checkNikname){
        this.view.winModal.setContentOfModal(parametrs.content.menuGame);
      }else{
        this.view.winModal.massageError("errorInput", "incorrectly name or mail");
      };
    }

    toOpenMenuGame(){
      super.getAudioEffects("click");
      this.view.drawContent(parametrs.content.menuGame);
    }

    toOpenContent(content){
      super.getAudioEffects("click");

      if(content === "scores"){
        (async () =>{
          let tableScores = await this.view.winModal.getScoreTable(this.data.listData);
          this.view.drawContent(parametrs.content[`${content}`] + tableScores);
        })();
      };
      this.view.drawContent(parametrs.content[`${content}`]);
    }    
    
    toAgain(){
      super.getAudioEffects("click");
      this.view.firstLoad(parametrs.content.menuGame);
    }

    closeModal(){
      this.view.toCloseModal();
    }

    clearCanvas(){
      this.view.clearCanvas();
    }

    toStartGame(){
      super.getAudioEffects("click");
      this.lockButton = true; // снимаем блокировку кнопок на клавиатуре
      this.countUnits = 0
      modelHero.start();
      locationModel.start();
      botModel.start();
      score.start(this.user.username);
    }

    gameOver(text, audio){
      super.getAudioEffects(audio);
      this.toStopHero();
      this.lockButton = false; // блочим кнопки на клавиатуре
      setTimeout(() => this.view.drawGameOver(text), 1500);
      score.stopTimer();
      this.data.addUserData(this.user, score.data.score);
      this.data.getListData();
      locationModel.stopAudi();
    }

    // управление игрой (локация, герой, боты) /////////
    
    runForward(){
      const that = this;
      this.toStopHero();
      modelHero.actionCycle("run");
      locationModel.moveForestForward();
      this.activationBot();

      requestAnimationFrame(function run(){
        let status = locationModel.activeLoc;
        if(!status && modelHero.items.position.hero.x < parametrs.canvas.width - 25){
          modelHero.items.position.hero.x += 2;
          if(botModel.items.wrapBot[0].x > parametrs.canvas.width - parametrs.bot.widthWrap){
             botModel.offsetBot(1);
          };
        }else{
          botModel.offsetBot(1);
        };
        if(modelHero.items.position.hero.x >= botModel.items.wrapBot[0].x){
          modelHero.action("death");
          that.gameOver("Game Over", "gameOver");
          return;
        }
        that.activeHero = requestAnimationFrame(run);
      });
    }
    
    goBack(){
      const that = this;
      this.toStopHero();
      modelHero.actionCycle("back");
      locationModel.moveForestBack();

      requestAnimationFrame(function run(){
        let status = locationModel.activeLoc;
        if(!status && modelHero.items.position.hero.x > 10){
          modelHero.items.position.hero.x -= 0.5;
        }else{
          botModel.offsetBot(-0.5);
        };
        that.activeHero = requestAnimationFrame(run);
      });
    }
 
    toSitDown(){
      this.toStopHero();
      this.sitDown = true;
      modelHero.action("sitDown");
    }

    getShot(){
      const that = this;
      let animate = null;
      
      this.toStopHero();
      modelHero.action("fire");
      modelHero.bulletFire();
      requestAnimationFrame(function getBulletPosition(){
        let posBot = botModel.items.wrapBot[0],
            posBullet = modelHero.bullet,
            armor = botModel.armor;
        
        if(!armor && posBot && posBullet && posBullet.x1 > posBot.x){
          cancelAnimationFrame(animate);
          botModel.die(armor);
          that.countUnits ++;
          score.countPoints(100);
          if(that.countUnits === that.countForWin){
            botModel.items.bullet = [];
            that.gameOver("You WIN", "win");
          };  
          return;
        };
        animate = requestAnimationFrame(getBulletPosition);
      });
    }

    throwGrenade(){
      const that = this;
      let animate = null;
      
      this.toStopHero();
      modelHero.toFlyGrenade();
      modelHero.action("throw");
      requestAnimationFrame(function getBoomPosition(){
        let posBot = botModel.items.wrapBot[0],
            posBoom = modelHero.items.position.boom,
            flagBoom = modelHero.flagBoom,
            armor = botModel.armor;
        animate = requestAnimationFrame(getBoomPosition);
        
        if(flagBoom){
          if(posBoom.x + parametrs.hero.boom[0].w > posBot.x && posBoom.x < posBot.x + 88){
            cancelAnimationFrame(animate);
            botModel.die(armor);
            that.countUnits ++;
            score.countPoints(200);
            if(that.countUnits === that.countForWin){
              botModel.items.bullet = [];
              that.gameOver("You WIN", "win");
            };  
            return;
          };
          cancelAnimationFrame(animate);
        };
      });
    }

    toStopHero(){
      cancelAnimationFrame(this.activeHero);
      this.sitDown = false;
      modelHero.stop();
      locationModel.stop();
      modelHero.stopMoveHeroPlace();
      this.stopActivationBot();
    }

    activationBot(){
      const that = this;
      let move = null;
      
      requestAnimationFrame(function getStep(){
        let x = locationModel.forest.x,
            status = locationModel.activeLoc,
            unit = null;
        
        if(that.countUnits === that.countForWin - 1){
          unit = "tank";
        }else{
          unit = "bot";
        };
 
        if(x > 50 && botModel.botDead){
          if(!status) {botModel.items.wrapBot[0].x = parametrs.canvas.width - parametrs.bot.widthWrap/2};
          botModel.actionBot(unit,"run");
          requestAnimationFrame(function flyBullet(){
            if(botModel.flagBullet){
              let posBullet = botModel.items.bullet[0].x1,
                  posHero = modelHero.items.position.hero.x,
                  w = modelHero.items.hero.w;
              
              if(posBullet <= (posHero + w) && posBullet > posHero && that.sitDown === false){
                cancelAnimationFrame(move);
                botModel.flagBullet = false;
                modelHero.action("death");
                that.gameOver("Game Over", "gameOver");
              };  
            }; 
            move = requestAnimationFrame(flyBullet);  
          });
        };
        that.move = requestAnimationFrame(getStep);
      });
    }

    stopActivationBot(){
      cancelAnimationFrame(this.move);
    }
  }  

  // --- Controller --- //
  class MainController{
    constructor(wrap, modelMain){
      this.wrap = wrap;
      this.model = modelMain;
      this.init();
      this.delayShot = false;
      this.delayThrow = false;
    }

    init(){
      document.addEventListener("change", (event) =>{
        let e = event.target;

        if(e.id === "username"){
          let name = e.value.replace(" ", "").toUpperCase();
          this.valueInputName(name);
        };
        if(e.id === "email"){
          let mail = e.value.replace(" ", "");
          this.valueInputMail(mail);
        };
      })

      document.addEventListener("click", (event) => {
        event.preventDefault();
        let e = event.target;
        
        if(e.id === "reg"){
          this.registration();
        };
        if(e.id === "enter"){
          this.enterInputValue();
        };
        if(e.className === "menuGame"){
          this.toOpenMenu();
        };
        if(e.id === "about" || e.id === "controls" || e.id === "scores"){
          this.pressButtonModal(e);
        };
        if(e.id === "again"){
          this.pressAgain();
        };
        if(e.id === "start"){
          this.toCloseModal();
          this.clearCanvas();
          this.startGame();
        };
      })

      document.addEventListener("keydown", (event) =>{
        if(!event.repeat && this.model.lockButton){
          if(event.code === "ArrowRight"){
            this.toPressRight(event);
          };
          if(event.code === "ArrowLeft"){
            this.toBack(event);
          };
          if(event.code === "ArrowDown"){
            this.down();
          };
          if(event.code === "ArrowUp"){
            this.throw();
          };
          if(event.code === "Space"){
            this.shot();
          };
        };  
      })

      document.addEventListener("keyup", (event) =>{
        if(this.model.lockButton){
          if(event.code === "ArrowRight" || 
            event.code === "Space" ||
            event.code === "ArrowLeft" ||
            event.code === "ArrowDown"){
              this.stop();
          };
        };
      })
    }

    // управление модальными окнами и INPUTS ////////////////
    
    valueInputName(value){
      this.model.inputUserName(value);
    }

    valueInputMail(value){
      this.model.inputUserMail(value);
    }

    registration(){
      this.model.creatUser();
    }

    enterInputValue(){  // входим под своим существующим ником
      this.model.enterUserNikname();
    }
  
    toOpenMenu(){
      this.model.toOpenMenuGame();
    }

    pressButtonModal(e){
      this.model.toOpenContent(e.id);
    }
    
    pressAgain(){
      this.model.toAgain();
    }

    toCloseModal(){
      this.model.closeModal();
    }

    clearCanvas(){
      this.model.clearCanvas();
    }

    startGame(){
      this.model.toStartGame();
    }

    // управление игрой "KEYDOWN"  ///////////////////
    
    toPressRight(event){
      this.model.runForward(event);
    }

    toBack(event){
      this.model.goBack(event);
    }

    down(){
      this.model.toSitDown();
    }

    throw(){
      this.delay(this.model.throwGrenade, 3000);
    }

    shot(){
      this.delay(this.model.getShot, 500);
    }

    delay(func, ms){   // что-то вроде throttle, но в моем варианте отрабатывает лучше
      if(this.isThrottle){
        return;
      };
      func.call(this.model);
      this.isThrottle = true;
      setTimeout(() => {
        this.isThrottle = false;
      }, ms);
    }

    // управление игрой "KEYUP" //////////////////////////
    
    stop(){
      this.model.toStopHero();
    }
  } 

  const viewMain = new MainView(wrap),
        modelMain = new MainModel(viewMain),
        controllerMain = new MainController(wrap, modelMain);

  const viewHero = new HeroView(viewMain),
        modelHero = new HeroModel(viewHero);

  const botView = new BotsView(viewMain),
        botModel = new BotsModel(botView);       

  const locationView = new LocationView(viewMain),
        locationModel = new LocationModel(locationView, modelHero);

  const score = new Score(viewMain);  
}

