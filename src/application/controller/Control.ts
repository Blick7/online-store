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
        const manufacturerBtn = document.querySelectorAll<HTMLElement>('.button-manufacturer');
        const colorBtn = document.querySelectorAll<HTMLDivElement>('.button-color');

        if (!manufacturerBtn || !optionBtn) return; // if doesnt exist

        // add listener for select
        optionBtn.onchange = (event) => {
            if (this.container) this.container.innerHTML = ''; // clear container

            const value = (<HTMLSelectElement>event.target)?.value;
            this.filter.filterSortBy(value); // send filter parameter
        };

        // add listener for manufacturerBtn
        manufacturerBtn.forEach((item) => {
            item.onclick = (event) => {
                if (this.container) this.container.innerHTML = ''; // clear container

                const value = item.textContent;
                if (!value) return;
                filters.manufacturer[value as keyof typeof filters.manufacturer] =
                    !filters.manufacturer[value as keyof typeof filters.manufacturer]; //? invert bool parameter - dont need this

                if ((<HTMLElement>event.target).classList.contains('filter-group__button--active')) {
                    (<HTMLElement>event.target).classList.remove('filter-group__button--active');
                    this.filter.removeFilterByManufacturer(value);
                } else {
                    (<HTMLElement>event.target).classList.add('filter-group__button--active');
                    this.filter.filterByManufacturer(value); // add category to filter
                }
            };
        });

        colorBtn.forEach((item) => {
            item.onclick = (event) => {
                if (this.container) this.container.innerHTML = ''; // clear container

                const value = item.id;
                if (!value) return;
                filters.colors[value as keyof typeof filters.colors] =
                    !filters.colors[value as keyof typeof filters.colors]; //? invert bool parameter - dont need this

                if ((<HTMLElement>event.target).classList.contains('color__item--active')) {
                    (<HTMLElement>event.target).classList.remove('color__item--active');
                    this.filter.removefilterByColor(value);
                } else {
                    (<HTMLElement>event.target).classList.add('color__item--active');
                    this.filter.filterByColor(value);
                }
            };
        });
    }
}
