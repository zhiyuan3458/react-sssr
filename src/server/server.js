const fs = require('fs');
const path = require('path');
const Koa = require('koa');
const KoaBody = require('koa-body');
const router = require('./router');
const KoaStatic = require('koa-static');
const render = require('./render');
const devServer = require('../dev-server');
const connectDB = require('./back/connect-db');
require('./back/controller');

connectDB();
const app = new Koa();

const env = process.env.NODE_ENV;
const isPro = process.env.NODE_ENV === 'production';
const config = require('../../build/config.js')[env];

let serverBundle;
let template;
let readyPromise;

if (isPro) {
    serverBundle = require('../../dist/js/server.js').default;
    template = fs.readFileSync(path.resolve(__dirname, '../../dist/server.tpl.html'), 'utf-8');
} else {
    /** dev模式下，获取bundle和clientHtml的模板 */
    readyPromise = devServer(app, path.resolve(__dirname, '../../index.html'));
}

app.use(KoaStatic(path.resolve(__dirname, '../../dist')));
app.use(KoaBody());

/** 拦截请求，通过这个可以判断对应的路由 */
router.get('*', async (ctx, next) => {
    if(ctx.request.url === '/favicon.ico') return;

    if (isPro) {
        await render(ctx, serverBundle, template);
    } else {
        /** dev模式 */
        /** bundle是server端的包，clientHtml是client端的，需要把bundle的内容renderToString一下 */
        /** 然后替换掉html模板 */
        const { bundle, clientHtml } = await readyPromise;
        await render(ctx, bundle, clientHtml);
    }

    next();
});

app.use(router.routes(), router.allowedMethods());

app.listen(config.port, function () {
    console.log('正在监听中');
});
