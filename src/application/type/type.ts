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
    manufacturer: {
        'price-lowest': false;
        'price-highest': false;
        'Name(A-Z)': false;
        'Name(Z-A)': false;
        'ARRMA RC': false;
        'Axial RC': false;
        Blade: false;
        'E-flite': false;
        HobbyZone: false;
    };
    Air: false;
    Ground: false;
    Beginner: false;
    Professional: false;
    Experienced: false;
}
