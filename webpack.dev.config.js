const merge = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.config.js')

module.exports = merge(common, {
  entry:{
    app:[
      './src/index.js'
    ]
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    watchContentBase: true,
    historyApiFallback: true,
    stats: 'errors-only',
    open: true,
    port: 8040,
    host: "localhost",
    compress: true
  },
  plugins: [
  ],
})