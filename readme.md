# webpack_demo

webpack是一个很强大的模块加载器和打包工具，然而在实际项目里很难做到拿来即用，所以我决定写一个示例项目。

![项目进度](https://img.shields.io/badge/%E9%A1%B9%E7%9B%AE%E8%BF%9B%E5%BA%A6-60%25-brightgreen.svg) 
[![Dependency Status](https://david-dm.org/holyzfy/webpack_demo.svg)](https://david-dm.org/holyzfy/webpack_demo)

## 安装

```
npm install
```

## 使用

- 本地开发 `npm run dev`
- 构建生产环境 `webpack`
- 单元测试 `npm test`

## 预览

0. html文件使用了velocity语法进行演示，请使用[velocityServer](https://github.com/holyzfy/velocityServer)或者其他web服务器查看效果
0. 运行`webpack`，在浏览器里访问`webpack_demo/dist`目录

## 常见问题

```
Error: dyld: Library not loaded
```

解决办法： 运行`brew install libpng`，参考 https://github.com/tcoopman/image-webpack-loader/issues/51
