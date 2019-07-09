
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
  import { Container, Col, Row } from 'react-bootstrap'
// [] my components
  import PageLoading from '../Errors/pageLoading'
  import PageError from '../Errors/pageError'
  import { fetchData } from '../../../redux_store/actions/getData'
  import DownloadCard from './downloadElement'
// [] my images
  import { DownloadImages } from '../import_images'
  
// -------------------------------------------------------------------------------

class Downloads extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dlCards: [],
    };
  }

  componentDidMount(){    
    this.props.GetData('downloads');     
  }

  render(){
    //console.log('download props', this.props);
    //
      const { location, prop_error, prop_loading, prop_data, prop_lang } = this.props; 
    //
      if (prop_error) { return PageError(prop_error.message) }
      if (prop_loading) { return PageLoading(location.pathname) }
    //
    return (
      <Container id="download_div">
        <Helmet><title>Downloads</title></Helmet>
        { 
          prop_data && prop_data.map((elem, index) => {  
            if( index % 2 ) {
              return(                  
                <Row key={index}> 
                  <Col lg>
                    <DownloadCard key={ prop_data[index -1].ID_data } download={ prop_data[index -1] } image={DownloadImages} prop_lang={prop_lang} />
                  </Col>
                  <Col lg>
                    <DownloadCard key={ prop_data[index].ID_data } download={ prop_data[index] } image={DownloadImages} prop_lang={prop_lang} />
                  </Col> 
                </Row>
              )
            }
            else if( index === (prop_data.length)-1 )
            {
              return(                  
                <Row key={index}> 
                  <Col lg>
                    <DownloadCard key={ prop_data[index].ID_data } download={ prop_data[index] } image={DownloadImages} prop_lang={prop_lang} />
                  </Col> 
                  <Col lg></Col> 
                </Row>
              )
            }

              
            
                    
                 
          })
        }
      </Container>
    )  
  }
} 

const mapStateToProps = (state) => {
  return {    
    prop_lang: state.rootLang.lang,

    prop_data: state.rootData.data.downloads,
    prop_loading: state.rootData.loading,
    prop_error: state.rootData.error,
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    GetData: (page_name) => { dispatch( fetchData(page_name) ) },
  }
}
Downloads.propTypes = {
  location: PropTypes.any,
  prop_lang: PropTypes.any,

  prop_error: PropTypes.any,
  prop_loading: PropTypes.any,
  prop_data: PropTypes.any,

  GetData: PropTypes.func,
};


export default connect(mapStateToProps,mapDispatchToProps)(Downloads)