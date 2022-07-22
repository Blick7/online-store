import { filters } from '../filters';
import { Idata } from '../type/type';
import { Ifilter } from '../type/type';
import { data } from '../data';
import Cards from './Cards';

//todo: add filters in array and then form cards

export default class Filter {
    private dataCopy: Idata[];
    private filterList: Array<string>;
    constructor() {
        //todo
        this.dataCopy = JSON.parse(JSON.stringify(data)); // copy object
        this.filterList = [];
    }
    addFilter(value: Array<string>): void {
        // todo
        // this.filterList.push(value);
    }

    filterSortBy(value: string) {
        //todo change to switch
        switch (value) {
            case 'Name(A-Z)':
                this.dataCopy.sort((first, second) => (first.name > second.name ? 1 : -1));
                break;
            case 'Name(Z-A)':
                this.dataCopy.sort((first, second) => (first.name < second.name ? 1 : -1));
                break;
            case 'price-highest':
                this.dataCopy.sort((first, second) => (first.price < second.price ? 1 : -1));
                break;
            case 'price-lowest':
                this.dataCopy.sort((first, second) => (first.price > second.price ? 1 : -1));
                break;
            default:
                break;
        }
        const cards = new Cards(<HTMLElement>document.querySelector('.main__cards'));
        cards.getCardsList(this.dataCopy);
    }

    filterCards() {
        //todo
    }
}
