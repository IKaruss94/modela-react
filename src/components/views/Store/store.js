
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
  import { Route } from 'react-router-dom'
  import { firestoreConnect, isLoaded } from 'react-redux-firebase'
// [] structure and style components
  import { Helmet } from 'react-helmet'
// [] my components
  import PageLoading from '../Errors/pageLoading'
  import StoreProductCat from './store_ProductCategories'
  import Product from '../Product/product'

// ------------------------------------------------------------------------------- 

class Store extends Component {   
  
  render(){      
    //console.log('store props', this.props);
    const { match, firestore_uniqueProds, prop_categories, prop_lang } = this.props; 

    // []
      if ( !isLoaded(firestore_uniqueProds) || !isLoaded(prop_categories) ) { 
        return PageLoading(location.pathname) 
      }
      else {
        return (
          <div id="store" className="large-container">  
            <Helmet><title>Store</title></Helmet>
            
            <StoreProductCat pass_products={firestore_uniqueProds} pass_categories={prop_categories} match={match} prop_lang={prop_lang} />

            <Route path={ match.url +'/:prod_id' } component={Product} />
          </div>
        )  
      } // [] end of [else]
    //
  } // [] end of [render]
}

const mapStateToProps = (state) => ({
  prop_lang: state.rootLang.lang,
  firestore_uniqueProds: state.rootFirestore.ordered.uniqueProds,
  prop_categories: state.rootFirestore.ordered.production_categories,
})
Store.propTypes = {  
  match: PropTypes.any,
  location: PropTypes.any,

  prop_lang: PropTypes.any,
  firestore_uniqueProds: PropTypes.any,
  prop_categories: PropTypes.any
};

export default compose(
  connect( mapStateToProps ),
  firestoreConnect([
    { collection: 'uniqueProds' },
    { collection: 'production_categories' }
  ])
)(Store)