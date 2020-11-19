
export default class WindModal{
  constructor(wrap){
    this.wrap = wrap;
    this.contentModal = document.createElement("div");
    this.enter = document.createElement("button");
    this.userName = null;
    this.userMail = null;
    this.scores = null;
  }

  createContentModal(content){  // создаем модальное окно
    this.contentModal.className = "content_modal";
    this.contentModal.innerHTML = content;
    this.wrap.append(this.contentModal);
  }

  setContentOfModal(content){
    this.contentModal.innerHTML = content;
  }
  
  toCloseModal(){
    this.contentModal.classList.toggle("closed");
  }

  checkUserName(value){
    let regexp = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/;
    
    if(regexp.test(value)){
      this.messageCorrect("errorInput");
      this.userName = value;
    }else{
      this.massageError("errorInput", "incorrectly entered name");
    };
  }

  checkUserMail(value){
    let regexp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    
    if(regexp.test(value)){
      this.messageCorrect("errorInput");
      this.userMail = value;
    }else{
      this.massageError("errorInput","incorrectly entered mail");
    };
  }

  massageError(id, text){
    document.getElementById(id).innerHTML = `${text}, please try again`;
  }
  
  messageCorrect(id){
    document.getElementById(id).innerHTML = ``;
  }

  getScoreTable(listData){
    this.scores = "";  //обнуляем данные, что бы при повторном вызове не повторился
    const users = this.sortListData(listData);
    let content = "";
    
    users.forEach((elem) => {
      content += `<tr><td>${elem.username}</td><td>${elem.score}</td></tr>`;
    });
    return this.scores += content + `</table><button class='menuGame'>menu</button>`;
  }

  sortListData(usr){  // сортируем по убыванию значения score
    return Object.values(usr).sort((a, b) => a.score > b.score ? 1 : -1).reverse();; 
  }
}