
/** [] Imported @ 
 * src/views-bootstrap/index.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React, { Component } from "react"
  import { connect } from 'react-redux'
  import PropTypes from 'prop-types'
// [] structure and style components
  import { Helmet } from 'react-helmet'
  import { Container, Row, Col } from 'react-bootstrap'
  import ReactHtmlParser from 'react-html-parser'
// [] my components
  import PageLoading from '../Errors/pageLoading'
  import PageError from '../Errors/pageError'
  import { fetchData } from '../../../redux_store/actions/getData'
  import HomeCarousel from './home_carousel'
  import HomeTitle from './home_title'
  import ContactCard from '../Contact/contact_card'
// [] my images
  import Train from '../../../../images/home/gt_transparent.png' //gold-train.jpg';  gt_transparent gt_gray_skyblue
  import BigLogo from '../../../../images/home/modela-logo.gif'

// -------------------------------------------------------------------------------

class Home extends Component {

  componentDidMount(){ 
    this.props.GetData('about');     
  }  

  render(){    
    const { location, prop_error, prop_loading, prop_data, prop_contactInfo, prop_storeProd, prop_lang } = this.props; 

    
    let home_about = '';
    let home_title = '';
    prop_data && prop_data.map (about => {
      if( about.Name === 'about-3') home_about = ReactHtmlParser( about[prop_lang.toUpperCase()] );
      if( about.Name === 'title') home_title = ReactHtmlParser( about[prop_lang.toUpperCase()] );
    })

    let contactInfo = [];
    prop_contactInfo && prop_contactInfo.map( elem => {
      if(elem.Lang === prop_lang) {
        contactInfo = elem;
      }
    })

    if (prop_error) { return PageError(prop_error.message) }
    if (prop_loading) { return PageLoading(location.pathname) }

    return (
      <div>
        <HomeTitle bg_img={Train} logo_img={BigLogo} title={ home_title } />        
        
        <Container>  
          <Helmet><title>Modela</title></Helmet>

          <Row> 
            <Col className="my_home_carousel" md={12} lg={8}>
              <HomeCarousel store_data={prop_storeProd} prop_history={this.props.history} />
            </Col>   
            <Col className="my_home_contact" md={6} lg={4}>
              <ContactCard className="my_contactCard" pass_data={contactInfo} /> 
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
  }
}

const mapStateToProps = (state) => ({
  prop_contactInfo: state.rootStatic.contact_data,  
  prop_storeProd: state.rootStatic.store_production,
  prop_lang: state.rootLang.lang,

  prop_data: state.rootData.data.about,
  prop_loading: state.rootData.loading,
  prop_error: state.rootData.error
})
const mapDispatchToProps = (dispatch) => {
  return{
    GetData: (page_name) => { dispatch( fetchData(page_name) ) },
  }
}
Home.propTypes = {  
  prop_storeProd: PropTypes.any,
  prop_contactInfo: PropTypes.any, 
  prop_lang: PropTypes.any,

  prop_loading: PropTypes.any,
  prop_error: PropTypes.any,
  prop_data: PropTypes.any,

  history: PropTypes.any, 
  location: PropTypes.any, 

  GetData: PropTypes.func,
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)

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