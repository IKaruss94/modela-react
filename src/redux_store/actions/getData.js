// imports
import axios from 'axios';
//
  export const FETCH_DATA_BEGIN = "FETCH_DATA_BEGIN";
  export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
  export const FETCH_DATA_ERROR = "FETCH_DATA_ERROR";
  export const RESET_DATA_DATA = "RESET_DATA_DATA";
//

// get data from server. in JSON format    
  function getDataFromServer ( page_name ) {  
    return(
      axios.get('http://localhost:4000/data/'+ page_name)    
      .then( res_Text => {
        console.log("GET - data -> "+ page_name);
        return {
          [page_name]: res_Text.data.data // chenge here aswell
        };      
      })
    )    
  }
//

// dispatching actions - get AllProducts and ProductCategories
  export const fetchData = ( page_name ) => {
    return dispatch => {
      dispatch({ type: FETCH_DATA_BEGIN });                     // begin, start loading and stuff
      return getDataFromServer( page_name )                             // receieve data from server in json format
        .then( res => { 
          dispatch({
            type: FETCH_DATA_SUCCESS,
            payload: { res }
          });  // stop loading, data is recieved
        })
        .catch(error =>
          dispatch( {
            type: FETCH_DATA_ERROR,
            payload: { error }
          } )             // in case of error, throw this
        );
    };
  }
//