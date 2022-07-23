export interface Idata {
    num: number;
    name: string;
    id: string;
    manufacturer: string;
    inStock: number;
    price: number;
    colors: string[];
    type: string;
    level: string;
    img: string;
}

export interface Ifilter {
    searchInput: Array<string>;
    manufacturer: Array<string>;
    colors: Array<string>;
    type: Array<string>;
    level: Array<string>;
    inStockRange: Array<string>;
    priceRange: Array<string>;
}
