
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
  import { Helmet } from 'react-helmet'
  import { Container, Row, Table } from 'react-bootstrap'
// [] my components
  import PageLoading from '../../Errors/pageLoading'
  import GetLabel from '../../functions/process_label'

  import Product_Header from './product_header'
  import Product_Carusel from './product_imageCarousel'
  import Product_TableRow from './product_tableRow'
  import Product_KitImages from './product_kitImages'

// [] my images
  //import LoadingGif from '../../../../images/icons/modela_loading.gif'

// -------------------------------------------------------------------------------

class Product extends Component { 
  constructor(props){
    super(props);
    this.state = {
      selectedOption: null
    }

    this.handleOptionSelect.bind(this);
    this.handleChangeProduct.bind(this);
  }

  handleOptionSelect( e ){    
    this.setState({ selectedOption: e });
  }
  handleChangeProduct( new_prod_num ){
    this.handleOptionSelect(null);
    this.props.history.push( '/store/'+ new_prod_num );
  }

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
          let prod_PervNext = [];

          firestore_uniqueProds && firestore_uniqueProds.map( (elem_prod, index) => {
            if( elem_prod.NUM_id === prod_id ) {

              //[] if first in array
              if( index === 0 ) {          
                prod_PervNext.push( '00000' );
                prod_PervNext.push( firestore_uniqueProds[index+1].NUM_id );
              }
              //[] if last in array
              else if( index === firestore_uniqueProds.length - 1 ) {   
                prod_PervNext.push( firestore_uniqueProds[index-1].NUM_id );
                prod_PervNext.push( '00000' );
              }              
              //[] not first & not last
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

            <Row id = "prodHeader">
              <Product_Header 
                product={ product_zero } 
                prod_PervNext = { prod_PervNext }
                prop_lang = { prop_lang }
                prop_ChangeProd = { (e) => this.handleChangeProduct(e) }
              />
            </Row>

            <Row id = "prodCarousel">
              <Product_Carusel 
                products={firestore_products} 
              />
            </Row>

            {
              variant_list.length === 0 ? (
                console.log( prod_id ,' - has no active prods' )
              ) : (            
                <Row id = "prodTable" >
                  <Table responsive striped variant="light" className="myProd_table">
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
    
                            prop_selectedOption = { this.state.selectedOption }
                            prop_optionChange = { (e) => { this.handleOptionSelect(e) } }
    
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
              )
            }
              
            <Row id = "prodKits">
              <Product_KitImages 
                num_id={ product_zero.NUM_id }
                kitImages={ product_zero.Images.split('; ') }
              />
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
    actionAddToCart: (newCartItem) => { dispatch({ type:'ADD_TO_CART', newItem: newCartItem }) },
    RemoveFromCart: (id) => { dispatch({ type:'REMOVE_FROM_CART', itemID: id }) },
  }
}
Product.propTypes = {  
  history: PropTypes.any,
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
      { 
        collection: 'uniqueProds', 
        where: [
          ['Visable', '==', true]
        ] 
      }
    ]
  })
)(Product)