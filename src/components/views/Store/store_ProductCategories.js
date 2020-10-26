
/** [] Imported @ 
 * src/views-bootstrap/Store/store.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React, { Fragment } from 'react'
  import PropTypes from 'prop-types'
// [] structure and style components
  import Collapsible from 'react-collapsible'
  import Img from 'react-image'
  import { Link } from 'react-router-dom'
// [] my images
  import LoadingGif from '../../../../images/icons/modela_loading.gif'
  import { storeThumbnails } from '../../functions/import_images'

// -------------------------------------------------------------------------------

const StoreProdCategories = ({ pass_scale, pass_products, pass_categories, prop_lang }) => {   
    return(
      <Fragment>
        {               
            pass_categories && pass_categories.map( elem_cat => {  
              //[] if category is for different scale, then ignore       
              if( elem_cat.Scale !== pass_scale ) return null;

              return(                    
                  <Collapsible 
                    key={elem_cat.ID_cat} 
                    className="my_store_collapsible"
                    trigger={ elem_cat.Scale === "other" ? ( elem_cat[prop_lang] ):( elem_cat.Scale +" - "+ elem_cat[prop_lang] ) } 
                    open
                  >  
                  
                    <div className="my_store_collapsedContetn">
                    {
                      pass_products && pass_products.map(elem_prod => {  
                        if( elem_prod.Category === elem_cat.ID_cat && elem_prod.Visable ) //[] if product is in category and VISABLE  
                        {
                          const isAvailClass = elem_prod.Available ? ( "myStore_prodAvail"):("myStore_prodNotAvail")
                          return(                            
                            <Link 
                              key={ elem_prod.NUM_id }
                              to={ "/product/"+ elem_prod.NUM_id } 
                              className={"my_storeImageLink " + isAvailClass }                              
                            >

                              <Img
                                src={[
                                  storeThumbnails[ elem_prod.IMG_thumbnail ]
                                ]}
                                loader={ 
                                  <img src={LoadingGif} className="myImg_loading" alt="loading" height="100" />
                                }
                                unloader={
                                  <div className="my_noStoreImage"># {elem_prod.NUM_id}</div>
                                }
                              />

                            </Link>
                          )
                        }  

                      })
                    }
                    </div>

                </Collapsible>
              )
          })

          
        }
      </Fragment>
    )
}

StoreProdCategories.propTypes = {  
  match: PropTypes.object,
  prop_lang: PropTypes.any,
  pass_scale: PropTypes.string,
  pass_products: PropTypes.any,
  pass_categories: PropTypes.any,
};
export default StoreProdCategories;