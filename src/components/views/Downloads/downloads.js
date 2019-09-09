
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
  import PageLoading from '../../Errors/pageLoading'
  import JSONdownloads from '../../../json/downloads'
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
    const { prop_lang } = this.props; 

    // []
      if ( JSONdownloads === undefined ) { return PageLoading() }
      else {
        return (
          <Container id="download_div">
            <Helmet><title>Downloads</title></Helmet>
            { 
              JSONdownloads && JSONdownloads.map((elem, index) => {  
                if( index % 2 ) {
                  return(                  
                    <Row key={index}> 
                      <Col lg>
                        <DownloadCard key={ JSONdownloads[index -1].ID_data } download={ JSONdownloads[index -1] } image={DownloadImages} prop_lang={prop_lang} />
                      </Col>
                      <Col lg>
                        <DownloadCard key={ JSONdownloads[index].ID_data } download={ JSONdownloads[index] } image={DownloadImages} prop_lang={prop_lang} />
                      </Col> 
                    </Row>
                  )
                }
                else if( index === (JSONdownloads.length)-1 )
                {
                  return(                  
                    <Row key={index}> 
                      <Col lg>
                        <DownloadCard key={ JSONdownloads[index].ID_data } download={ JSONdownloads[index] } image={DownloadImages} prop_lang={prop_lang} />
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

const mapStateToProps = (state) => ({        
    prop_lang: state.rootLang.lang,
})
Downloads.propTypes = {
  location: PropTypes.any,
  prop_lang: PropTypes.any,
};

export default connect( mapStateToProps )(Downloads)