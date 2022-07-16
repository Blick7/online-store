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
    'price-lowest': boolean;
    'price-highest': boolean;
    'Name(A-Z)': boolean;
    'Name(Z-A)': boolean;
    'ARRMA RC': boolean;
    'Axial RC': boolean;
    Blade: boolean;
    'E-flite': boolean;
    HobbyZone: boolean;
}
