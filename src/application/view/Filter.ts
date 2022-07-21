import { filters } from '../filters';
import { Idata } from '../type/type';
import { Ifilter } from '../type/type';
import { data } from '../data';
import Cards from './Cards';

//todo: add filters in array and then form cards

export default class Filter {
    private dataCopy: Idata[];
    private filterArray: Array<string>;
    constructor() {
        //todo
        this.dataCopy = JSON.parse(JSON.stringify(data)); // copy object
        this.filterArray = [];
    }
    filterCards() {
        // todo
    }

    filterSortBy(value: string) {
        if (value === 'Name(A-Z)') {
            console.log(data);
            this.dataCopy.sort((first, second) => {
                if (first.name > second.name) return 1;
                if (first.name < second.name) return -1;
                return 0;
            });
        }
        if (value === 'Name(Z-A)') {
            console.log(data);
            this.dataCopy.sort((first, second) => {
                if (first.name < second.name) return 1;
                if (first.name > second.name) return -1;
                return 0;
            });
        }

        if (value === 'price-highest') {
            this.dataCopy.sort((first, second) => {
                if (first.price < second.price) return 1;
                if (first.price > second.price) return -1;
                return 0;
            });
        }

        if (value === 'price-lowest') {
            this.dataCopy.sort((first, second) => {
                if (first.price > second.price) return 1;
                if (first.price < second.price) return -1;
                return 0;
            });
        }
        const cards = new Cards(<HTMLElement>document.querySelector('.main__cards'));
        cards.getCardsList(this.dataCopy);
        return this.dataCopy;
    }

    filterByManufacturer(value?: string) {
        //todo
        if (value) this.filterArray.push(value);
        // apply filter
        const result: Idata[] = [];
        data.forEach((item) => {
            if (this.filterArray.includes(item.manufacturer)) result.push(item);
        });
        this.dataCopy = result;
        const cards = new Cards(<HTMLElement>document.querySelector('.main__cards'));
        cards.getCardsList(this.dataCopy);

        if (this.filterArray.length === 0) {
            const cards = new Cards(<HTMLElement>document.querySelector('.main__cards'));
            cards.getCardsList(data);
        }
    }

    removeFilterByManufacturer(value: string) {
        const index = this.filterArray.indexOf(value);

        this.filterArray.splice(index, 1);
        this.filterByManufacturer();
    }
}
