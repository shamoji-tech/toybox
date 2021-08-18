export const TYPE_INCREMENT = "@@shamoji/increment";
export const TYPE_DECREMENT = "@@shamoji/decrement";
export const increment = () =>({
    type: TYPE_INCREMENT,
});
export const decrement = () =>({
    type: TYPE_DECREMENT,
});
