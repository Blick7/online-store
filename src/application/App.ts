import Control from './controller/Control';
import Cards from './view/Cards';

export default class App {
    cards: Cards;
    constructor() {
        this.cards = new Cards(<HTMLElement>document.querySelector('.main__cards'));
        this.cards.getCardsList(); // init cards list

        const control = new Control();
    }
}
