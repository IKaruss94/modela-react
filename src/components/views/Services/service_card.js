
/** [] Imported @ 
 * src/views-bootstrap/Services/services.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React, { useState } from 'react'
  import PropTypes from 'prop-types'
  import withSizes from 'react-sizes'
// [] structure and style components
  import { CSSTransitionGroup } from 'react-transition-group'
  import Card from 'react-bootstrap/Card'
// [] my components
  import ServiceDetails from './service_details'
// [] my images

// -------------------------------------------------------------------------------

const ServiceCard = ( {prop_isMobile, pass_title, pass_text, pass_image, pass_lang} ) => {
  const [isOpen, setIsOpen] = useState(false);

  const shortText = pass_title[pass_lang].split('---');

  return(
    <div className="my_services">

      <Card 
        className="my_service_card" 
        onClick={ () => setIsOpen(!isOpen) } 
      > 
        {
          !prop_isMobile ? (
            <Card.Img className="my_service_cardImage" variant="top" src={ pass_image[pass_title.Images] } />
          ) : (null)
        }   
        <Card.Body className="my_service_cardBody">
          <Card.Title className="my_service_title">{ shortText[0] }</Card.Title>
          <Card.Text>{ shortText[1] }</Card.Text>
        </Card.Body>
      </Card>

      <div className="my_serviceText">
      {
        isOpen && (           
          <CSSTransitionGroup
            transitionName="my_transi_service" //"example""my_transi_service"
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}
          >
            <ServiceDetails text={pass_text} lang={pass_lang} />
          </CSSTransitionGroup>
        )
      }
      </div>
      
    </div>
  );
}
ServiceCard.propTypes = {  
  prop_isMobile: PropTypes.any,
  pass_title: PropTypes.any,
  pass_text: PropTypes.any,
  pass_image: PropTypes.any,
  pass_lang: PropTypes.string,  
}

const mapSizesToProps = ({ width }) => ({
  prop_isMobile: width < 974+18,
})
export default withSizes( mapSizesToProps )(ServiceCard);

/*
{pass_title.Name}
{pass_title.Lang_eng}
*/