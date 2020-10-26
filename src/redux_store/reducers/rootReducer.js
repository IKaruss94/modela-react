import { combineReducers } from 'redux';
/**
 * import CheckoutReducer from '../zzz/checkoutReducer';
 * import ContactReducer from './contactReducer';
 * import DownloadReducer from './downloadReducer';
 * import FetchReducer from './-fetchReducer';
 * import TextReducer from './textReducer';
 * import StoreReducer from './storeReducer';
 * import ProductReducer from './productReducer';
 * import StaticReducer from './staticReducer';
 * import DataReducer from './dataReducer';
 */

import CartReducer from './cartReducer';
import LanguageReducer from './languageReducer';
import { firestoreReducer } from 'redux-firestore' 


const rootReducer = combineReducers ({
    rootCart: CartReducer,
    rootFirestore: firestoreReducer,    
    rootLang: LanguageReducer,
    /*
    rootData: DataReducer,
    rootProduct: ProductReducer,
    rootStatic: StaticReducer,
    */
})

export default rootReducer

