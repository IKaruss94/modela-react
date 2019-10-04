
/** [] Imported @ 
 * src/views-bootstrap/Product/product.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
    import React, { useState, Fragment } from 'react'
    import PropTypes from 'prop-types'
    import withSizes from 'react-sizes'
// [] structure and style components
    import { Row, Col, Button, ButtonToolbar } from 'react-bootstrap'
    import Img from 'react-image'
    import Lightbox from 'lightbox-react'
    import { LinkContainer } from "react-router-bootstrap"
// [] my components
    import GetLabel from '../../functions/process_label'
// [] my images
    import LoadingGif from '../../../../images/icons/modela_loading.gif'
    import { prodLargeImages, storeThumbnails } from '../../functions/import_images'

// -------------------------------------------------------------------------------


//[] Header texts
    const HeaderData = ({ prop_lang, product }) => {      
        //[] Making dimension values more readable 
            // [] DIM_VAL = dimansion value
            let prod_dimensions = '';
            if( product.Dimensions ) {
                const break_arr = product.Dimensions.split('x');
                break_arr.map( val => {
                    prod_dimensions += ' X ' + val.slice(0, -3).toString() + ',' + val.slice(-3).toString() + 'cm';
                })
            }
        //[!]

        return(
            <div className="my_headName">
            
                <h1 className="my_ProdName">{ product.Name } [{ product.Type }]</h1>
                
                {
                    product.Dimensions !== '' ? ( 
                        <span key='Dimensions' className="my_prodDataTitle">
                            <strong>{ GetLabel( prop_lang, 'prod_header', 'Dimensions') }: </strong>
                                { prod_dimensions }
                            <br/>
                        </span> 
                    ):(null)
                }
                {
                    product.Years !== '0' ? (                            
                        <span key='Years' className="my_prodDataTitle">
                            <strong>{ GetLabel( prop_lang, 'prod_header', 'Years') }: </strong>
                                { product.Years }
                            <br/>
                        </span>
                    ):(null)
                }
                {
                    product.Producer !== '' ? ( 
                        <span key='Producer' className="my_prodDataTitle">
                            <strong>{ GetLabel( prop_lang, 'prod_header', 'Producer') }: </strong>
                                { product.Producer }
                            <br/>
                        </span>
                    ):(null)
                }
                
                <ButtonToolbar className="my_prod_headerButtons">
                    <LinkContainer to={"/store/"+ product.NUM_id.substring(0,2) } activeClassName="">
                        <Button 
                            type="button"
                            className="my_prodHead_btnStore" 
                            variant="primary"
                        >
                            { GetLabel( prop_lang, 'button', 'prod_backToStore') }
                        </Button>
                    </LinkContainer> 
                    
                    <LinkContainer to="/trade">
                        <Button 
                            type="button"
                            className="my_prod_toTradeBtn" 
                            variant="primary"
                        >
                        { GetLabel( prop_lang, 'button', 'prod_priceInfo') }
                        </Button>
                    </LinkContainer> 
                </ButtonToolbar>
            
                
            </div>
        );
    } 
    HeaderData.propTypes = {  
        prop_lang: PropTypes.string,
        product: PropTypes.object, 
    };
//[!]

//[] Header image
    const HeaderImage = ({ product }) => {
        return(
            <Fragment>            
                <span className="image_helper"></span>
                <Img className="my_ProdImage my_image_needsHelp img-rounded img-responsive"
                    src={[
                        prodLargeImages[ product.IMG_large ], 
                        storeThumbnails[ product.IMG_tooltip ]
                    ]}    
                    loader={ 
                        <img src={LoadingGif} className="myImg_loading" alt="loading" height="100" />
                    }
                    unloader={
                        <div className="my_noProdImage">No image for #{product.NUM_id}</div>
                    }
                />
            </Fragment>
        );
    }
    HeaderImage.propTypes = {  
        product: PropTypes.object, 
    };
//[!]

//[] Button to go to next/prev product
    const ChangeProductBtns = ( {type, num, icon, prop_ChangeProd} ) => {
        return num === '00000' ? (
            <button className="my_prodChangeBtn btn_disabled" variant="primary" disabled></button>
        ) : (
            <button 
                className={"my_prodChangeBtn "+type} 
                onClick={ () => prop_ChangeProd(num) }
            >
                { icon }
            </button>
        ); //<i className="material-icons">skip_{type}</i>    
    };
    ChangeProductBtns.propTypes = {  
        type: PropTypes.any,
        num: PropTypes.any, 
        icon: PropTypes.any,        
        prop_ChangeProd: PropTypes.func,
    };
//[!]



const ProductHeader = ( {prop_isMobile, product, prod_PervNext, prop_lang, prop_ChangeProd} ) => {    
    const [isOpen, setIsOpen] = useState(false);
    //const [photoIndex, setPhotoIndex] = useState(0);

    if( prop_isMobile ){
        return(     
            <div className="myProd_headerSmall">   

                <div id="smallHead_image" className="myProd_smallHeadRow">
                    <HeaderImage product={product} />
                </div>
                {isOpen && (         
                    <Lightbox
                        mainSrc={ prodLargeImages[product.NUM_id+".jpg"]  }
                        onCloseRequest={() => setIsOpen(false) }
                    />
                )}


                <div id="smallHead_data" className="myProd_smallHeadRow">
                    <Row>                
                        <Col className="my_prodHeadCol" sm={1}>
                            <ChangeProductBtns 
                                type='previous' 
                                num={ prod_PervNext[0] } 
                                icon={<i className="material-icons">keyboard_arrow_left</i>} 
                                prop_ChangeProd={ (e) => prop_ChangeProd(e) }
                            /> 
                        </Col>
                        

                        <Col className="my_prodHeadCol my_headerText" sm={10}>
                            <HeaderData prop_lang={ prop_lang } product={ product }  />
                        </Col>

                        <Col className="my_prodHeadCol" sm={1}>
                            <ChangeProductBtns 
                                type='next' 
                                num={ prod_PervNext[1] } 
                                icon={<i className="material-icons">keyboard_arrow_right</i>} 
                                prop_ChangeProd={ (e) => prop_ChangeProd(e) }
                            /> 
                        </Col>
                    </Row>
                </div>
    
            </div>  
                
        )
    } else {
        return(           
            <Row id="prodHeader" className="my_prodHeader">
    
                <Col className="my_prodHeadCol" sm={1}>
                    <ChangeProductBtns 
                        type='previous' 
                        num={ prod_PervNext[0] } 
                        icon={<i className="material-icons">keyboard_arrow_left</i>} 
                        prop_ChangeProd={ (e) => prop_ChangeProd(e) }
                    /> 
                </Col>
                
                <Col 
                    className="my_prodHeadCol my_ProdImageBox" 
                    sm={6} 
                    onClick={() => setIsOpen(true)}
                > 
                    <HeaderImage product={product} />
                </Col>
    
                <Col className="my_prodHeadCol my_headerText" sm={4}>
                    <HeaderData prop_lang = { prop_lang } product = { product } />
                </Col>
    
                <Col className="my_prodHeadCol" sm={1}>
                    <ChangeProductBtns 
                        type='next' 
                        num={ prod_PervNext[1] }
                        icon={<i className="material-icons">keyboard_arrow_right</i>} 
                        prop_ChangeProd={ (e) => prop_ChangeProd(e) }
                    /> 
                </Col>
                
                
                {isOpen && (         
                    <Lightbox
                        mainSrc={ prodLargeImages[product.NUM_id+".jpg"]  }
                        onCloseRequest={() => setIsOpen(false) }
                    />
                )}
            </Row> 
        )
    }

};
ProductHeader.propTypes = {  
    prop_lang: PropTypes.any, 
    
    product: PropTypes.any, 
    prod_PervNext: PropTypes.array, 
    props: PropTypes.any,
};

const mapSizesToProps = ({ width }) => ({
  prop_isMobile: width < 974+18,
})
export default withSizes( mapSizesToProps )(ProductHeader);



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