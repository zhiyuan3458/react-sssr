const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const url = 'mongodb://localhost:27017/reactssr';

module.exports = function () {
  mongoose.connect(url, options);
  const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        console.log("成功连接mongodb数据库！");
    });
};
