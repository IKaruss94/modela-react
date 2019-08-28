
/** [] Imported @ 
 * src/components/views/_admin/index.js
 * 
 * manualy updated 22/07/2019
*/ 

// [] fundemental components
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// [] structure and style components
import { Helmet } from 'react-helmet'
import Container from 'react-bootstrap/Container'
// [] my components
import PageLoading from '../../../Errors/pageLoading'

// -------------------------------------------------------------------------------

class AdminLogin extends Component {

render(){
  //console.log('trade props', this.props);

  // setting props
    const { location, prop_texts } = this.props; 

  // []    
    if ( prop_texts === undefined ) { 
      return PageLoading(location.pathname) 
    }
    else {
      return (
        <Container className="my_admin_container"> 
          <Helmet><title>LOGIN</title></Helmet>
          LOGIN
        </Container>
      )
    } // [] end of [else]
  //
} // [] end of [render]
}

const mapStateToProps = (state) => ({
prop_lang: state.rootLang.lang,  
});
AdminLogin.propTypes = {
location: PropTypes.any, 
prop_lang: PropTypes.any,
prop_texts: PropTypes.any,
};

export default connect( mapStateToProps )(AdminLogin)