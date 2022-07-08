import DonutMaker from "./DonutMaker";



class DonutMakerApp {

    constructor() {
        this.donutMaker = new DonutMaker;
        this.isStormActive = false;
        this.container = document.querySelector('.container');
    }

    renderPage() {
        this.donutButtonSetup();
        this.donutMaker.items.forEach((item) => this.itemButtonSetup(item));
        this.resetButtonSetup();
        this.volumeButtonSetup();
        this.runAutoClickers();
        const eventChannel = new BroadcastChannel('event-channel');
        eventChannel.addEventListener('message', event => {
            if (event.data === 'clickStorm-milestone'){
                this.playSound('milestoneDing');
                this.startClickStormCountdown();
            }
        });  
    }

    donutButtonSetup() {
        const donutButton = document.querySelector('#donutButton');
        donutButton.addEventListener('click', () => {
            const shouldCheckForMilestone = !this.donutMaker.isClickStormMilestoneReached();
            this.donutMaker.clickDonuts(1);
            this.updateDonutCounter(shouldCheckForMilestone);
        });    
    }

    itemButtonSetup(item) {
        const itemButton = document.querySelector(`#${item}Button`);
        itemButton.addEventListener('click', () => {
            this.playSound('purchaseDing');
            this.donutMaker.buyItem(item);
            this.updateDonutCounter();
            this.updateItemCounter(item);
            this.updateMultiplierValue();
        });
    }

    resetButtonSetup() {
        const resetButton = document.querySelector('#resetButton');
        resetButton.addEventListener('click', () => {
            const confirmation = confirm('Are you sure you want to reset? You will lose all progress!');
            if (confirmation) {
                this.donutMaker.reset();
                this.updateDonutCounter();
                this.donutMaker.items.forEach((item) => this.updateItemCounter(item));
                this.updateMultiplierValue();
                this.isStormActive = false;
                const eventChannel = new BroadcastChannel('event-channel');
                eventChannel.postMessage('reset');
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
            const shouldCheckForMilestone = !this.donutMaker.isClickStormMilestoneReached();
            this.donutMaker.activateAutoClickers();
            this.updateDonutCounter(shouldCheckForMilestone);
        }, 1000);
    }

    startClickStormCountdown(timeDelay = 0) {
        const minTime = timeDelay + 30000;
        const maxTime = timeDelay + 60000;
        const countdownTime = this.getRandIntBetween(minTime, maxTime);
        let wasReset = false;
        const eventChannel = new BroadcastChannel('event-channel');
        eventChannel.addEventListener('message', event => {
            if (event.data === 'reset'){
                wasReset = true;
                eventChannel.close();
            }
        });
        setTimeout(() => {
            if (!wasReset){
                this.displayClickStormActivator(countdownTime);
            }
        }, countdownTime);
    }

    updateDonutCounter(shouldCheckForMilestone) {
        const donutCounter = document.querySelector('#donutCounter');
        donutCounter.innerText = this.formatNumber(this.donutMaker.getDonutCount());
        this.donutMaker.items.forEach((item) => this.updateItemButton(item));
        if (shouldCheckForMilestone && this.donutMaker.isClickStormMilestoneReached()){
            const eventChannel = new BroadcastChannel('event-channel');
            eventChannel.postMessage('clickStorm-milestone');
        }
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
        const clickStormActivator = document.createElement('button');
        clickStormActivator.id = 'clickStormActivator';
        clickStormActivator.innerText = 'Begin Donut Drop!';
        this.container.appendChild(clickStormActivator);
        this.playSound('clickStormAlert');
        let wasReset = false;
        clickStormActivator.addEventListener('click', () => {
            clickStormActivator.remove();
            this.isStormActive = true;
            this.playSound('clock');
            if (timeDelay > 9 * this.donutMaker.getClickStormTime()) {
                timeDelay = 9 * this.donutMaker.getClickStormTime();
            }
            setTimeout(() => {
                if (!wasReset){
                    this.isStormActive = false;
                    this.startClickStormCountdown(timeDelay);
                    this.stopSound('clock');
                }
            }, this.donutMaker.getClickStormTime());
            this.displayClickStormTimer();
            this.runClickStorm();
        });
        const eventChannel = new BroadcastChannel('event-channel');
        eventChannel.addEventListener('message', event => {
            if (event.data === 'reset'){
                clickStormActivator.remove();
                wasReset = true;
            }
        });
    }

    displayClickStormTimer() {
        const clickStormTimer = document.createElement('progress');
        clickStormTimer.id = 'clickStormTimer';
        clickStormTimer.max = this.donutMaker.getClickStormTime();
        clickStormTimer.value = this.donutMaker.getClickStormTime();
        this.container.appendChild(clickStormTimer);
        const updateTimer = setInterval(() => {
            clickStormTimer.value -= 1000;
        }, 1000);
        setTimeout(() => {
            clearInterval(updateTimer);
            clickStormTimer.remove();
        }, this.donutMaker.getClickStormTime());
        const eventChannel = new BroadcastChannel('event-channel');
        eventChannel.addEventListener('message', event => {
            if (event.data === 'reset'){
                clearInterval(updateTimer);    
                clickStormTimer.remove();
                this.isStormActive = false;
                this.stopSound('clock');
            }    
        });
    }

    runClickStorm() {
        let timeOnTimer = this.donutMaker.getClickStormTime();
        let wasReset = false;
        while (timeOnTimer > 4000) {
            const buttonDelay = this.getRandIntBetween(1000, 4000);
            timeOnTimer -= buttonDelay;
            setTimeout(() => {
                if (!wasReset){
                    this.addClickStormButton();
                }
            }, timeOnTimer);
        }
        const eventChannel = new BroadcastChannel('event-channel');
        eventChannel.addEventListener('message', event => {
            if (event.data === 'reset'){
                wasReset = true;
            }    
        });
    }

    addClickStormButton() {
        const newClickStormButton = document.createElement('button');
        newClickStormButton.className = 'clickStormButton';
        const clickValue = this.getRandIntBetween(10, 100);
        newClickStormButton.innerText = `x${clickValue}!`;
        const xPos = this.getRandIntBetween(10, 85);
        const yPos = this.getRandIntBetween(10, 80);
        newClickStormButton.style.left = `${xPos}%`;
        newClickStormButton.style.top = `${yPos}%`;
        this.container.appendChild(newClickStormButton);
        newClickStormButton.addEventListener('click', () => {
            this.playSound('stormCrunch');
            this.donutMaker.clickDonuts(clickValue);
            this.updateDonutCounter();
            this.container.removeChild(newClickStormButton);
        });
        setTimeout(() => {
            newClickStormButton.remove();
        }, 3000);
        const eventChannel = new BroadcastChannel('event-channel');
        eventChannel.addEventListener('message', event => {
            if (event.data === 'reset'){
                newClickStormButton.remove();
            }
        });    
    }

    playSound(soundToPlay){
        const soundEffect = document.querySelector(`#${soundToPlay}`);
        soundEffect.currentTime = 0;
        soundEffect.play();
    }

    stopSound(soundToStop){
        const soundEffect = document.querySelector(`#${soundToStop}`);
        soundEffect.pause();
        soundEffect.currentTime = 0;
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