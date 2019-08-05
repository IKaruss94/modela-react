/** [] Imported @ 
 * src/components/app.js
 * 
 * manualy updated 22/07/2019
*/ 

// [] fundemental components
  import React, { Component } from "react"
// [] my components
    import Navbar from './navbar';
    import AdminNavbar from './navbar_admin'

// -------------------------------------------------------------------------------

// Nested routes (eg. - /redux_store/prod/:param) can be found in the respective element (eg. - [Store] for [store/:prod_id]) 

class Navigation extends Component {

render() {    
  const currentView = window.location.href.split('/')[3];
  //[] this does not trigger when going between views

    return ( currentView === '_admin' ? ( <AdminNavbar /> ) : ( <Navbar /> ) );
} // end of - render
}

export default Navigation