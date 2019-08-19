
/** [] Imported @ 
 * src/components/views/index.js
 * 
 * manualy updated 14/08/2019
*/ 

// [] fundemental components
  import React, { Component } from 'react'
  import { compose } from 'redux'
  import { connect } from 'react-redux'
  import PropTypes from 'prop-types'
  import { firestoreConnect } from 'react-redux-firebase'
// [] structure and style components
  import { Helmet } from 'react-helmet'
  import { Container, Row, Col, Button } from 'react-bootstrap'
// [] my components
  import PageLoading from '../../Errors/pageLoading'
  import ProductModal from './product_modal'

// ------------------------------------------------------------------------------- 

// [] make [Category] select options
  const MakeOptions = ( data ) => {
    let options_array = [];
    data && data.map( elem => {
      options_array.push({ 
        label: '('+ elem.Type +') '+ elem.ENG, 
        value: elem.ID_cat 
      })
    });
    return options_array;
  }
//
// [] get all main products
  const SeparateBaseVariants = ( data ) => {
    let temp_array = [];
    data && data.map( elem => {
      if( elem.NUM_variant === '00' ) {
        temp_array.push( elem.NUM_id );
      }
    });
    return temp_array;
  }
//
// [] separate products by ID, based on https://gist.github.com/JamieMason/0566f8412af9fe6a1d470aa1e089a752
  const GroupBy = ( array ) => ( key ) => { 
    let separatedProducts = [];
    for( const obj of array ) {
      const value = obj[key];
      separatedProducts[value] = ( separatedProducts[value] || [] ).concat(obj);
    }
    return separatedProducts;   
  }  
//


//---------------------------------------------------------------


class AdminProducts extends Component {   
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      modalID: null,
    };
  }

  render(){      
    const { prop_products, prop_categories } = this.props;  

    // []
      if ( prop_products === undefined || prop_categories === undefined ) { 
        return PageLoading() 
      }
      else { 
        
        const options_prod_cat = MakeOptions( this.props.prop_categories );           
        const baseVariantArray = SeparateBaseVariants( this.props.prop_products ); 
        const productsByID = GroupBy( this.props.prop_products )( 'NUM_id' );  

        return (
          <Container className="my_admin_container"> 
            <Helmet><title>PRODUCTS</title></Helmet>

              <Row>
                <Col>
                  <Button 
                    variant="primary" 
                    className="my_admin_btn"
                    block
                    onClick={ ()=>{ this.setState({ modalID: 'new', modalShow: true }) } }
                  >Add a new product</Button>
                </Col>
              </Row>

              <div className="my_admin_prodContainer">
              {
                baseVariantArray && baseVariantArray.map( (elem_prod) => { 
                  return(                   
                    <div 
                      key={ elem_prod } 
                      className="my_admin_prodElem" 
                      onClick={ ()=>{ this.setState({ modalID: elem_prod, modalShow: true }) }}
                    >        
                      { elem_prod }
                    </div>
                  )
                })

              }
              </div>
              
              <ProductModal 
                show={ this.state.modalShow } 
                onHide={ () => this.setState({ modalShow: false }) } 

                prod_id = { this.state.modalID }
                prod_varinats = { productsByID[this.state.modalID] }
                options_prod_cat = { options_prod_cat }
              />

          </Container>
        )  
      } // [] end of [else]
    //
  } // [] end of [render]
}

const mapStateToProps = (state) => ({
  prop_products: state.rootFirestore.ordered.products,
  prop_categories: state.rootFirestore.ordered.production_categories,
})
AdminProducts.propTypes = {  
  prop_products: PropTypes.any,
  prop_categories: PropTypes.any,
};

export default compose(
  connect( mapStateToProps ),
  firestoreConnect([
    { collection: 'products' },
    { collection: 'production_categories' }
  ])
)(AdminProducts)