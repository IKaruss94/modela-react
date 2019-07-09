
import {
  FETCH_DOWNLOADS_BEGIN,
  FETCH_DOWNLOADS_SUCCESS,
  FETCH_DOWNLOADS_ERROR,
  RESET_DOWNLOADS_DATA
  } from './getDownloads';


const initialState = {
    redu_downloads: [],
    loading: true,
    error: null
};

export default function downloadReducer( state = initialState, action) {
    switch(action.type) {
      case FETCH_DOWNLOADS_BEGIN:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case FETCH_DOWNLOADS_SUCCESS:
        return {
          ...state,
          loading: false,
          redu_downloads: action.payload.res.axios_resp
        };
  
      case FETCH_DOWNLOADS_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
          redu_downloads: []
        };
        
      case RESET_DOWNLOADS_DATA:
        return { ...state, ...initialState }  
  
      default:
        return state;
    }
}