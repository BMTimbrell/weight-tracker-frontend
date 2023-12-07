const isPositiveNumber = value => {
    const valueAsNumber = Number(value);
    return (valueAsNumber > 0 && !isNaN(valueAsNumber));
};

export default isPositiveNumber;