
/** [] Imported @ 
 * src/views-bootstrap/index.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React, { Component } from 'react'
  import { connect } from 'react-redux'
  import PropTypes from 'prop-types'
// [] structure and style components
  import { Helmet } from 'react-helmet'
  import { Container, Col, Row, Button } from 'react-bootstrap'
  import { LinkContainer } from "react-router-bootstrap"
// [] my components'
  import GetLabel from '../../functions/process_label'
  import ContactCard from '../../multipage_components/contact_card'
  import ContactMap from './contact_map'
// [] my images

// -------------------------------------------------------------------------------


class Contact extends Component {

  render(){
    //console.log('contact props', this.props);

    // [] no loading / error handling, becouse data is caled at App start as a part of [static data]
      return (
        <Container id="contact"> 
          <Helmet><title>Contacts</title></Helmet>

          <Row> 

            <Col sm={12} lg={6}>
              <ContactCard 
                card_page="contact"
              /> 
            </Col>  

            <Col className="my_contactMapCol" sm={12} lg={6}>
              <ContactMap />
            </Col>  

          </Row>

          <Row>
            <Col>

              <LinkContainer to="/trade">
                <Button 
                  type="primery"
                  className="myContact_tradeBtn"
                  block
                >{
                  GetLabel( this.props.prop_lang, 'button', 'btn_contactToTade')
                }</Button>
              </LinkContainer>
              
            </Col>
          </Row>

        </Container>
      )
      
  } // end of - render

}
Contact.propTypes = {
  prop_lang: PropTypes.string,
};

const mapStateToProps = (state) => ({
    prop_lang: state.rootLang.lang
});
export default connect( mapStateToProps )(Contact)