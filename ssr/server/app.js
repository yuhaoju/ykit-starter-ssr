import fs from 'fs';
import path from 'path';

import Koa from 'koa';
import staticCache from 'koa-static-cache';
import middleware from 'koa-webpack';

import webpack from 'webpack';
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'

import bootup from './bootup';
import App from '../share/index';

// app
const app = new Koa();
const appRoot = path.join(__dirname, '../../');

// webpack
const compiler = webpack({
    context: path.join(appRoot, 'ssr/client'),
    entry: './index.js',
    output: {
        path: path.join(appRoot, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                BROWSER: JSON.stringify(true)
            }
        })
    ]
});
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
}))

// response
app.use(async ctx => {
    const context = {};
    const initialState = {};

    bootup(
        <StaticRouter
            location={ctx.url}
            context={context}
        >
            <App/>
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
