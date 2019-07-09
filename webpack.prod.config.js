
const path = require('path');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin")

const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

//----------------------------------------------

module.exports = {

  entry: {
    main: './src/index.js',
  },

  output: {
      path: path.join(__dirname, 'build_public'), 
      publicPath: "/",
      filename: '[name].js',
  },

  mode: 'production',
  target: 'web',
  devtool: '#source-map',
/*
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
/*/
  module: {
    rules: [
      // js | jsx
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
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
            /*options: {
                name: '[path][name]-[hash:8].[ext]'
            }*/
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
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};


/*


// min.css 
  {
    test: /\.min.css$/,
    exclude: /node_modules/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // you can specify a publicPath here
          // by default it uses publicPath in webpackOptions.output
          publicPath: '../',
          hmr: process.env.NODE_ENV === 'development',
        },
      },
      'style-loader', 
      'css-loader'
    ]
  },
//
*/