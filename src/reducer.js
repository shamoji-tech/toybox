// reducers.js
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import evalCalculation from './utils/eval-calculation'
import * as actionTypes from './actions'
const USE_OPERATOR = "@@shamoji/use_operator";
const counter_reducer = (state = {value: 0}, action) => {
    switch(action.type){
        case actionTypes.TYPE_INCREMENT:
            return {
                ...state,
                value: state.value + 1,
            }
        case actionTypes.TYPE_DECREMENT:
            return {
                ...state,
                value: state.value - 1,
            }
        default: 
            return state;
    }
}
const caluclatorInitialState = {
    internalFormula: "",
    displayFormula: "",
    displayResult: false,
    resultValue: 0,
    beforeActionType: actionTypes.TYPE_CALC_DEFALT,
}
const calculator_reducer = (state=caluclatorInitialState, action) => {

    switch(action.type){
        case actionTypes.TYPE_CALC_DIVBTN:
            if(state.beforeActionType === actionTypes.TYPE_CALC_DEFALT){
                return state;
            }else if(state.beforeActionType === USE_OPERATOR){
                return {
                    ...state,
                    internalFormula: state.internalFormula.slice(0,-2) + " /",
                    displayFormula: state.displayFormula.slice(0,-2) + " ÷",
                    beforeActionType: USE_OPERATOR,
                }
            }else if(state.beforeActionType === actionTypes.TYPE_CALC_EQUALBTN){
                return {
                    ...state,
                    internalFormula: state.resultValue + " /",
                    displayFormula: state.resultValue + " ÷",
                    beforeActionType: action.type,
                    displayResult: false,
                }
            }else{
                return {
                    ...state,
                    internalFormula: state.internalFormula + " /",
                    displayFormula: state.displayFormula + " ÷",
                    beforeActionType: USE_OPERATOR,
                }
            }
        case actionTypes.TYPE_CALC_TIMESBTN:
            if(state.beforeActionType === actionTypes.TYPE_CALC_DEFALT){
                return state;
            }else if(state.beforeActionType === USE_OPERATOR){
                return {
                    ...state,
                    internalFormula: state.internalFormula.slice(0,-2) + " *",
                    displayFormula: state.displayFormula.slice(0,-2) + " ×",
                    beforeActionType: USE_OPERATOR,
                }
            }else if(state.beforeActionType === actionTypes.TYPE_CALC_EQUALBTN){
                return {
                    ...state,
                    internalFormula: state.resultValue + " *",
                    displayFormula: state.resultValue + " ×",
                    beforeActionType: action.type,
                    displayResult: false,
                }
            }else{        
                return {
                    ...state,
                    internalFormula: state.internalFormula + " *",
                    displayFormula: state.displayFormula + " ×",
                    beforeActionType: USE_OPERATOR,
                }
            }
        case actionTypes.TYPE_CALC_MINUSBTN:
            if(state.beforeActionType === actionTypes.TYPE_CALC_DEFALT){
                return state;
            }else if(state.beforeActionType === USE_OPERATOR){
                return {
                    ...state,
                    internalFormula: state.internalFormula.slice(0,-2) + " -",
                    displayFormula: state.displayFormula.slice(0,-2) + " -",
                    beforeActionType: USE_OPERATOR,
                }
            }else if(state.beforeActionType === actionTypes.TYPE_CALC_EQUALBTN){
                return {
                    ...state,
                    internalFormula: state.resultValue + " -",
                    displayFormula: state.resultValue + " -",
                    beforeActionType: action.type,
                    displayResult: false,
                }
            }else{
                return {
                    ...state,
                    internalFormula: state.internalFormula + " -",
                    displayFormula: state.displayFormula + " -",
                    beforeActionType: USE_OPERATOR,
                }
            }
        case actionTypes.TYPE_CALC_PLUSBTN:
            if(state.beforeActionType === actionTypes.TYPE_CALC_DEFALT){
                return state;
            }else if(state.beforeActionType === USE_OPERATOR){
                return {
                    ...state,
                    internalFormula: state.internalFormula.slice(0,-2) + " +",
                    displayFormula: state.displayFormula.slice(0,-2) + " +",
                    beforeActionType: USE_OPERATOR,
                }
            }else if(state.beforeActionType === actionTypes.TYPE_CALC_EQUALBTN){
                return {
                    ...state,
                    internalFormula: state.resultValue + " +",
                    displayFormula: state.resultValue + " +",
                    beforeActionType: action.type,
                    displayResult: false,
                }
            }else{
                return {
                    ...state,
                    internalFormula: state.internalFormula + " +",
                    displayFormula: state.displayFormula + " +",
                    beforeActionType: USE_OPERATOR,
                }
            }
        case actionTypes.TYPE_CALC_EQUALBTN:
            switch(state.beforeActionType){
                case actionTypes.TYPE_CALC_DEFALT:
                    return state;
                case actionTypes.TYPE_CALC_EQUALBTN:
                    return state;
                case actionTypes.TYPE_CALC_NUMBTN:
                    return {
                        ...state,
                        displayResult: true,
                        resultValue: evalCalculation(state.internalFormula),
                        beforeActionType: action.type,
                    }
                
                default:
                    return {
                        ...state,
                        displayResult: true,
                        resultValue: evalCalculation(state.internalFormula.slice( 0, -2 )),
                        beforeActionType: action.type,
                    }
            }
        case actionTypes.TYPE_CALC_NUMBTN:

            if(state.beforeActionType === actionTypes.TYPE_CALC_NUMBTN){
                if(state.internalFormula === "0"){
                    return {
                        ...state,
                        internalFormula: "" + action.value,
                        displayFormula: "" + action.value,
                        beforeActionType: action.type,
                    }
                }else{
                    return {
                        ...state,
                        internalFormula: state.internalFormula + action.value,
                        displayFormula: state.displayFormula + action.value,
                        beforeActionType: action.type,
                    }
                }
            }else if(state.beforeActionType === actionTypes.TYPE_CALC_DEFALT){
                return {
                    ...state,
                    internalFormula: action.value + "",
                    displayFormula: action.value + "",
                    beforeActionType: action.type,
                }
            }else if(state.beforeActionType === actionTypes.TYPE_CALC_EQUALBTN){

                return {
                    ...state,
                    internalFormula: action.value + "",
                    displayFormula: action.value + "",
                    beforeActionType: action.type,
                    displayResult: false,
                }
            }else if(state.beforeActionType === USE_OPERATOR){
                return {
                    ...state,
                    internalFormula: state.internalFormula + " " + action.value,
                    displayFormula: state.displayFormula + " " + action.value,
                    beforeActionType: action.type, 
                }
            }else{
                return {
                    ...state,
                    internalFormula: state.internalFormula + " " + action.value,
                    displayFormula: state.displayFormula + " " + action.value,
                    beforeActionType: action.type
                }
            }
        default:
            return caluclatorInitialState;
    }
};

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  counter: counter_reducer,
  calculator: calculator_reducer,
})

export default createRootReducer