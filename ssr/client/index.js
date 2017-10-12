import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '../share/index';

import('../../src/about.js').then(AboutComponent => {
    console.log('about!', AboutComponent);
}).catch((e) => {
    console.warn(`组件加载失败`);
});

const render = () => ReactDOM.hydrate(
    <Router>
        <App/>
        <AboutComponent />
    </Router>,
    document.getElementById('app')
);

render();

// hot-reload
if (module.hot) {
    module.hot.accept();
}
