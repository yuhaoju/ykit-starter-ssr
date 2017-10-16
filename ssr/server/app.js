import fs from 'fs';
import path from 'path';

import Koa from 'koa';
import staticCache from 'koa-static-cache';
import middleware from 'koa-webpack';

import webpack from 'webpack';
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'

// server
import bootup from './bootup';
import App from '../share/index';
import { isUrlMatch } from '../share/util';

// user config
import { getPages } from '../../src/index.js'

// app
const app = new Koa();
const appRoot = path.join(__dirname, '../../');

// webpack
const webpackConfig = require('../client/webpack.config.js');
const compiler = webpack(webpackConfig);
app.use(middleware({compiler: compiler}));

// x-response-time
app.use(async(ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async(ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// static
app.use(staticCache(path.join(appRoot, 'public'), {
    maxAge: 365 * 24 * 60 * 60
}));

// response
app.use(async ctx => {
    const context = {};
    const appPages = getPages();

    let asyncTask = function() {
        return {};
    };

    appPages.forEach(async (page) => {
        if(isUrlMatch(page.path, ctx.url) && page.getProps) {
            asyncTask = page.getProps;
        }
    });

    const initialState = await asyncTask();
    bootup(
        <StaticRouter
            location={ctx.url}
            context={context}
        >
            <App initialState={initialState}/>
        </StaticRouter>,
        initialState,
        (err, page) => {
            if (err) {
                return ctx.body = err
            }
            ctx.body = page;
        }
    );
});

const port = 3000;
app.listen(port);
console.log('listening on ' + port);
