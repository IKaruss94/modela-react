
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

const CartTableRow = ( { tableType, cartItem, actionRemove } ) => {


  let itemNumber = null;
  if( cartItem.number.slice(-2) === '99' ){
    if( cartItem.reg_num === null )
      itemNumber = <td className="align-middle" title="N/A">{ cartItem.number + ' *'}</td>
    else 
      itemNumber = <td className="align-middle" title={ cartItem.reg_num }>{ cartItem.number + ' *'}</td>
  } else {
    itemNumber = <td className="align-middle">{ cartItem.number }</td>
  }

    return(
      <tr key={ cartItem.id }>

        {          
          tableType === 'cart' ? (
            <LinkContainer 
              to={"/store/"+cartItem.number.split('-')[0] }
              className="myCart_numLink"
              >
              { itemNumber }
            </LinkContainer>
          ) : ( itemNumber )
        }
        
        <td className="align-middle">{ cartItem.quantity }</td>

        <td className="align-middle" title={ cartItem.quantity +' * '+  cartItem.priec_eu }>
          <Currency
            quantity={ cartItem.quantity * cartItem.priec_eu}
            currency="EUR"
          />
        </td>
        <td className="align-middle" title={ cartItem.quantity +' * '+  cartItem.preice_export }>
          <Currency
            quantity={ cartItem.quantity * cartItem.preice_export}
            currency="EUR"
          />
        </td>

        {
          tableType === 'cart' ? (
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
          ) : null
        }
        

      </tr>
    );    
}

CartTableRow.propTypes = {  
  tableType: PropTypes.any,
  cartItem: PropTypes.any,
  actionRemove: PropTypes.func
}
export default (CartTableRow);