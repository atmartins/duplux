const colors = {
    green: '#017C86',
    blue: '#263c72',
};

const standardStyles = 'color: white; font-weight: bold; padding: 2px 10px;';
const green = (label, ...args) => {
    console.log(`%c ${label} `, `background-color: ${colors.green};${standardStyles}`, ...args); // eslint-disable-line
};

const blue = (label, ...args) => {
        console.log(`%c ${label} `, `background-color: ${colors.blue};${standardStyles}`, ...args); // eslint-disable-line
};

export default {
    green,
    blue,
}
