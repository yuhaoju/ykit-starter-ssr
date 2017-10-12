import Home from './home';
import About from './about';

export function getPages() {
    // const { data: posts } = await axios.get('http://jsonplaceholder.typicode.com/posts')
    return [
        {
            path: '/',
            component: Home
        }, {
            path: '/about',
            component: About,
            getProps: () => ({posts})
        }
    ]
}
