
/** [] Imported @ 
 * src/views-bootstrap/Checkout/checkout.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React from 'react'
  import PropTypes from 'prop-types'
// [] structure and style components
  import Currency from 'react-currency-formatter'
// [] my components
// [] my images

// -------------------------------------------------------------------------------

const CartTableRow = ( { cartItem } ) => {
  
    return(
      <tr key={ cartItem.id }>
        <td align="center">{ cartItem.number }</td>
        <td align="center">{ cartItem.quantity }</td>
        <td align="center">
          <Currency
            quantity={ cartItem.quantity * cartItem.priec_eu}
            currency="EUR"
          />
        </td>
        <td align="center">
          <Currency
            quantity={ cartItem.quantity * cartItem.preice_export}
            currency="EUR"
          />
        </td>
      </tr>
    );    
}

CartTableRow.propTypes = {  
  cartItem: PropTypes.any,
  actionRemove: PropTypes.func
}
export default (CartTableRow);