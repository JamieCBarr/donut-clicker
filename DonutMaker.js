import PurchasableItem from "./PurchasableItem";

class DonutMaker{

    constructor(){
        this.reset();
    }

    reset(){
        this.donutCount = 0.0;
        this.autoClicker = new PurchasableItem('autoClicker', 100, 0.3)
        this.donutMultiplier = new PurchasableItem('donutMultiplier', 10, 0.35)
        this.items = ['autoClicker', 'donutMultiplier'];
        this.clickStormTime = 60; //Length of clickStorm in seconds
        this.donutMultiplierValue = 1.15;
    }

    addDonuts(numToAdd){
        this.donutCount += numToAdd;
    }

    clickDonuts(clicks){
        this.addDonuts(clicks * this.getMultiplierValue());
    }

    getDonutCount(){
        return Math.floor(this.donutCount);
    }

    addItems(numToAdd, item){
        this[item].addItems(numToAdd);
    }

    buyItem(item){
        this.donutCount -= this[item].buyItemFor(this.donutCount);
    }

    getItemCount(item){
        return this[item].count;
    }

    getItemCost(item){
        return this[item].cost;
    }

    getItemCostMult(item){
        return this[item].costMult;
    }

    getClickStormTime(){
        return this.clickStormTime * 1000;
    }

    isItemAffordable(item){
        return this[item].isAffordableFor(this.donutCount);
    }

    activateAutoClickers(){
        this.clickDonuts(this.getItemCount('autoClicker'));
    }

    getMultiplierValue(){
        return Math.pow(this.donutMultiplierValue, this.getItemCount('donutMultiplier'));
    }
}

export default DonutMaker;