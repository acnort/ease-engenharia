function getCurrentDate() {
    const data = new Date();
    return new Date(data.valueOf() - data.getTimezoneOffset() * 60000).toISOString().slice(0, 19).replace('T', ' ');
}

module.exports.getCurrentDate = getCurrentDate;