import Cards from '../application/view/Cards';

describe('Test Cards class:', () => {
    document.body.innerHTML = '<div class="main__cards"></div>';

    const cards = new Cards(<HTMLElement>document.querySelector('.main__cards'));

    test('Cards typeof is object', () => {
        expect(typeof cards).toBe('object');
    });

    test('Cards has setCardColor method', () => {
        expect(cards.setCardColors).toBeDefined();
    });

    test('Cards has getCardsList method', () => {
        expect(cards.getCardsList).toBeDefined();
    });

    test('setCardColors returns string', () => {
        const arrayOfColors = ['blue', 'green'];
        const resultString = '<div class="colors__item" id="blue"></div><div class="colors__item" id="green"></div>';

        const spy = jest.spyOn(cards, 'setCardColors').mockImplementation(() => resultString); // set spy to watch method

        expect(cards.setCardColors(arrayOfColors)).toBe(resultString);
    });
});
