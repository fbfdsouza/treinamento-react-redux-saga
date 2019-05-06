const webpack = require('webpack');
const path = require('path');
const baseWebpackConfig = require('./webpack.base.config');
const merge = require('webpack-merge');
const DashboardPlugin = require('webpack-dashboard/plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./config');

module.exports = merge(baseWebpackConfig, {
  output: {
    path: path.resolve(__dirname, '../src'),
    publicPath: config.dev.publicAssetsPath,
    filename: '[name].js'
  },
  module: {
    rules:[
      {
        test: /\.scss?$/,
        use:[
          {
            loader: 'style-loader'
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
    contentBase: path.resolve(__dirname, '../src'),
    historyApiFallback: true,
    hot: true,
    port: config.dev.port,
    noInfo: false
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleAnalyzerPlugin(),
    new DashboardPlugin(),
  ],
});
