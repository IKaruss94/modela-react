
/** [] Imported @ 
 * src/views-bootstrap/Product/product.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
    import React, { useState } from 'react'
    import PropTypes from 'prop-types'
// [] structure and style components
    import { Row, Col, Button } from 'react-bootstrap'
    import Img from 'react-image'
    import Lightbox from 'lightbox-react'
    import { LinkContainer } from "react-router-bootstrap"
// [] my components
    import GetLable from '../processLable'
// [] my images
    import { prodLargeImages } from '../import_images'

// -------------------------------------------------------------------------------

const ChangeProductBtns = ( {type, num, props} ) => {
    switch( num ) {
        case '00000':
            return (
                <button className="my_prodChangeBtn btn_disabled" variant="primary" disabled></button>
            );
        default: 
            return(
                <LinkContainer to={ "/store/"+ num }>
                    <button 
                        className={"my_prodChangeBtn "+type} 
                        variant="primary" 
                        onClick={ () => props.getProduct(num) }
                    >
                        
                    </button>
                </LinkContainer>
            ); //<i className="material-icons">skip_{type}</i>
    }
};

const DimensionReformat = ( DIM_VAL ) => {
    let res = '';
    if( DIM_VAL === '' ) return res;

    //console.log('dimensions', DIM_VAL );
    const break_arr = DIM_VAL.split('x');
    break_arr.map( val => {
        let temp = val.slice(0, -3).toString() + ',' + val.slice(-3).toString() + 'cm';
        res = res + ' X ' + temp;
    })
    return res.slice(3);
}

const ProductHeader = ( {product, prod_PervNext, props, prop_lang, prop_lables} ) => {    
    const [isOpen, setIsOpen] = useState(false);
    //const [photoIndex, setPhotoIndex] = useState(0);

    return(   
        <Row id="prodHeader" className="my_prodHeader"> 
            <Col className="my_prodHeadCol" sm={1}>
                <ChangeProductBtns type='previous' num={ prod_PervNext[0] } props={ props }/> 
            </Col>
            
            <Col 
                className="my_prodHeadCol my_ProdImageBox" 
                sm={6} 
                onClick={() => setIsOpen(true)}
            > 
                <span className="image_helper"></span>
                <Img className="my_ProdImage my_image_needsHelp img-rounded img-responsive"
                    src={[
                        prodLargeImages[product.ID+".jpg"] 
                    ]}
                    unloader={
                        <div className="my_noProdImage">No image for #{product.ID}</div>
                    }
                />
            </Col>
            
            {isOpen && (         
                <Lightbox
                    mainSrc={ prodLargeImages[product.ID+".jpg"]  }
                    onCloseRequest={() => setIsOpen(false) }
                />
            )}

            <Col className="my_prodHeadCol my_headerText" sm={4}>
                <div className="my_headName">
                    
                    <h1 className="my_ProdName">{ product.Name }</h1>
                    {  
                    // [] product title is above
                    // [] product data is made here \/
                        prop_lables && prop_lables.map ( (elem, index) => {
                            if( elem.Type === 'prod_header') {
                                return(
                                    <span key={index} className="my_prodDataTitle">
                                        <strong>{ elem[prop_lang.toUpperCase()] }: </strong>
                                        { elem.Name === 'Dimensions' ? ( DimensionReformat(product[elem.Name]) ) : (  product[elem.Name] ) }
                                        <br/>
                                    </span>
                                )
                            }
                        })
                        /**
                            <span className="my_prodDataTitle">{ elem[prop_lang.toUpperCase()] }: { product.Producer }<br/></span>
                            <span className="my_prodDataTitle">Dimensions: </span>{ DimensionReformat(product.Dimensions) } <br/>
                            <span className="my_prodDataTitle">Years: </span>{ product.Year } <br/>
                         */
                    }
                    <div className="my_prod_headerButtons">
                        <LinkContainer to="/store">
                            <Button 
                                className="my_prodHead_btnStore" 
                                variant="primary"
                            >
                                { GetLable( prop_lang, prop_lables, 'button', 'prod_backToStore') }
                            </Button>
                        </LinkContainer>  
                        
                        <LinkContainer to="/trade">
                            <Button 
                                className="my_prod_toTradeBtn" 
                                variant="primary"
                            >
                                { GetLable( prop_lang, prop_lables, 'button', 'prod_priceInfo') }
                            </Button>
                        </LinkContainer> 
                    </div>
                   
                    
                </div>
            </Col>

            <Col className="my_prodHeadCol" sm={1}>
                <ChangeProductBtns type='next' num={ prod_PervNext[1] } props={ props }/> 
            </Col>
        </Row> 
    )
};

ChangeProductBtns.propTypes = {  
    type: PropTypes.any,
    num: PropTypes.any, 
    props: PropTypes.any,
    getProduct: PropTypes.func
};
ProductHeader.propTypes = {  
    prop_lang: PropTypes.any, 
    prop_lables: PropTypes.any, 
    
    product: PropTypes.any, 
    prod_PervNext: PropTypes.array, 
    props: PropTypes.any,
};
export default (ProductHeader);



/*
switch( num ) {
        case '00000':
            return (<Button className="my_prodChangeBtn" variant="primary" disabled>{type}</Button>);
        default: 
            return(
                <LinkContainer to={ "/store/"+ num }>
                    <Button className="my_prodChangeBtn" variant="primary" onClick={ () => props.getProduct(num) }>{type}</Button>
                </LinkContainer>
            );
    };
*/