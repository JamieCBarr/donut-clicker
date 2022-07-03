import DonutMaker from "./DonutMaker";

const donutMaker = new DonutMaker;

renderPage();

function renderPage(){
  donutButtonSetup();
  itemButtonSetup('donutMultiplier');
  itemButtonSetup('autoClicker');
}

function donutButtonSetup(){
  const donutBtn = document.querySelector('#donutButton');
  donutBtn.addEventListener('click', ()=>{
    donutMaker.clickDonuts(1);
    updateDonutCounter();
  });
}

function itemButtonSetup(item){
  const itemButton = document.querySelector(`#${item}Button`);
  itemButton.addEventListener('click', ()=>{
    donutMaker.buyItem(item);
    updateDonutCounter();
    updateItemCounter(item);
    updateMultiplierValue();
  });
}

function updateDonutCounter(){
  const donutCounter = document.querySelector('#donutCounter');
  donutCounter.innerText = donutMaker.getDonutCount();
  updateItemButton('donutMultiplier');
  updateItemButton('autoClicker');
}

function updateItemCounter(item){
  const itemCounter = document.querySelector(`#${item}Counter`);
  itemCounter.innerText = donutMaker.getItemCount(item);
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

function updateMultiplierValue(){
  const multiplierValue = document.querySelector('#multiplierValue');
  multiplierValue.innerText = donutMaker.getMultiplierValue().toFixed(2) + ' donuts';
}