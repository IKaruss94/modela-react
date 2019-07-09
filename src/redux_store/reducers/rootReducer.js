import { combineReducers } from 'redux';
/**
 * import CheckoutReducer from '../zzz/checkoutReducer';
 * import ContactReducer from './contactReducer';
 * import DownloadReducer from './downloadReducer';
 * import FetchReducer from './-fetchReducer';
 * import TextReducer from './textReducer';
 * import StoreReducer from './storeReducer';
 */


import CartReducer from './cartReducer';
import DataReducer from './dataReducer';
import LanguageReducer from './languageReducer';
import ProductReducer from './productReducer';
import StaticReducer from './staticReducer';


const rootReducer = combineReducers ({
    rootCart: CartReducer,
    rootData: DataReducer,
    rootLang: LanguageReducer,
    rootProduct: ProductReducer,
    rootStatic: StaticReducer,
})

export default rootReducer

