
/** [] Imported @ 
 * src/views-bootstrap/Store/store.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React from 'react'
  import PropTypes from 'prop-types'
// [] structure and style components
  import { withStyles } from '@material-ui/core/styles'
  import GridList from '@material-ui/core/GridList'
  import Collapsible from 'react-collapsible'
// [] my components
  import StoreProduct from './store_product'
// [] my images

// -------------------------------------------------------------------------------

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    //width: 500,
    //height: 450,
  },
});

const StoreProdCategories = ({ pass_products, pass_categories, match, prop_lang }) => {
    return(
      <div>
        {               
            pass_categories && pass_categories.map(category => {           
               //console.log('cat ID',category.ID_prodCat);              
              return(                    
                  <Collapsible key={category.ID_cat} trigger={ category[prop_lang.toUpperCase()] } open>        
                  <div className="">
                    <GridList cellHeight={160} className={category.gridList} cols={6} spacing={10}>
                    {
                      pass_products && pass_products.map(product => {  
                        if( product.Category === category.ID_cat )           
                          return(
                            <StoreProduct key={product.ID_prod} product={product} match={match} />
                          )
                      })

                    }
                    </GridList>
                  </div>        
                </Collapsible>
              )
          })

          
        }
      </div>
    )
}

StoreProdCategories.propTypes = {  
  match: PropTypes.any,
  prop_lang: PropTypes.any,
  pass_products: PropTypes.any,
  pass_categories: PropTypes.any
};
export default withStyles(styles)(StoreProdCategories);