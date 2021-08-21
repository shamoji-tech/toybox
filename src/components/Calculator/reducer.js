import * as actionTypes from './actions';
import stringMath from 'string-math';

const caluclatorInitialState = {
    internalFormula: "",
    displayFormula: "",
    displayResult: false,
    resultValue: 0,
    beforeActionType: actionTypes.DEFALT,
}
const calculatorReducer = (state=caluclatorInitialState, action) => {

    switch(action.type){
        case actionTypes.DIVBTN:
            if(state.beforeActionType === actionTypes.DEFALT){
                return state;
            }else if(state.beforeActionType === actionTypes.USE_OPERATOR){
                return {
                    ...state,
                    internalFormula: state.internalFormula.slice(0,-2) + " /",
                    displayFormula: state.displayFormula.slice(0,-2) + " ÷",
                    beforeActionType: actionTypes.USE_OPERATOR,
                }
            }else if(state.beforeActionType === actionTypes.EQUALBTN){
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
                    beforeActionType: actionTypes.USE_OPERATOR,
                }
            }
        case actionTypes.TIMESBTN:
            if(state.beforeActionType === actionTypes.DEFALT){
                return state;
            }else if(state.beforeActionType === actionTypes.USE_OPERATOR){
                return {
                    ...state,
                    internalFormula: state.internalFormula.slice(0,-2) + " *",
                    displayFormula: state.displayFormula.slice(0,-2) + " ×",
                    beforeActionType: actionTypes.USE_OPERATOR,
                }
            }else if(state.beforeActionType === actionTypes.EQUALBTN){
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
                    beforeActionType: actionTypes.USE_OPERATOR,
                }
            }
        case actionTypes.MINUSBTN:
            if(state.beforeActionType === actionTypes.DEFALT){
                return state;
            }else if(state.beforeActionType === actionTypes.USE_OPERATOR){
                return {
                    ...state,
                    internalFormula: state.internalFormula.slice(0,-2) + " -",
                    displayFormula: state.displayFormula.slice(0,-2) + " -",
                    beforeActionType: actionTypes.USE_OPERATOR,
                }
            }else if(state.beforeActionType === actionTypes.EQUALBTN){
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
                    beforeActionType: actionTypes.USE_OPERATOR,
                }
            }
        case actionTypes.PLUSBTN:
            if(state.beforeActionType === actionTypes.DEFALT){
                return state;
            }else if(state.beforeActionType === actionTypes.USE_OPERATOR){
                return {
                    ...state,
                    internalFormula: state.internalFormula.slice(0,-2) + " +",
                    displayFormula: state.displayFormula.slice(0,-2) + " +",
                    beforeActionType: actionTypes.USE_OPERATOR,
                }
            }else if(state.beforeActionType === actionTypes.EQUALBTN){
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
                    beforeActionType: actionTypes.USE_OPERATOR,
                }
            }
        case actionTypes.EQUALBTN:
            switch(state.beforeActionType){
                case actionTypes.DEFALT:
                    return state;
                case actionTypes.EQUALBTN:
                    return state;
                case actionTypes.NUMBTN:
                    return {
                        ...state,
                        displayResult: true,
                        resultValue: stringMath(state.internalFormula),
                        beforeActionType: action.type,
                    }
                
                default:
                    return {
                        ...state,
                        displayResult: true,
                        resultValue: stringMath(state.internalFormula.slice( 0, -2 )),
                        beforeActionType: action.type,
                    }
            }
        case actionTypes.NUMBTN:

            if(state.beforeActionType === actionTypes.NUMBTN){
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
            }else if(state.beforeActionType === actionTypes.DEFALT){
                return {
                    ...state,
                    internalFormula: action.value + "",
                    displayFormula: action.value + "",
                    beforeActionType: action.type,
                }
            }else if(state.beforeActionType === actionTypes.EQUALBTN){

                return {
                    ...state,
                    internalFormula: action.value + "",
                    displayFormula: action.value + "",
                    beforeActionType: action.type,
                    displayResult: false,
                }
            }else if(state.beforeActionType === actionTypes.USE_OPERATOR){
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

export default calculatorReducer;