

// [] fundemental components
  import React from 'react'
  import ReactDom from 'react-dom'
  import { compose, createStore, applyMiddleware } from 'redux'
  import { Provider } from 'react-redux'
  import thunk from 'redux-thunk'

  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/auth'
  import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
  import { createFirestoreInstance, getFirestore } from 'redux-firestore'  
// [] structure and style components
  import { Helmet } from 'react-helmet'
// [] my components
  import FirebaseConfig from '../config/firebase.config'
  import App from './components/app'  
  import RootReducer from './redux_store/reducers/rootReducer'
  import { loadState, saveState } from './redux_store/actions/localStorage'
// [] my images
  import Favicon from '../images/icons/logo-tiny.png'
// [] styles
  import './style/index.scss' // [] my styles
  import 'lightbox-react/style.css' // This only needs to be imported once in your app

// -------------------------------------------------------------------------------

//firebase.initializeApp( FirebaseConfig );

const presistedState = loadState();
const reduxStore = createStore(
  RootReducer, 
  presistedState, 
  compose(
    applyMiddleware( thunk.withExtraArgument({ getFirebase, getFirestore }) ),
    //reactReduxFirebase( FirebaseConfig ),
    //reduxFirestore( FirebaseConfig )
  )
);
const rrfProps = {
  firebase,
  config: FirebaseConfig,
  dispatch: reduxStore.dispatch,
  createFirestoreInstance
}

reduxStore.subscribe( () => {
  saveState({
    rootCart: reduxStore.getState().rootCart,
    rootLang: reduxStore.getState().rootLang
  })
})



ReactDom.render(
  <Provider store={reduxStore}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Helmet><link rel="icon" href={ Favicon } /></Helmet>
      <App /> 
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);


if (module.hot)       
  module.hot.accept() 