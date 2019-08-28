
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
  import { Helmet } from 'react-helmet'
  import { Container, Row, Button } from 'react-bootstrap'
  import ReactHtmlParser from 'react-html-parser'
  import { LinkContainer } from 'react-router-bootstrap'
// [] my components
  import PageLoading from '../../Errors/pageLoading'
  import LableText from '../../../json/lables'
  import LongText from '../../../json/long_text'
  import GetLabel from '../../functions/process_label'
  import CartTable from '../../multipage_components/cart_table'

// -------------------------------------------------------------------------------

class Cart extends Component {

  render(){         
    //console.log('cart props', this.props);  

    // [] setting props
      const { history, prop_lang, prop_cart, ClearCart } = this.props;
             
    //[] rendering
      if ( LongText === undefined || LableText === undefined ) { 
        return PageLoading() 
      }
      else {
        const cartDetails = LongText.find( elem => {
          return elem.ForPage === 'cart'
        });


        return (
          <Container> 
            <Helmet><title>Cart</title></Helmet>

            <Row className="my_cartText">
              { ReactHtmlParser( cartDetails[prop_lang] ) }
            </Row>

              <Row id="cartTable">
                <CartTable tableType = 'cart' />
              </Row>   

              <Row className="my_cartProceed">
              {
                prop_cart.length > 0 ? (
                  <LinkContainer to="/checkout">
                    <Button variant="primary" size="lg" block>
                      { GetLabel( prop_lang, 'button', 'to_checkout_ok') }
                    </Button>
                  </LinkContainer>  
                ):(                  
                  <LinkContainer to="/store">
                    <Button variant="primary" size="lg" block>
                      { GetLabel( prop_lang, 'button', 'to_checkout_no') }
                    </Button>
                  </LinkContainer>  
                )
              }  
                <Button 
                  variant="secondary" 
                  size="lg" 
                  block
                  onClick = { () => {                      
                    //localStorage.removeItem('state'),
                    ClearCart(),
                    history.push( '/' )
                  } }
                >
                  { GetLabel( prop_lang, 'button', 'clear_cart') }
                </Button>
              </Row>   
              
          </Container>
        )       
      } // [] end of [else]
    //
  } // [] end of [render]
}

const mapStateToProps = (state) => ({
  prop_lang: state.rootLang.lang,
  prop_cart: state.rootCart.redu_cartItems, 
})
const mapDispatchToProps = (dispatch) => {
  return{
    ClearCart: () => { dispatch({ type:'RESET_CART' }) }
  }
}
Cart.propTypes = {    
  history: PropTypes.any,  
  prop_lang: PropTypes.any,
  prop_cart: PropTypes.any,
  ClearCart: PropTypes.func,
}
export default connect( mapStateToProps, mapDispatchToProps )(Cart)