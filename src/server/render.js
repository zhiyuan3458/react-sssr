const { renderToString } = require('react-dom/server');

function templating (template) {
    return props => template.replace(/<!--([\s\S]*?)-->/g, (_, key) => {
        return props[key.trim()];
    });
}

module.exports = async (ctx, bundle, template) => {
    try {
        const render = templating(template);
        const jsx = await bundle(ctx);
        const html = renderToString(jsx);
        const body = render({
            html,
            store: `<script>window.__STORE__ = ${ JSON.stringify(ctx.store.getState()) }</script>`
        });

        ctx.body = body;
    } catch (e) {
        console.log(`服务器渲染模板报错了——error: ${ JSON.stringify(e) }`);
    }
};
