


const initialState = {
    redu_cartItems: [], //{ id:'', number:'', quantity:'', priec_eu:'', preice_export:'' }
    //[] structure is defined in [views/Products/product_tableRow.js], by [className="my_prod_cartAdd"]
};

const cartReducer = ( state = initialState, action) => {
    switch(action.type) {

      case "ADD_TO_CART": {
        let newCart = state.redu_cartItems.filter(item => {
          return item.id !== action.newItem.id
        })

        if( newCart.length === 0 ) //
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