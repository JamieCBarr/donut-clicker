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
  updateItemButton('donutMultiplier');
  updateItemButton('autoClicker');
}

function updateItemButton(item){
  const itemButton = document.querySelector(`#${item}Button`);
  const itemCost = document.querySelector(`#${item}Cost`);

  itemCost.innerText = donutMaker.getItemCost(item);
  
  if(donutMaker.getItemCost(item) > donutMaker.getDonutCount()){
    itemButton.disabled = 'disabled';
  } else {
    itemButton.disabled = '';
  }
}