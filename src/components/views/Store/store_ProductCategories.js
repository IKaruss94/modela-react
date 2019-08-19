
/** [] Imported @ 
 * src/views-bootstrap/Store/store.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React from 'react'
  import PropTypes from 'prop-types'
// [] structure and style components
  import Collapsible from 'react-collapsible'
  import { Link } from 'react-router-dom'
  import Img from 'react-image'
// [] my images
  import { storeThumbnails } from '../../functions/import_images'

// -------------------------------------------------------------------------------

const StoreProdCategories = ({ pass_products, pass_categories, match, prop_lang }) => {
    return(
      <div>
        {               
            pass_categories && pass_categories.map( elem_cat => {           
               //console.log('cat ID',elem_cat.ID_prodCat);              
              return(                    
                  <Collapsible 
                    key={elem_cat.ID_cat} 
                    className="my_store_collapsible"
                    trigger={ elem_cat[prop_lang] } 
                    open
                  >  
                  
                    <div className="my_store_collapsedContetn">
                    {
                      pass_products && pass_products.map(elem_prod => {  
                        if( elem_prod.Category === elem_cat.ID_cat && elem_prod.Visable ) //[] if product is in category and VISABLE         
                          
                        return(                            
                            <Link to={ match.url +"/"+ elem_prod.NUM_id } className="my_storeImageLink" >
                              <Img
                                src={[
                                  storeThumbnails[ elem_prod.IMG_thumbnail ]
                                ]}
                                unloader={
                                  <div className="my_noStoreImage center"># {elem_prod.NUM_id}</div>
                                }
                              />
                            </Link>
                          )

                      })
                    }
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
export default StoreProdCategories;