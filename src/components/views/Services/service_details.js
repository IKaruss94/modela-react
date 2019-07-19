
/** [] Imported @ 
 * src/views-bootstrap/Services/services.js
*/ 

// [] fundemental components
  import React, { useState } from 'react'
  import PropTypes from 'prop-types'
// [] structure and style components
  import ReactHtmlParser from 'react-html-parser'
  import Img from 'react-image'
  import Lightbox from 'lightbox-react'
  import Card from 'react-bootstrap/Card'
  import Carousel from 'react-bootstrap/Carousel'
// [] my components
// [] images
  import { Service_ExampleImages } from '../../functions/import_images'

// -------------------------------------------------------------------------------

const ServiceDetails = ({ text, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [imageName, setImageName] = useState(0);

  let var_imageNames = []; // needed for lightbox
  let arr_Carousel = text.Images.split('; ');

  console.log('state : ', imageIndex, imageName);

  return(
    <Card className="my_serviceCardText">       
      <Card.Body>
        <div>
          { ReactHtmlParser( text[lang] ) }
        </div>

        <div>           
          <Carousel className="my_carousel my_service">
          {
            arr_Carousel.map( (image, index) => {
              var_imageNames.push( image );

              return(                            
                <Carousel.Item 
                  className="my_carousel_item my_service" 
                  key={index}
                  onClick={ () => { setIsOpen(true); setImageIndex(index); setImageName( arr_Carousel ); } }
                >
                  <Img className="my_carousel_image my_service img-rounded img-responsive"
                      src={[
                        Service_ExampleImages[image] 
                      ]}
                      unloader={
                          <div className="my_carousel_noImage my_service">No image for #{image}</div>
                      }
                  />

                  <Carousel.Caption className="my_carousel_caption my_service">
                  </Carousel.Caption>

                </Carousel.Item>
              )
            })
          }
          </Carousel>    
        </div>

          
        {isOpen && (         
          <Lightbox  
              mainSrc={ Service_ExampleImages[ imageName[ imageIndex ] ] }
              nextSrc={ Service_ExampleImages[ imageName[ (imageIndex + 1) % imageName.length ] ] }
              prevSrc={ Service_ExampleImages[ imageName[ (imageIndex + imageName.length - 1) % imageName.length ] ] }
              onCloseRequest={ () => setIsOpen(false)  }
              onMovePrevRequest={ () =>
                setImageIndex( (imageIndex + imageName.length - 1) % imageName.length )
              }
              onMoveNextRequest={ () =>
                setImageIndex( (imageIndex + 1) % imageName.length )
              }
          />
        )}

      </Card.Body>
    </Card>
  );
}

ServiceDetails.propTypes = {  
  text: PropTypes.any,
  lang: PropTypes.any,
}
export default (ServiceDetails);