
/** [] Imported @ 
 * src/views-bootstrap/Cart/cart.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React from 'react'
  import PropTypes from 'prop-types'
// [] structure and style components
  import Button from 'react-bootstrap/Button'
  import { LinkContainer } from 'react-router-bootstrap'
  import Currency from 'react-currency-formatter'
// [] my components
// [] my images

// -------------------------------------------------------------------------------

const CartTableRow = ( { cartItem, actionRemove } ) => {


  let itemNumber = null;
  if( cartItem.number.slice(-2) === '99' ){
    if( cartItem.reg_num === null )
      itemNumber = <td className="align-middle my_customLink" title="N/A">{ cartItem.number + ' *'}</td>
    else 
      itemNumber = <td className="align-middle my_customLink" title={ cartItem.reg_num }>{ cartItem.number + ' *'}</td>
  } else {
    itemNumber = <td className="align-middle my_customLink">{ cartItem.number }</td>
  }

    return(
      <tr key={ cartItem.id }>
        
        <LinkContainer to={"/store/"+cartItem.number.split('-')[0] }>
          { itemNumber }
        </LinkContainer>
        <td className="align-middle">{ cartItem.quantity }</td>

        <td className="align-middle">
          <Currency
            quantity={ cartItem.quantity * cartItem.priec_eu}
            currency="EUR"
          />
        </td>
        <td className="align-middle">
          <Currency
            quantity={ cartItem.quantity * cartItem.preice_export}
            currency="EUR"
          />
        </td>


        <td className="align-middle">
          <Button 
            key={ cartItem.id } 
            className="my_btnRemove"
            variant="danger" 
            onClick= { () => actionRemove(cartItem.id) }
          >
            <i className="material-icons">close</i>
          </Button>
        </td>

      </tr>
    );    
}

CartTableRow.propTypes = {  
  cartItem: PropTypes.any,
  actionRemove: PropTypes.func
}
export default (CartTableRow);