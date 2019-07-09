// imports
import axios from 'axios';
//
  export const FETCH_DOWNLOADS_BEGIN = "FETCH_DOWNLOADS_BEGIN";
  export const FETCH_DOWNLOADS_SUCCESS = "FETCH_DOWNLOADS_SUCCESS";
  export const FETCH_DOWNLOADS_ERROR = "FETCH_DOWNLOADS_ERROR";
  export const RESET_DOWNLOADS_DATA = "RESET_DOWNLOADS_DATA";
//

// get data from server. in JSON format    
  function getDataFromServer () {  
    return(
    axios.get('http://localhost:4000/data/downloads')    
    .then( res_Text => {
      console.log("GET - downloads");
      return {
        axios_resp: res_Text.data.data // chenge here aswell
      };      
    })
    )    
  }
//

// dispatching actions - get AllProducts and ProductCategories
  export const fetchDownloads = () => {
    return dispatch => {
      dispatch({ type: FETCH_DOWNLOADS_BEGIN });                     // begin, start loading and stuff
      return getDataFromServer()                             // receieve data from server in json format
        .then( res => { 
          dispatch({
            type: FETCH_DOWNLOADS_SUCCESS,
            payload: { res }
          });  // stop loading, data is recieved
        })
        .catch(error =>
          dispatch( {
            type: FETCH_DOWNLOADS_ERROR,
            payload: { error }
          } )             // in case of error, throw this
        );
    };
  }
//