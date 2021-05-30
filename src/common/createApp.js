import React from 'react';
import { renderRoutes } from 'react-router-config';
import routesConfig from 'src/common/route';
import createStore from '../redux/createStore';

const createApp = (store = {}) => {
    return {
        routes: renderRoutes(routesConfig),
        routesConfig,
        store: createStore(store)
    };
};

export default createApp;
