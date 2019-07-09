
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
  import { Container, Row, Table } from 'react-bootstrap'
  import { Helmet } from 'react-helmet'
// [] my components
  import PageLoading from '../Errors/pageLoading'
  import PageError from '../Errors/pageError'
  import { fetchSingleProduct } from '../../../redux_store/actions/getProduct'
  import GetLable from '../processLable'

  import Product_Header from './product_header'
  import Product_Carusel from './product_imageCarousel'
  import Product_TableRow from './product_tableRow'
// [] my images

// -------------------------------------------------------------------------------

class Product extends Component {  

  componentDidMount() {   
      this.props.getProduct( this.props.match.params.prod_id );  
  }

  render(){         
    //console.log('product props', this.props);  

    // [] setting props
      const { prop_errorView, prop_loadingView, prop_products, prop_store, prop_cart, prop_lables, prop_lang } = this.props; 

    // [] separate base product info (number == 00) and the veriants
      let product_list = [];
      let product_zero = [];
      prop_products && prop_products.map(prod => {
        if( prod.Number === '00')
          product_zero = prod;
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
    // [] some variables for table
      let regNum_options = [];  
      let regNum_posibleDupes = [];  
      const tableColOrder = [ 'era', 'user', 'reg_num', 'number', 'name', 'price_vat', 'price_noVat', 'qunatity', 'cart' ];
                    
    //

      return (
        <Container> 
          <Helmet><title>{'#'+ product_zero.ID }</title></Helmet>
          <Row>
            <Product_Header 
              product={ product_zero } 
              prod_PervNext = { prod_PervNext }
              props = { this.props }
              prop_lang = { prop_lang }
              prop_lables = { prop_lables }
            />  
          </Row>   

          <Row id="prodCarousel">
              <Product_Carusel 
                products={prop_products} 
              />
          </Row> 

          <Row id="prodTable">
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
                    product_list.map( (prod) => {
                      /* Prepering registration number select, for (model kit) row */
                        // [] adding values to list of [regNum_noDupes]
                          if( prod.Regist_num !== '' )                        
                            regNum_posibleDupes.push( prod.Regist_num ); 
                        // [] remove duplicates                                                         
                          // eslint-disable-next-line        
                          const regNum_noDupes = [ ... new Set(regNum_posibleDupes) ];       
                        // []
                          if ( prod.Number === '99' ){
                            regNum_noDupes.forEach( elem => {
                              regNum_options.push({ 
                                value: elem, 
                                label: elem.toString() 
                              });
                              // [] input format is necesery for use in [react-select]
                            });
                          }      
                      /** */

                      return(
                        <Product_TableRow 
                          key={prod.Number}
                          prod= { prod } 
                          cartItems = { prop_cart }
                          regNum_options = { regNum_options }
                          actionAddToCart = { this.props.actionAddToCart }
                          actionRemoveFromCart = { this.props.RemoveFromCart }
                          text_addToCart = { GetLable( prop_lang, prop_lables, 'table', 'btn_addCart') }
                          text_kitRegInfo = { GetLable( prop_lang, prop_lables, 'text', 'kit_reg_info') }
                          // [] in the last 2 passed values - the ones as string, point to specific entrys in [prop_lables]
                        />
                      ); 

                    })    
                  }
                </tbody>
              </Table>
          </Row>   
 
      </Container>
      )       
    //
  }
}

const mapStateToProps = (state) => ({
  prop_lang: state.rootLang.lang,
  prop_lables: state.rootStatic.lable_data,

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
  prop_lables: PropTypes.any,
  prop_lang: PropTypes.any,

  prop_cart: PropTypes.any,

  getProduct: PropTypes.func,
  actionAddToCart: PropTypes.func,
  RemoveFromCart: PropTypes.func,
}
export default connect(mapStateToProps, mapDispatchToProps)(Product)