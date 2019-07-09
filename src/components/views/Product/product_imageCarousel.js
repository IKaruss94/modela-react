
/** [] Imported @ 
 * src/views-bootstrap/Product/product.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
    import React, { useState } from 'react'
    import PropTypes from 'prop-types'
// [] structure and style components
    import Img from 'react-image'
    import Lightbox from 'lightbox-react'
    import Carousel from 'react-bootstrap/Carousel'
// [] my components
// [] my images
    import { prodCarouselImages } from '../../functions/import_images'

// -------------------------------------------------------------------------------
const ProductImageCarousel = ( {products} ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    
    const [prodNames, setProdNames] = useState(0);
    let arr_imageNames = [];    
    
    //console.log('state : ', prodID, imageIndex, prodNames);

    return(   
        <Carousel className="my_carousel my_prod my_prodCarousel">
            {
                products && products.map( (product, index) => {
                    arr_imageNames.push( product.ID+"-"+product.Number+".gif" );

                    if( product.Number != '00' && 
                        product.Number < '90' && 
                        prodCarouselImages[product.ID+"-"+product.Number+".gif"] !== '' 
                    ){
                        return(                            
                            <Carousel.Item 
                                className="my_carousel_item my_prod" 
                                key={product.Number}
                                onClick={ () => { setIsOpen(true); setImageIndex(index); setProdNames( arr_imageNames ); } }
                            >
                                <Img className="my_carousel_image my_prod img-rounded img-responsive"
                                    src={[
                                        prodCarouselImages[product.ID+"-"+product.Number+".gif"] 
                                    ]}
                                    unloader={
                                        <div className="my_carousel_noImage my_prod">No image for #{product.ID+"-"+product.Number}</div>
                                    }
                                />
                        

                                <Carousel.Caption className="my_carousel_caption my_prod">
                                    <h4>{product.ID}-{product.Number} - {product.Name}</h4>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    }
                })
            }

            {isOpen && (         
                <Lightbox  
                    imageCaption={ prodNames[ imageIndex ] }

                    mainSrc={ prodCarouselImages[ prodNames[ imageIndex ] ] }
                    nextSrc={ prodCarouselImages[ prodNames[ (imageIndex + 1) % prodNames.length ] ] }
                    prevSrc={ prodCarouselImages[ prodNames[ (imageIndex + prodNames.length - 1) % prodNames.length] ] }
                    
                    onCloseRequest={ () => setIsOpen(false)  }
                    onMovePrevRequest={ () =>
                        setImageIndex( (imageIndex + prodNames.length - 1) % prodNames.length )
                    }
                    onMoveNextRequest={ () =>
                        setImageIndex( (imageIndex + 1) % prodNames.length )
                    }
                />
            )}

        </Carousel>         
            
    )
};

ProductImageCarousel.propTypes = {  
    products: PropTypes.any
};  
export default (ProductImageCarousel);

/*
    
    <img
        className="my_ProdCarouselImage d-block w-100"
        src={ prodCarouselImages[product.ID+"-"+product.Number+".gif"] }
        alt={ product.ID+"-"+product.Number }
    />
 */