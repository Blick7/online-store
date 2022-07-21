import { filters } from '../filters';
import { Ifilter } from '../type/type';
import Cards from '../view/Cards';
import Filter from '../view/Filter';
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

        if (!filtersBtn || !optionBtn) return; // if doesnt exist

        // add listener for select
        optionBtn.onchange = (event) => {
            // todo
            if (this.container) this.container.innerHTML = ''; // clear container

            const value = (<HTMLSelectElement>event.target)?.value;
            this.filter.filterSortBy(value); // send filter parameter
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
                console.log(filters);
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
            };
        });
    }
}
