
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
  import { Container, Col, Row } from 'react-bootstrap'
// [] my components
  import PageLoading from '../Errors/pageLoading'
  import DownloadCard from './downloadElement'
// [] my images
  import { DownloadImages } from '../../functions/import_images'
  
// -------------------------------------------------------------------------------

class Downloads extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dlCards: [],
    };
  }

  componentDidMount(){    
    //this.props.GetData('downloads');     
  }

  render(){
    //console.log('download props', this.props);
    //
    const { location, prop_lang, prop_downloads } = this.props; 

    // []
      if ( prop_downloads === undefined ) { 
        return PageLoading(location.pathname) 
      }
      else {
        return (
          <Container id="download_div">
            <Helmet><title>Downloads</title></Helmet>
            { 
              prop_downloads && prop_downloads.map((elem, index) => {  
                if( index % 2 ) {
                  return(                  
                    <Row key={index}> 
                      <Col lg>
                        <DownloadCard key={ prop_downloads[index -1].ID_data } download={ prop_downloads[index -1] } image={DownloadImages} prop_lang={prop_lang} />
                      </Col>
                      <Col lg>
                        <DownloadCard key={ prop_downloads[index].ID_data } download={ prop_downloads[index] } image={DownloadImages} prop_lang={prop_lang} />
                      </Col> 
                    </Row>
                  )
                }
                else if( index === (prop_downloads.length)-1 )
                {
                  return(                  
                    <Row key={index}> 
                      <Col lg>
                        <DownloadCard key={ prop_downloads[index].ID_data } download={ prop_downloads[index] } image={DownloadImages} prop_lang={prop_lang} />
                      </Col> 
                      <Col lg></Col> 
                    </Row>
                  )
                }
              })
            }
          </Container>
        )  
      } // [] end of [else]
    //
  }
} 

const mapStateToProps = (state) => {
  console.log(state);
  return {        
    prop_downloads: state.rootFirestore.ordered.downloads,
    prop_lang: state.rootLang.lang,
  }
}
Downloads.propTypes = {
  location: PropTypes.any,
  prop_lang: PropTypes.any,
  prop_downloads: PropTypes.any,
};


export default compose(
  connect( mapStateToProps ),
  firestoreConnect([
    { collection: 'downloads' }
  ])
)(Downloads)