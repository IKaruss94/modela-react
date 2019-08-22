
/** [] Imported @ 
 * src/components/views/index.js
 * 
 * manualy updated 14/08/2019
*/ 

// [] fundemental components
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { firestoreConnect, isLoaded } from 'react-redux-firebase'
// [] structure and style components
import { Helmet } from 'react-helmet'
import { Container } from 'react-bootstrap'
// [] my components
import PageLoading from '../../Errors/pageLoading'

// ------------------------------------------------------------------------------- 

class AdminDashboard extends Component {   
    constructor(props) {
    super(props);

    this.state = {
        modalShow: false,
        modalID: null,
    };
    }

    orderElement(data){
        return(
            <div className="myAdmin_dash_order">
                <span className=""><b>Name</b> - { data.Cust_fullName ? (data.Cust_fullName) : (data.Cust_name +' '+ data.Cust_lastname) }</span>

                <br/>

                <span><b>Ordered on</b> - { data.Started_on }</span>

                <br/>

                <span><b>Status</b> - { 
                    data.Compleated == '0' ? ('In process') : (
                        data.Compleated == '1' ? ('Finished') : (   
                            data.Compleated == '-1' ? ('Caneled') : (data.Compleated)
                        )
                    )
                 }</span>

            </div>
        )
    }

    render(){     

        console.log('admin dashboard', this.props); 

        const { firestore_orders, prop_products } = this.props;  

        if ( !isLoaded( prop_products ) ) { 
        return PageLoading() 
        }
        else { 
            let reverse_order = firestore_orders.reverse();

            return (
                <Container className="my_admin_container"> 
                <Helmet><title>Dashboard</title></Helmet>

                    <div>
                        <div id="orders" className="myAdmin_dash_card">
                        {
                            reverse_order && reverse_order.map( elem => {
                                return this.orderElement(elem);
                            })
                        }
                        </div>
                        <div id="prodcuts" className="myAdmin_dash_card"></div>
                        <div id="texts" className="myAdmin_dash_card"></div>
                    </div>


                </Container>
            )  
        } // [] end of [else]
        
    } // [] end of [render]
}

const mapStateToProps = (state) => ({
    firestore_orders: state.rootFirestore.ordered.orders,
    prop_products: state.rootFirestore.ordered.products,
    //prop_categories: state.rootFirestore.ordered.production_categories,
})
AdminDashboard.propTypes = {  
    firestore_orders: PropTypes.any,
    prop_products: PropTypes.any,
    prop_categories: PropTypes.any,
};

export default compose(
connect( mapStateToProps ),
firestoreConnect([
    { 
        collection: 'orders', 
        limit: 5, 
        orderBy: ['Started_on', 'desc'],
       /* where: [
            ['Started_on', '>', '2000-01-01 00:00:00']
        ], */
    }, //, orderBy: ('id','desc')
    //{ collection: 'production_categories' }
])
)(AdminDashboard)