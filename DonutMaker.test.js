import DonutMaker from "./DonutMaker";



describe('DonutMaker object', ()=>{

    test('Does DonutMaker return a donutCount', ()=>{
        const underTest = new DonutMaker;
        expect(typeof underTest.donutCount).toMatch('number');
    });

    test('Does DonutMaker return 0', ()=>{
        const underTest = new DonutMaker;
        expect(underTest.donutCount).toEqual(0);
    });

    test('Does DonutMaker return 1 after 1 click', ()=>{
        const underTest = new DonutMaker;
        underTest.addDonuts(1);
        expect(underTest.donutCount).toEqual(1);
    });

});