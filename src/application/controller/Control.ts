import { filters } from '../filters';
import { Ifilter } from '../type/type';

export default class Control {
    //
    constructor() {
        const sortBtn = document.querySelectorAll<HTMLElement>('.button');
        const optionBtn = document.querySelector<HTMLOptionElement>('.sort-by__select');

        if (!sortBtn || !optionBtn) return;
        optionBtn.onchange = () => {
            console.log(optionBtn.value);
            // console.log(filters[optionBtn.value]);
        };

        sortBtn.forEach((item) => {
            item.onclick = () => {
                console.log(item.textContent);
            };
        });
    }
}
