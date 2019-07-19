
/** [] Imported @ 
 * src/views-bootstrap/Card/card.js
 * src/views-bootstrap/Home/home.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React from "react"
  import { compose } from 'redux'
  import { connect } from 'react-redux'
  import PropTypes from 'prop-types'
  import { firestoreConnect } from 'react-redux-firebase'
// [] structure and style components
  import Card from 'react-bootstrap/Card'
// [] my components
// [] my images
  import FBicon from '../../../../images/icons/icon-facebook.png'

// -------------------------------------------------------------------------------

const ContactCard = ( props ) => {
  //console.log('contact data: ', props.prop_contact);

  const { prop_contact, prop_lang } = props;
      
  // []
    if ( prop_contact === undefined ) { 
      return(
        <Card className="my_contactCard">             
          <Card.Body>
            loding
          </Card.Body>
        </Card>        
      )
    }
    else {
      let contact_data = props;  
      props.prop_contact.map( (elem) => {    
        if( elem.id === '00' ) { contact_data = elem; }
      });

      return (
        <Card className="my_contactCard">             
          <Card.Body>

            <Card.Title>              
              <strong>{ contact_data.Name }</strong>
            </Card.Title>

            <Card.Text>
                <span className="my_CardText my_withIcon"><i className="my_contactIcons material-icons">email</i>{ contact_data.Email }</span>
                <span className="my_CardText my_withIcon"><i className="my_contactIcons material-icons">phone</i>{ contact_data.Phone }</span>
                <span className="my_CardText my_withIcon"><i className="my_contactIcons material-icons">location_on</i>{ contact_data.Address }</span>
                <span className="my_CardText"><strong>Reg. № :&nbsp;</strong>{ contact_data.Reg_number }</span>
                <br />
                <span className="my_CardText"><strong>{ contact_data[prop_lang] }</strong></span>
                                          
                <a className="my_contactFacbook" href="https://www.facebook.com/pages/new_modela/510323402315624?ref=hl"><img src={FBicon} /></a>
            </Card.Text>

          </Card.Body>
        </Card>        
      )
    } // [] end of [else]
  //
}


const mapStateToProps = (state) => ({
  prop_contact: state.rootFirestore.ordered.contact,
  prop_lang: state.rootLang.lang,
})
ContactCard.propTypes = {
  prop_contact: PropTypes.any,
  prop_lang: PropTypes.any,
};

export default compose(
  connect( mapStateToProps ),
  firestoreConnect([
    { 
      collection: 'contact'
    }
  ])
)(ContactCard)