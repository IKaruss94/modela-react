// imports
import axios from 'axios';
//
  export const FETCH_PAGE_TEXT_BEGIN = "FETCH_PAGE_TEXT_BEGIN";
  export const FETCH_PAGE_TEXT_SUCCESS = "FETCH_PAGE_TEXT_SUCCESS";
  export const FETCH_PAGE_TEXT_ERROR = "FETCH_PAGE_TEXT_ERROR";
  export const RESET_PAGE_TEXT_DATA = "RESET_PAGE_TEXT_DATA";
//

// get data from server. in JSON format    
  function getDataFromServer ( page_name ) {  
    return(
    axios.get('http://localhost:4000/texts/'+ page_name)    
    .then( res_Text => {
      console.log("GET - texts for -> "+ page_name);
      return {
        [page_name]: res_Text.data.data // chenge here aswell
      };      
    })
    )    
  }
//

// dispatching actions - get AllProducts and ProductCategories
  export const fetchPageText = ( page_name ) => {
    return dispatch => {
      dispatch({ type: FETCH_PAGE_TEXT_BEGIN });                     // begin, start loading and stuff
      return getDataFromServer( page_name )                             // receieve data from server in json format
        .then( res => { 
          dispatch({
            type: FETCH_PAGE_TEXT_SUCCESS,
            payload: { res }
          });  // stop loading, data is recieved
        })
        .catch(error =>
          dispatch( {
            type: FETCH_PAGE_TEXT_ERROR,
            payload: { error }
          } )             // in case of error, throw this
        );
    };
  }
//