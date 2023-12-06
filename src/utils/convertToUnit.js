const convertToUnit = (value, unit = 'kg') => {
    return unit === 'kg' ? Math.round(value / 2.205 * 10) / 10 : Math.round(value * 2.205 * 10) / 10;
};

export default convertToUnit;