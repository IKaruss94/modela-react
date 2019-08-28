
/** [] Imported @ 
 * src/components/views/_admin/index.js
 * 
 * manualy updated 22/07/2019
*/ 

// [] fundemental components
  import React, { Component } from 'react'
  import PropTypes from 'prop-types'
// [] structure and style components
  import { Helmet } from 'react-helmet'
  import { Container, Table  } from 'react-bootstrap'
// [] my components
  //import PageLoading from '../../Errors/pageLoading'
  import LongText from '../../../../json/long_text.json'

  import TextModal from './text_modal'

// -------------------------------------------------------------------------------

const TDtext = ({ textData, handleClick }) => {
  return( 
    <td 
      className="myAdmin_text_display"
      onClick={ handleClick }
    >
      {textData}
    </td>
  )
}

class AdminTexts extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalLang: 'ENG',
      modalData: null,
      modalShow: false,
    }
    this.handleTableCellClick.bind(this);
  }

  handleTableCellClick(textElem, lang) {
    this.setState({ modalData: textElem, modalShow: true, modalLang: lang });
  }

  handleTextSubmit(props) {
    console.log('submit', props);
  }

  render(){
    //console.log('trade props', this.props);

    // []    
      return (
        <Container className="my_admin_container"> 
          <Helmet><title>TEXTS</title></Helmet>

          <Table className="my_adminLable_table" striped bordered>
            <thead>
              <tr>
                <td>ENG</td>
                <td>LAT</td>
                <td>RUS</td>
              </tr>
            </thead>
            <tbody>
            {
              LongText && LongText.map( elem => {
                return(
                  <tr key={elem.id} className="my_adminText_tableRow">
                    <TDtext textData={elem.ENG} handleClick={ ()=>{ this.handleTableCellClick(elem, 'ENG') } } />
                    <TDtext textData={elem.LAT} handleClick={ ()=>{ this.handleTableCellClick(elem, 'LAT') } } />
                    <TDtext textData={elem.RUS} handleClick={ ()=>{ this.handleTableCellClick(elem, 'RUS') } } />
                  
                  </tr>
                )                  
              })
            }
            </tbody>
          </Table>

          <TextModal 
            show={ this.state.modalShow } 
            onHide={ () => this.setState({ modalShow: false }) } 

            text_data = { this.state.modalData }
            text_lang = { this.state.modalLang }
            handleSubmit = { this.handleTextSubmit }
          />

        </Container>
      )
    //
  } // [] end of [render]
}

TDtext.propTypes={
  textData: PropTypes.string,
  handleClick: PropTypes.func,
}

export default (AdminTexts)
