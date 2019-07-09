
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
  import { Container, Row, Table, Button } from 'react-bootstrap'
  import ReactHtmlParser from 'react-html-parser'
  import { LinkContainer } from 'react-router-bootstrap'
  import Currency from 'react-currency-formatter'
// [] my components
  import PageLoading from '../Errors/pageLoading'
  import PageError from '../Errors/pageError'
  import { fetchData } from '../../../redux_store/actions/getData'
  import GetLable from '../processLable'

  import CartTableRow from './cart_tableRow'
// [] my images

// -------------------------------------------------------------------------------

class Cart extends Component {

  componentDidMount() {    
    this.props.GetData('cart');  
  }

  render(){         
    //console.log('cart props', this.props);  

    // [] setting props
      const { 
        location, 
        history,
        prop_loading, 
        prop_error, 
        prop_data, 
        prop_cart, 
        RemoveFromCart, 
        ClearCart, 
        prop_lang, 
        prop_lables 
      } = this.props;
    
      let subtotal_EU=0;
      let subtotal_EXPORT=0;         
      const tableColOrder = [ 'number', 'qunatity', 'total_price_vat', 'total_price_noVat', 'remove' ];
      

    // [] choosing what to render
      if (prop_error) { return PageError(prop_error.message) }
      if (prop_loading) { return PageLoading(location.pathname) }
      
      return (
        <Container> 
          <Helmet><title>Cart</title></Helmet>

          <Row className="my_cartText">
            { 
              // [] needed, becouse if value in [ReactHtmlParser] is [undefined] it fires an error
              prop_data !== undefined ? ( 
                ReactHtmlParser( prop_data[0][prop_lang.toUpperCase()] ) 
              ) : ( null ) //console.log('no prop_data')
              
            }
          </Row>

            <Row id="cartTable">
                <Table responsive striped variant="light" className="my_ProductTable">
                  <thead>
                    <tr>                      
                    {
                      tableColOrder.map( (elem, index) => {
                        let temp = prop_lables.find( (obj) => {
                          if( obj.Type === 'table' && obj.Name === elem ) 
                            return obj
                        })
                        
                        if( temp !== undefined ) {
                          return (                            
                            <th key={ index } className="align-middle">{ temp[ prop_lang.toUpperCase() ] }</th>
                          ) 
                        }
                      })
                    }
                    </tr>
                  </thead>
                  <tbody>
                    {
                      prop_cart && prop_cart.map(item => {
                        subtotal_EU = subtotal_EU + (item.quantity * item.priec_eu)
                        subtotal_EXPORT = subtotal_EXPORT + (item.quantity * item.preice_export)
                        return(
                          <CartTableRow 
                            key={ item.id }
                            cartItem={ item } 
                            actionRemove= { RemoveFromCart }
                          />
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
                      <td className="align-middle"></td>        
                    </tr>

                  </tbody>
                </Table>
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
    //
  }
}

const mapStateToProps = (state) => ({
  prop_lang: state.rootLang.lang,
  prop_lables: state.rootStatic.lable_data,
  prop_cart: state.rootCart.redu_cartItems,  

  prop_data: state.rootData.data.cart,
  prop_loading: state.rootData.loading,
  prop_error: state.rootData.error,
})
const mapDispatchToProps = (dispatch) => {
  return{
    GetData: (page_name) => { dispatch( fetchData(page_name) ) },
    RemoveFromCart: (id) => { dispatch({ type:'REMOVE_FROM_CART', itemID: id }) },
    ClearCart: () => { dispatch({ type:'RESET_CART' }) }
  }
}
Cart.propTypes = {    
  location: PropTypes.any, 
  history: PropTypes.any, 
  prop_cart: PropTypes.any,
  prop_lang: PropTypes.any,
  prop_lables: PropTypes.any,

  prop_data: PropTypes.any,
  prop_loading: PropTypes.any,
  prop_error: PropTypes.any,

  GetData: PropTypes.func,
  RemoveFromCart: PropTypes.func,
  ClearCart: PropTypes.func,
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)