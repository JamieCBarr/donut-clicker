import DonutMaker from "./DonutMaker";

const donutMaker = new DonutMaker;

renderPage();

function renderPage(){
  donutButtonSetup();
  donutMaker.items.forEach((item)=>itemButtonSetup(item));
  resetButtonSetup();
  runAutoClickers();
}

function donutButtonSetup(){
  const donutButton = document.querySelector('#donutButton');
  donutButton.addEventListener('click', ()=>{
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

function resetButtonSetup(){
  const resetButton = document.querySelector('#resetButton');
  resetButton.addEventListener('click', ()=>{
    const confirmation = confirm('Are you sure you want to reset? You will lose all progress!');
    if (confirmation){
      donutMaker.reset();
      updateDonutCounter();
      donutMaker.items.forEach((item)=>updateItemCounter(item));
      updateMultiplierValue();
    }
  });
}

function runAutoClickers(){
  setInterval(()=>{
    donutMaker.activateAutoClickers();
    updateDonutCounter();
  }, 1000)
}

function updateDonutCounter(){
  const donutCounter = document.querySelector('#donutCounter');
  donutCounter.innerText = donutMaker.getDonutCount();
  donutMaker.items.forEach((item)=>updateItemButton(item));
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
  const multiplierValue = donutMaker.getMultiplierValue();
  const multiplierDisplay = document.querySelector('#multiplierValue');
  if (multiplierValue != 1){
    multiplierDisplay.innerText = multiplierValue.toFixed(2) + ' donuts';
  }else{
    multiplierDisplay.innerText = '1 donut';
  }
}