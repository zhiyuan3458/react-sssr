const SUCCESS_CODE = 200;
const FRONT_ERR_CODE = 400;
const SERVER_ERR_CODE = 500;

const SUCCESS_MSG = 'success';
const DEFAULT_ERR_MSG = '未知错误';
exports.PARAMS_ERR_MSG = '未知错误';

exports.SUCCESS_RES = function (data = {}) {
    return { code: SUCCESS_CODE, data, msg: SUCCESS_MSG };
};

exports.FRONT_ERR_RES = function (err = DEFAULT_ERR_MSG) {
    return { code: FRONT_ERR_CODE, msg: err };
};

exports.SERVER_ERR_RES = function (err = DEFAULT_ERR_MSG) {
    return { code: SERVER_ERR_CODE, msg: err };
};
