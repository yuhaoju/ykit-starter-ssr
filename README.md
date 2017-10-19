# isomorphic-seperate-demo

react + react-router(v4) ssr demo

这个 demo 更贴近于业务最终开发时的样子。目录结构：

- src：业务代码。业务需要提供一个 index.js 来配置页面
- ssr：工具生成的服务端代码，业务不需要关心里面有什么，也不需要管理和维护它，由工具自动生成

这样一来，业务不用关心服务端代码，以及 web 和 hy 如何适配，只要根据页面编写业务逻辑即可。同时还可以配置 getProps 来获取初始属性（页面数据等），框架可以智能地提前加载数据来渲染页面（由框架决定是在服务端还是客户端获取数据）。

## Get Started

- npm i
- ykit start
- 访问 http://localhost:3000/
