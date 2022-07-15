import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const sliderInStock = document.getElementById('sliderInStock') as noUiSlider.target;
const sliderPrice = document.getElementById('sliderPrice') as noUiSlider.target;
export default function createRangeSlider(): void {
    noUiSlider.create(sliderInStock, {
        start: [0, 20],
        connect: true,
        range: {
            min: 1,
            max: 20,
        },
        tooltips: true,
    });

    noUiSlider.create(sliderPrice, {
        start: [0, 200],
        connect: true,
        range: {
            min: 1,
            max: 200,
        },
        tooltips: true,
    });

    sliderInStock.noUiSlider?.on('update', () => {
        if (!sliderInStock.noUiSlider?.get()) return;

        const data = sliderInStock.noUiSlider.get() as string[];
        const qLeft = document.querySelector<HTMLDivElement>('.in-stock__quantity-left');
        const qRight = document.querySelector<HTMLDivElement>('.in-stock__quantity-right');

        if (!qLeft || !qRight) return;
        qLeft.textContent = data[0].split('.')[0];
        qRight.textContent = data[1].split('.')[0];
    });

    sliderPrice.noUiSlider?.on('update', () => {
        if (!sliderPrice.noUiSlider?.get()) return;

        const data = sliderPrice.noUiSlider.get() as string[];
        const qLeft = document.querySelector<HTMLDivElement>('.price__quantity-left');
        const qRight = document.querySelector<HTMLDivElement>('.price__quantity-right');

        if (!qLeft || !qRight) return;
        qLeft.textContent = data[0].split('.')[0];
        qRight.textContent = data[1].split('.')[0];
    });
}
