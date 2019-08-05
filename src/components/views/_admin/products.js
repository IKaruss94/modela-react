
/** [] Imported @ 
 * src/components/views/index.js
 * 
 * manualy updated 22/07/2019
*/ 

// [] fundemental components
  import React, { Component } from 'react'
  import { compose } from 'redux'
  import { connect } from 'react-redux'
  import PropTypes from 'prop-types'
  import { firestoreConnect } from 'react-redux-firebase'
// [] structure and style components
  import { Helmet } from 'react-helmet'
  import { Container } from 'react-bootstrap'
  import GridList from '@material-ui/core/GridList'
  import GridListTile from '@material-ui/core/GridListTile'
// [] my components
  import PageLoading from '../Errors/pageLoading'
  //import SingleProduct from './sub-components/single_product'
  import ProductDetails from './sub-components/product_details'

// ------------------------------------------------------------------------------- 


class AdminProducts extends Component {   
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      modalID: null,
    };
  }

render(){      
  const { prop_products } = this.props; 

  // []
    if ( prop_products === undefined ) { 
      return PageLoading(location.pathname) 
    }
    else {
      return (
        <Container className="my_admin_container"> 
          <Helmet><title>PRODUCTS</title></Helmet>

            <GridList cellHeight={160} className="my_admin_prodGrid" cols={6} spacing={10}>
            {
              prop_products && prop_products.map( (elem_prod, index) => {  
                if( elem_prod.NUM_variant === '00' )    
                  return(                   
                    <GridListTile 
                      key={index} 
                      className="my_admin_prodElem" 
                      cols={1} 
                      onClick={ ()=>{ this.setState({ modalID: elem_prod.NUM_id, modalShow: true }) }}
                    >        
                      <div className="center">
                        { elem_prod.NUM_id }
                      </div>
                    </GridListTile>
                  )
              })

            }
            </GridList>
            
            <ProductDetails 
              show={ this.state.modalShow } 
              onHide={ () => this.setState({ modalShow: false }) } 

              prod_id = { this.state.modalID }
              prod_all = { prop_products }
            />

        </Container>
      )  
    } // [] end of [else]
  //
} // [] end of [render]
}

const mapStateToProps = (state) => ({
  prop_products: state.rootFirestore.ordered.products,
})
AdminProducts.propTypes = {  
  location: PropTypes.any,
  prop_products: PropTypes.any,
};

export default compose(
  connect( mapStateToProps ),
  firestoreConnect([
    { collection: 'products' }
  ])
)(AdminProducts)