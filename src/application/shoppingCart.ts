import { getShoppingCartLocalStorage } from './localStorage';
import { Idata } from './type/type';

export const shoppingCart: Array<Idata> = getShoppingCartLocalStorage() || [];
