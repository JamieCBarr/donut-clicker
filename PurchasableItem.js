class PurchasableItem{

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

export default PurchasableItem;