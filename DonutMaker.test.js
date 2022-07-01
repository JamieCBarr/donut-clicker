import DonutMaker from "./DonutMaker";



describe('DonutMaker object', ()=>{

    test('Does DonutMaker return a donutCount', ()=>{
        const underTest = new DonutMaker;
        expect(typeof underTest.getDonutCount()).toMatch('number');
    });

    test('Does DonutMaker return a donutCount of 0', ()=>{
        const underTest = new DonutMaker;
        expect(underTest.getDonutCount()).toEqual(0);
    });

    test('Does DonutMaker return 1 after 1 click', ()=>{
        const underTest = new DonutMaker;
        underTest.addDonuts(1);
        expect(underTest.getDonutCount()).toEqual(1);
    });


    //////autoClicker tests///////////////////////////////////////
    test('Does DonutMaker return an autoClickerCount', ()=>{
        const underTest = new DonutMaker;
        expect(typeof underTest.getItemCount('autoClickers')).toMatch('number');
    });

    test('Does DonutMaker return an autoClickerCount of 0', ()=>{
        const underTest = new DonutMaker;
        expect(underTest.getItemCount('autoClickers')).toEqual(0);
    });

    test('Does DonutMaker return 1 autoClicker after 1 purchase', ()=>{
        const underTest = new DonutMaker;
        underTest.addItems(1, 'autoClickers');
        expect(underTest.getItemCount('autoClickers')).toEqual(1);
    });

    test('Does DonutMaker return 25 donuts after autoClicker purchase', ()=>{
        const underTest = new DonutMaker;
        underTest.addDonuts(125);
        expect(underTest.getDonutCount()).toEqual(125);
        underTest.buyItem('autoClickers');
        expect(underTest.getItemCount('autoClickers')).toEqual(1);
        expect(underTest.getDonutCount()).toEqual(25);
    });

    test('Does DonutMaker increase autoClickerCost by 10% after each purchase', ()=>{
        const underTest = new DonutMaker;
        underTest.addDonuts(500);
        expect(underTest.getItemCost('autoClickers')).toEqual(100);
        underTest.buyItem('autoClickers');
        expect(underTest.getItemCost('autoClickers')).toEqual(110);
        underTest.buyItem('autoClickers');
        expect(underTest.getItemCost('autoClickers')).toEqual(121);
        underTest.buyItem('autoClickers');
        expect(underTest.getItemCost('autoClickers')).toEqual(133);
    });

    test('Does isItemAffordable() return false when donutCount is under 100', ()=>{
        const underTest = new DonutMaker;
        const cost = underTest.autoClickerCost;
        expect(underTest.isItemAffordable('autoClickers')).toEqual(false);
        underTest.addDonuts(99);
        expect(underTest.isItemAffordable('autoClickers')).toEqual(false);
    });

    test('Does isItemAffordable() return true when donutCount is 100 or more', ()=>{
        const underTest = new DonutMaker;
        const cost = underTest.autoClickerCost;
        underTest.addDonuts(100);
        expect(underTest.isItemAffordable('autoClickers')).toEqual(true);
        underTest.addDonuts(5000);
        expect(underTest.isItemAffordable('autoClickers')).toEqual(true);
    });

    test('Does DonutMaker return 0 autoClickers after purchase when under 100 donuts', ()=>{
        const underTest = new DonutMaker;
        underTest.buyItem('autoClickers');
        expect(underTest.getItemCount('autoClickers')).toEqual(0);
    });

    test('Does DonutMaker.activateAutoClickers() add 0 donuts with 0 autoClickers', ()=>{
        const underTest = new DonutMaker;
        underTest.activateAutoClickers();
        expect(underTest.getDonutCount()).toEqual(0);
    });

    test('Does DonutMaker.activateAutoClickers() add 1 donut with 1 autoClicker', ()=>{
        const underTest = new DonutMaker;
        underTest.addItems(1, 'autoClickers');
        underTest.activateAutoClickers();
        expect(underTest.getDonutCount()).toEqual(1);
    });

    test('Does DonutMaker.activateAutoClickers() add 5 donuts with 5 autoClickers', ()=>{
        const underTest = new DonutMaker;
        underTest.addItems(5, 'autoClickers');
        underTest.activateAutoClickers();
        expect(underTest.getDonutCount()).toEqual(5);
    });


    //////donutMultiplier tests///////////////////////////////////////
    test('Does DonutMaker return a donutMultiplierCount', ()=>{
        const underTest = new DonutMaker;
        expect(typeof underTest.getItemCount('donutMultipliers')).toMatch('number');
    });

    test('Does DonutMaker return a donutMultiplierCount of 0', ()=>{
        const underTest = new DonutMaker;
        expect(underTest.getItemCount('donutMultipliers')).toEqual(0);
    });

    test('Does DonutMaker return 1 donutMultiplier after 1 purchase', ()=>{
        const underTest = new DonutMaker;
        underTest.addItems(1, 'donutMultipliers');
        expect(underTest.getItemCount('donutMultipliers')).toEqual(1);
    });

    test('Does DonutMaker return 15 donuts after donutMultiplier purchase', ()=>{
        const underTest = new DonutMaker;
        underTest.addDonuts(25);
        expect(underTest.getDonutCount()).toEqual(25);
        underTest.buyItem('donutMultipliers');
        expect(underTest.getItemCount('donutMultipliers')).toEqual(1);
        expect(underTest.getDonutCount()).toEqual(15);
    });

    
});