import React, {Component, Children} from 'react'

class Loadable extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Component: this.props.Component
        }
    }

    componentDidMount() {
        if(!this.props.Component) {
            this.props.getComponent((c) => {
                this.setState({
                    Component: c.default
                })
            });
        }
    }

    render() {
        const {Component} = this.state;
        return (
            Component ? <Component {...this.props}/> : <div>loading</div>
        )
    }
}

export default Loadable;
