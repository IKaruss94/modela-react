
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

// -------------------------------------------------------------------------------

import { storeThumbnails } from '../../functions/import_images';

const HomeCarousel = ( {store_data, prop_history} ) => {
  return(
    <Carousel className="my_carousel my_home">
    {
      store_data && store_data.map( (data) => {
        return(                 
          <Carousel.Item 
            key={data.Prod_number}
            className="my_carousel_item my_home" 
            onClick={ () => { prop_history.push( '/store/'+ data.Prod_number ) } }
          >
            
            <Img className="my_carousel_image my_home img-rounded img-responsive"
                src={[
                  storeThumbnails[ data.Img_thumbnail ]
                ]}
                unloader={
                    <div className="my_carousel_noImage my_home">No thumbnail for #{data.Prod_number}</div>
                }
            />

          </Carousel.Item>
        )
      }) // [] end of [map]
    }
    </Carousel>       
  )
}

HomeCarousel.propTypes = {
  store_data: PropTypes.any,
  prop_history: PropTypes.any,  
};

export default HomeCarousel;