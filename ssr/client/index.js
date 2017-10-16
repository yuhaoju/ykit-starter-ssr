import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '../share/index';
import { getPages } from '../../src/index.js';

const render = () => ReactDOM.hydrate(
    <Router>
        <App/>
    </Router>,
    document.getElementById('app')
);

render();

// hot-reload
if (module.hot) {
    module.hot.accept();
}
