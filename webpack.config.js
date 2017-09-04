const path = require('path')
const webpack = require('webpack')

const config = {
  entry: {
    app: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&reload=true',
      './client',
    ],
    vendor: [
      'react',
      'react-dom',
    ],
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, './public'),
    publicPath: '/public',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              'transform-runtime',
            ],
          },
        },
      },
    ],
  },

  devtool: 'inline-cheap-module-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}

module.exports = config