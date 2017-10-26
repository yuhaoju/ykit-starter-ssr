import React from 'react';
import { renderToString } from 'react-dom/server';
import { StyleSheetServer } from 'aphrodite';
import { JSDOM } from 'jsdom';
import globby from 'globby';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
if (typeof window === 'undefined') {
    global.window = dom.window
    global.document = window.document
    global.navigator = window.navigator
}

const bunleFilePath = isProduction ? globby.sync(['./dist/bundle@**.js']) : './dist/bundle.js';
const generatePage = (html, css, state, options = {
    title: 'SSR Demo'
}) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <title>${options.title}</title>
    <style data-aphrodite>${css.content}</style>
  </head>
  <body>
    <div id="app">${html}</div>
    <script>window.renderedClassNames = ${JSON.stringify(css.renderedClassNames)};</script>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)};</script>
    <script src="${bunleFilePath}"></script>
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
