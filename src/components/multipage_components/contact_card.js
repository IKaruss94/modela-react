
/** [] Imported @ 
 * src/views-bootstrap/Card/card.js
 * src/views-bootstrap/Home/home.js
 * 
 * manualy updated 28/05/2019
*/ 

// [] fundemental components
  import React, { Fragment } from "react"
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

const ContactCard = ({ card_page, ref_history, prop_lang }) => {
  //console.log('contact data: ', ContactText);

  const HomeCard = () => {
    const textArr = ContactText[prop_lang].split(' | ');
    return(
      <Fragment>
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
          { ContactText.ProductionAddress }
        </span>
        <br />
        <span className="my_CardText"><strong>{ textArr[5] }</strong></span>

        <span className="my_contatct_icons">   
          <a href="https://www.facebook.com/pages/new_modela/510323402315624?ref=hl"><img src={FBicon} /></a>
          <a href="https://www.ebay.ie/usr/modela_l?_trksid=p2047675.l2559"><img src={EBAYicon} /></a>  
        </span>     
      </Fragment>
    )
  }

  const ContactCard = () => {
    const textArr = ContactText[prop_lang].split(' | ');
    const dataArr = [ ContactText.Reg_number, ContactText.Email, ContactText.Phone, ContactText.ProductionAddress, ContactText.RegisteredAddress ];

    return(
      <Fragment>
        {
          textArr.map( (elem, index) => {
            if( index === 5 ) return null;
            return(              
              <span 
                key = { index }
                className="my_CardText"
              >
                <strong>{ elem +': '}</strong>
                { dataArr[index] }
              </span> 
            )
          })
        }
        <br />
        <span className="my_CardText"><strong>{ textArr[5] }</strong></span>

        <span className="my_contatct_icons">   
          <a href="https://www.facebook.com/pages/new_modela/510323402315624?ref=hl"><img src={FBicon} /></a>
          <a href="https://www.ebay.ie/usr/modela_l?_trksid=p2047675.l2559"><img src={EBAYicon} /></a>
    
        </span>      
      </Fragment>
    )
  }

      
  // []
    if ( ContactText === undefined ) { return PageLoading() }
    else {
      return (
        <Card 
          className="my_contactCard"          
          onClick = { ()=>{             
            card_page === "home" ? ( ref_history.push('/contact') ) : (null)
          }}
        >             
          <Card.Body>

            <Card.Title>              
              <h1><strong>{ ContactText.Name }</strong></h1>               
            </Card.Title>

            <Card.Text>    
            {
              card_page === "home" ? (
                <HomeCard />
              ) : (
                card_page === "contact" ? (
                  <ContactCard />
                ) : ( null )
              )
            }           
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


/**
 * 

            
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
 */