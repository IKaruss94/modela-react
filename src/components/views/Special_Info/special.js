
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
  import { Container, Table } from 'react-bootstrap'
// [] my components
  import PageLoading from '../Errors/pageLoading'
  import PageError from '../Errors/pageError'
  import { fetchData } from '../../../redux_store/actions/getData'
  import SpecialTableRow from './special_tableRow'
// [] my images

// -------------------------------------------------------------------------------

class SpecialInfo extends Component {  

  componentDidMount(){    
    this.props.GetData('special'); 
  }    
    
  // [] my functions  
  //

  render(){         
    //console.log('special props', this.props);  

    // [] setting props
      const { location, prop_loading, prop_error, prop_data, prop_lang } = this.props;
    // [] choosing what to render
      if (prop_error) { return PageError(prop_error.message) }
      if (prop_loading) { return PageLoading(location.pathname) }
      
    return (
      <Container>
        <Helmet><title>Special info</title></Helmet>
        
        { prop_lang === 'eng' ? (<div className="my_spec_explain">This page is avilable in RUSSIAN ONLY</div>):(null) }
        { prop_lang === 'lat' ? (<div className="my_spec_explain">Šī lapa ir pieejama TIKAI KRIEVU VALODĀ</div>):(null) }
        
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
  }
}

const mapStateToProps = (state) => {
  return {
    prop_lang: state.rootLang.lang,

    prop_data: state.rootData.data.special,
    prop_loading: state.rootData.loading,
    prop_error: state.rootData.error,
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    GetData: (page_name) => { dispatch( fetchData(page_name) ) },
  }
}
SpecialInfo.propTypes = {
  location: PropTypes.any,

  prop_lang: PropTypes.any,

  prop_error: PropTypes.any,
  prop_loading: PropTypes.any,
  prop_data: PropTypes.any,

  GetData: PropTypes.func,
};


export default connect(mapStateToProps,mapDispatchToProps)(SpecialInfo)