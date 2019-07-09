
/** [] Imported @ 
 * src/views-bootstrap/Card/card.js
 * src/views-bootstrap/Home/home.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React from 'react'
  import PropTypes from 'prop-types'
// [] structure and style components
  import Card from 'react-bootstrap/Card'
// [] my components
// [] my images
  import FBicon from '../../../../images/icons/icon-facebook.png'

// -------------------------------------------------------------------------------

const ContactCard = ({ pass_data }) => {
    //console.log('contact data: 'pass_data)
    return (
        <Card className="my_contactCard">             
          <Card.Body>

            <Card.Title>              
              <strong>{ pass_data.Name }</strong>
            </Card.Title>

            <Card.Text>
                <span className="my_CardText my_withIcon"><i className="my_contactIcons material-icons">email</i>{ pass_data.Email }</span>
                <span className="my_CardText my_withIcon"><i className="my_contactIcons material-icons">phone</i>{ pass_data.Phone }</span>
                <span className="my_CardText my_withIcon"><i className="my_contactIcons material-icons">location_on</i>{ pass_data.Address }</span>
                <span className="my_CardText"><strong>Reg. № :&nbsp;</strong>{ pass_data.Reg_number }</span>
                <br />
                <span className="my_CardText"><strong>{ pass_data.Extra_info }</strong></span>
                                         
                <a className="my_contactFacbook" href="https://www.facebook.com/pages/new_modela/510323402315624?ref=hl"><img src={FBicon} /></a>
            </Card.Text>

          </Card.Body>
        </Card>        
    )
}

ContactCard.propTypes = {
  pass_data: PropTypes.any,
};
export default ContactCard