class DonutMaker{

    constructor(){
        this.donutCount = 0.0;
        this.autoClickerCount = 0;
        this.autoClickerCost = 100;
        this.autoClickerCostMult = 0.1;
        this.donutMultiplierCount = 0;
    }

    addDonuts(clicks){
        this.donutCount += clicks;
    }

    getDonutCount(){
        return Math.floor(this.donutCount);
    }

    addAutoClickers(numToAdd){
        this.autoClickerCount += numToAdd;
    }

    buyAutoClicker(){
        if (this.isAffordable(this.autoClickerCost)){
        this.donutCount -= this.autoClickerCost;
        let costIncrease = Math.floor(this.autoClickerCost * this.autoClickerCostMult);
        this.autoClickerCost += costIncrease;
        this.addAutoClickers(1);
        }
    }

    activateAutoClickers(){
        this.addDonuts(this.autoClickerCount);
    }

    addDonutMultipliers(numToAdd){
        this.donutMultiplierCount += numToAdd;
    }

    buyDonutMultiplier(){
        this.donutCount -= 10;
        this.addDonutMultipliers(1);
    }

    isAffordable(cost){
        return this.donutCount >= cost;
    }
}

export default DonutMaker;