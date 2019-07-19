
/** [] Imported @ 
 * src/views-bootstrap/index.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React, { Component } from 'react'
// [] structure and style components
  import { Helmet } from 'react-helmet'
  import { Container, Col, Row, Button } from 'react-bootstrap'
// [] my components'
  import ContactCard from './contact_card'
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

            <Col md>
              <ContactCard className="my_contactCard" /> 
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

export default (Contact)