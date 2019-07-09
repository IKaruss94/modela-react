
/** [] Imported @ 
 * src/views-bootstrap/Home/home.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React from 'react'
  import PropTypes from 'prop-types'
// [] structure and style components
  import Img from 'react-image'
  import withSizes from 'react-sizes'
  import Container from 'react-bootstrap/Container'
  import Jumbotron from 'react-bootstrap/Jumbotron'
// [] my components
// [] my images

// -------------------------------------------------------------------------------

const HomeTitle = ( {isMobile, bg_img, logo_img, title} ) => {

  const homeStyle = {
    backgroundImage: `url(${bg_img}), radial-gradient(lightgray, #73bafc)`
  };
    if(!isMobile) {    
      return(
        <Jumbotron fluid className="my_home_jumbo">
            <div className="my_home_jumboImg" style={ homeStyle }>
              <div className="my_home_title">
                <Img className="my_home_titleImg img-rounded img-responsive"
                    src={[ logo_img ]}

                    unloader={
                        <div className="my_home_noImage">MODELA</div>
                    }
                  />
                <p className="my_home_titleText">{ title }</p>   
              </div>
            </div>
          <div className="my_home_colorGap"></div> 
        </Jumbotron>
      )
    } else {      
      return(
        <Container>
          <div className="my_home_largeTitle">
            <Img className="my_home_largeTitle_image img-rounded img-responsive"
                src={[ logo_img ]}

                unloader={
                    <div className="my_home_largeTitle_noImage">MODELA</div>
                }
              />
            <p className="my_home_largeTitle_text">{ title }</p>   
          </div>
        </Container>
      )
    }
  
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 974+18,
})

HomeTitle.propTypes = {
  bg_img: PropTypes.any,
  logo_img: PropTypes.any,
};

export default withSizes(mapSizesToProps)(HomeTitle);