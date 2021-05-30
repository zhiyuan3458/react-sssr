import React from 'react';
import { matchRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';
import createApp from 'src/common/createApp';


export default ctx => {
    return new Promise((resolve, reject) => {
        const location = ctx.url;
        const { routes, routesConfig, store } = createApp();

        const matchedRoutes = matchRoutes(routesConfig, ctx.url);

        if (matchedRoutes.length <= 0) reject({ code: 404, msg: 'not page found' });

        const promises = matchedRoutes.filter(item => item.route.component.asyncData)
                                      .map(item => item.route.component.asyncData(store, item.match));

        Promise.all(promises).then(() => {
            ctx.store = store;

            resolve(
                <StoreContext.Provider value={ store }>
                    <StaticRouter location={ location } context={ ctx }>
                        { routes }
                    </StaticRouter>
                </StoreContext.Provider>
            );
        });
    });
};
