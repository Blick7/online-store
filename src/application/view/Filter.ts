import { filters } from '../filters';
import { Idata } from '../type/type';
import { data } from '../data';
import Cards from './Cards';
import { getSortByLocalStorage, setLocatStorage } from '../localStorage';

export default class Filter {
    private dataCopy: Idata[];
    public sortBy: string;

    constructor() {
        this.dataCopy = JSON.parse(JSON.stringify(data)); // copy object
        this.sortBy = getSortByLocalStorage() || 'Name(A-Z)'; // set sorting by default
    }

    changeSortBy(value: string) {
        this.sortBy = value;

        // set sortBy localstorage
        const storeSortBy = JSON.stringify(value);
        localStorage.setItem('storeSortBy', storeSortBy);
    }

    filterCards(resetFilters?: boolean) {
        const cardsElement = document.querySelector('.main__cards');
        const cards = new Cards(<HTMLElement>cardsElement);
        (<HTMLElement>cardsElement).innerHTML = '';

        this.setFilters(); // apply filters
        this.filterSortBy(); // then sort

        if (resetFilters) {
            this.dataCopy = JSON.parse(JSON.stringify(data)); // fill data
            this.setFilters(); // apply filters
            this.filterSortBy(); // then sort
            cards.getCardsList(this.dataCopy);
        } else if (this.dataCopy.length === 0) {
            (<HTMLElement>cardsElement).innerHTML = `
                <h2 class="card__error-title">Sorry, no mathes found...</h2>
            `;
        } else {
            cards.getCardsList(this.dataCopy);
        }

        setLocatStorage();
    }

    filterSortBy() {
        switch (this.sortBy) {
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
    }

    setFilters() {
        this.dataCopy = JSON.parse(JSON.stringify(data)); // fill data

        if (filters.manufacturer.length !== 0)
            this.dataCopy = this.dataCopy.filter((item) => filters.manufacturer.includes(item.manufacturer));

        if (filters.colors.length !== 0)
            this.dataCopy = this.dataCopy.filter((item) => filters.colors.some((elem) => item.colors.includes(elem)));

        if (filters.type.length !== 0) this.dataCopy = this.dataCopy.filter((item) => filters.type.includes(item.type));

        if (filters.level.length !== 0)
            this.dataCopy = this.dataCopy.filter((item) => filters.level.includes(item.level));

        this.dataCopy = this.dataCopy.filter(
            (item) => Number(filters.inStockRange[0]) <= item.inStock && Number(filters.inStockRange[1]) >= item.inStock
        );

        this.dataCopy = this.dataCopy.filter(
            (item) => Number(filters.priceRange[0]) <= item.price && Number(filters.priceRange[1]) >= item.price
        );

        if (filters.searchInput.length !== 0)
            this.dataCopy = this.dataCopy.filter(
                (item) =>
                    item.name.toLowerCase().includes(filters.searchInput[0].toLowerCase()) ||
                    item.id.toLowerCase().includes(filters.searchInput[0].toLowerCase())
            );
    }
}
