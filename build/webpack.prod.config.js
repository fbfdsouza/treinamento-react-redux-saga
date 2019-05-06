const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const clean = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const baseWebpackConfig = require('./webpack.base.config');
const config = require('./config');

const progressPluginHandler = (percentage, msg) => {
  console.info(`${parseInt(percentage * 100).toFixed(0)}%`, msg);
};

module.exports = merge(baseWebpackConfig, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss?$/,
        use:[
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2,
              localIdentName: '[name]__[local]'
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    historyApiFallback: true,
    hot: true,
    port: config.dev.port,
    noInfo: false
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new clean([
      path.resolve(__dirname, '../dist')
    ]),
    new webpack.ProgressPlugin(progressPluginHandler)
  ],
  stats: 'errors-only',
});