

// [] fundemental components
  import React from 'react'
  import ReactDom from 'react-dom'
  import { createStore, applyMiddleware } from 'redux'
  import { Provider } from 'react-redux'
  import thunk from 'redux-thunk'
// [] structure and style components
  import { Helmet } from 'react-helmet'
// [] my components
  import App from './components/app'
  import RootReducer from './redux_store/reducers/rootReducer'
  import { loadState, saveState } from './redux_store/actions/localStorage'
// [] my images
  import Favicon from '../images/icons/logo-tiny.png'
// [] styles
  import './style/index.scss' // [] my styles
  import 'lightbox-react/style.css' // This only needs to be imported once in your app

// -------------------------------------------------------------------------------

const presistedState = loadState();
const reduxStore = createStore(RootReducer, presistedState, applyMiddleware(thunk));

reduxStore.subscribe( () => {
  saveState({
    rootCart: reduxStore.getState().rootCart,
    rootLang: reduxStore.getState().rootLang
  })
})



ReactDom.render(
  <Provider store={reduxStore}>
    <Helmet><link rel="main icon" href={ Favicon } /></Helmet>
    <App /> 
  </Provider>,
  document.getElementById('root')
);


if (module.hot)       
  module.hot.accept() 