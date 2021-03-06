const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

//----------------------------------------------

module.exports = (env, argv) => { //[] (env. argv)
  const SERVER_PATH = argv.mode === 'production' ? ('./src/server/server_prod.js') : ('./src/server/server_dev.js');

  return({
    entry: {
      server: SERVER_PATH,
    },
    
    output: {
      path: (argv.mode === 'production') ?
        path.join(__dirname, 'build_public') :
        path.join(__dirname, 'build_dev')
      ,
      publicPath: '/',
      filename: 'bundle.js',
    },  
  
    target: 'node',
    node: {
      fs: 'empty',
      tls: 'empty',        
      net: 'empty',
  
      // Need this when working with express, otherwise the build fails
      __dirname: false,   // if you don't put this is, __dirname
      __filename: false,  // and __filename return blank or /
    },
  
    externals: [nodeExternals()], // Need this to avoid error when working with Express
  
    module: {
      rules: [         
        // Transpiles ES6-8 into ES5
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }

  }) // [] end of - return
};