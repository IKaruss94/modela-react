
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
  import Table from 'react-bootstrap/Table'
// [] my components
  import PageLoading from '../Errors/pageLoading'
  import PageError from '../Errors/pageError'
  import { fetchSingleProduct } from '../../../redux_store/actions/getProduct'
  import Product_Header from '../Product/product_header'
  import Product_Carusel from '../Product/product_imageCarousel'
  import Product_TableRow from '../Product/product_tableRow'
// [] my images

// -------------------------------------------------------------------------------

class Product extends Component {  

  componentDidMount() {   
      this.props.getProduct( this.props.match.params.prod_id );  
  }

  render(){         
    //console.log('product props', this.props);  

    // [] setting props
      const { prop_errorView, prop_loadingView, prop_products, prop_store, prop_cart } = this.props; 

    // [] separate base product info (number == 00) and the veriants
      let product_list = [];
      let product_zero = [];
      prop_products && prop_products.map(prod => {
        if( prod.Number === '00')
          product_zero.push( prod );
        else
          product_list.push( prod );       
      })  
    //
    // [] getting the IDs of the 'previous' & 'next' products
      let prod_id = this.props.match.params.prod_id;   
      let arr_length = prop_store.length;
      let prod_PervNext = [];
      prop_store && prop_store.map( (prod, id) => {
        if( prod.Prod_number === prod_id) {

          if( id === 0 ) {            
            prod_PervNext.push( '00000' );
            prod_PervNext.push( prop_store[id+1].Prod_number );
          }
          else if( id === arr_length-1 ) {
            prod_PervNext.push( prop_store[id-1].Prod_number );
            prod_PervNext.push( '00000' );
          }
          else {
            prod_PervNext.push( prop_store[id-1].Prod_number );
            prod_PervNext.push( prop_store[id+1].Prod_number );
          }

        }

      })  
    //

    // [] what to return / render
      if (prop_errorView) { return PageError(prop_errorView.message) }
      if (prop_loadingView) { return PageLoading() }

    // []
      return (
        <div className="container"> 

            <Product_Header 
              product={ product_zero[0] } 
              prod_PervNext = { prod_PervNext }
              props = { this.props }
            />     

            <div id="prodCarousel" className="row">
                <Product_Carusel 
                  products={prop_products} 
                />
            </div> 

            <div id="prodTable" className="row">
                <Table responsive striped variant="light" className="my_ProductTable">
                  <thead>
                    <tr>
                      <th align="center">Era</th>
                      <th align="center">User</th>
                      <th align="center">Reg. num.</th>
                      <th align="center">Number</th>
                      <th align="center">Name</th>
                      <th align="center">Price (EU)</th>
                      <th align="center">Price (Export)</th>
                      
                      <th align="center">Quantity</th>
                      <th align="center">Add</th>
                      <th align="center">In cart</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      product_list.map( (prod) => {
                        return(
                          <Product_TableRow 
                            key={prod.Number}
                            prod= { prod } 
                            cartItems = { prop_cart }
                            actionAddToCart = { this.props.actionAddToCart }
                            actionRemoveFromCart = { this.props.RemoveFromCart }
                          />
                        ); 

                      })    
                    }
                  </tbody>
                </Table>
            </div>   

            <div className="row">              
            </div>   
        </div>
      )       
    //
  }
}

const mapStateToProps = (state) => ({
  prop_products: state.rootProduct.product,
  prop_loadingView: state.rootProduct.loading,
  prop_errorView: state.rootProduct.error,

  //prop_loadingApp: state.rootStatic.loading,
  //prop_errorApp: state.rootStatic.error,

  prop_cart: state.rootCart.redu_cartItems,
  prop_store: state.rootStatic.store_production
})
const mapDispatchToProps = (dispatch) => {
  return{
    getProduct: (product_id) => { dispatch( fetchSingleProduct(product_id) ) },
    actionAddToCart: (newCartItem) => { console.log('cart?', newCartItem); dispatch({ type:'ADD_TO_CART', newItem: newCartItem }) },
    RemoveFromCart: (id) => { dispatch({ type:'REMOVE_FROM_CART', itemID: id }) },
  }
}
Product.propTypes = {  
  match: PropTypes.any,
  prop_errorView: PropTypes.any,
  prop_loadingView: PropTypes.any,

  prop_products: PropTypes.any,
  prop_store: PropTypes.any,

  prop_cart: PropTypes.any,

  getProduct: PropTypes.func,
  actionAddToCart: PropTypes.func,
  RemoveFromCart: PropTypes.func,
}
export default connect(mapStateToProps, mapDispatchToProps)(Product)