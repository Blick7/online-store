import Control from './controller/Control';
import Filter from './view/Filter';

export default class App {
    private control: Control;
    private filter: Filter;

    constructor() {
        this.control = new Control(<HTMLElement>document.querySelector('.main__cards'));

        this.filter = new Filter();
        this.filter.filterCards();
    }
}
