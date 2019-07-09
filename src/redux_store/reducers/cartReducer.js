/*
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  RESET_CART
} from '../actions/actionCart';

const GET_CART = "GET_CART";
const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";
const UPDATE_CART = "UPDATE_CART";
const RESET_CART = "RESET_CART";
*/



const initialState = {
    redu_cartItems: [], //{ id:'', number:'', quantity:'', priec_eu:'', preice_export:'' }
};

const cartReducer = ( state = initialState, action) => {
    switch(action.type) {

      case "ADD_TO_CART": {
        let newCart = state.redu_cartItems.filter(item => {
          return item.id !== action.newItem.id
        })

        if( newCart.length === 0 )
        {
          return {
            ...state,
            //redu_cartItems: [...state.redu_cartItems, action.newItem]
            redu_cartItems: [action.newItem]
          };
        }
        else {
          return {
            ...state,
            //redu_cartItems: [...state.redu_cartItems, action.newItem]
            redu_cartItems: [...newCart, action.newItem]
          };
        }        
      } // end of ADD_TO_CART

      case "REMOVE_FROM_CART": {        
        let newCart = state.redu_cartItems.filter(item => {
          return action.itemID !== item.id
        })

        return {
          ...state,
          redu_cartItems: newCart
        };
      }

      case "RESET_CART":
        return { ...state, ...initialState }    

      default:
        return state;
    }
}


export default cartReducer;



        /*
        return {
          ...state,
          redu_cartProdID: [...state.redu_cartProdID, action.newItem_ID],
          redu_cartProdNumber: [...state.redu_cartProdNumber, action.newItem_Num],
          redu_cartProdQuantity: [...state.redu_cartProdQuantity, action.newItem_Qty]
        };
        */