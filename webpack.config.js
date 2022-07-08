const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    main: './src/pages/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
       publicPath: ''
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'),
    compress: true,
    open: true,
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      scriptLoading: 'blocking'
    }),
    new CleanWebpackPlugin(),
  ]
};