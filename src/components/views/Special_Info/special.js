
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
  import { Container, Table } from 'react-bootstrap'
// [] my components  
  import PageLoading from '../Errors/pageLoading'
  import SpecialTableRow from './special_tableRow'

// -------------------------------------------------------------------------------

class SpecialInfo extends Component {  

  render(){         
    //console.log('special props', this.props);  

    // [] setting props
      const { location, prop_data, prop_lang } = this.props;
      
    // []
      if ( prop_data === undefined ) { 
        return PageLoading(location.pathname) 
      }
      else {
        return (
          <Container>
            <Helmet><title>Special info</title></Helmet>
            
            { prop_lang === 'ENG' ? (<div className="my_spec_explain">This page is avilable in RUSSIAN ONLY</div>):(null) }
            { prop_lang === 'LAT' ? (<div className="my_spec_explain">Šī lapa ir pieejama TIKAI KRIEVU VALODĀ</div>):(null) }
            
            <div className="my_special_suround">
              <Table responsive hover variant="light" className="my_special_table">
                <tbody>
                  {
                    prop_data && prop_data.map ( (data, index) => {
                      return (                      
                        <SpecialTableRow key={index} pass_data={data} />
                      )
                    })
                  }
                </tbody>
              </Table>
            </div>
          </Container>
        )  
      } // [] end of [else]
    //
  } // [] end of [render]
}

const mapStateToProps = (state) => {
  return {
    prop_lang: state.rootLang.lang,
    prop_data: state.rootFirestore.ordered.special,
  }
}
SpecialInfo.propTypes = {
  location: PropTypes.any,
  prop_lang: PropTypes.any,
  prop_data: PropTypes.any,
};


export default compose(
  connect( mapStateToProps ),
  firestoreConnect([
    { collection: 'special' }
  ])
)(SpecialInfo)