
/** [] Imported @ 
 * src/views-bootstrap/Store/store.js
 * 
 * manualy updated 29/05/2019
*/ 

// [] fundemental components
    import React from 'react'
    import PropTypes from 'prop-types'
    import { Link } from 'react-router-dom'
// [] structure and style components
    import Collapsible from 'react-collapsible'
    import Img from 'react-image'
    import Row from 'react-bootstrap/Row';
    import Col from 'react-bootstrap/Col';
// [] my components
    import StoreProduct from './store_product'
// [] my images
    import { storeThumbnails } from '../import_images'

// -------------------------------------------------------------------------------

const StoreProdCategories = ({pass_products, pass_categories, match}) => {

    return(
        <div>
        {               
            pass_categories && pass_categories.map(category => {           
                //console.log('cat ID',category.ID_prodCat);              
                return(                    
                    <Collapsible key={category.ID_cat} trigger={category.Title_eng} open>        
                    <div className="">
                    <Row>
                    {
                        pass_products && pass_products.map(product => {  
                        if( product.Category === category.ID_cat )           
                            return(
                            <Col key={product.ID_prod} sm={6} md={4} lg={2} >
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
                            </Col>
                            )
                        })
                    }
                    </Row>
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
    pass_products: PropTypes.any,
    pass_categories: PropTypes.any
};
export default StoreProdCategories;