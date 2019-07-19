
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
  import { Container, Row, Table } from 'react-bootstrap'
  import { Helmet } from 'react-helmet'
// [] my components
  import PageLoading from '../Errors/pageLoading'
  import GetLable from '../../functions/process_lable'

  import Product_Header from './product_header'
  import Product_Carusel from './product_imageCarousel'
  import Product_TableRow from './product_tableRow'
// [] my images

// -------------------------------------------------------------------------------

class Product extends Component {  

  render(){         
    //console.log('product props', this.props);  

    // [] setting props / destruturing
      const { location, prop_allProducts, prop_storeProd, prop_cart, prop_lables, prop_lang } = this.props; 
      const prod_id = this.props.match.params.prod_id;   
      let arr_products = [];


    //[] get only the nesesery products
      if( prop_allProducts !== undefined ) {
        prop_allProducts && prop_allProducts.map( elem_prods =>{
          if( elem_prods.NUM_id === prod_id && elem_prods.Visable )
            arr_products.push(elem_prods);
        });
      }

    // []
      if ( prop_allProducts === undefined || prop_storeProd === undefined || prop_lables === undefined ) { 
        return PageLoading(location.pathname) 
      }
      else {   
        // [] separate base product info (number == 00) and the veriants
          let product_list = [];
          let product_zero = [];
          arr_products && arr_products.map(elem_prod => {
            if( elem_prod.NUM_variant === '00')
              product_zero = elem_prod;
            else
              product_list.push( elem_prod );       
          })  
        //   

        // [] getting the IDs of the 'previous' & 'next' products
          let arr_length = prop_storeProd.length;
          let prod_PervNext = [];
          prop_storeProd && prop_storeProd.map( (elem_prod, index) => {
            if( elem_prod.NUM_id === prod_id ) {

              if( index === 0 || !(prop_storeProd[index-1].Visable) ) {            
                prod_PervNext.push( '00000' );
                prod_PervNext.push( prop_storeProd[index+1].NUM_id );
              }
              else if( index === arr_length-1 || !(prop_storeProd[index+1].Visable) ) {
                prod_PervNext.push( prop_storeProd[index-1].NUM_id );
                prod_PervNext.push( '00000' );
              }
              else {
                prod_PervNext.push( prop_storeProd[index-1].NUM_id );
                prod_PervNext.push( prop_storeProd[index+1].NUM_id );
              }

            }

          })  
        //  
  
        // [] some variables for table
          let regNum_options = [];  
          let regNum_posibleDupes = [];  
          const tableColOrder = [ 'era', 'user', 'reg_num', 'number', 'name', 'price_vat', 'price_noVat', 'qunatity', 'cart' ];  
        //



        return (
          <Container> 
            <Helmet><title>{'#'+ product_zero.NUM_id }</title></Helmet>
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
                  products={arr_products} 
                />
            </Row> 

            <Row id="prodTable">
                <Table responsive striped variant="light" className="my_ProductTable">
                  <thead>
                    <tr>
                    {
                      tableColOrder.map( (elem, index) => {
                        return (                            
                          <th key={ index } className="align-middle">
                            { GetLable( prop_lang, prop_lables, 'table', elem.toString() ) }
                          </th>
                        ) 
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
                            if ( prod.NUM_variant === '99' ){
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
                            key={prod.NUM_variant}
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
      } // [] end of [else]
    //
  } // [] end of [render]
}

const mapStateToProps = (state) => {
  return {
    prop_lang: state.rootLang.lang,
    prop_cart: state.rootCart.redu_cartItems,

    prop_allProducts: state.rootFirestore.ordered.products,
    prop_storeProd: state.rootFirestore.ordered.uniqueProds,
    prop_lables: state.rootFirestore.ordered.lables,  
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    actionAddToCart: (newCartItem) => { console.log('cart?', newCartItem); dispatch({ type:'ADD_TO_CART', newItem: newCartItem }) },
    RemoveFromCart: (id) => { dispatch({ type:'REMOVE_FROM_CART', itemID: id }) },
  }
}
Product.propTypes = {  
  match: PropTypes.any,
  location: PropTypes.any,

  prop_lang: PropTypes.any,
  prop_cart: PropTypes.any,

  prop_allProducts: PropTypes.any,
  prop_storeProd: PropTypes.any,
  prop_lables: PropTypes.any,

  actionAddToCart: PropTypes.func,
  RemoveFromCart: PropTypes.func,
}

export default compose(
  connect( mapStateToProps, mapDispatchToProps ),
  firestoreConnect([
    { collection: 'products' },
    { collection: 'uniqueProds' },
    { collection: 'lables' }
  ])
)(Product)