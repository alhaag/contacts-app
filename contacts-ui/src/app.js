// third party
import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { responsiveStoreEnhancer } from 'redux-responsive'
import ReactGA from 'react-ga'
// reducer
import RootReducer from './reducers/RootReducer'
// componets
import Main from './components/Main'


let history = createHistory()

// expoe globalemente
window.router = history

// inicializa google analytics
ReactGA.initialize('UA-123365254-1')

// atualiza rota no google analytics
history.listen(location =>  {
  ReactGA.pageview(location.pathname)
})

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// enable Redux Dev Tools
const enhancers = compose(
  responsiveStoreEnhancer,
  window.devToolsExtension
    ? window.devToolsExtension()
    : f => f
)

const store = createStore(
  RootReducer,
  applyMiddleware(thunk),
  //composeEnhancers(applyMiddleware(thunk))
  enhancers,
)

render(
  <Provider store={store}>
    <Router history={history}>
      <Main />
    </Router>
  </Provider>,
  document.getElementById('app')
)
