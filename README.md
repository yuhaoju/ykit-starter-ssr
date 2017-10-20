# isomorphic-seperate-demo

ykit + react(16) + react-router(v4) ssr demo

## 如何开始

```shell
- git clone https://github.com/YMFE/ykit-config-ssr.git
- npm i
- ykit start
```

访问 http://localhost:3000/ 即可。

## 如何使用

代码主要分为两部分

### /src —— 业务代码

首先业务需要提供一个 index.js 来配置页面，一个简单的示例：

```JavaScript
import 'babel-polyfill';

// 引入页面
import Home from './home';
import Detail from './detail';

// 引入 axios 来获取数据
import axios from 'axios';

// 需要实现一个 getPages 方法来配置页面
export function getPages() {
    return [
        {
            path: '/', // 路径规则
            component: Home, // 页面组件
            exact: true, // 同 react-router <Route> 的 exact 属性
            getProps: async() => { // 可在这里获取页面需要的数据
                const { data: posts } = await axios.get(
                    'http://yapi.demo.qunar.com/mock/818/tvmaze/list'
                );
                return { posts };
            }
        }, {
            path: '/detail/:id',
            component: Detail
        }
    ];
}
```

通过 `index.js` 封装了页面的各项配置，业务不需要再自己配置 router，只用编写页面组件并从 `index.js` 引入即可。

### /ssr —— 工具生成的服务端代码

业务不需要关心里面有什么，也不需要管理和维护它，由工具自动生成。如果有特殊需求也可以去进行改动。

这样一来，业务不用关心服务端代码，以及 web 和 hy 如何适配，只要根据页面编写业务逻辑即可。同时还可以配置 getProps 来获取初始属性（页面数据等），框架可以智能地提前加载数据来渲染页面（由框架决定是在服务端还是客户端获取数据）。

### 如何实现页面跳转

通过引入 ssr 目录下封装的 `link` 组件(TODO: 这里需要封装到工具里，而不是从路径引)，即可实现页面跳转，使用方法同 react-router v4 中的 `<Link>`。

```JavaScript
import Link from '../ssr/share/link';

const Home = (props) => {
    return (
        <div>
            <h1>Home Page</h1>
            <Link to={`/detail`}>
                <p>点击我可以跳转到详情页</p>
            </Link>
        </div>
    )
}
```

## 如何部署

首先构建前端资源：

```
ykit pack -m
```

然后可以直接使用 pm2 等进行部署，如：

```
NODE_ENV=production pm2 start ssr/bin/start
```
