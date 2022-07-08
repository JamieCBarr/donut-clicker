import DonutMaker from "./DonutMaker";



class DonutMakerApp {

    constructor() {
        this.donutMaker = new DonutMaker;
        this.isStormActive = false;
    }

    renderPage() {
        this.donutButtonSetup();
        this.donutMaker.items.forEach((item) => this.itemButtonSetup(item));
        this.resetButtonSetup();
        this.volumeButtonSetup();
        this.runAutoClickers();
        this.startClickStormCountdown();
    }

    donutButtonSetup() {
        const donutButton = document.querySelector('#donutButton');
        donutButton.addEventListener('click', () => {
            this.donutMaker.clickDonuts(1);
            this.updateDonutCounter();
        });
    }

    itemButtonSetup(item) {
        const purchaseDing = document.querySelector('#purchaseDing');
        const itemButton = document.querySelector(`#${item}Button`);
        itemButton.addEventListener('click', () => {
            purchaseDing.play();
            this.donutMaker.buyItem(item);
            this.updateDonutCounter();
            this.updateItemCounter(item);
            this.updateMultiplierValue();
        });
    }

    resetButtonSetup() {
        const resetButton = document.querySelector('#resetButton');
        const resetChannel = new BroadcastChannel('reset-channel');
        resetButton.addEventListener('click', () => {
            const confirmation = confirm('Are you sure you want to reset? You will lose all progress!');
            if (confirmation) {
                this.donutMaker.reset();
                this.updateDonutCounter();
                this.donutMaker.items.forEach((item) => this.updateItemCounter(item));
                this.updateMultiplierValue();
                this.isStormActive = false;
                resetChannel.postMessage('reset');
            }
        });
    }

    volumeButtonSetup() {
        const volumeButtons = document.querySelectorAll('.volumeButton');
        volumeButtons.forEach((volumeButton) => {
            volumeButton.addEventListener('click', () => this.toggleAudio());
        });
    }


    toggleAudio() {
        const audio = document.querySelectorAll('audio');
        const volumeButtons = document.querySelectorAll('.volumeButton');
        audio.forEach((sound) => {
            sound.muted = !sound.muted;
        });
        volumeButtons.forEach((volumeButton) => {
            volumeButton.classList.toggle('hidden');
        });
    }

    runAutoClickers() {
        setInterval(() => {
            this.donutMaker.activateAutoClickers();
            this.updateDonutCounter();
        }, 1000);
    }

    startClickStormCountdown(timeDelay = 0) {
        const minTime = timeDelay + 5000;
        const maxTime = timeDelay + 7000;
        const countdownTime = this.getRandIntBetween(minTime, maxTime);
        setTimeout(() => {
            this.displayClickStormActivator(countdownTime);
        }, countdownTime);
    }

    updateDonutCounter() {
        const donutCounter = document.querySelector('#donutCounter');
        donutCounter.innerText = this.formatNumber(this.donutMaker.getDonutCount());
        this.donutMaker.items.forEach((item) => this.updateItemButton(item));
    }

    updateItemCounter(item) {
        const itemCounter = document.querySelector(`#${item}Counter`);
        itemCounter.innerText = this.formatNumber(this.donutMaker.getItemCount(item));
    }

    updateItemButton(item) {
        const itemButton = document.querySelector(`#${item}Button`);
        const itemCost = document.querySelector(`#${item}Cost`);
        itemCost.innerText = this.formatNumber(this.donutMaker.getItemCost(item));
        if (this.donutMaker.getItemCost(item) > this.donutMaker.getDonutCount()) {
            itemButton.disabled = 'disabled';
        } else {
            itemButton.disabled = '';
        }
    }

    updateMultiplierValue() {
        const multiplierValue = this.donutMaker.getMultiplierValue();
        const multiplierDisplay = document.querySelector('#multiplierValue');
        if (multiplierValue != 1) {
            multiplierDisplay.innerText = this.formatNumber(multiplierValue) + ' donuts';
        } else {
            multiplierDisplay.innerText = '1 donut';
        }
    }

    displayClickStormActivator(timeDelay) {
        const container = document.querySelector('.container');
        const clickStormActivator = document.createElement('button');
        clickStormActivator.id = 'clickStormActivator';
        clickStormActivator.innerText = 'Begin Donut Drop!';
        container.appendChild(clickStormActivator);
        const clickStormAlert = document.querySelector('#clickStormAlert');
        clickStormAlert.play();
        clickStormActivator.addEventListener('click', () => {
            clickStormActivator.remove();
            this.isStormActive = true;
            const timerSound = document.querySelector('#clock');
            timerSound.play();
            if (timeDelay > 9 * this.donutMaker.getClickStormTime()) {
                timeDelay = 9 * this.donutMaker.getClickStormTime();
            }
            setTimeout(() => {
                this.startClickStormCountdown(timeDelay);
                timerSound.pause();
                timerSound.load();
            }, this.donutMaker.getClickStormTime());
            this.displayClickStormTimer();
            this.runClickStorm();
        });
        const resetChannel = new BroadcastChannel('reset-channel');
        resetChannel.addEventListener('message', event => {
                clickStormActivator.remove();
        });
    }

    displayClickStormTimer() {
        const container = document.querySelector('.container');
        const clickStormTimer = document.createElement('progress');
        clickStormTimer.id = 'clickStormTimer';
        clickStormTimer.max = this.donutMaker.getClickStormTime();
        clickStormTimer.value = this.donutMaker.getClickStormTime();
        container.appendChild(clickStormTimer);
        const updateTimer = setInterval(() => {
            clickStormTimer.value -= 1000;
        }, 1000);
        setTimeout(() => {
            clearInterval(updateTimer);
            clickStormTimer.remove();
        }, this.donutMaker.getClickStormTime());
    }

    runClickStorm() {
        let timeOnTimer = this.donutMaker.getClickStormTime();
        while (timeOnTimer > 4000) {
            const buttonDelay = this.getRandIntBetween(1000, 4000);
            timeOnTimer -= buttonDelay;
            setTimeout(() => {
                this.addClickStormButton();
            }, timeOnTimer);
        }
    }

    addClickStormButton() {
        const container = document.querySelector('.container');
        const newClickStormButton = document.createElement('button');
        newClickStormButton.className = 'clickStormButton';
        const clickValue = this.getRandIntBetween(10, 100);
        newClickStormButton.innerText = `x${clickValue}!`;
        const xPos = this.getRandIntBetween(10, 85);
        const yPos = this.getRandIntBetween(10, 80);
        newClickStormButton.style.left = `${xPos}%`;
        newClickStormButton.style.top = `${yPos}%`;
        container.appendChild(newClickStormButton);
        newClickStormButton.addEventListener('click', () => {
            this.donutMaker.clickDonuts(clickValue);
            this.updateDonutCounter();
            container.removeChild(newClickStormButton);
        });
        setTimeout(() => {
            newClickStormButton.remove();
        }, 3000);
    }

    getRandIntBetween(min, max) {
        return Math.floor(Math.random() * (max + 1 - min) + min);
    }

    formatNumber(num) {
        if (num < 100) {
            return num.toLocaleString(undefined, {
                maximumFractionDigits: 2
            });
        }
        if (num < 1000) {
            return num.toLocaleString(undefined, {
                maximumFractionDigits: 1
            });
        }
        if (num < 10000000000) {
            return num.toLocaleString(undefined, {
                maximumFractionDigits: 0
            });
        }
        if (num >= 10000000000) {
            return num.toPrecision(4);
        }

    }
}

export default DonutMakerApp;