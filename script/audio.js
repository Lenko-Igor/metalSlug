export default class AudioGame{
  constructor(){
    this.audios = {
      fire : './audio/shotGun.mp3',
      run : './audio/run_hero.mp3',
      back : './audio/step.mp3',
      boom : './audio/boom.mp3',
      dieBot : './audio/die_bot.mp3',
      shotBot : './audio/dragunov.mp3',
      click : './audio/one_shot.mp3',
      forests : './audio/forest.mp3',
      win : './audio/winner.mp3',
      gameOver : './audio/game_over.mp3',
      tankFire : './audio/tank_fire.mp3',
      tank : './audio/tank_run.mp3',
    };
    this.run = null;
    this.back = null;
    this.forest = null;
    this.tank = null;
  }
  
  getAudioEffects(action) {
    var audio = new Audio(); // Создаём новый элемент Audio
    audio.src = this.audios[action]; // Указываем путь к звуку "клика"
    audio.autoplay = true; // Автоматически запускаем
  }

  playAudio(action){
    this[action].play();
  }

  pauseAudio(action){
    this[action].pause();
  }

  audio(key){
    this[key] = new Audio();
    this[key].loop = true;
    this[key].src = this.audios[key]; 
  }
}


