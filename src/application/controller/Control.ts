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
        const manufacturerBtn = document.querySelectorAll<HTMLElement>('.button-manufacturer');
        const optionBtn = document.querySelector<HTMLOptionElement>('.sort-by__select');

        if (!manufacturerBtn || !optionBtn) return; // if doesnt exist
        // optionBtn.onchange = () => {
        //     const value = optionBtn.value;
        //     filters[value as keyof typeof filters] = !filters[value as keyof typeof filters]; // invert bool paremeter
        // };
        // add listener for select

        optionBtn.onchange = (event) => {
            if (this.container) this.container.innerHTML = ''; // clear container

            const value = (<HTMLSelectElement>event.target)?.value;
            filters[value as keyof typeof filters] = !filters[value as keyof typeof filters];
            this.filter.filterSortBy(value); // send filter parameter
        };

        // add listener for buttons
        manufacturerBtn.forEach((item) => {
            item.onclick = (event) => {
                if (this.container) this.container.innerHTML = ''; // clear container

                const value = item.textContent;
                if (!value) return;
                filters[value as keyof typeof filters] = !filters[value as keyof typeof filters]; // invert bool parameter

                if ((<HTMLElement>event.target).classList.contains('filter-group__button--active')) {
                    (<HTMLElement>event.target).classList.remove('filter-group__button--active');
                    this.filter.removeFilterByManufacturer(value);
                } else {
                    (<HTMLElement>event.target).classList.add('filter-group__button--active');
                    this.filter.filterByManufacturer(value); // add category to filter
                }
            };
        });
    }
}
