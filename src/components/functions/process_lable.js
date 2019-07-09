
/** [] Imported @ 
 * src/views-bootstrap/Cart/cart.js
 * src/views-bootstrap/Product/product.js
 * 
 * manualy updated 13/06/2019
*/ 

// [] fundemental components
  import PropTypes from 'prop-types'
// [] structure and style components
// [] my components
// [] my images

// -------------------------------------------------------------------------------



const Processlable = ( prop_lang, prop_lables, func_type, func_name ) => {

  let temp = prop_lables.find( (obj) => {
    if( obj.Type === func_type && obj.Name === func_name ) 
      return obj
  })
  
  return temp[ prop_lang.toUpperCase() ]
} 

Processlable.propTypes = {  
  prop_lang: PropTypes.any,
  prop_lables: PropTypes.any,
  func_type: PropTypes.any,
  func_name: PropTypes.any,
}
export default Processlable