import React from 'react';
import ReactDOM from 'react-dom';

import App from '../share/index';

const render = () => ReactDOM.hydrate(
    <App/>,
    document.getElementById('app')
);

render();

// hot-reload
if (module.hot) {
    module.hot.accept();
}
