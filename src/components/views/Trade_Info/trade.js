
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
  import ReactHtmlParser from 'react-html-parser'
  import Card from 'react-bootstrap/Card'
  import Container from 'react-bootstrap/Container'
// [] my components
  import PageLoading from '../Errors/pageLoading'

// -------------------------------------------------------------------------------

class TradeInfo extends Component {

  render(){
    //console.log('trade props', this.props);

    // setting props
      const { location, prop_texts, prop_lang } = this.props; 

    // []    
      if ( prop_texts === undefined ) { 
        return PageLoading(location.pathname) 
      }
      else {
        return (
          <Container id="tradeInfo"> 
            <Helmet><title>Trade info</title></Helmet>
          {
            prop_texts && prop_texts.map( elem => {            
              if( elem[prop_lang] !== '' && ( elem.Name === 'Price' || elem.Name === 'Trade Rules' ) )
                return(   
                  <Card key={elem.ID_data} className="my_tradeInfo"> 
                      
                    <Card.Body>
                      <div>{ ReactHtmlParser( elem[prop_lang] ) }</div>
                    </Card.Body>

                  </Card>   
                )
            })
          }     
          </Container>
        )
      } // [] end of [else]
    //
  } // [] end of [render]
}

const mapStateToProps = (state) => ({
  prop_lang: state.rootLang.lang,  
  prop_texts: state.rootFirestore.ordered.longTexts,
});
TradeInfo.propTypes = {
  location: PropTypes.any, 
  prop_lang: PropTypes.any,
  prop_texts: PropTypes.any,
};

export default compose(
  connect( mapStateToProps ),
  firestoreConnect([
    { collection: 'longTexts' }
  ])
)(TradeInfo)