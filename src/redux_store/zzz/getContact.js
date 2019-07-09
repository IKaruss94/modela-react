// imports
import axios from 'axios';
//
  export const FETCH_CONTACT_BEGIN = "FETCH_CONTACT_BEGIN";
  export const FETCH_CONTACT_SUCCESS = "FETCH_CONTACT_SUCCESS";
  export const FETCH_CONTACT_ERROR = "FETCH_CONTACT_ERROR";
  export const RESET_CONTACT_DATA = "RESET_CONTACT_DATA";
//

// get data from server. in JSON format    
  function getDataFromServer () {  
    return(
    axios.get( 'http://localhost:4000/contact' )    
    .then( res_Prod => {
      console.log("GET - contact");
      return {
        axios_resp: res_Prod.data.data  // chenge here aswell
      };      
    })
    )    
  }
//

// dispatching actions - get AllProducts and ProductCategories
  export const fetchContact = () => {    
    return (dispatch) => {

      dispatch({ type: FETCH_CONTACT_BEGIN });                     // begin, start loading and stuff
      return getDataFromServer()                             // receieve data from server in json format
      
      .then( res => { 
        dispatch({
          type: FETCH_CONTACT_SUCCESS,
          payload: { res }
        });  // stop loading, data is recieved
      })
      
      .catch(error =>
        dispatch( {
          type: FETCH_CONTACT_ERROR,
          payload: { error }
        } )             // in case of error, throw this
      );
    };
  }
//