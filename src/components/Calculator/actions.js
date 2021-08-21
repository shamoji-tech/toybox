export const NUMBTN = "@@calc/NumBtn";
export const PLUSBTN = "@@calc/PlusBtn";
export const MINUSBTN = "@@calc/MinusBtn";
export const TIMESBTN = "@@calc/TimesBtn";
export const DIVBTN = "@@calc/DivBtn";
export const EQUALBTN = "@@calc/EqualBtn";
export const DEFALT = "@@calc/default";
export const USE_OPERATOR = "@@shamoji/use_operator";

export const pushNumber = (number) =>({
    type: NUMBTN,
    value: number,
})

export const pushPlus = () =>({
    type: PLUSBTN,
})

export const pushMinus = () =>({
    type: MINUSBTN,
})

export const pushTimes = () =>({
    type: TIMESBTN,
})

export const pushDiv = () =>({
    type: DIVBTN,
})

export const pushEqual = () =>({
    type: EQUALBTN,
})

export const pushAC = () =>({
    type: DEFALT,
})