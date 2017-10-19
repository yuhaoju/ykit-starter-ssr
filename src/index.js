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
                const { data: posts } = await axios.get(
                    'https://easy-mock.com/mock/59b12b10e0dc663341a14c80/example_1504783120501/tvmaze'
                );
                return { posts };
            }
        }, {
            path: '/detail/:id',
            component: Detail,
        }
    ]
}
