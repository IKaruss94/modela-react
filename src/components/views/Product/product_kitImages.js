
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
import Collapsible from 'react-collapsible'
// [] my components
// [] my images
import LoadingGif from '../../../../images/icons/modela_loading.gif'
import { prodKitImages } from '../../functions/import_images'

// -------------------------------------------------------------------------------
const ProductKit = ({ num_id, kitImages }) => {
    //[] if there are no images 
    if( kitImages.length === 0 || kitImages[0] === "" ) { return null }

    const [isOpen, setIsOpen] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);    

    //console.log('imgs : ',  kitImages);

    return(                          
        <Collapsible 
            className="myProd_collapsible"
            trigger={ num_id +' assembly assistance images' } 
            open
        >  
        {
            kitImages.map( (elem, index) => {
            if( elem !== '' ) {
                //console.log( num_id ,' - images: ', elem);    
                return(
                <Img 
                    key={ elem }
                    className="myProd_ImgKit img-responsive"

                    src={[
                    prodKitImages[ elem ]
                    ]}    
                    loader={ 
                    <img src={LoadingGif} className="myImg_loading" alt="loading" height="100" />
                    }
                    unloader={
                        <div className="my_noProdImage">No image named [ { elem } ]</div>
                    }
                    onClick={ () => { 
                        setIsOpen(true); 
                        setImageIndex(index); 
                    }}
                />
                );
            }
            })
        }

        {isOpen && (         
            <Lightbox  
                mainSrc={ prodKitImages[ kitImages[ imageIndex ] ] }
                nextSrc={ prodKitImages[ kitImages[ (imageIndex + 1) % kitImages.length ] ] }
                prevSrc={ prodKitImages[ kitImages[ (imageIndex + kitImages.length - 1) % kitImages.length] ] }
                
                onCloseRequest={ () => setIsOpen(false)  }
                onMovePrevRequest={ () =>
                    setImageIndex( (imageIndex + kitImages.length - 1) % kitImages.length )
                }
                onMoveNextRequest={ () =>
                    setImageIndex( (imageIndex + 1) % kitImages.length )
                }
            />
        )}

        </Collapsible>
        
            
    )
};

ProductKit.propTypes = {  
    num_id: PropTypes.any,
    kitImages: PropTypes.any
};  
export default (ProductKit);