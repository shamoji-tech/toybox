// reducers.js
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { TYPE_INCREMENT, TYPE_DECREMENT } from './actions'

const counter_reducer = (state = {value: 0}, action) => {
    switch(action.type){
        case TYPE_INCREMENT:
            return {
                ...state,
                value: state.value + 1,
            }
        case TYPE_DECREMENT:
            return {
                ...state,
                value: state.value - 1,
            }
        default: 
            return state;
    }
}

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  counter: counter_reducer,
})

export default createRootReducer