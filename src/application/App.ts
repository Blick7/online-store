import Control from './controller/Control';
import { data } from './data';
import Cards from './view/Cards';

export default class App {
    private cards: Cards;
    private control: Control;

    constructor() {
        this.cards = new Cards(<HTMLElement>document.querySelector('.main__cards'));
        this.control = new Control(<HTMLElement>document.querySelector('.main__cards'));

        this.cards.getCardsList(data);
    }
}
