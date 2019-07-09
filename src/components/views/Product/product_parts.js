
/** [] Imported @ 
 * src/views-bootstrap/Product/product.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
    import React from 'react'
    import PropTypes from 'prop-types'
// [] structure and style components
    import Img from 'react-image'
    //import { LinkContainer } from "react-router-bootstrap"
    import Row from 'react-bootstrap/Row'
    import Col from 'react-bootstrap/Col'
// [] my components
// [] my images
    import { prodLargeImages } from '../import_images'

// -------------------------------------------------------------------------------

const ProductParts = ( {product, prod_PervNext, props} ) => {    
    return(   
        <Row id="prodHeader" className="my_prodHeader"> 
            <Col className="my_prodHeadCol" sm={1}>
                <ProdButton type='previous' num={ prod_PervNext[0] } props={ props }/> 
            </Col>
            
            <Col className="my_prodHeadCol my_ProdImageBox" sm={6}> 
                <span className="image_helper"></span>
                <Img className="my_ProdImage img-rounded img-responsive"
                    src={[
                        prodLargeImages[product.ID+".jpg"] 
                    ]}
                    unloader={
                        <div className="my_noProdImage">No large product image for #{product.ID}</div>
                    }
                />
            </Col>

            <Col className="my_prodHeadCol my_headerText" sm={4}>
                <div className="my_headName">
                    <h3 className="my_ProdName">{ product.Name }</h3>
                    <span className="my_prodDataTitle">Producer: </span>{ product.Producer } <br/>
                    <span className="my_prodDataTitle">Dimensions: </span>{ Dimension_breakdown(product.Dimensions) } <br/>
                </div>
            </Col>

            <Col className="my_prodHeadCol" sm={1}>
                <ProdButton type='next' num={ prod_PervNext[1] } props={ props }/> 
            </Col>
        </Row> 
    )
};

ProdButton.propTypes = {  
    type: PropTypes.any,
    num: PropTypes.any, 
    props: PropTypes.any,
    getProduct: PropTypes.func
};
ProductParts.propTypes = {  
    product: PropTypes.any, 
    prod_PervNext: PropTypes.array, 
    props: PropTypes.any,
};
export default (ProductParts);