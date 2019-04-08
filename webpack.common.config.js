const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: ""
  },
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          include: __dirname,
          use: {
            loader: "babel-loader"
          },
        },
        {
          test: /\.html$/,
          loader: "raw-loader"
        },
        {
          test: /\.css$/,
          use: [
              { loader: "style-loader" },
              { loader: "file-loader" }
          ]
        },
        {
          test: /\.less$/,
          use: [
            { loader: MiniCssExtractPlugin.loader, },
            { loader: 'css-loader', options: {sourceMap: true } },
            { loader: 'less-loader', options: {sourceMap: true } }, 
          ]
        },
        {
          test: /\.(jpg|png|gif|svg|json)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: '/',
              }
            }]
        },
        { 
          test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
          loader: 'url-loader?limit=100000'
        }
      ]
  },
  plugins: [
    new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: "./index.html"
      }),
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      }),
  ]
};