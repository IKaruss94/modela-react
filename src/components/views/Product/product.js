
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
  import { firestoreConnect, isLoaded } from 'react-redux-firebase'
// [] structure and style components
  import { Container, Row, Table } from 'react-bootstrap'
  import { Helmet } from 'react-helmet'
// [] my components
  import PageLoading from '../../Errors/pageLoading'
  import GetLabel from '../../functions/process_label'

  import Product_Header from './product_header'
  import Product_Carusel from './product_imageCarousel'
  import Product_TableRow from './product_tableRow'
// [] my images

// -------------------------------------------------------------------------------

class Product extends Component {  

  render(){         
    //console.log('product props', this.props);  

    // [] setting props / destruturing
      const { 
        prop_lang, prop_cart, 
        firestore_products, firestore_uniqueProds, 
        actionAddToCart, RemoveFromCart 
      } = this.props; 
     

    //[] if firestore data is not loaded
      if( 
        !isLoaded( firestore_products ) || 
        !isLoaded( firestore_uniqueProds )
      ) { return <PageLoading /> }
    //[] else it is loaded
      else {   
        const prod_id = this.props.match.params.prod_id; 
        const tableColOrder = [ 'era', 'user', 'reg_num', 'number', 'name', 'price_vat', 'price_noVat', 'qunatity', 'cart' ];  
              
        // [] separate base product info (number == 00) and the veriants
          let variant_list = [];
          let product_zero = [];
          firestore_products && firestore_products.map(elem_prod => {
            if( elem_prod.NUM_variant === '00')
              product_zero = elem_prod;
            else if( elem_prod.Visable )
              variant_list.push( elem_prod );       
          })  
        //   

        // [] getting the IDs of the 'previous' & 'next' products
          let arr_length = firestore_uniqueProds.length;
          let prod_PervNext = [];
          firestore_uniqueProds && firestore_uniqueProds.map( (elem_prod, index) => {
            if( elem_prod.NUM_id === prod_id ) {

              if( index === 0 || !( firestore_uniqueProds[index-1].Visable) ) {            
                prod_PervNext.push( '00000' );
                prod_PervNext.push( firestore_uniqueProds[index+1].NUM_id );
              }
              else if( index === arr_length-1 || !( firestore_uniqueProds[index+1].Visable) ) {
                prod_PervNext.push( firestore_uniqueProds[index-1].NUM_id );
                prod_PervNext.push( '00000' );
              }
              else {
                prod_PervNext.push( firestore_uniqueProds[index-1].NUM_id );
                prod_PervNext.push( firestore_uniqueProds[index+1].NUM_id );
              }

            }

          })  
        //  
  
        // [] some variables for table
          let regNum_options = [];  
          let regNum_posibleDupes = [];  
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
              />  
            </Row>   

            <Row id="prodCarousel">
                <Product_Carusel 
                  products={firestore_products} 
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
                            { GetLabel( prop_lang, 'table', elem.toString() ) }
                          </th>
                        ) 
                      })
                    }
                    </tr>
                  </thead>
                  <tbody>
                  {
                    variant_list.map( (prod) => {
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
                          actionAddToCart = { actionAddToCart }
                          actionRemoveFromCart = { RemoveFromCart }
                          text_addToCart = { GetLabel( prop_lang, 'table', 'btn_addCart') }
                          text_kitRegInfo = { GetLabel( prop_lang, 'text', 'kit_reg_info') }
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

    firestore_products: state.rootFirestore.ordered.products,
    firestore_uniqueProds: state.rootFirestore.ordered.uniqueProds,
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

  firestore_products: PropTypes.any,
  firestore_uniqueProds: PropTypes.any,

  actionAddToCart: PropTypes.func,
  RemoveFromCart: PropTypes.func,
}

export default compose(
  connect( mapStateToProps, mapDispatchToProps ),
  firestoreConnect( (props) => {
    return [
      { 
        collection: 'products',
        where: [
          ['NUM_id','==', props.match.params.prod_id]
        ]
      },
      { collection: 'uniqueProds' }
    ]
  })
)(Product)