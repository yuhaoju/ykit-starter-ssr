import 'babel-polyfill';
import Home from './home';
import Detail from './detail';
import axios from 'axios';

export function getPages() {
    return [
        {
            path: '/',
            component: Home,
            exact: true,
            getProps: async() => {
                const { data: posts } = await axios.get('http://yapi.demo.qunar.com/mock/386/getItems');
                return { posts };
            }
        }, {
            path: '/detail/:id',
            component: Detail,
        }
    ]
}
