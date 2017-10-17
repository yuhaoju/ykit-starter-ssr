import fs from 'fs';
import path from 'path';

import Koa from 'koa';
import staticCache from 'koa-static-cache';
import middleware from 'koa-webpack';
import axios from 'axios'
import logger from 'koa-logger'
import React from 'react';
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import webpack from 'webpack';

// server
import bootup from './bootup';
import App from '../share/index';
import { isUrlMatch } from '../share/util';

// user config
import { getPages } from '../../src/index.js'

// create app
const app = new Koa();
const appRoot = path.join(__dirname, '../../');

// x-response-time
app.use(async(ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(logger());

// client assets
app.use(async(ctx, next) => {
    if (ctx.url.startsWith('/dist')) {
        const extName = path.extname(ctx.url);
        extName === '.js' && ctx.set('Content-Type', 'text/javascript; charset=UTF-8');
        extName === '.css' && ctx.set('Content-Type', 'text/css; charset=UTF-8');
        ctx.set('Access-Control-Allow-Origin', '*');

        const { data } = await axios.get(`http://localhost:12456${ctx.url}`);
        ctx.body = data;
    } else {
        await next(ctx);
    }
});

// static
app.use(staticCache(path.join(appRoot, 'public'), {
    maxAge: 1000
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
