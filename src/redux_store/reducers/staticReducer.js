import {
    STATIC_FETCHING,
    STATIC_SUCCESS,
    STATIC_ERROR,
    STATIC_RESET
  } from '../actions/getStatic';



const initialState = {
    store_production: [],
    store_categories: [],
    contact_data: [],
    navbar_data: [],
    lable_data: [],
    loading: true, // !!!!!!!!!!!!
    error: null
};

const storeReducer = ( state = initialState, action) => {
  //console.log('--- ', action.type ,', load =', state.loading);
    switch(action.type) {
      // BEGIN
      case STATIC_FETCHING:
        return {
          ...state,
          loading: true
        };
      // SUCCESS
      case STATIC_SUCCESS:
        return {
          ...state,
          store_production: action.payload.res.storeProd,
          store_categories: action.payload.res.storeCat,
          contact_data: action.payload.res.contact,
          navbar_data: action.payload.res.navbar,
          lable_data: action.payload.res.lable,
          loading: false,
        };
      // ERROR
      case STATIC_ERROR:
        return {
          ...state,
          error: action.payload.error,
          store_production: [],
          store_categories: [],
          contact_data: [],
          navbar_data: [],
          lable_data: [],
          loading: false,
        };
      // RESET
      case STATIC_RESET:
        return { ...state, ...initialState }    

      default:
        return state;
    }
}


export default storeReducer;

/*
    { id:'1', title: 'dam', text:'dam di di dam di di dam di di dam di di dam di di Dam dam dam'},
    { id:'2', title: 'ram', text:'ram dam dam'},
    { id:'3', title: 'scooby', text:'scooby dooby doo, where are you, we got some work to do now'},
    { id:'4', title: 'dooby', text:'scooby dooby doo we need some help from you now'},
    { id:'5', title: 'oof', text:'an text, an text, an text, an text, an text, an text, an text'},
    { id:'6', title: 'lorem', text:'lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum'}
*/