// imports
  import axios from 'axios';
//
  export const STATIC_FETCHING = "FETCH_STATIC_DATA_BEGIN";
  export const STATIC_SUCCESS = "FETCH_STATIC_DATA_SUCCESS";
  export const STATIC_ERROR = "FETCH_STATIC_DATA_ERROR";
  export const STATIC_RESET = "RESET_STATIC_DATA_DATA";
//

// get data from server. in JSON format    
  function getDataFromServer () {  
    return(
    axios.all([
      axios.get('http://localhost:4000/store'),
      axios.get('http://localhost:4000/prod_cat'),
      axios.get( 'http://localhost:4000/data/contact' ),
      axios.get( 'http://localhost:4000/data/navbar' ),
      axios.get( 'http://localhost:4000/data/lables' )
    ])
    .then(axios.spread((res_storeProd, res_storeCat, res_contact, res_nav, res_lable) => {
      console.log("GET - static");
      return {
        storeProd: res_storeProd.data.data, 
        storeCat: res_storeCat.data.data,
        contact: res_contact.data.data,
        navbar: res_nav.data.data,
        lable: res_lable.data.data
      };      
    }))
    )    
  }
//

// []
  export const fetchStaticData = () => {
    return dispatch => {
      dispatch({ type: STATIC_FETCHING });   // [] begin, start loading

      getDataFromServer()         // [] receieve data from server in json format
        .then( res => { 
          dispatch({
            type: STATIC_SUCCESS,
            payload: { res }
          });  // [] stop loading, data is recieved
        })
        .catch(error =>
          dispatch( {
            type: STATIC_ERROR,
            payload: { error }
          } )             // [] in case of error, throw this
        );
    };
  }
//

/**
 * // imports
  import axios from 'axios';
//
  export const STATIC_FETCHING = "FETCH_STATIC_DATA_BEGIN";
  export const STATIC_SUCCESS = "FETCH_STATIC_DATA_SUCCESS";
  export const STATIC_ERROR = "FETCH_STATIC_DATA_ERROR";
  export const STATIC_RESET = "RESET_STATIC_DATA_DATA";
//

// get data from server. in JSON format    
  function getDataFromServer () {  
    //return(
      axios.all([
        axios.get('http://localhost:4000/store'),
        axios.get('http://localhost:4000/prod_cat'),
        axios.get( 'http://localhost:4000/data/contact' ),
        axios.get( 'http://localhost:4000/data/navbar' ),
        axios.get( 'http://localhost:4000/data/lables' )
      ])
      .then(axios.spread((res_storeProd, res_storeCat, res_contact, res_nav, res_lable) => {
        console.log("GET - static");
        return({
          storeProd: res_storeProd.data.data, 
          storeCat: res_storeCat.data.data,
          contact: res_contact.data.data,
          navbar: res_nav.data.data,
          lable: res_lable.data.data
        });      
      }))
    //)    // [] end of return
  }
//

// [] dispatching actions - get AllProducts and ProductCategories
  //export const fetchStaticData = () => { // [] might be a problem with const, idk
  
  export async function fetchStaticData( ) {
    return ( dispatch ) => {

      console.log('trying');
      try{
        console.log('trying 2');
        //dispatch({ type: STATIC_FETCHING });      // [] start loading

        getDataFromServer()                 // [] receieve data from server in json format
        .then( res => { 
          return (
            dispatch({
              type: STATIC_SUCCESS,
              payload: { res }
            })
          )
           // [] stop loading, data is recieved
        })
      }
      catch( error ) {
        dispatch({
          type: STATIC_ERROR,
          payload: { error }
        })   // [] in case of error, throw this
      }

    }; // [] end of [return]
  }
//
 */