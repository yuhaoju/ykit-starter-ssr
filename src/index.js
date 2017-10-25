import 'babel-polyfill';
import Home from './containers/Home';
import axios from 'axios';

export function getPages() {
    return [
        {
            path: '/',
            component: Home,
            exact: true,
            getProps: async() => {
                const { data: posts } = await axios.get(
                    'http://yapi.demo.qunar.com/mock/818/tvmaze/list'
                );
                return { posts };
            }
        }, {
            path: '/detail/:id',
            getComponent: (callback) => {
                require.ensure([], () => {
                    callback(require('./containers/Detail'));
                })
            }
        }
    ]
}
