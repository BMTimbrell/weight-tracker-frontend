const formatDate = date => {
    let result = new Date(date);
    const day = result.getDate();
    const month = result.getMonth() + 1;
    const year = result.getFullYear();
    return {day, month, year};
};

export default formatDate;