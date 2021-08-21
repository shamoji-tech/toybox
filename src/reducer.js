// reducers.js
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import counterReducer from './components/Counter/reducer';
import calculatorReducer from './components/Calculator/reducer';
import timerReducer from './components/Timer/reducer';


const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  counter: counterReducer,
  calculator: calculatorReducer,
  timer: timerReducer,
})

export default createRootReducer;