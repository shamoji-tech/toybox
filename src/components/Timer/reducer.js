import * as actionTypes from './actions';

const initialTimerState = {
    startTime: 0
};
const timerReducer = (state=initialTimerState, action) => {
    switch(action.type){
        case actionTypes.TIMER_START:
            
            return {
                ...state,
                startTime: action.time
            };
        case actionTypes.TIMER_END:
            return initialTimerState;
        default:
            return state;
    }
};

export default timerReducer;