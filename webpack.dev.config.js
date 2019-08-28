
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

//----------------------------------------------

module.exports = {

  entry: {
    main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js'],
  },

  output: {
      path: path.join(__dirname, 'build_dev'), 
      publicPath: "/",
      filename: '[name].js',
  },

  mode: 'development',
  target: 'web',
  devtool: '#source-map',

  module: {
    rules: [
      // esLint
        {
          enforce: "pre",
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
          options: {
            emitWarning: true,
            failOnError: false,
            failOnWarning: false
          }
        },
      // js | jsx
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        },
      //
      // html
        {
            test: /\.html$/,
            use: [{
                loader: "html-loader",
                //options: { minimize: true }
            }]
        },
      //
      // css | scss | sass 
        {
            test: /\.(css|scss|sass)$/,
            use: [ // me - the order of these matters
              'style-loader',     
              'css-loader',           
              'resolve-url-loader',   
              'sass-loader',              
            ]
        },
      //

      // images
        {
          test: /\.(jpg|png|gif|svg|pdf|ico)$/,
          use: [{
            loader: 'file-loader',
            options: {
                name: '[path][name]-[hash:8].[ext]'
            }
          }]
        }
      //
    ]
  },


  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/html/index.html",
      filename: "./index.html",
      excludeChunks: [ 'server' ]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};