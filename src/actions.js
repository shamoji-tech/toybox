export const TYPE_INCREMENT = "@@shamoji/increment";
export const TYPE_DECREMENT = "@@shamoji/decrement";
export const TYPE_CALC_NUMBTN = "@@shamoji/calc_NumBtn";
export const TYPE_CALC_PLUSBTN = "@@shamoji/calc_PlusBtn";
export const TYPE_CALC_MINUSBTN = "@@shamoji/calc_MinusBtn";
export const TYPE_CALC_TIMESBTN = "@@shamoji/calc_TimesBtn";
export const TYPE_CALC_DIVBTN = "@@shamoji/calc_DivBtn";
export const TYPE_CALC_EQUALBTN = "@@shamoji/calc_EqualBtn";
export const TYPE_CALC_DEFALT = "@@shamoji/calc_default";

export const increment = () =>({
    type: TYPE_INCREMENT,
});

export const decrement = () =>({
    type: TYPE_DECREMENT,
});

export const pushNumber = (number) =>({
    type: TYPE_CALC_NUMBTN,
    value: number,
})

export const pushPlus = () =>({
    type: TYPE_CALC_PLUSBTN,
})

export const pushMinus = () =>({
    type: TYPE_CALC_MINUSBTN,
})

export const pushTimes = () =>({
    type: TYPE_CALC_TIMESBTN,
})

export const pushDiv = () =>({
    type: TYPE_CALC_DIVBTN,
})

export const pushEqual = () =>({
    type: TYPE_CALC_EQUALBTN,
})

export const pushAC = () =>({
    type: TYPE_CALC_DEFALT,
})