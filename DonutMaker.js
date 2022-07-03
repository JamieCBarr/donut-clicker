class DonutMaker{

    constructor(){
        this.donutCount = 0.0;
        this.autoClicker = new purchasableItem('autoClicker', 100, 0.1)
        this.donutMultiplier = new purchasableItem('donutMultiplier', 10, 0.1)
        this.items = ['autoClicker', 'donutMultiplier'];
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

    isItemAffordable(item){
        return this[item].isAffordableFor(this.donutCount);
    }

    activateAutoClickers(){
        this.clickDonuts(this.getItemCount('autoClicker'));
    }

    getMultiplierValue(){
        return Math.pow(1.2, this.getItemCount('donutMultiplier'));
    }
}


class purchasableItem{

    constructor(name, startingCost, costMult){
        this.name = name;
        this.count = 0;
        this.cost = startingCost;
        this.costMult = costMult;
    }

    addItems(numToAdd){
        this.count += numToAdd;
    }

    buyItemFor(donutCount){
        let donutCost = 0;
        if (this.isAffordableFor(donutCount)){
        donutCost = this.cost;
        let costIncrease = Math.floor(this.cost * this.costMult);
        this.cost += costIncrease;
        this.addItems(1);
        }
        return donutCost;
    }    
    
    isAffordableFor(donutCount){
        return donutCount >= this.cost;
    }    
}

export default DonutMaker;