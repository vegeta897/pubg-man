'use strict';
var webpack = require('webpack');
var htmlWebpackPlugin = require('html-webpack-plugin');

var config = {
    context: __dirname + '/src',
    entry: {
        app: './app.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: __dirname + '/src'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: { presets: ['es2015'] }
            },
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                loader: 'pug-loader?pretty=true'
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            }
        ]
    },
    devtool: 'eval-source-map',
    plugins: [new htmlWebpackPlugin({
        template: './index.pug'
    })]
};

if(process.env.NODE_ENV === 'production') {
    config.devtool = ''; // No sourcemap for production
}

module.exports = config;