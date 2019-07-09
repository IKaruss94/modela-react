import {
    FETCH_CONTACT_BEGIN,
    FETCH_CONTACT_SUCCESS,
    FETCH_CONTACT_ERROR,
    RESET_CONTACT_DATA
  } from '../actions/getContact';



const initialState = {
    contact: [],
    loading: false,
    error: null
};

const contactReducer = ( state = initialState, action) => {
    switch(action.type) {
      case FETCH_CONTACT_BEGIN: {
        return {
          ...state,
          loading: true
        };
      }
      case FETCH_CONTACT_SUCCESS: {
        return {
          ...state,
          loading: false,
          contact: action.payload.res
        };
      }
      case FETCH_CONTACT_ERROR: {
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          contact: []
        };
      }
      case RESET_CONTACT_DATA:
        return { ...state, ...initialState }    

      default:
        return state;
    }
}


export default contactReducer;