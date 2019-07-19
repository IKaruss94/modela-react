
/** [] Imported @ 
 * src/views-bootstrap/index.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React, { Component } from 'react'
  import { compose } from 'redux'
  import { connect } from 'react-redux'
  import PropTypes from 'prop-types'
  import { firestoreConnect } from 'react-redux-firebase'
// [] structure and style components
  import { Helmet } from 'react-helmet'
  import { Container, Row, Col } from 'react-bootstrap'
  import ReactHtmlParser from 'react-html-parser'
// [] my components
  import PageLoading from '../Errors/pageLoading'
  import HomeCarousel from './home_carousel'
  import HomeTitle from './home_title'
  import ContactCard from '../Contact/contact_card'
// [] my images
  import Train from '../../../../images/home/gt_transparent.png' //gold-train.jpg';  gt_transparent gt_gray_skyblue
  import BigLogo from '../../../../images/home/modela-logo.gif'

// -------------------------------------------------------------------------------

class Home extends Component {
  render(){    
    const { location, prop_lang, prop_texts, prop_uniqueProds } = this.props; 

    //
      let home_about = '';
      let home_title = '';    
      prop_texts && prop_texts.map (about => {
        if( about.Name === 'about-3') home_about = ReactHtmlParser( about[prop_lang] );
        if( about.Name === 'main-title') home_title = ReactHtmlParser( about[prop_lang] );
      });

    
    // []
      if ( prop_texts === undefined || prop_uniqueProds === undefined ) { 
        return PageLoading(location.pathname) 
      }
      else {
        return (
          <div>
            <HomeTitle bg_img={Train} logo_img={BigLogo} title={ home_title } />        
            
            <Container>  
              <Helmet><title>Modela</title></Helmet>

              <Row> 
                <Col className="my_home_carousel" md={12} lg={8}>
                  <HomeCarousel store_data={prop_uniqueProds} prop_history={this.props.history} />
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
  prop_texts: state.rootFirestore.ordered.longTexts,
  prop_uniqueProds: state.rootFirestore.ordered.uniqueProds,

  prop_lang: state.rootLang.lang,
})
Home.propTypes = {  
  history: PropTypes.any,
  location: PropTypes.any,

  prop_lang: PropTypes.any,
  prop_texts: PropTypes.any,
  prop_contact: PropTypes.any, 
  prop_uniqueProds: PropTypes.any,

}
export default compose(
  connect( mapStateToProps ),
  firestoreConnect([
    { collection: 'longTexts' },
    { collection: 'uniqueProds' }
  ])
)(Home)

/*        
        <Jumbotron fluid className="my_home_jumbo">
          <div className="my_home_jumboImg" style={ homeStyle }>

            <div className="my_home_title">
              <Img className="my_home_titleImg img-rounded img-responsive"
                    src={[ BigLogo ]}
                    unloader={
                        <div className="my_home_noImage">MODELA</div>
                    }
                />
              <p className="my_home_titleText">SCALE MODEL ENGINEERING AND PRODUCTION <br/> since August 17, 2000</p>   
            </div>

          </div>
          <div className="my_home_colorGap"></div> 

        </Jumbotron>
*/