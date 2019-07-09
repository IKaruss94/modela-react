// imports
  import axios from 'axios';
//
  export const FETCH_PRODUCTS_BEGIN = "FETCH_PRODUCTS_BEGIN";
  export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
  export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";
  export const RESET_PRODUCTS_DATA = "RESET_PRODUCTS_DATA";
//

// get data from server. in JSON format    
  function getDataFromServer () {  
    return(
    axios.all([
      axios.get('http://localhost:4000/store'),
      axios.get('http://localhost:4000/prod_cat')
    ])
    .then(axios.spread((res_prod, res_cat) => {
      console.log("GET - store");
      return {
        store_prod: res_prod.data.data, 
        store_cat: res_cat.data.data
      };      
    }))
    )    
  }
//

// dispatching actions - get AllProducts and ProductCategories
  export const fetchStoreData = () => { //might be a problem with const idk
    return ( dispatch ) => {

      dispatch({ type: FETCH_PRODUCTS_BEGIN });           // begin, start loading and stuff

      return getDataFromServer()                          // receieve data from server in json format
      .then( res => { 
        dispatch({
          type: FETCH_PRODUCTS_SUCCESS,                   // stop loading, data is recieved
          payload: { res }
        });  
      })
      
      .catch(error =>                                       
        dispatch( {
          type: FETCH_PRODUCTS_ERROR,                     // in case of error, throw this
          payload: { error }
        } )             
      );

    };
  }
//