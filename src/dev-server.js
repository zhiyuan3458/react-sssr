// import fs from 'fs';
// import path from 'path';
// import MFS from 'memory-fs';
// import webpack from 'webpack';
// import chokidar from 'chokidar';
// import convert from 'koa-convert';
// import devMiddleware from 'koa-webpack-dev-middleware';
// import hotMiddleware from 'koa-webpack-hot-middleware';
// import clientConfig from '../build/webpack.client.config';
// import serverConfig from '../build/webpack.server.config';

const fs = require('fs');
const path = require('path');
const MFS = require('memory-fs');
const webpack = require('webpack');
const chokidar = require('chokidar');
const convert = require('koa-convert');
const devMiddleware = require('koa-webpack-dev-middleware');
const hotMiddleware = require('koa-webpack-hot-middleware');
const clientConfig = require('../build/webpack.client.config');
const serverConfig = require('../build/webpack.server.config');

const readFile = (fs, file) => {
    return fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')
}

module.exports = function (app, templatePath) {
    let bundle
    let template
    let clientHtml

    // 这里其实就是吧resolve单独拿出来了，其实你也可以直接吧下面的代码写在promise里面，这样的好处就是减少代码嵌套。
    let ready
    const readyPromise = new Promise(r => {
        ready = r
    })

    // 更新触发的函数
    const update = () => {
        if (bundle && clientHtml) {
            ready({ bundle, clientHtml });
        }
    }

    // 监听模版文件
    chokidar.watch(templatePath).on('change', () => {
        template = fs.readFileSync(templatePath, 'utf-8')
        console.log('chokidar —— index.html template updated.')
        update()
    })

    // 监听热更新的入口
    clientConfig.entry.client = ['webpack-hot-middleware/client', clientConfig.entry.client]
    clientConfig.output.filename = '[name].[hash:8].js'
    clientConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )

    // 创建dev服务
    const clientCompiler = webpack(clientConfig)

    const middleware = devMiddleware(clientCompiler, {
        /** publicPath表示编译打包后的文件将放在dev内存的publicPath目录下 */
        publicPath: clientConfig.output.publicPath,
        noInfo: true,
        /** 这里是个坑，如果不加这个久变成devMiddle直接取代router.get('*', function()...)了 */
        /** 加了这个之后，devMiddleWare不再加载首页 */
        /** 不过最好不要用index.html作为输出模板，包括之后的koastatic也会默认，输入/就会马上显示index.html */
        index: false
    });

    /** convert中间件是为了把async转为promise */
    app.use(convert(middleware));
    clientCompiler.hooks.done.tap('DevPlugin', stats => {
        stats = stats.toJson()
        stats.errors.forEach(err => console.error(err))
        stats.warnings.forEach(err => console.warn(err))
        if (stats.errors.length) return
        // 获取dev内存中入口html
        clientHtml = readFile(
            middleware.fileSystem,
            'server.tpl.html',
        )

        update();
    })

    app.use(convert(hotMiddleware(clientCompiler)));

    // 监听并且更新server入口文件
    const serverCompiler = webpack(serverConfig)

    // 创建一个内存文件系统
    const mfs = new MFS()
    serverCompiler.outputFileSystem = mfs
    serverCompiler.watch({}, (err, stats) => {
        if (err) throw err
        stats = stats.toJson()
        if (stats.errors.length) return

        bundle = eval(readFile(mfs, 'js/server.js')).default;
        update()
    })

    return readyPromise
}
