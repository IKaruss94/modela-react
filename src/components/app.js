/** [] Imported @ 
 * ../index.js
 * 
 * manualy updated 06/06/2019
*/ 

// [] fundemental components
  import React, { Component } from "react"
  //import { connect } from 'react-redux'
  import { BrowserRouter, Route, Switch } from "react-router-dom"
  //import { firestoreConnect } from 'react-redux-firebase'
// [] structure and style components
// [] my components
  import PageNotFound from './Errors/pageNotFound'  
  import Navigation from './navbar'
  import { Cart, Checkout, Contact, Downloads, Home, Product, Services, Special, Store, Trade } from './views';


// -------------------------------------------------------------------------------

// Nested routes (eg. - /redux_store/prod/:param) can be found in the respective element (eg. - [Store] for [store/:prod_id]) 

class App extends Component {

  render() {    
    //const currentView = window.location.href.split('/')[3];

      return (
        <BrowserRouter>
            <Navigation />

            <Switch location={location}> 
              <Route path='/store/:scale_id' component={Store} />
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
            
        </BrowserRouter>      
      );
    //} // end of - if( !error && !loading )
  } // end of - render
}

export default (App)