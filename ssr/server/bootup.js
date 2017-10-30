import React from 'react';
import { renderToString } from 'react-dom/server';
import { StyleSheetServer } from 'aphrodite';
import { JSDOM } from 'jsdom';
import globby from 'globby';
import path from 'path';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
if (typeof window === 'undefined') {
    global.window = dom.window
    global.document = window.document
    global.navigator = window.navigator
}

const getBundlePath = function(fileName) {
    console.log('fileName', fileName);
    const ext = path.extname(fileName);
    const basename = path.basename(fileName, ext);

    const bundlePath = isProduction
        ? globby.sync([`./dist/${basename}@**${ext}`])[0]
        : `./dist/${basename}${ext}`
    return bundlePath.replace(/^\./, '');
}

const generatePage = (html, css, state, options = {
    title: 'SSR Demo'
}) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <title>${options.title}</title>
    <link href="${getBundlePath('style.css')}" rel="stylesheet" />
    <style data-aphrodite>${css.content}</style>
  </head>
  <body>
    <div id="app">${html}</div>
    <script>window.renderedClassNames = ${JSON.stringify(css.renderedClassNames)};</script>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)};</script>
    <script src="${getBundlePath('bundle.js')}"></script>
  </body>
</html>
`;

export default(components, initialState, callback) => {
    const {html, css} = StyleSheetServer.renderStatic(() => {
        return renderToString(
            components
        );
    });
    callback(null, generatePage(html, css, initialState));
};
