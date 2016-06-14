var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
    entry: {
        common: ['./js/urlmap.js', 'jquery'],
        form: './js/form.js',
        list: './js/list.js'
    },
    output: {
        path: './dist',
        publicPath: 'http://static.example.com/webpack_demo/',
        filename: 'js/[name].[chunkhash:7].js',
        chunkFilename: 'js/[name].[chunkhash:7].js'
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loaders: [
                    'extract',
                    'html?' + JSON.stringify({
                        attrs: ['img:src', 'link:href']
                    })
                ]
            },
            {
                test: /\.(?:jpe?g|gif|png)$/,
                loader: 'url?limit=1500&name=[path][name].[hash:7].[ext]'
            },
            {
                test: /\.js$/,
                exclude: /node_modules|bower_components/,
                loader: 'babel-loader',
            },
            {
                test: /\.s?[ac]ss$/,
                loaders: [
                    'file?name=[path][name].[hash:7].css',
                    'extract',
                    'css',
                    'postcss',
                    'sass?outputStyle=expanded'
                ]
            }
        ]
    },
    postcss: function () {
        return [autoprefixer];
    },
    resolve: {
        modulesDirectories: ['web_modules', 'node_modules', 'bower_components']
    },
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
        ),
        new CommonsChunkPlugin({
            name: 'common',
            minChunks: Infinity
        }),
        new CleanWebpackPlugin(['dist'], {
            verbose: true
        }),
        new HtmlWebpackPlugin({
            filename: 'inc/head_static.html',
            template: 'html!inc/head_static.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: 'form.html',
            template: 'html!form.html',
            chunks: ['common', 'form'],
            inject: 'body'
        }),
        new HtmlWebpackPlugin({
            filename: 'list.html',
            template: 'html!list.html',
            chunks: ['common', 'list'],
            inject: 'body'
        })
    ]
};