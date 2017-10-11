import React from 'react';
// import { Route, Link, Switch } from 'react-router-dom';
//
// import Home from './containers/Home';
// import List from './containers/List';
//
// if (process.env.BROWSER) {
//     require('./style.scss');
// }
//
// const Status = ({code, children}) => (
//     <Route
//         render={({staticContext}) => {
//             if (staticContext) {
//                 staticContext.status = code
//             }
//             return children
//         }}
//     />
// )
//
// const NotFound = () => (
//     <Status code={404}>
//         <div>
//             <h1>Sorry, can’t find that.</h1>
//         </div>
//     </Status>
// )
//

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            console.log('1 second!');
        }, 1000)
    }

    render() {
        return (
            <div>client index.js</div>
        )
    }
}
