const path = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PORT = process.env.PORT || 3000;

const baseConfig = {
  entry: path.resolve(__dirname, './src/index'),
  mode: 'development',
  target: 'node',
  module: {
    rules: [
      { test: /\.ts$/i, use: 'ts-loader' },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      "http": require.resolve("stream-http"),
      "url": require.resolve("url/"),
      "crypto": require.resolve("crypto-browserify"),
    },
  },
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
  devServer: {
    port: PORT,
},
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
