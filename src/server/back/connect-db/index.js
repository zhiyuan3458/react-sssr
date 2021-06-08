const mongoose = require('mongoose');
const config = require('../../../../build/config');
const env = process.env.NODE_ENV;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const url = config[env].mongodbURL;

module.exports = function () {
  mongoose.connect(url, options);
  const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("成功连接mongodb数据库！");
    });
};
