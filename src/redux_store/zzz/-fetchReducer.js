import {
    FETCH_BEGIN,
    FETCH_SUCCESS,
    FETCH_ERROR,
    RESET_DATA
  } from './-actionFetchData';



const initialState = {
    response: [],
    loading: false,
    error: null
};

const fetchReducer = ( state = initialState, action) => {
    switch(action.type) {
      case FETCH_BEGIN:
        return {
          ...state,
          loading: true
        };
  
      case FETCH_SUCCESS:
        return {
          ...state,
          loading: false,
          response: action.payload.res
        };
  
      case FETCH_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          response: []
        };

      case RESET_DATA:
        return { ...state, ...initialState }    

      default:
        return state;
    }
}


export default fetchReducer;