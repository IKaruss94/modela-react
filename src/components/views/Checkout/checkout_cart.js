
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
    import Table from 'react-bootstrap/Table'
    import Row from 'react-bootstrap/Row'
    import Col from 'react-bootstrap/Col'
// [] my components
// [] my images

// -------------------------------------------------------------------------------

const CheckoutCart = ( { cart_data } ) => {
  let subtotal_EU=0;
  let subtotal_EXPORT=0;   

  return(      
    <Row >
        <Col className="my_checkout_cart">
        <Table responsive variant="light" className="my_checkout_prodTable">
            <thead>
            <tr>
                <th className="align-middle">Number</th>
                <th className="align-middle">Quantity</th>
                <th className="align-middle">Total Price (EU)</th>
                <th className="align-middle">Total Price (Export)</th>
            </tr>
            </thead>
            <tbody>
            {
                cart_data && cart_data.map(cartItem => {
                subtotal_EU = subtotal_EU + (cartItem.quantity * cartItem.priec_eu)
                subtotal_EXPORT = subtotal_EXPORT + (cartItem.quantity * cartItem.preice_export)
                return(
                     
                    <tr key={ cartItem.id }>
                        <td className="align-middle">{ cartItem.number }</td>
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
                    </tr>
                );              
                })         
            }

            <tr key="subtotals">
                <td colSpan="2"></td>
                <td className="my_cartSubtotal align-middle"> 
                <Currency
                    quantity={ subtotal_EU }
                    currency="EUR"
                />
                </td>
                <td className="my_cartSubtotal align-middle">
                <Currency
                    quantity={ subtotal_EXPORT }
                    currency="EUR"
                />
                </td> 
            </tr>

            </tbody>
        </Table>
        </Col>
    </Row>  
  );    
}

CheckoutCart.propTypes = {  
    cart_data: PropTypes.any,
    actionRemove: PropTypes.func
}
export default (CheckoutCart);

/**
 * 
            <Row >
              <Col className="my_checkout_cart">
                <Table responsive variant="light" className="my_checkout_prodTable">
                  <thead>
                    <tr>
                      <th align="center">Number</th>
                      <th align="center">Quantity</th>
                      <th align="center">Total Price (EU)</th>
                      <th align="center">Total Price (Export)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      prop_dataCart && prop_dataCart.map(item => {
                        subtotal_EU = subtotal_EU + (item.quantity * item.priec_eu)
                        subtotal_EXPORT = subtotal_EXPORT + (item.quantity * item.preice_export)
                        return(
                          <CartTableRow 
                            key={ item.id }
                            cartItem={ item } 
                          />
                        );              
                      })         
                    }

                    <tr key="subtotals">
                      <td colSpan="2"></td>
                      <td align="center" className="my_cartSubtotal"> 
                        <Currency
                          quantity={ subtotal_EU }
                          currency="EUR"
                        />
                      </td>
                      <td align="center" className="my_cartSubtotal">
                        <Currency
                          quantity={ subtotal_EXPORT }
                          currency="EUR"
                        />
                      </td> 
                    </tr>

                  </tbody>
                </Table>
              </Col>
            </Row>   
 */