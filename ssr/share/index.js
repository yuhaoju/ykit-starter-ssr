import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { getPages } from '../../src/index.js'

const pages = getPages();
export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Switch>
                {
                    pages.map((route, i) => {
                        return <Route key={i} exact path={route.path} component={route.component} />
                    })
                }
            </Switch>
        )
    }
}
