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
import { persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['timer']
}

const theme = createTheme({
  palette: {
    primary: {
      main: blue[700],
    },
  },
});
const history = createBrowserHistory()

const persistedReducer = persistReducer(persistConfig, rootReducers(history))
export const store = createStore(
  persistedReducer,
  applyMiddleware(
    thunk,
    routerMiddleware(history),
    logger,
  ),
)
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate loading={null} persistor={persistor} >
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </PersistGate>
      </ConnectedRouter>
    </Provider>
  ,
  document.getElementById('root')
);
