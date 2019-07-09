
/** [] Imported @ 
 * src/views-bootstrap/index.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React, { Component } from 'react'
  import { connect } from 'react-redux'
  import PropTypes from 'prop-types'
// [] structure and style components
  //import ReactHtmlParser from 'react-html-parser'
  import Table from 'react-bootstrap/Table'
  import Form from 'react-bootstrap/Form'
  import Button from 'react-bootstrap/Button'
  import Currency from 'react-currency-formatter'
// [] my components
  import CartTableRow from './cart_tableRow'
  import CheckoutInput from './checkout_formGroup'
// [] my images

// -------------------------------------------------------------------------------

class Checkout extends Component {  
  componentDidMount(){    
    //this.props.GetTexts('checkout');     
  }
  
  // [] my functions  
  //

  render(){         
    console.log('checkout props', this.props);  
    let subtotal_EU=0;
    let subtotal_EXPORT=0;   
    // [] setting props
      const { 
        prop_dataCart, 
        prop_formClient, 
        prop_formDelivery, 
        prop_formPayment, 
        SubmitOrder 
      } = this.props;
    //

    // [] choosing what to render
      return (
        <div className="container"> 

            <div className="row my_checkoutCart">
                <Table responsive striped variant="light" className="my_ProductTable">
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
            </div>   

            <div className="row my_checkoutForm">
                  <Form id="my_formChekout">     
                    <div className="my_formDIV">
                    {                    
                      prop_formClient.map( input => {
                        return <CheckoutInput key={ input.id } data={ input } />
                      })
                    }
                    </div>

                    <div className="my_formDIV">                           
                      <Form.Group controlId="checkoutForm.DeliveryActive">
                        <Form.Label>Will the packege go to different address - </Form.Label>
                        <Form.Check inline type='checkbox' id={`inline-checkbox-1`} />
                      </Form.Group>
                    </div>

                    <div className="my_formDIV">
                    {                    
                      prop_formDelivery && prop_formDelivery.map( input => {
                        return <CheckoutInput key={ input.id } data={ input } />
                      })
                    }
                    </div>
                      
                    <div  className="my_formDIV">
                      <Form.Group controlId="checkoutForm.PaymentSelect">
                        <Form.Label>Payment method</Form.Label>
                        <Form.Control as="select">
                          {                    
                            prop_formPayment && prop_formPayment.map( input => {
                              return <option key={ input.id }>{input.Lable_eng}</option>
                            })
                          }
                        </Form.Control>
                      </Form.Group>
                    </div>

                    <Button variant="primery" onClick={ () => SubmitOrder() }>Submit</Button>

                  </Form>
            </div>   
        </div>
      )       
    //
  }
}

const mapStateToProps = (state) => ({
  prop_dataCart: state.rootCart.redu_cartItems,  

  prop_formClient: state.rootCheckout.client, 
  prop_formDelivery: state.rootCheckout.delivery, 
  prop_formPayment: state.rootCheckout.payment, 

})
const mapDispatchToProps = (dispatch) => {
  return{
    SubmitOrder: (form) => { dispatch({ type:'CHECKOUT_SUBMIT', form: form }) }
  }
}
Checkout.propTypes = {  
  prop_dataCart: PropTypes.any,

  prop_formClient: PropTypes.any, 
  prop_formDelivery: PropTypes.any, 
  prop_formPayment: PropTypes.any, 

  SubmitOrder: PropTypes.func,

}
export default connect(mapStateToProps, mapDispatchToProps)(Checkout)



/**
 * 
                            <div className="" id="buyer">    
                                <label className="form-title"><?php echo $text_title[$lang_href]; ?></label>

                                <label for="pers_name"><?php echo $text_firstname[$lang_href]; ?></label>
                                <input className="form-control" id="pers_name" type="text" value="" required>
                                
                                <label for="last_name"><?php echo $text_lastname[$lang_href]; ?></label>
                                <input className="form-control" id="last_name" type="text" value="" required>
                                
                                <label for="e_mail"><?php echo $text_email[$lang_href]; ?></label>
                                <input className="form-control" id="e_mail" type="email" value="" required>
                                
                                <label for="pers_address"><?php echo $text_address[$lang_href]; ?></label>
                                <input className="form-control" id="pers_address" type="text" value="" required>
                                
                                <label for="pers_city"><?php echo $text_city[$lang_href]; ?></label>
                                <input className="form-control" id="pers_city" type="text" value="" required>
                                
                                <label for="pers_zip"><?php echo $text_zip[$lang_href]; ?></label>
                                <input className="form-control" id="pers_zip" type="text" value="" required>
                                
                                <label for="pers_state"><?php echo $text_state[$lang_href]; ?></label>
                                <input className="form-control" id="pers_state" type="text" value="">
                                
                                <label for="pers_country"><?php echo $text_country[$lang_href]; ?></label>
                                <input className="form-control" id="pers_country" type="text" value="" required>
                                
                                <label for="phone"><?php echo $text_phone[$lang_href]; ?></label>
                                <input className="form-control" id="phone" type="text" value="" required>  
                            </div>
                        </div>                    
                        
                        <div className="row">
                            <div className="col-md-6 checkout-form" style="text-align: center;">
                                <label for="dif_dest"><?php echo $text_diff_dest[$lang_href]; ?></label>
                                <input type="checkbox" id="dif_dest" onChange="$('#extra_form').slideToggle();">
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-12 checkout-form" id="extra_form" style="display:none;">                            
                                <label className="form-title"><?php echo $text_pack_title[$lang_href]; ?></label>
                                <br><br>

                                <label for="pack_name"><?php echo $text_pack_name[$lang_href]; ?></label>
                                <input className="form-control" id="pack_name" type="text" value="">
                                
                                <label for="pack_address"><?php echo $text_pack_address[$lang_href]; ?></label>
                                <input className="form-control" id="pack_address" type="text" value="">
                                
                                <label for="pack_city"><?php echo $text_pack_city[$lang_href]; ?></label>
                                <input className="form-control" id="pack_city" type="text" value="">
                                
                                <label for="pack_zip"><?php echo $text_pack_zip[$lang_href]; ?></label>
                                <input className="form-control" id="pack_zip" type="text" value="">
                                
                                <label for="pack_state"><?php echo $text_pack_state[$lang_href]; ?></label>
                                <input className="form-control" id="pack_state" type="text" value="">
                                
                                <label for="pack_country"><?php echo $text_pack_country[$lang_href]; ?></label>
                                <input className="form-control" id="pack_country" type="text" value="">   
                            </div>
                                
                    <label for="payment" className="form-title"><?php echo $text_payment[$lang_href]; ?></label>  
                    <select className="form-control" id="payment_method" required>
                        <option value="" disabled selected><?php echo $text_pay_default[$lang_href]; ?></option>
                        <option value="paypal">PayPal</option>
                        <option value="bank"><?php echo $text_pay_bank[$lang_href]; ?></option>
                        <option value="unistrim"><?php echo $text_pay_unistrim[$lang_href]; ?></option>
                        <option value="kontakt"><?php echo $text_pay_kontakt[$lang_href]; ?></option>
                        <option value="cash"><?php echo $text_pay_cash[$lang_href]; ?></option>
                    </select>  
 */