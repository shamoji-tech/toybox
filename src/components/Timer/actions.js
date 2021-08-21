export const TIMER_START = "@@timer/start";
export const TIMER_END = "@@timer/end";

export const timerStart = ()=>({
    type: TIMER_START,
    time: Date.now()
})

export const timerEnd = () =>({
    type: TIMER_END,
})