
import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../../webpack.dev.config.js';


// const bodyParser = require('body-parser');

//----------------------------------------------

// [] defenition of multiple const values separated by [,]
const app = express(),
      PUBLIC_DIR = path.join(__dirname, '/build_dev'),
      HTML_FILE = path.join(PUBLIC_DIR, 'index.html'),
      compiler = webpack(config)


app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

app.get('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
  if (err) {
    return next(err)
  }
  res.set('content-type', 'text/html')
  res.send(result)
  res.end()
  })
})
app.get('/*', function(req, res) {
  res.sendFile(HTML_FILE), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  }
})

// listening @ a port
  const PORT = process.env.PORT || 8080;
  app.listen( PORT, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`PORT: ${PORT}`);
    console.log('Press Ctrl+C to quit.')
  });
//