import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../../src/home.js'

let routes = (
    <Switch>
        <Route exact path="/" component={Home}/>
    </Switch>
);

if(process.env.BROWSER) {
    routes = (
        <Switch>
            <Route exact path="/" component={Home}/>
        </Switch>
    )
}

export default () => routes
