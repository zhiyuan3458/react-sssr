import React from 'react';
import Home from 'src/pages/home';
import Me from 'src/pages/me';

export default [
    {
        path: '/',
        exact: true,
        component: Home
    },
    {
        path: '/me',
        exact: true,
        component: Me
    }
];
