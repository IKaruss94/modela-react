
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
  import PageLoading from '../Errors/pageLoading'
  import PageError from '../Errors/pageError'
  import { fetchData } from '../../../redux_store/actions/getData'
  //import { fetchPageText } from '../../../redux_store/actions/getTexts'
  import ServiceCard from './service_card'
// [] my images
  import  { ServiceImages } from '../import_images'

// -------------------------------------------------------------------------------


class Services extends Component {
  
  componentDidMount(){    
    this.props.GetData('services');     
  }

  render(){
    //console.log('service props', this.props);

    // setting props
    const { location, prop_error, prop_loading, prop_data, prop_lang } = this.props; 

    if (prop_error) { return PageError(prop_error.message) }
    if (prop_loading) { return PageLoading(location.pathname) }

    // the text data comes in for titles and text all together
    // this seperates them into 2 arrays
    // array IDs match up to the topics so they can be combined via IDs (as seen in the console log belowe)
      let arr_title = [];
      let arr_texts = [];
      prop_data && prop_data.map(txt => {
        if( txt.Type === 'title')
          arr_title.push(txt);
        else          
          arr_texts.push(txt);   
      })  
      /*
      arr_title.map( (title, id) => {
        console.log( 'arr test : '+ id , title, arr_texts[id] )
      })
      */
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
  }
}

const mapStateToProps = (state) => ({
  prop_lang: state.rootLang.lang,
  prop_data: state.rootData.data.services,
  prop_loading: state.rootData.loading,
  prop_error: state.rootData.error
})
const mapDispatchToProps = (dispatch) => {
  return{
    GetData: (page_name) => { dispatch( fetchData(page_name) ) },
  }
}
Services.propTypes = {  
  match: PropTypes.any,
  prop_lang: PropTypes.any,
  prop_loading: PropTypes.any,
  prop_error: PropTypes.any,
  prop_data: PropTypes.any,

  location: PropTypes.any, 
  
  GetData: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Services)