/** [] Imported @ 
 * ../index.js
 * 
 * manualy updated 06/06/2019
*/ 

// [] fundemental components
  import React, { Component } from "react"
  import { connect } from 'react-redux'
  import PropTypes from 'prop-types'
  import { BrowserRouter, Route, Switch } from "react-router-dom"
// [] structure and style components
// [] my components
  import { Navbar, Cart, Checkout, Contact, Downloads, Home, PageNotFound, Product, Services, Special, Store, Trade } from './views';
  import { fetchStaticData } from '../redux_store/actions/getStatic'

// -------------------------------------------------------------------------------

// Nested routes (eg. - /redux_store/prod/:param) can be found in the respective element (eg. - [Store] for [store/:prod_id]) 

class App extends Component {
    
  constructor(props) {
    super(props);    
    this.props.getStatic();
  }
  
  /* /
  componentDidMount() {
    this.props.getStatic();
    //this.props.dispatch( fetchContact() );   
  }/**/

  render() {    
    //console.log('app props', this.props);
    //console.log('app state : ', loading, error );
    
    const { error, loading } = this.props;  
    if (error) {
      return <div><h4>ERROR [App]: {error.message}</h4></div>;
    } 
    if (loading) {      
      return <div className="center"><h3>Loading [App] ... {loading}</h3></div>;
    }
    //if( !error && !loading ) {
      return (
        <BrowserRouter>
          <div className="App"> 
            <Navbar />

            <Switch location={location}> 
              <Route path='/store/:prod_id' component={Product} />
              <Route path='/product/:prod_id' component={Product} />

              <Route exact path='/' component={Home} />
              <Route exact path='/cart' component={Cart} />
              <Route exact path='/checkout' component={Checkout} />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/downloads' component={Downloads} />
              <Route exact path='/product' component={Product} />
              <Route exact path='/services' component={Services} />
              <Route exact path='/special' component={Special} />
              <Route exact path='/store' component={Store} />
              <Route exact path='/trade' component={Trade} />

              <Route component={PageNotFound} />
            </Switch>

           

          </div>
        </BrowserRouter>      
      );
    //} // end of - if( !error && !loading )
  } // end of - render
}


const mapStateToProps = (state) => ({
  loading: state.rootStatic.loading,
  error: state.rootStatic.error
});
const mapDispatchToProps = (dispatch) => {
  return{
    getStatic: () => { 
      dispatch( fetchStaticData() ); 
    }
  }
};
App.propTypes = {
  getStatic: PropTypes.func,
  error: PropTypes.any,
  loading: PropTypes.any,
};

export default connect(mapStateToProps,mapDispatchToProps)(App)

/**
 *  <Switch>              
              <Route path='/store/:prod_id' component={Product} />
              <Route path='/product/:prod_id' component={Product} />

              <Route exact path='/' component={Home} />
              <Route exact path='/cart' component={Cart} />
              <Route exact path='/checkout' component={Checkout} />
              <Route exact path='/contact' component={Contact} />
              <Route exact path='/downloads' component={Downloads} />
              <Route exact path='/product' component={Product} />
              <Route exact path='/services' component={Services} />
              <Route exact path='/special' component={Special} />
              <Route exact path='/store' component={Store} />
              <Route exact path='/trade' component={Trade} />

              <Route component={PageNotFound} />
            </Switch>
 */