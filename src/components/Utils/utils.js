
export function unixTime2String4MineSweeper(time){
    const sec = Math.floor(time / 1000);
    const minutes = Math.floor(sec / 60);
    const hours = Math.floor(minutes / 60);
    return get2DigestNumer(hours) + ":" +
           get2DigestNumer(minutes) + ":" +
           get2DigestNumer(sec);
};

export function unixTime2String(time){
    const sec = Math.floor(time / 1000);
    const msec = time % 1000;
    const minutes = Math.floor(sec / 60);
    const hours = Math.floor(minutes / 60);
    return get2DigestNumer(hours) + ":" +
           get2DigestNumer(minutes) + ":" +
           get2DigestNumer(sec) + ":" +
           get4DigestNumer(msec) + ".";
};

function get2DigestNumer(number) {
    return ("0" + number).slice(-2);
}
function get4DigestNumer(number) {
    return ("00" + number).slice(-3);
}