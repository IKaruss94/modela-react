
/** [] Imported @ 
 * src/components/views/_admin/index.js
 * 
 * manualy updated 22/07/2019
*/ 

// [] fundemental components
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { firestoreConnect } from 'react-redux-firebase'
// [] structure and style components
import { Helmet } from 'react-helmet'
import { Container, Button, Table  } from 'react-bootstrap'
// [] my components
import PageLoading from '../../../Errors/pageLoading'
import LableModal from './lables_modal'

// -------------------------------------------------------------------------------


class AdminLables extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalData: null,
      modalShow: false,
    }
  }

  handleSubmit(props) {
    console.log('submit', props);
  }

  render(){
    //console.log('admin-lable props', this.props);
    
    if ( this.props.firestore_lables === undefined ) { 
      return PageLoading() 
    }
    else {
      return (
        <Container className="my_admin_container"> 
          <Helmet><title>LABLES</title></Helmet>

          <Table className="my_adminLable_table" striped bordered>
            <thead>
              <tr>
                <td>ENG</td>
                <td>LAT</td>
                <td>RUS</td>
                <td>btn</td>
              </tr>
            </thead>
            <tbody>
            {
              this.props.firestore_lables && this.props.firestore_lables.map( elem => {
                return(
                  <tr key={elem.id}>
                    <td>{elem.ENG}</td>
                    <td>{elem.LAT}</td>
                    <td>{elem.RUS}</td>
                    <td>
                      <Button 
                        key={ elem.id } 
                        variant="primary" 
                        onClick={ () => { this.setState({ modalData: elem, modalShow: true })}}
                      >EDIT</Button>
                    </td>
                  </tr>
                )                  
              })
            }
            </tbody>
          </Table>
          
          <LableModal 
            show={ this.state.modalShow } 
            onHide={ () => this.setState({ modalShow: false }) } 

            lable_data = { this.state.modalData }
            handleSubmit = { this.handleSubmit }
          />

        </Container>
      )
    } // [] end of [else]
  } // [] end of [render]
}

const mapStateToProps = (state) => ({ 
  firestore_lables: state.rootFirestore.ordered.lables,
});
AdminLables.propTypes = {
  firestore_lables: PropTypes.any,
};

export default compose(
connect( mapStateToProps ),
firestoreConnect([
  { collection: 'lables' }
])
)(AdminLables)