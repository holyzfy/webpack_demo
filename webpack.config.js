/* eslint-disable new-cap */

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var plugins = require('webpack-load-plugins')();
var glob = require('glob');
var path = require('path');
var watch = require('chokidar');
var shell = require('shelljs');

var hash = process.env.NODE_ENV === 'dev' ? '' : '.[hash:7]';
var chunkHash = process.env.NODE_ENV === 'dev' ? '' : '.[chunkHash:7]';
var html = 'html?minimize=false&attrs=img:src link:href';

var config = {
    entry: {
        'js/common': ['jquery'].concat(glob.sync('./js/util/**/*.js'))
    },
    output: {
        path: './dist',
        publicPath: 'http://static.example.com/webpack_demo/',
        filename: '[name]' + chunkHash + '.js',
        chunkFilename: '[name].[chunkhash:7].js'
    },
    module: {
        loaders: [
            {
                test: /templates\/.+.html$/,
                loader: 'raw'
            },
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
            names: ['js/common', 'manifest'],
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
        })
    ]
};

if (process.env.NODE_ENV === 'dev') {
    config.devtool = 'inline-source-map';
    watch.watch(['mock', '*.js'], {
        ignored: 'webpack.config.js'
    }).on('all', function (event, path) {
        shell.exec('rsync -r --delete-after mock *.js dist');
    });
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

function setEntry(list) {
    list.forEach(function (name) {
        config.entry[name.slice(0, -3)] = path.resolve(__dirname, name);
    });
}

function setHtml(entry) {
    glob.sync('*.html').forEach(function (name) {
        var option = {
            filename: name,
            template: html + '!' + name
        };
        var js = path.join('js', name.slice(0, -5));
        if(entry.indexOf(js + '.js') >= 0) {
            option.chunks = ['js/common', js];
            option.chunksSortMode = 'dependency';
        } else {
            option.inject = false;
        }
        config.plugins.push(new plugins.html(option));
    });
}

function start(entry) {
    setEntry(entry);
    setHtml(entry);
}

start([
    'js/form.js',
    'js/list.js'
]);
module.exports = config;