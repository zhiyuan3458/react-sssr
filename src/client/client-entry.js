import React from 'react';
import ReactDOM from 'react-dom';
import createApp from '../common/createApp';
import { BrowserRouter } from 'react-router-dom';
import { StoreContext } from 'redux-react-hook';

const { routes, store } = createApp(window.__STORE__);

ReactDOM.hydrate(
    <StoreContext.Provider value={ store }>
        <BrowserRouter>
            { routes }
        </BrowserRouter>
    </StoreContext.Provider>,
    document.getElementById('root')
);
