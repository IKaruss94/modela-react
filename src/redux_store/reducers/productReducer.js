import {
    FETCH_SINGLE_PRODUCT_BEGIN,
    FETCH_SINGLE_PRODUCT_SUCCESS,
    FETCH_SINGLE_PRODUCT_ERROR,
    RESET_SINGLE_PRODUCT_DATA
  } from '../actions/getProduct';



const initialState = {
    product: [],
    loading: true,
    error: null
};

const productReducer = ( state = initialState, action) => {
    switch(action.type) {
      case FETCH_SINGLE_PRODUCT_BEGIN:
        return {
          ...state,
          loading: true
        };
  
      case FETCH_SINGLE_PRODUCT_SUCCESS:
        return {
          ...state,
          loading: false,
          product: action.payload.res.axios_resp
        };
  
      case FETCH_SINGLE_PRODUCT_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          product: []
        };

      case RESET_SINGLE_PRODUCT_DATA:
        return { ...state, ...initialState }    

      default:
        return state;
    }
}


export default productReducer;