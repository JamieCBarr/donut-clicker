import DonutMaker from "./DonutMaker";



describe('DonutMaker object', ()=>{

    test('Does DonutMaker return a donutCount', ()=>{
        const underTest = new DonutMaker;
        expect(typeof underTest.donutCount).toMatch('number');
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

    test('Does DonutMaker return an autoClickerCount', ()=>{
        const underTest = new DonutMaker;
        expect(typeof underTest.autoClickerCount).toMatch('number');
    });

    test('Does DonutMaker return an autoClickerCount of 0', ()=>{
        const underTest = new DonutMaker;
        expect(underTest.autoClickerCount).toEqual(0);
    });

    test('Does DonutMaker return 1 autoClicker after 1 purchase', ()=>{
        const underTest = new DonutMaker;
        underTest.addAutoClickers(1);
        expect(underTest.autoClickerCount).toEqual(1);
    });

    test('Does DonutMaker return 25 donuts after autoClicker purchase', ()=>{
        const underTest = new DonutMaker;
        underTest.addDonuts(125);
        expect(underTest.getDonutCount()).toEqual(125);
        underTest.buyAutoClicker();
        expect(underTest.autoClickerCount).toEqual(1);
        expect(underTest.getDonutCount()).toEqual(25);
    });

    test('Does DonutMaker increase autoClickerCost by 10% after each purchase', ()=>{
        const underTest = new DonutMaker;
        underTest.addDonuts(500);
        expect(underTest.autoClickerCost).toEqual(100);
        underTest.buyAutoClicker();
        expect(underTest.autoClickerCost).toEqual(110);
        underTest.buyAutoClicker();
        expect(underTest.autoClickerCost).toEqual(121);
        underTest.buyAutoClicker();
        expect(underTest.autoClickerCost).toEqual(133);
    });

    test('Does DonutMaker.isAffordable() return false when donutCount is under 100', ()=>{
        const underTest = new DonutMaker;
        const cost = underTest.autoClickerCost;
        expect(underTest.isAffordable(cost)).toEqual(false);
        underTest.addDonuts(99);
        expect(underTest.isAffordable(cost)).toEqual(false);
    });

    test('Does DonutMaker.isAffordable() return true when donutCount is 100 or more', ()=>{
        const underTest = new DonutMaker;
        const cost = underTest.autoClickerCost;
        expect(underTest.isAffordable(cost)).toEqual(false);
        underTest.addDonuts(100);
        expect(underTest.isAffordable(cost)).toEqual(true);
        underTest.addDonuts(5000);
        expect(underTest.isAffordable(cost)).toEqual(true);
    });

    test('Does DonutMaker return 0 autoClickers after purchase when under 100 donuts', ()=>{
        const underTest = new DonutMaker;
        underTest.buyAutoClicker();
        expect(underTest.autoClickerCount).toEqual(0);
    });

    test('Does DonutMaker.activateAutoClickers() add 0 donuts with 0 autoClickers', ()=>{
        const underTest = new DonutMaker;
        underTest.activateAutoClickers();
        expect(underTest.getDonutCount()).toEqual(0);
    });

    test('Does DonutMaker.activateAutoClickers() add 1 donut with 1 autoClicker', ()=>{
        const underTest = new DonutMaker;
        underTest.addAutoClickers(1);
        underTest.activateAutoClickers();
        expect(underTest.getDonutCount()).toEqual(1);
    });

    test('Does DonutMaker.activateAutoClickers() add 5 donuts with 5 autoClickers', ()=>{
        const underTest = new DonutMaker;
        underTest.addAutoClickers(5);
        underTest.activateAutoClickers();
        expect(underTest.getDonutCount()).toEqual(5);
    });

    test('Does DonutMaker return a donutMultiplierCount', ()=>{
        const underTest = new DonutMaker;
        expect(typeof underTest.donutMultiplierCount).toMatch('number');
    });

    test('Does DonutMaker return a donutMultiplierCount of 0', ()=>{
        const underTest = new DonutMaker;
        expect(underTest.donutMultiplierCount).toEqual(0);
    });

    test('Does DonutMaker return 1 donutMultiplier after 1 purchase', ()=>{
        const underTest = new DonutMaker;
        underTest.addDonutMultipliers(1);
        expect(underTest.donutMultiplierCount).toEqual(1);
    });

    test('Does DonutMaker return 15 donuts after donutMultiplier purchase', ()=>{
        const underTest = new DonutMaker;
        underTest.addDonuts(25);
        expect(underTest.getDonutCount()).toEqual(25);
        underTest.buyDonutMultiplier();
        expect(underTest.donutMultiplierCount).toEqual(1);
        expect(underTest.getDonutCount()).toEqual(15);
    });
});