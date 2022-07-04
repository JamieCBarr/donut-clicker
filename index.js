import DonutMaker from "./DonutMaker";

const donutMaker = new DonutMaker;

renderPage();

function renderPage(){
  donutButtonSetup();
  donutMaker.items.forEach((item)=>itemButtonSetup(item));
  resetButtonSetup();
  runAutoClickers();
  startClickStormCountdown();
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
  }, 1000);
}

function startClickStormCountdown(timeDelay = 0){
  const minTime = timeDelay + 1000;
  const maxTime = timeDelay + 5000;
  const countdownTime = getRandIntBetween(minTime, maxTime);
  setTimeout(()=>{
    displayClickStormActivator(countdownTime);
  }, countdownTime);
}

function updateDonutCounter(){
  const donutCounter = document.querySelector('#donutCounter');
  donutCounter.innerText = formatNumber(donutMaker.getDonutCount());
  donutMaker.items.forEach((item)=>updateItemButton(item));
}

function updateItemCounter(item){
  const itemCounter = document.querySelector(`#${item}Counter`);
  itemCounter.innerText = formatNumber(donutMaker.getItemCount(item));
}

function updateItemButton(item){
  const itemButton = document.querySelector(`#${item}Button`);
  const itemCost = document.querySelector(`#${item}Cost`);
  itemCost.innerText = formatNumber(donutMaker.getItemCost(item));
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
    multiplierDisplay.innerText = formatNumber(multiplierValue) + ' donuts';
  }else{
    multiplierDisplay.innerText = '1 donut';
  }
}

function displayClickStormActivator(timeDelay){
  const container = document.querySelector('.container');
  const clickStormActivator = document.createElement('button');
  clickStormActivator.id = 'clickStormActivator';
  clickStormActivator.innerText = 'Begin Donut Drop!';
  container.appendChild(clickStormActivator);
  clickStormActivator.addEventListener('click', ()=>{
    container.removeChild(clickStormActivator);
    if(timeDelay > 540000){
      timeDelay = 540000;
    }
    setTimeout(()=>{
      startClickStormCountdown(timeDelay);
    }, 60000);
    runClickStorm();
  });
}

function runClickStorm(){
  let timeOnTimer = 60000;
  while (timeOnTimer > 4000){
    const buttonDelay = getRandIntBetween(1000, 4000);
    timeOnTimer -= buttonDelay;
    setTimeout(()=>{
      addClickStormButton();
    }, timeOnTimer);
  }
}

function addClickStormButton(){
  const container = document.querySelector('.container');
  const newClickStormButton = document.createElement('button');
  newClickStormButton.className = 'clickStormButton';
  const clickValue = getRandIntBetween(10, 100);
  newClickStormButton.innerText = `x${clickValue}!`;
  const xPos = getRandIntBetween(10,70);
  const yPos = getRandIntBetween(20,70);
  newClickStormButton.style.left = `${xPos}%`;
  newClickStormButton.style.top = `${yPos}%`;
  container.appendChild(newClickStormButton);
  setTimeout(()=>{
    container.removeChild(newClickStormButton);
  }, 3000);
}

function getRandIntBetween(min, max){
  return Math.floor(Math.random() * (max + 1  - min) + min);
}

function formatNumber(num){
  if (num < 100){
    return num.toLocaleString(undefined, {maximumFractionDigits: 2});
  }
  if (num < 1000){
    return num.toLocaleString(undefined, {maximumFractionDigits: 1});
  }
  if (num < 10000000000){
    return num.toLocaleString(undefined, {maximumFractionDigits: 0});
  }
  if (num >= 10000000000){
    return num.toPrecision(4);
  }

}