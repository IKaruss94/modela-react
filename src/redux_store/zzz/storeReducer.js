import {
    FETCH_PRODUCTS_BEGIN,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR,
    RESET_PRODUCTS_DATA
  } from './getStore';



const initialState = {
    store_production: [],
    store_categories: [],
    loading: false,
    error: null
};

const storeReducer = ( state = initialState, action) => {
    switch(action.type) {
      case FETCH_PRODUCTS_BEGIN:
        return {
          ...state,
          loading: true
        };
  
      case FETCH_PRODUCTS_SUCCESS:
        return {
          // All done: set loading "false".
          // Also, replace the items with the ones from the server
          ...state,
          loading: false,
          store_production: action.payload.res.store_prod,
          store_categories: action.payload.res.store_cat
        };
  
      case FETCH_PRODUCTS_ERROR:
        return {
          // The request failed, but it did stop, so set loading to "false".
          // Save the error, and we can display it somewhere
          // Since it failed, we don't have items to display anymore, so set it empty.
          // This is up to you and your app though: maybe you want to keep the items
          // around! Do whatever seems right.
          ...state,
          loading: false,
          error: action.payload.error,
          store_production: [],
          store_categories: []
        };

      case RESET_PRODUCTS_DATA:
        return { ...state, ...initialState }    

      default:
        return state;
    }
}


export default storeReducer;

/*
    { id:'1', title: 'dam', text:'dam di di dam di di dam di di dam di di dam di di Dam dam dam'},
    { id:'2', title: 'ram', text:'ram dam dam'},
    { id:'3', title: 'scooby', text:'scooby dooby doo, where are you, we got some work to do now'},
    { id:'4', title: 'dooby', text:'scooby dooby doo we need some help from you now'},
    { id:'5', title: 'oof', text:'an text, an text, an text, an text, an text, an text, an text'},
    { id:'6', title: 'lorem', text:'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'}
*/