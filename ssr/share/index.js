import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { getPages } from '../../src/index.js'

import Loadble from './loadable';

const pages = getPages();

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = window && window.__INITIAL_STATE__
                            ? window.__INITIAL_STATE__ // client side
                            : props.initialState; // server side
    }

    render() {
        return (
            <Switch>
                {
                    pages.map((route, i) => {
                        return (
                            <Route
                                key={i}
                                exact={typeof route.exact === 'undefined' ? false : route.exact}
                                path={route.path}
                                render={(routeProps) => {
                                    const clientInitialState = window.__CLIENT_INITIAL_STATE__ || {};
                                    return (
                                        <Loadble
                                            Component={route.component}
                                            getComponent={route.getComponent}
                                            {...routeProps}
                                            {...this.initialState}
                                            {...clientInitialState}
                                        />
                                    )
                                }}
                            />
                        )
                    })
                }
            </Switch>
        )
    }
}
