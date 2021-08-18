import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux"
import { Provider } from "react-redux"
import thunk from "redux-thunk"
import { createBrowserHistory } from "history"
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'
import rootReducers from "./reducer"
import App from './App';

const history = createBrowserHistory()

const store = createStore(
  rootReducers(history),
  applyMiddleware(
    thunk,
    routerMiddleware(history),
  )
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);