import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { getPages } from '../../src/index.js'

const pages = getPages();
export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.initialState = window && window.__INITIAL_STATE__
                            ? window.__INITIAL_STATE__
                            : props.initialState;
    }

    render() {
        return (
            <Switch>
                {
                    pages.map((route, i) => {
                        const RouteComponent = route.component;
                        return (
                            <Route
                                key={i}
                                exact={typeof route.exact === 'undefined' ? true : route.exact}
                                path={route.path}
                                render={(routeProps) => (
                                    <RouteComponent {...routeProps} {...this.initialState}/>
                                )}
                            />
                        )
                    })
                }
            </Switch>
        )
    }
}
