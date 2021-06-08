module.exports = {
    production: {
        port: 8004,
        publicPath: '/',
        mongodbURL: 'mongodb://112.96.54.152:27017/reactssr'
    },

    development: {
        port: 8080,
        publicPath: '/',
        mongodbURL: 'mongodb://localhost:27017/reactssr'
    }
};
