import {resolve, format, parse} from 'url'
import React, {Component, Children} from 'react'
import { withRouter } from 'react-router'

class Link extends Component {
    constructor(props) {
        super(props)
        this.linkClicked = this.linkClicked.bind(this);
    }

    linkClicked(e) {
        if (e.currentTarget.nodeName === 'A'
        && (e.metaKey || e.ctrlKey || e.shiftKey || (e.nativeEvent && e.nativeEvent.which === 2))) {
            // ignore click for new tab / new window behavior
            return;
        }

        const { to } = this.props;

        if (!isLocal(to)) {
            // ignore click if it's outside our scope
            return
        }

        const {pathname} = window.location
        const href = resolve(pathname, to)

        e.preventDefault()

        // replace state instead of push if prop is present
        const { replace } = this.props
        const changeMethod = replace ? 'replace' : 'push'

        this.props.history[changeMethod](href)
    }

    render() {
        let {children, to} = this.props

        // Deprecated. Warning shown by propType check. If the childen provided is a string
        // (<Link>example</Link>) we wrap it in an <a> tag
        // if (typeof children === 'string') {
        const child = <a href={to}>{children}</a>
        // }

        // This will return the first child, if multiple are provided it will throw an error
        // const child = Children.only(children)
        const props = {
            onClick: this.linkClicked
        }
        //
        // // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
        // // defined, we specify the current 'href', so that repetition is not needed by the user
        // if (this.props.passHref || (child.type === 'a' && !('href' in child.props))) {
        //     props.href = as || href
        // }

        // Add the ending slash to the paths. So, we can serve the "<page>/index.html" directly.
        // if (props.href && typeof __NEXT_DATA__ !== 'undefined' && __NEXT_DATA__.nextExport) {
        //     props.href = _rewriteUrlForNextExport(props.href)
        // }

        return React.cloneElement(child, props)
    }
}

export default withRouter(Link);

function isLocal(href) {
    return true;
    // const url = parse(href, false, true)
    // const origin = parse(getLocationOrigin(), false, true)
    // return !url.host || (url.protocol === origin.protocol && url.host === origin.host)
}
