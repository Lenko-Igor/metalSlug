export default class FireBase{
  constructor(){
    this.myAppDB = myAppDB;
    this.getListData();
    this.listData = null;
  }

  addUserData(user, score){
    this.myAppDB.ref("user/" + user.username).set({
      "username" : user.username,
      "email" : user.email,
      "score" : score,
    })
    .then((username) => console.log(`данные игрока ${user.username}, внесены в базу`))
    .catch((error) => console.log("Error:" + error));
  }

  getListData(){
    this.myAppDB.ref("user/").once("value")
    .then((snapshot) => {
      this.listData = snapshot.val()
      console.log("получен массив данных")
    })
    .catch((error) => console.log(error));
  }
}
