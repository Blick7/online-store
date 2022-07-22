import { filters } from '../filters';
import { Ifilter } from '../type/type';
import Cards from '../view/Cards';
import Filter from '../view/Filter';
import * as noUiSlider from 'nouislider';

// todo move code from constructor to method and call it in function
export default class Control {
    private container: HTMLElement;
    private filter: Filter;

    constructor(container: HTMLElement) {
        this.container = container;
        this.setButtonListeners();
        this.filter = new Filter();
    }

    setButtonListeners() {
        const optionBtn = document.querySelector<HTMLOptionElement>('.sort-by__select');
        const filtersBtn = document.querySelectorAll<HTMLElement>('.button');
        const colorBtn = document.querySelectorAll<HTMLDivElement>('.button-color');
        const resetAllFiltersBtn = document.querySelector<HTMLDivElement>('.reset-button');

        const sliderInStock = document.getElementById('sliderInStock') as noUiSlider.target;
        const sliderPrice = document.getElementById('sliderPrice') as noUiSlider.target;

        if (!filtersBtn || !optionBtn || !resetAllFiltersBtn) return; // if doesnt exist

        // add listener for select
        optionBtn.onchange = (event) => {
            // todo
            if (this.container) this.container.innerHTML = ''; // clear container

            const value = (<HTMLSelectElement>event.target)?.value;
            console.log(value);
            this.filter.changeSortBy(value);
            this.filter.filterCards();
        };

        // add listener for manufacturerBtn
        filtersBtn.forEach((item) => {
            item.onclick = (event) => {
                // todo
                //! USE SORT WHEN SORT BY CATEGORY
                // get object key and value
                const objKey = (<HTMLElement>event.target)?.dataset.filter;
                const objValue = (<HTMLElement>event.target)?.id;

                if ((<HTMLElement>event.target).classList.contains('filter-group__button--active')) {
                    (<HTMLElement>event.target).classList.remove('filter-group__button--active');
                    // remove item from filter
                    const index = filters[objKey as keyof typeof filters].indexOf(objValue);
                    filters[objKey as keyof typeof filters].splice(index, 1);
                } else {
                    (<HTMLElement>event.target).classList.add('filter-group__button--active');
                    // add item to filter
                    filters[objKey as keyof typeof filters].push(objValue);
                }
                this.filter.filterCards();
            };
        });

        colorBtn.forEach((item) => {
            item.onclick = (event) => {
                const objKey = (<HTMLElement>event.target)?.dataset.filter;
                const objValue = (<HTMLElement>event.target)?.id;

                if ((<HTMLElement>event.target).classList.contains('color__item--active')) {
                    (<HTMLElement>event.target).classList.remove('color__item--active');
                    // remove item from filter
                    const index = filters[objKey as keyof typeof filters].indexOf(objValue);
                    filters[objKey as keyof typeof filters].splice(index, 1);
                } else {
                    (<HTMLElement>event.target).classList.add('color__item--active');
                    // add item to filter
                    filters[objKey as keyof typeof filters].push(objValue);
                }
                this.filter.filterCards();
            };
        });

        resetAllFiltersBtn.onclick = () => {
            //! TODO: fix reset filter
            // clear all filters
            const keys = Object.keys(filters);
            keys.forEach((item) => {
                filters[item as keyof typeof filters] = [];
            });

            // remove active classlist
            colorBtn.forEach((item) => {
                item.classList.remove('color__item--active');
            });

            this.filter.filterCards();
            console.log(this.filter);
        };

        sliderInStock.noUiSlider?.on('update', () => {
            if (!sliderInStock.noUiSlider?.get()) return;

            const data = sliderInStock.noUiSlider.get() as string[];
            const qLeft = document.querySelector<HTMLDivElement>('.in-stock__quantity-left');
            const qRight = document.querySelector<HTMLDivElement>('.in-stock__quantity-right');
            const leftVal = data[0].split('.')[0];
            const rightVal = data[1].split('.')[0];

            if (!qLeft || !qRight) return;

            qLeft.textContent = leftVal;
            qRight.textContent = rightVal;

            const inStockRange = [];
            inStockRange.push(leftVal);
            inStockRange.push(rightVal);

            filters.inStockRange = inStockRange;
            console.log(leftVal);
            if (this.filter) this.filter.filterCards(); // apply filter
        });

        sliderPrice.noUiSlider?.on('update', () => {
            if (!sliderPrice.noUiSlider?.get()) return;

            const data = sliderPrice.noUiSlider.get() as string[];
            const qLeft = document.querySelector<HTMLDivElement>('.price__quantity-left');
            const qRight = document.querySelector<HTMLDivElement>('.price__quantity-right');
            const leftVal = data[0].split('.')[0];
            const rightVal = data[1].split('.')[0];

            if (!qLeft || !qRight) return;

            qLeft.textContent = leftVal;
            qRight.textContent = rightVal;

            const priceRange = [];
            priceRange.push(leftVal);
            priceRange.push(rightVal);

            filters.priceRange = priceRange;

            if (this.filter) this.filter.filterCards(); // apply filterer
        });
    }
}
