
/** [] Imported @ 
 * src/views-bootstrap/home/home.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React from 'react'
  import PropTypes from 'prop-types'
// [] structure and style components
  import Img from 'react-image'
  import Carousel from 'react-bootstrap/Carousel'
// [] my components
// [] my images
  import { storeThumbnails } from '../../functions/import_images';

// -------------------------------------------------------------------------------


const HomeCarousel = ( {isMobile, store_data, prop_history} ) => {
  return(
    <Carousel className={ isMobile ? ("my_carousel my_home my_mobile") : ("my_carousel my_home") } >
    {
      store_data && store_data.map( (elem) => {
        
        return(                 
          <Carousel.Item 
            key={elem.NUM_id}
            className="my_carousel_item my_home" 
            onClick={ () => { prop_history.push( '/store/'+ elem.NUM_id ) } }
          >
            
            <Img className="my_carousel_image my_home img-rounded img-responsive"
                src={[
                  storeThumbnails[ elem.IMG_thumbnail ]
                ]}
                unloader={
                    <div className="my_carousel_noImage my_home">No thumbnail for #{elem.NUM_id}</div>
                }
            />

          </Carousel.Item>
        ) // [] end of [return]

      }) // [] end of [map]
    }
    </Carousel>       
  )
}

HomeCarousel.propTypes = {
  isMobile: PropTypes.any,
  store_data: PropTypes.any,
  prop_history: PropTypes.any,  
};

export default HomeCarousel;