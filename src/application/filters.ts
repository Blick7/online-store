import { getFiltersLocalStorage } from './localStorage';
import { Ifilter } from './type/type';

export const filters: Ifilter = getFiltersLocalStorage() || {
    searchInput: [],
    manufacturer: [],
    colors: [],
    type: [],
    level: [],
    inStockRange: [],
    priceRange: [],
};
