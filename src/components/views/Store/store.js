
/** [] Imported @ 
 * src/views-bootstrap/index.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React, { Component } from 'react'
  import { connect } from 'react-redux'
  import PropTypes from 'prop-types'
  import { Route } from 'react-router-dom'
// [] structure and style components
  import { Helmet } from 'react-helmet'
// [] my components
  import StoreProductCat from './store_ProductCategories'
  import Product from '../Product/product'
// [] my images

// ------------------------------------------------------------------------------- 

class Store extends Component {   
  
  render(){      
    //console.log('store props', this.props);
    const { match, prop_products, prop_categories, prop_lang } = this.props; 

    // [] no loading / error handling, becouse data is caled at App start as a part of [static data]

    return (
      <div id="store" className="large-container">  
        <Helmet><title>Store</title></Helmet>
        
        <StoreProductCat pass_products={prop_products} pass_categories={prop_categories} match={match} prop_lang={prop_lang} />

        <Route path={ match.url +'/:prod_id' } component={Product} />
      </div>
    )  
  }
}

const mapStateToProps = (state) => ({
  prop_lang: state.rootLang.lang,
  prop_products: state.rootStatic.store_production,
  prop_categories: state.rootStatic.store_categories
})
Store.propTypes = {  
  match: PropTypes.any,
  prop_lang: PropTypes.any,
  prop_products: PropTypes.any,
  prop_categories: PropTypes.any
};

export default connect(mapStateToProps)(Store)