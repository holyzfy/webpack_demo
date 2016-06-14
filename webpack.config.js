/* eslint-disable new-cap */

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var plugins = require('webpack-load-plugins')();
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
                exclude: /manifest.html$/,
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
                loader: 'babel',
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
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common', 'manifest'],
            minChunks: Infinity
        }),
        new plugins.clean(['dist'], {
            verbose: true
        }),
        new plugins.inlineManifest,
        new plugins.html({
            filename: 'inc/manifest.html',
            template: 'inc/manifest.html',
            inject: false,
            minify: {
                minifyJS: true
            }
        }),
        new plugins.html({
            filename: 'inc/head_static.html',
            template: 'html!inc/head_static.html',
            inject: false
        }),
        new plugins.html({
            filename: 'form.html',
            template: 'html!form.html',
            chunks: ['common', 'form'],
            chunksSortMode: 'dependency'
        }),
        new plugins.html({
            filename: 'list.html',
            template: 'html!list.html',
            chunks: ['common', 'list'],
            chunksSortMode: 'dependency'
        })
    ]
};