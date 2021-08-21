import * as actionTypes from './actions';

const counterReducer = (state = {value: 0}, action) => {
    switch(action.type){
        case actionTypes.INCREMENT:
            return {
                ...state,
                value: state.value + 1,
            }
        case actionTypes.DECREMENT:
            return {
                ...state,
                value: state.value - 1,
            }
        default: 
            return state;
    }
}

export default counterReducer;