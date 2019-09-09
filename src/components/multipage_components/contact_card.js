
/** [] Imported @ 
 * src/views-bootstrap/Card/card.js
 * src/views-bootstrap/Home/home.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React from "react"
  import { connect } from 'react-redux'
  import PropTypes from 'prop-types'
// [] structure and style components
  import Card from 'react-bootstrap/Card'
// [] my components
  import PageLoading from '../Errors/pageLoading'
  import ContactText from '../../json/contact.json'
// [] my images
  import FBicon from '../../../images/icons/icon-facebook.png'
  import EBAYicon from '../../../images/icons/icon-ebay.png'

// -------------------------------------------------------------------------------

const ContactCard = ({ prop_lang }) => {
  //console.log('contact data: ', ContactText);
      
  // []
    if ( ContactText === undefined ) { return PageLoading() }
    else {
      return (
        <Card className="my_contactCard">             
          <Card.Body>

            <Card.Title>              
              <h1><strong>{ ContactText.Name }</strong></h1>
              <h3><strong>Reg. № :&nbsp;</strong>{ ContactText.Reg_number }</h3>
                
            </Card.Title>

            <Card.Text>
                <span className="my_CardText my_withIcon">
                  <i className="my_contactIcons material-icons">email</i>
                  { ContactText.Email }
                </span>
                <span className="my_CardText my_withIcon">
                  <i className="my_contactIcons material-icons">phone</i>
                  { ContactText.Phone }
                </span>
                <span className="my_CardText my_withIcon">
                  <i className="my_contactIcons material-icons">location_on</i>
                  { ContactText.Address }
                </span>
                <br />
                <span className="my_CardText"><strong>{ ContactText[prop_lang] }</strong></span>

                <span className="my_contatct_icons">   
                  <a href="https://www.facebook.com/pages/new_modela/510323402315624?ref=hl"><img src={FBicon} /></a>
                  <a href="https://www.ebay.ie/usr/modela_l?_trksid=p2047675.l2559"><img src={EBAYicon} /></a>
            
                </span>                    
              </Card.Text>

          </Card.Body>
        </Card>        
      )
    } // [] end of [else]
  //
}


const mapStateToProps = (state) => ({
  prop_lang: state.rootLang.lang,
})
ContactCard.propTypes = {
  prop_lang: PropTypes.any,
};

export default connect( mapStateToProps )(ContactCard)