import { filters } from '../filters';
import { Idata } from '../type/type';
import { Ifilter } from '../type/type';
import { data } from '../data';
import Cards from './Cards';

//todo: add filters in array and then form cards

export default class Filter {
    private dataCopy: Idata[];
    private filterManufacArray: Array<string>;
    private filterColorArray: Array<string>;

    constructor() {
        //todo
        this.dataCopy = JSON.parse(JSON.stringify(data)); // copy object
        this.filterManufacArray = [];
        this.filterColorArray = [];
    }
    filterCards() {
        // todo
    }

    filterSortBy(value: string) {
        if (value === 'Name(A-Z)') {
            this.dataCopy.sort((first, second) => {
                if (first.name > second.name) return 1;
                if (first.name < second.name) return -1;
                return 0;
            });
        }
        if (value === 'Name(Z-A)') {
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
        if (value) this.filterManufacArray.push(value);

        // console.log(data);

        // console.log(this.dataCopy);
        // apply filter
        const result: Idata[] = [];
        this.dataCopy.forEach((item) => {
            if (this.filterManufacArray.includes(item.manufacturer)) result.push(item);
        });
        this.dataCopy = result;
        const cards = new Cards(<HTMLElement>document.querySelector('.main__cards'));
        cards.getCardsList(this.dataCopy);

        // check if no manufacturer filters is active
        const manufacturers = Object.entries(filters.manufacturer);
        if (manufacturers.every((item) => item[1] === false)) {
            const cards = new Cards(<HTMLElement>document.querySelector('.main__cards'));
            cards.getCardsList(data);
            this.dataCopy = data;
        }
        // if (this.filterManufacArray.length === 0) {
        //     const cards = new Cards(<HTMLElement>document.querySelector('.main__cards'));
        //     cards.getCardsList(data);
        //     this.dataCopy = data;
        //     console.log(this.dataCopy);
        //     this.filterByColor();
        // }
    }

    removeFilterByManufacturer(value: string) {
        const index = this.filterManufacArray.indexOf(value);

        this.filterManufacArray.splice(index, 1);
        this.filterByManufacturer();
        // this.filterByColor(); // call to apply filter by color again
    }

    filterByColor(value?: string) {
        //todo
        if (value) this.filterColorArray.push(value);
        const result: Idata[] = [];
        this.dataCopy.forEach((item) => {
            item.colors.forEach((color) => {
                if (this.filterColorArray.includes(color)) {
                    result.push(item);
                }
            });
        });
        this.dataCopy = result;
        const cards = new Cards(<HTMLElement>document.querySelector('.main__cards'));
        cards.getCardsList(this.dataCopy);

        // if (this.filterColorArray.length === 0) {
        //     const cards = new Cards(<HTMLElement>document.querySelector('.main__cards'));
        //     cards.getCardsList(data);
        // }

        const colors = Object.entries(filters.colors);
        if (colors.every((item) => item[1] === false)) {
            const cards = new Cards(<HTMLElement>document.querySelector('.main__cards'));
            cards.getCardsList(data);
            this.dataCopy = data;
        }
    }

    removefilterByColor(value: string) {
        const index = this.filterColorArray.indexOf(value);
        this.filterColorArray.splice(index, 1);
        this.filterByColor();
        this.filterByManufacturer(); // call to apply filter by manufacturer again
    }
}
