import {resolve, format, parse} from 'url'
import React, {Component, Children} from 'react'
import { withRouter } from 'react-router'
import { getPages } from '../../src/index.js';
import { isUrlMatch } from './util';

class Link extends Component {
    constructor(props) {
        super(props)
        this.linkClicked = this.linkClicked.bind(this);
        this.pages = getPages();
    }

    async linkClicked(e) {
        const { to } = this.props;

        if (isLocal(to)) {
            const {pathname} = window.location
            const href = resolve(pathname, to)

            e.preventDefault();

            // replace state instead of push if prop is present
            const { replace } = this.props
            const changeMethod = replace ? 'replace' : 'push'

            let getProps;
            this.pages.forEach(async (page) => {
                if(isUrlMatch(page.path, href) && page.getProps) {
                    getProps = page.getProps;
                }
            });
            const initialState = getProps ? await getProps() : {};

            window.__CLIENT_INITIAL_STATE__  = initialState;
            this.props.history[changeMethod](href);
        } else {
            // ignore click if it's outside our scope
            return;
        }
    }

    render() {
        let {children, to} = this.props
        const child = <a href={to}>{children}</a>
        const props = {
            onClick: this.linkClicked
        }
        return React.cloneElement(child, props)
    }
}

export default withRouter(Link);

function isLocal(href) {
    const url = parse(href, false, true)
    const origin = parse(getLocationOrigin(), false, true)
    return !url.host || (url.protocol === origin.protocol && url.host === origin.host)
}

function getLocationOrigin () {
    const { protocol, hostname, port } = window.location
    return `${protocol}//${hostname}${port ? ':' + port : ''}`
}
