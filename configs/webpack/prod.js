const merge = require('webpack-merge');
const {resolve} = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const commonConfig = require('./common');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './index.tsx',
  output: {
    filename: 'js/adobe.[hash].min.js',
    path: resolve(__dirname, '../../dist'),
    publicPath: '/shopping-cart/',
  },
  devtool: 'source-map',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: '../mock/cart.json', to: 'mock/cart.json' }
      ],
    })
  ],
});
