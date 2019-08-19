
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
  import PageLoading from '../../Errors/pageLoading'

// -------------------------------------------------------------------------------

class AdminTexts extends Component {

  render(){
    //console.log('trade props', this.props);

    // []    
      if ( this.props.firestore_texts === undefined ) { 
        return PageLoading() 
      }
      else {
        return (
          <Container className="my_admin_container"> 
            <Helmet><title>TEXTS</title></Helmet>

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
                this.props.firestore_texts && this.props.firestore_texts.map( elem => {
                  return(
                    <tr key={elem.id} className="my_adminText_tableRow">
                      <td>{elem.ENG}</td>
                      <td>{elem.LAT}</td>
                      <td>{elem.RUS}</td>
                      <td>
                        <Button 
                          key={ elem.id } 
                          variant="primary" 
                        >EDIT</Button>
                      </td>
                    </tr>
                  )                  
                })
              }
              </tbody>
            </Table>


          </Container>
        )
      } // [] end of [else]
    //
  } // [] end of [render]
}

const mapStateToProps = (state) => ({
  firestore_texts: state.rootFirestore.ordered.longTexts,
});
AdminTexts.propTypes = {
  firestore_texts: PropTypes.any,
};

export default compose(
  connect( mapStateToProps ),
  firestoreConnect([
    { collection: 'longTexts' }
  ])
)(AdminTexts)