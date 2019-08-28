
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
  import { Container } from 'react-bootstrap'
// [] my components
  import PageLoading from '../../Errors/pageLoading'
  import ServiceText from '../../../json/services.json'
  import ServiceCard from './service_card'
// [] my images
  import  { ServiceImages } from '../../functions/import_images'

// -------------------------------------------------------------------------------


class Services extends Component {

  render(){
    //console.log('service props', this.props);

    // setting props
    const { prop_lang } = this.props; 
  
    // []
      if ( ServiceText === undefined ) { return PageLoading() }
      else {
        // the text data comes in for titles and text all together
        // this seperates them into 2 arrays
        // array IDs match up to the topics so they can be combined via IDs (as seen in the console log belowe)
          let arr_title = [];
          let arr_texts = [];
          ServiceText && ServiceText.map(txt => {
            if( txt.Type === 'title')
              arr_title.push(txt);
            else          
              arr_texts.push(txt);   
          })  
        //

        return (
          <Container> 
            <Helmet><title>Services</title></Helmet>  
            {
              arr_title.map( (title, index) => {
                return(
                  <ServiceCard 
                    key = {index} 
                    pass_title = {title} 
                    pass_text = {arr_texts[index]} 
                    pass_image = {ServiceImages} 
                    pass_lang = {prop_lang}/>
                );              
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
})
Services.propTypes = {  
  match: PropTypes.any,
  location: PropTypes.any,   
  prop_lang: PropTypes.any,
}

export default connect( mapStateToProps )(Services)