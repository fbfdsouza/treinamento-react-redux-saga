process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['babel-polyfill','./src/main.jsx']
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      scss: path.resolve(__dirname, '../src/scss')
    }
  },
  plugins: [
    new Dotenv({
      path: path.join(process.cwd(), process.env.NODE_ENV + '.env')   
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'),
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use:[
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
          }
        ]
      },
    ]
  },
  optimization: {
    noEmitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: "all",
          enforce: true,
        },
      }
    }
  },
}
