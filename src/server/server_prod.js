const express = require('express');
const path = require('path');

//----------------------------------------------

const app = express(),
    DIST_DIR = __dirname,
    HTML_FILE = path.join(DIST_DIR, 'index.html')

app.use(express.static(DIST_DIR))

app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
})

// listening @ a port
  const PORT = process.env.PORT || 8080;
  app.listen( PORT, (err) => {
    if (err) {
      console.log('prod app.listen error: ',err);
      return;
    }
    console.log(`PORT: ${PORT}`);
    console.log('Press Ctrl+C to quit.');
  });
//