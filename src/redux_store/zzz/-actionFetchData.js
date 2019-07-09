// imports
import axios from 'axios';
//
  export const FETCH_BEGIN = "FETCH_BEGIN";
  export const FETCH_SUCCESS = "FETCH_SUCCESS";
  export const FETCH_ERROR = "FETCH_ERROR";
  export const RESET_DATA = "RESET_DATA";
//

// get data from server. in JSON format    
  function getDataFromServer ( pathToJSON ) {  
    return(
    axios.get( pathToJSON )    
    .then( res_Prod => {
      console.log('GET - stuff ', res_Prod);
      return {
        axios_resp: res_Prod.data.data  // chenge here aswell
      };      
    })
    )    
  }
//

// dispatching actions - get AllProducts and ProductCategories
  export const fetchData = ( pathToJSON ) => {
    return dispatch => {
      dispatch({ type: FETCH_BEGIN });                     // begin, start loading and stuff
      return getDataFromServer( pathToJSON )                             // receieve data from server in json format
        .then( res => { 
          dispatch({
            type: FETCH_SUCCESS,
            payload: { res }
          });  // stop loading, data is recieved
        })
        .catch(error =>
          dispatch( {
            type: FETCH_ERROR,
            payload: { error }
          } )             // in case of error, throw this
        );
    };
  }
//