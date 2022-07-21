import { data } from '../data';
import { filters } from '../filters';
import { Idata } from '../type/type';
import Filter from './Filter';
import Control from '../controller/Control';

export default class Cards {
    private container: HTMLElement;

    constructor(container: HTMLElement) {
        this.container = container;
    }

    // showCards() {
    //     this.getCardsList();
    // }
    //! WORK WITH DATA THEN CALL getCardsList FUNCTION
    getCardsList(data: Idata[]): void {
        // if (data) return;
        data.forEach((elem: Idata) => {
            //todo: call filter func here

            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML =
                `
            <div class="card__image" style="background-image: url('${elem.img}')">
            <div class="card__colors">
              ` +
                `${this.setCardColors(elem.colors)}` +
                `
            </div>
            <div class="card__tags">
              <div class="card__id">${elem.id}</div>
              <div class="card__name">${elem.name}</div>
            </div>
          </div>
          <div class="card__information">
            <div class="card__price">$${elem.price}</div>
            <div class="card__manufacturer">Manufacturer: ${elem.manufacturer}</div>
            <div class="card__in-stock">In Stock: ${elem.inStock}</div>
            <div class="card__type">Type: ${elem.type}</div>
            <div class="card__level">Level: ${elem.level}</div>
          </div>
            `;

            this.container.append(card);
        });
    }

    setCardColors(array: Array<string>): string {
        let string = '';
        array.forEach((color) => {
            string += `<div class="colors__item" id="${color}"></div>`;
        });
        return string;
    }
}
