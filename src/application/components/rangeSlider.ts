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
        start: [0, 1100],
        connect: true,
        range: {
            min: 1,
            max: 1100,
        },
        tooltips: true,
    });
}
