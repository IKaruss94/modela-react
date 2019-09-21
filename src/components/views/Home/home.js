
/** [] Imported @ 
 * src/views-bootstrap/index.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React, { Component } from 'react'
  import { compose } from 'redux'
  import { connect } from 'react-redux'
  import withSizes from 'react-sizes'
  import PropTypes from 'prop-types'
  import { firestoreConnect, isLoaded } from 'react-redux-firebase'
// [] structure and style components
  import { Helmet } from 'react-helmet'
  import { Container, Row, Col } from 'react-bootstrap'
  import ReactHtmlParser from 'react-html-parser'
// [] my components
  import PageLoading from '../../Errors/pageLoading'
  import LongText from '../../../json/long_text.json'
  import ContactCard from '../../multipage_components/contact_card'  
  import HomeCarousel from './home_carousel'
  import HomeTitle from './home_title'
// [] my images
  import Train from '../../../../images/home/gt_transparent.png' //gold-train.jpg';  gt_transparent gt_gray_skyblue
  import BigLogo from '../../../../images/home/modela-logo.gif'

// -------------------------------------------------------------------------------

class Home extends Component {
  render(){    
    //console.log('home props', this.props);
    const { prop_lang, prop_isMobile, firestore_uniqueProds } = this.props; 

    //

    
    // []
      if ( !isLoaded(firestore_uniqueProds)  ) { return PageLoading() }
      else {
        
        let home_about = '';
        let home_title = '';    
        LongText && LongText.map (about => {
          if( about.Name === 'about-3') home_about = ReactHtmlParser( about[prop_lang] );
          if( about.Name === 'main-title') home_title = ReactHtmlParser( about[prop_lang] );
        });

        return (
          <div>
            <HomeTitle isMobile={ prop_isMobile } bg_img={Train} logo_img={BigLogo} title={ home_title } />        
            
            <Container>  
              <Helmet><title>Modela</title></Helmet>              

              <Row> 
                <Col className="my_home_carousel" md={12} lg={8}>
                  <HomeCarousel isMobile={ prop_isMobile } store_data={firestore_uniqueProds} prop_history={this.props.history} />
                </Col>   
                <Col className="my_home_contact" md={6} lg={4}>
                  <ContactCard className="my_contactCard" /> 
                </Col> 
              </Row>      

              <Row> 
                <Col className="my_about">
                  { home_about }
                </Col>
              </Row>

            </Container>
          </div>
        ) 
      } // [] end of [else]
    //
  } // [] end of [render]
}

const mapStateToProps = (state) => ({
  prop_lang: state.rootLang.lang,
  firestore_uniqueProds: state.rootFirestore.ordered.uniqueProds,
})
const mapSizesToProps = ({ width }) => ({
  prop_isMobile: width < 974+18,
})
Home.propTypes = {  
  history: PropTypes.any,
  location: PropTypes.any,

  prop_isMobile: PropTypes.any,
  prop_lang: PropTypes.any,
  prop_contact: PropTypes.any, 
  firestore_uniqueProds: PropTypes.any,
}
export default compose(
  connect( mapStateToProps ),
  withSizes( mapSizesToProps ),
  firestoreConnect([
    { 
      collection: 'uniqueProds',
      where: [[ 'Visable', '==', true ]]
    }
  ])
)(Home)