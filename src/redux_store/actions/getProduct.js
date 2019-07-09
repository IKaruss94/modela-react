// imports
  import axios from 'axios';
//
  export const FETCH_SINGLE_PRODUCT_BEGIN = "FETCH_SINGLE_PRODUCT_BEGIN";
  export const FETCH_SINGLE_PRODUCT_SUCCESS = "FETCH_SINGLE_PRODUCT_SUCCESS";
  export const FETCH_SINGLE_PRODUCT_ERROR = "FETCH_SINGLE_PRODUCT_ERROR";
  export const RESET_SINGLE_PRODUCT_DATA = "RESET_SINGLE_PRODUCT_DATA";
//

// get data from server. in JSON format    
  function getDataFromServer ( prod_id ) {  
    return(
    axios.get('http://localhost:4000/products/'+ prod_id)    
    .then( res_Prod => {
      console.log("GET - product #"+ prod_id);
      return {
        axios_resp: res_Prod.data.data  // chenge here aswell
      };      
    })
    )    
  }
//

// dispatching actions - get AllProducts and ProductCategories
  export const fetchSingleProduct = ( prod_id ) => {
    return dispatch => {
      dispatch({ type: FETCH_SINGLE_PRODUCT_BEGIN });                     // begin, start loading and stuff
      return getDataFromServer( prod_id )                             // receieve data from server in json format
        .then( res => { 
          dispatch({
            type: FETCH_SINGLE_PRODUCT_SUCCESS,
            payload: { res }
          });  // stop loading, data is recieved
        })
        .catch(error =>
          dispatch( {
            type: FETCH_SINGLE_PRODUCT_ERROR,
            payload: { error }
          } )             // in case of error, throw this
        );
    };
  }
//