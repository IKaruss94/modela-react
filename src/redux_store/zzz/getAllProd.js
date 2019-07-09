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
      axios.get('http://localhost:4000/products'),
      axios.get('http://localhost:4000/prod_cat')
    ])
    .then(axios.spread((res_allProd, res_prodCat) => {
      console.log('GET - all products');
      return {
        allProd: res_allProd.data.data, 
        prodCat: res_prodCat.data.data
      };      
    }))
    )    
  }
//

// dispatching actions - get AllProducts and ProductCategories
  export const fetchProducts = () => { //might be a problem with const idk
    return dispatch => {
      dispatch({ type: FETCH_PRODUCTS_BEGIN });                     // begin, start loading and stuff
      return getDataFromServer()                             // receieve data from server in json format
        .then( res => { 
          dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: { res }
          });  // stop loading, data is recieved
        })
        .catch(error =>
          dispatch( {
            type: FETCH_PRODUCTS_ERROR,
            payload: { error }
          } )             // in case of error, throw this
        );
    };
  }
//