
/** [] Imported @ 
 * src/views-bootstrap/Store/store.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React from 'react'
  import PropTypes from 'prop-types'
  import { Link } from 'react-router-dom'
// [] structure and style components
  import Img from 'react-image'
  import { withStyles } from '@material-ui/core/styles'
  import GridListTile from '@material-ui/core/GridListTile'
// [] my components
// [] my images
  import { storeThumbnails } from '../import_images'

// -------------------------------------------------------------------------------

const styles = () => ({
  tile: {    
    height: 160
    //width: 500,
  }
});

const StoreProduct = ({ match, product }) => {
  return(
      <GridListTile cols={1}>        
          <Link to={ match.url +"/"+ product.Prod_number } className="my_storeImageLink" >
            <Img
              src={[
                storeThumbnails[ product.Img_thumbnail ]
              ]}
              unloader={
                <div className="my_noStoreImage center"># {product.Prod_number}</div>
              }
            />
          </Link>
      </GridListTile>
  )
  // [cols={1}] means that the tile will take up only 1 column
}


StoreProduct.propTypes = {  
  match: PropTypes.any,
  product: PropTypes.any
}
export default withStyles(styles)(StoreProduct);