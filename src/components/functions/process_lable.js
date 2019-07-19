
/** [] Imported @ 
 * src/views-bootstrap/Cart/cart.js
 * src/views-bootstrap/Product/product.js
 * 
 * manualy updated 13/06/2019
*/ 

// [] fundemental components
  import React from 'react'
  import PropTypes from 'prop-types'
// [] my images
  import LoadingGIF from '../../../images/icons/modela_loading.gif'

// -------------------------------------------------------------------------------



const ProcessLable = ( prop_lang, prop_lables, func_type, func_name ) => {

  const res = prop_lables.find( (elem) => {
    if( elem.Type === func_type && elem.Name === func_name ) { return elem; } 
  })
  
  if( res !== undefined ) {
    //console.log('lables => ', res[prop_lang] ); 
    return res[prop_lang];
  } else {
    return( <img src={LoadingGIF} style={{ width: '16px', height: '16px' }} /> )
  }

} 

ProcessLable.propTypes = {  
  prop_lang: PropTypes.any,
  prop_lables: PropTypes.any,
  func_type: PropTypes.any,
  func_name: PropTypes.any,
}
export default ProcessLable