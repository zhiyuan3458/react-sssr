const getModel = require('../model');
const router = require('../../router');
const userModel = getModel('user');
const { SUCCESS_RES, FRONT_ERR_RES, PARAMS_ERR_MSG } = require('../model/response');

const USER_PREFIX = '/user';

router.get(`${ USER_PREFIX }`, async (ctx, next) => {
   const { _id } = ctx.query;
   const data =await userModel.find({});
   ctx.body = SUCCESS_RES(data);
});


router.post(`${ USER_PREFIX }/add`, async (ctx, next) => {
   const { name, age } = ctx.request.body;
   if (!name || !age) FRONT_ERR_RES(PARAMS_ERR_MSG);
   const data = await userModel.create({ name, age });

   ctx.body = 657758;
});
