
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
  import ReactHtmlParser from 'react-html-parser'
  import Card from 'react-bootstrap/Card'
  import Container from 'react-bootstrap/Container'
// [] my components
  import PageLoading from '../../Errors/pageLoading'
  import LongText from '../../../json/long_text.json'

// -------------------------------------------------------------------------------

class TradeInfo extends Component {

  render(){
    //console.log('trade props', this.props);

    // setting props
      const { prop_lang } = this.props; 

    // []    
      if ( LongText === undefined ) { return PageLoading() }
      else {
        return (
          <Container id="tradeInfo"> 
            <Helmet><title>Trade info</title></Helmet>
          {
            LongText && LongText.map( elem => {            
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
});
TradeInfo.propTypes = {
  location: PropTypes.any, 
  prop_lang: PropTypes.any,
};

export default connect( mapStateToProps )(TradeInfo)