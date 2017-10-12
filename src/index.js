import 'babel-polyfill';
import Home from './home';
import About from './about';
import axios from 'axios';
export function getPages() {
    return [
        {
            path: '/',
            component: Home,
            getProps: async() => {
                const { data: posts } = await axios.get('http://yapi.demo.qunar.com/mock/386/getItems');
                return { posts };
            }
        }, {
            path: '/about',
            component: About
        }
    ]
}
