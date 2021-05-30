const user = require('./user');
const detail = require('./detail');

const map = {
    user,
    detail
};

module.exports = function (key) {
    return map[key];
}
