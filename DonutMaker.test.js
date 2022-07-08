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

    test('Does DonutMaker return 1 donut after 1 click', ()=>{
        const underTest = new DonutMaker;
        underTest.addDonuts(1);
        expect(underTest.getDonutCount()).toEqual(1);
    });


    //////autoClicker tests///////////////////////////////////////

    test('Does DonutMaker return an autoClickerCount', ()=>{
        const underTest = new DonutMaker;
        expect(typeof underTest.getItemCount('autoClicker')).toMatch('number');
    });

    test('Does DonutMaker return an autoClickerCount of 0', ()=>{
        const underTest = new DonutMaker;
        expect(underTest.getItemCount('autoClicker')).toEqual(0);
    });

    test('Does DonutMaker return 1 autoClicker after 1 purchase', ()=>{
        const underTest = new DonutMaker;
        underTest.addItems(1, 'autoClicker');
        expect(underTest.getItemCount('autoClicker')).toEqual(1);
    });

    test('Does DonutMaker return 25 donuts after autoClicker purchase', ()=>{
        const underTest = new DonutMaker;
        underTest.addDonuts(125);
        expect(underTest.getDonutCount()).toEqual(125);
        underTest.buyItem('autoClicker');
        expect(underTest.getItemCount('autoClicker')).toEqual(1);
        expect(underTest.getDonutCount()).toEqual(25);
    });

    test('Does DonutMaker increase autoClickerCost by 30% after each purchase', ()=>{
        const underTest = new DonutMaker;
        underTest.addDonuts(500);
        expect(underTest.getItemCost('autoClicker')).toEqual(100);
        underTest.buyItem('autoClicker');
        expect(underTest.getItemCost('autoClicker')).toEqual(130);
        underTest.buyItem('autoClicker');
        expect(underTest.getItemCost('autoClicker')).toEqual(169);
        underTest.buyItem('autoClicker');
        expect(underTest.getItemCost('autoClicker')).toEqual(219);
    });

    test('Does isItemAffordable() return false when donutCount is under 100', ()=>{
        const underTest = new DonutMaker;
        expect(underTest.isItemAffordable('autoClicker')).toEqual(false);
        underTest.addDonuts(99);
        expect(underTest.isItemAffordable('autoClicker')).toEqual(false);
    });

    test('Does isItemAffordable() return true when donutCount is 100 or more', ()=>{
        const underTest = new DonutMaker;
        const cost = underTest.autoClickerCost;
        underTest.addDonuts(100);
        expect(underTest.isItemAffordable('autoClicker')).toEqual(true);
        underTest.addDonuts(5000);
        expect(underTest.isItemAffordable('autoClicker')).toEqual(true);
    });

    test('Does DonutMaker return 0 autoClickers after purchase when under 100 donuts', ()=>{
        const underTest = new DonutMaker;
        underTest.buyItem('autoClicker');
        expect(underTest.getItemCount('autoClicker')).toEqual(0);
    });

    test('Does DonutMaker.activateAutoClickers() add 0 donuts with 0 autoClickers', ()=>{
        const underTest = new DonutMaker;
        underTest.activateAutoClickers();
        expect(underTest.getDonutCount()).toEqual(0);
    });

    test('Does DonutMaker.activateAutoClickers() add 1 donut with 1 autoClicker', ()=>{
        const underTest = new DonutMaker;
        underTest.addItems(1, 'autoClicker');
        underTest.activateAutoClickers();
        expect(underTest.getDonutCount()).toEqual(1);
    });

    test('Does DonutMaker.activateAutoClickers() add 5 donuts with 5 autoClickers', ()=>{
        const underTest = new DonutMaker;
        underTest.addItems(5, 'autoClicker');
        underTest.activateAutoClickers();
        expect(underTest.getDonutCount()).toEqual(5);
    });


    //////donutMultiplier tests///////////////////////////////////////

    test('Does DonutMaker return a donutMultiplierCount', ()=>{
        const underTest = new DonutMaker;
        expect(typeof underTest.getItemCount('donutMultiplier')).toMatch('number');
    });

    test('Does DonutMaker return a donutMultiplierCount of 0', ()=>{
        const underTest = new DonutMaker;
        expect(underTest.getItemCount('donutMultiplier')).toEqual(0);
    });

    test('Does DonutMaker return 1 donutMultiplier after 1 purchase', ()=>{
        const underTest = new DonutMaker;
        underTest.addItems(1, 'donutMultiplier');
        expect(underTest.getItemCount('donutMultiplier')).toEqual(1);
    });

    test('Does DonutMaker return 15 donuts after donutMultiplier purchase', ()=>{
        const underTest = new DonutMaker;
        underTest.addDonuts(25);
        expect(underTest.getDonutCount()).toEqual(25);
        underTest.buyItem('donutMultiplier');
        expect(underTest.getItemCount('donutMultiplier')).toEqual(1);
        expect(underTest.getDonutCount()).toEqual(15);
    });

    test('Does DonutMaker increase donutMultiplierCost by 35% after each purchase', ()=>{
        const underTest = new DonutMaker;
        underTest.addDonuts(500);
        expect(underTest.getItemCost('donutMultiplier')).toEqual(10);
        underTest.buyItem('donutMultiplier');
        expect(underTest.getItemCost('donutMultiplier')).toEqual(13);
        underTest.buyItem('donutMultiplier');
        expect(underTest.getItemCost('donutMultiplier')).toEqual(17);
        underTest.buyItem('donutMultiplier');
        expect(underTest.getItemCost('donutMultiplier')).toEqual(22);
    });

    test('Does isItemAffordable() return false when donutCount is under 10', ()=>{
        const underTest = new DonutMaker;
        expect(underTest.isItemAffordable('donutMultiplier')).toEqual(false);
        underTest.addDonuts(9);
        expect(underTest.isItemAffordable('donutMultiplier')).toEqual(false);
    });

    test('Does isItemAffordable() return true when donutCount is 10 or more', ()=>{
        const underTest = new DonutMaker;
        underTest.addDonuts(10);
        expect(underTest.isItemAffordable('donutMultiplier')).toEqual(true);
        underTest.addDonuts(50);
        expect(underTest.isItemAffordable('donutMultiplier')).toEqual(true);
    });

    test('Does DonutMaker return 0 donutMultipliers after purchase when under 10 donuts', ()=>{
        const underTest = new DonutMaker;
        underTest.buyItem('donutMultiplier');
        expect(underTest.getItemCount('donutMultiplier')).toEqual(0);
    });

    test('Does DonutMaker return 8 donuts after 7 clicks with 1 donutMultiplier', ()=>{
        const underTest = new DonutMaker;
        underTest.addItems(1, 'donutMultiplier');
        underTest.clickDonuts(7);
        expect(underTest.getDonutCount()).toEqual(8);
    });

    test('Does DonutMaker return 8 donuts after 5 clicks with 4 donutMultipliers', ()=>{
        const underTest = new DonutMaker;
        underTest.addItems(4, 'donutMultiplier');
        underTest.clickDonuts(5);
        expect(underTest.getDonutCount()).toEqual(8);
    });

    test('Does DonutMaker return 8 donuts after activateAutoClickers with 1 donutMultiplier and 7 autoClickers', ()=>{
        const underTest = new DonutMaker;
        underTest.addItems(1, 'donutMultiplier');
        underTest.addItems(7, 'autoClicker');
        underTest.activateAutoClickers();
        expect(underTest.getDonutCount()).toEqual(8);
    });

    test('Does DonutMaker return 8 donuts after activateAutoClickers clicks with 4 donutMultipliers and 5 autoClickers', ()=>{
        const underTest = new DonutMaker;
        underTest.addItems(4, 'donutMultiplier');
        underTest.addItems(5, 'autoClicker');
        underTest.activateAutoClickers();
        expect(underTest.getDonutCount()).toEqual(8);
    });


    //////clickstorm tests///////////////////////////////////////

    test('Does Donut maker return false before hitting milestone', ()=>{
        const underTest = new DonutMaker;
        expect(underTest.isClickStormMilestoneReached()).toEqual(false);
        underTest.addDonuts(49);
        expect(underTest.isClickStormMilestoneReached()).toEqual(false);
    });

    test('Does Donut maker return true after hitting milestone', ()=>{
        const underTest = new DonutMaker;
        underTest.addDonuts(50);
        expect(underTest.isClickStormMilestoneReached()).toEqual(true);
    });
});