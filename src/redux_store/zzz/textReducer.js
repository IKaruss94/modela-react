import {
    FETCH_PAGE_TEXT_BEGIN,
    FETCH_PAGE_TEXT_SUCCESS,
    FETCH_PAGE_TEXT_ERROR,
    RESET_PAGE_TEXT_DATA
  } from './getTexts';



const initialState = {
    texts: [],
    loading: true,
    error: null
};

const pageTextReducer = ( state = initialState, action) => {
    switch(action.type) {
      case FETCH_PAGE_TEXT_BEGIN:
        return {
          ...state,
          loading: true
        };
  
      case FETCH_PAGE_TEXT_SUCCESS:
        return {
          ...state,
          loading: false,
          texts: action.payload.res
        };
  
      case FETCH_PAGE_TEXT_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          texts: []
        };

      case RESET_PAGE_TEXT_DATA:
        return { ...state, ...initialState }    

      default:
        return state;
    }
}


export default pageTextReducer;