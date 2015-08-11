var express = require('express');
var app = express();

app.use(express.static('common'));

app.use(express.static('index'));
app.use(express.static('rent'));
app.use(express.static('test'));

app.get('/', function (req, res) { });

var server = app.listen(8888, function () { });