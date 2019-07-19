
/** [] Imported @ 
 * src/views-bootstrap/index.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React, { Component } from 'react'
  import { compose } from 'redux'
  import { connect } from 'react-redux'
  import PropTypes from 'prop-types'
  import { firestoreConnect } from 'react-redux-firebase'
// [] structure and style components
  import { Helmet } from 'react-helmet'
  import { Container, Row, Button } from 'react-bootstrap'
  import ReactHtmlParser from 'react-html-parser'
  import { LinkContainer } from 'react-router-bootstrap'
// [] my components
  import PageLoading from '../Errors/pageLoading'
  import GetLable from '../../functions/process_lable'
  import CartTable from './cart_table'

// -------------------------------------------------------------------------------

class Cart extends Component {

  render(){         
    //console.log('cart props', this.props);  

    // [] setting props
      const { 
        history,
        location,

        prop_lang, 
        prop_lables,
        prop_texts, 

        ClearCart, 
      } = this.props;
             
    //[] rendering
      if ( prop_texts === undefined || prop_lables === undefined ) { 
        return PageLoading(location.pathname) 
      }
      else {
        return (
          <Container> 
            <Helmet><title>Cart</title></Helmet>

            <Row className="my_cartText">
            { 
              // [] needed, becouse if value in [ReactHtmlParser] is [undefined] it fires an error
              prop_texts !== undefined ? ( 
                ReactHtmlParser( prop_texts[0][prop_lang] ) 
              ) : ( null ) //console.log('no prop_texts')
              
            }
            </Row>

              <Row id="cartTable">
                <CartTable tableType = 'cart' />
              </Row>   

              <Row className="my_cartProceed">
                <LinkContainer to="/checkout">
                  <Button variant="primary" size="lg" block>{ GetLable( prop_lang, prop_lables, 'button', 'to_checkout') }</Button>
                </LinkContainer>    
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
                  { GetLable( prop_lang, prop_lables, 'button', 'clear_cart') }
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

  prop_texts: state.rootFirestore.ordered.longTexts,
  prop_lables: state.rootFirestore.ordered.lables,
})
const mapDispatchToProps = (dispatch) => {
  return{
    ClearCart: () => { dispatch({ type:'RESET_CART' }) }
  }
}
Cart.propTypes = {    
  history: PropTypes.any, 
  location: PropTypes.any, 
  prop_lang: PropTypes.any,

  prop_lables: PropTypes.any,
  prop_texts: PropTypes.any,

  ClearCart: PropTypes.func,
}
export default compose(
  connect( mapStateToProps, mapDispatchToProps ),
  firestoreConnect([
    { collection: 'longTexts' },
    { collection: 'lables' }
  ])
)(Cart)