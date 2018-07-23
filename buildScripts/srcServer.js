import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

// disable the console warnings.
/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

// Make express use webpack
app.use(
    require('webpack-dev-middleware')(
        compiler,
        {
            noInfo: true,
            publicPath: config.output.publicPath    // this refers to the entry in webpack.config file.
        }
    )
);

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', function(req, res) {
  res.json([
    {"id": 1, "firstName":"Bob", "lastName":"Smith","email":"bob@gmail.com"},
    {"id": 2, "firstName":"Tammy", "lastName":"Norton","email":"tnorton@gmail.com"},
    {"id": 3, "firstName":"Tina", "lastName":"Lee","email":"lee.tina@gmail.com"}
  ]);
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        open ('http://localhost:' + port);
    }
});


