import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware} from "redux"
import { Provider} from "react-redux"
import thunk from "redux-thunk"
import { createBrowserHistory } from "history"
import { routerMiddleware, ConnectedRouter } from 'connected-react-router'
import rootReducers from "./reducer"
import App from './App';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import logger from 'redux-logger'

const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
  },
});
const history = createBrowserHistory()

const store = createStore(
  rootReducers(history),
  applyMiddleware(
    thunk,
    routerMiddleware(history),
    logger,
  ),
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);