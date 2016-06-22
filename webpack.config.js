/* eslint-disable new-cap */

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var plugins = require('webpack-load-plugins')({
    lazy: false
});
var hash = process.env.NODE_ENV === 'dev' ? '' : '.[hash:7]';
var html = 'html?minimize=false&attrs=img:src link:href';

var config = {
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
                test: /\.(?:jpe?g|gif|png|svg)$/,
                loaders: [
                    'url?limit=1500&name=[path][name]' + hash + '.[ext]',
                    'image-webpack'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules|bower_components/,
                loader: 'babel',
            },
            {
                test: /\.s?[ac]ss$/,
                loaders: [
                    'file?name=[path][name]' + hash + '.css',
                    'extract',
                    'css',
                    'postcss',
                    'sass?outputStyle=' + (process.env.NODE_ENV === 'dev' ? 'expanded' : 'compressed')
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
        new CleanWebpackPlugin(['dist'], {
            verbose: true
        }),
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
        ),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common', 'manifest'],
            minChunks: Infinity
        }),
        new plugins.inlineManifest,
        new plugins.html({
            filename: 'inc/manifest.html',
            template: 'inc/manifest.html',
            inject: false
        }),
        new plugins.html({
            filename: 'inc/head_static.html',
            template: html + '!inc/head_static.html',
            inject: false
        }),
        new plugins.html({
            filename: 'form.html',
            template: html + '!form.html',
            chunks: ['common', 'form'],
            chunksSortMode: 'dependency'
        }),
        new plugins.html({
            filename: 'list.html',
            template: html + '!list.html',
            chunks: ['common', 'list'],
            chunksSortMode: 'dependency'
        })
    ]
};

if (process.env.NODE_ENV === 'dev') {
    // dev
} else {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                dead_code: true,
                unused: true
            }
        })
    );
}

module.exports = config;