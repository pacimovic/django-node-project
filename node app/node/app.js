const express = require('express');
const msgs = require('./routes/foods');  // Nas ruter (REST API)
const history = require('connect-history-api-fallback');
const path = require('path');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods","PUT, POST, GET, DELETE, PATCH, OPTIONS");
    next();
  });

// Kazemo aplikaciji da za rute koje pocinju sa '/api' koristi nas ruter
app.use('/api', msgs);

const staticMiddleware = express.static(path.join(__dirname, 'dist'));

app.use(staticMiddleware);
app.use(history());
app.use(staticMiddleware);


app.listen(80);