import {
    FETCH_DATA_BEGIN,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_ERROR,
    RESET_DATA_DATA
  } from '../actions/getData';



const initialState = {
    data: [],
    loading: false,
    error: null
};

const dataReducer = ( state = initialState, action) => {
    switch(action.type) {
      case FETCH_DATA_BEGIN: {
        return {
          ...state,
          loading: true
        };
      }
      case FETCH_DATA_SUCCESS: {
        return {
          ...state,
          loading: false,
          data: action.payload.res
        };
      }
      case FETCH_DATA_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          data: []
        };
      }
      case RESET_DATA_DATA:
        return { ...state, ...initialState }    

      default:
        return state;
    }
}


export default dataReducer;