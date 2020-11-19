import main from "./main.js";

const wrap = document.getElementById("game");

async function loading(){
  main(wrap);
};

loading().then(document.getElementById("load").style.display = "none");

