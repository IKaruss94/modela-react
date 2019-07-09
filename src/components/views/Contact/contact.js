
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
  import { Container, Col, Row, Button } from 'react-bootstrap'
// [] my components
  //import { fetchContact } from '../../../redux_store/actions/getContact';
  import ContactMap from './contact_map'
  import ContactCard from './contact_card'
// [] my images

// -------------------------------------------------------------------------------


class Contact extends Component {

  // [] my functions  
  //

  render(){
    //console.log('contact props', this.props);
    const { prop_errorApp, prop_loadingApp, prop_data, prop_lang } = this.props; 

    let contactInfo = [];
    prop_data && prop_data.map( elem => {
      if(elem.Lang === prop_lang) {
        contactInfo = elem;
      }
    })

    // [] no loading / error handling, becouse data is caled at App start as a part of [static data]

    if( !prop_errorApp && !prop_loadingApp )
      return (
        <Container id="contact"> 
          <Helmet><title>Contacts</title></Helmet>

          <Row> 

            <Col  md>
              <ContactCard className="my_contactCard" pass_data={contactInfo} /> 
            </Col>  

            <Col className="my_contactMapCol" md>
              <ContactMap />
            </Col>  

          </Row>

          <Button type="primery">Price & Trade information</Button>
        </Container>
      )
      
  } // end of - render

}

const mapStateToProps = (state) => ({
  prop_lang: state.rootLang.lang,
  prop_data: state.rootStatic.contact_data,
  prop_loadingApp: state.rootStatic.loading,
  prop_errorApp: state.rootStatic.error
});
Contact.propTypes = {
  prop_lang: PropTypes.any,
  prop_data: PropTypes.any,
  prop_loadingApp: PropTypes.any,
  prop_errorApp: PropTypes.any
};
export default connect(mapStateToProps)(Contact)