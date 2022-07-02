import DonutMaker from "./DonutMaker";

const donutMaker = new DonutMaker;

renderPage();

function renderPage(){
  buttonSetup();
}

function buttonSetup(){
  const donutBtn = document.querySelector('#donutButton');

  donutBtn.addEventListener('click', ()=>{
    donutMaker.clickDonuts(1);
    updateDonutCounter();
  });
}

function updateDonutCounter(){
  const donutCounter = document.querySelector('#donutCounter');
  donutCounter.innerText = donutMaker.getDonutCount();
}