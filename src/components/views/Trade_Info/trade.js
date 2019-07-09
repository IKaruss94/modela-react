
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
  import PageLoading from '../Errors/pageLoading'
  import PageError from '../Errors/pageError'  
  import { fetchData } from '../../../redux_store/actions/getData'
// [] my images

// -------------------------------------------------------------------------------

class TradeInfo extends Component {

  componentDidMount() {    
    this.props.GetData('trade');  
  }

  render(){
    //console.log('trade props', this.props);

    // setting props
      const { location, prop_error, prop_loading, prop_data, prop_lang } = this.props; 
    // [] choosing what to render
      if (prop_error) { return PageError(prop_error.message) }
      if (prop_loading) { return PageLoading(location.pathname) }
    //
      return (
        <Container id="tradeInfo"> 
          <Helmet><title>Trade info</title></Helmet>
        {
          prop_data && prop_data.map( text => {
            if( text[prop_lang.toUpperCase()] !== '' )
              return(   
                <Card key={text.ID_data} className="my_tradeInfo"> 
                    
                  <Card.Body>
                    <div>{ ReactHtmlParser( text[prop_lang.toUpperCase()] ) }</div>
                  </Card.Body>

                </Card>   
              )
          })
        }     
        </Container>
      )
  }
}

const mapStateToProps = (state) => ({
  prop_lang: state.rootLang.lang,
  prop_data: state.rootData.data.trade,
  prop_loading: state.rootData.loading,
  prop_error: state.rootData.error,
});
const mapDispatchToProps = (dispatch) => {
  return{
    GetData: (page_name) => { dispatch( fetchData(page_name) ) },
  }
}
TradeInfo.propTypes = {
  location: PropTypes.any, 
  prop_lang: PropTypes.any,

  prop_error: PropTypes.any,
  prop_loading: PropTypes.any,
  prop_data: PropTypes.any,

  GetData: PropTypes.func,
};


export default connect(mapStateToProps, mapDispatchToProps)(TradeInfo)