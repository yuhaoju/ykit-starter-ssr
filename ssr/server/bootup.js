import React from 'react';
import {renderToString} from 'react-dom/server';

const { JSDOM } = require('jsdom')
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>')
if (typeof window === 'undefined') {
    global.window = dom.window
    global.document = window.document
    global.navigator = window.navigator
}

const generatePage = (content, state, options = {
    title: 'SSR Demo'
}) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <title>${options.title}</title>
  </head>
  <body>
    <div id="app">${content}</div>
    <script>window.__INITIAL_STATE__ = ${JSON.stringify(state)};</script>
    <script src="/dist/index.js"></script>
  </body>
</html>
`;

export default(components, initialState, callback) => {
    const content = renderToString(
        components
    );
    callback(null, generatePage(content, initialState));
};
