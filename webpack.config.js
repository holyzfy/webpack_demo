var autoprefixer = require('autoprefixer');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        head_static: './inc/head_static.html',
        form: ['./js/form.js', './form.html']
    },
    output: {
        path: './dist',
        publicPath: 'http://static.example.com/webpack_demo/',
        filename: '[name].[chunkhash:7].js',
        chunkFilename: '[name].[chunkhash:7].js'
    },
    module: {
        loaders: [
            {
                test: /\.html$/,
                loaders: [
                    'file?name=[path][name].[ext]',
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
    plugins: [
        new CleanWebpackPlugin(['dist'], {
            verbose: true
        })
    ]
};