
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
import OrderModal from './orders_modal'


// -------------------------------------------------------------------------------

class AdminOrders extends Component { 
  constructor(props){
    super(props);
    this.state = {
      modalShow: false,
      modealData: null,
    }
  }

  render(){

    
      if ( this.props.firestore_orders === undefined || this.props.firestore_products === undefined ) { 
        return PageLoading() 
      }
      else {
        //console.log('admin order props', this.props);
        return (
          <Container className="my_admin_container"> 
            <Helmet><title>ORDERS</title></Helmet>

            <Table className="my_adminLable_table" striped bordered>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Full name</td>
                  <td>Status</td>
                  <td>Order</td>
                  <td>btns</td>
                </tr>
              </thead>
              <tbody>
              {
                this.props.firestore_orders && this.props.firestore_orders.map( elem => {
                  return(
                    <tr key={elem.ID_order} className="my_adminText_tableRow">
                      <td>{elem.id}</td>
                      <td>{ elem.Cust_fullname !== "" ? ( elem.Cust_name + ' ' + elem.Cust_lastname ):(elem.Cust_fullname) }</td>
                      <td>{ elem.Copleated == "1" ?( "Done" ):( elem.Compleated ) }</td>
                      <td>{ elem.Ordered_items }</td>
                      <td>
                        <Button 
                          key={ elem.id } 
                          variant="primary" 
                          className="my_admin_btn"
                          onClick={ () => { this.setState({ modalShow: true, modealData: elem }) } }
                        >DETAILS</Button>
                      </td>
                    </tr>
                  )                  
                })
              }
              </tbody>
            </Table>          
            
            <OrderModal 
              show={ this.state.modalShow } 
              onHide={ () => this.setState({ modalShow: false }) } 

              data = { this.state.modealData }
              prod = { this.props.firestore_products }
            />


          </Container>
        )
      } // [] end of [else]
    

  } // [] end of [render]
}

const mapStateToProps = (state) => ({
  firestore_orders: state.rootFirestore.ordered.orders,
  firestore_products: state.rootFirestore.ordered.products,
});
AdminOrders.propTypes = {
  firestore_orders: PropTypes.any,
  firestore_products: PropTypes.any,
};

export default compose(
  connect( mapStateToProps ),
  firestoreConnect([
    { collection: 'orders' },
    { collection: 'products' }
  ])
)(AdminOrders)