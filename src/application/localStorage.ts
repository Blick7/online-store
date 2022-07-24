import { filters } from './filters';

export const setLocatStorage = () => {
    // todo
    const storeFilters = JSON.stringify(filters);
    localStorage.setItem('filters', storeFilters);
};

export const getFiltersLocalStorage = () => {
    const string = localStorage.getItem('filters');
    if (!string) return;
    const obj = JSON.parse(string);
    return obj;
};

export const getSortByLocalStorage = () => {
    const string = localStorage.getItem('storeSortBy');
    if (!string) return;
    const obj = JSON.parse(string);
    return obj;
};
