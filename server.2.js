var express = require('express');
var app = express();

app.use(express.static('index'));
app.use(express.static('TestPage1'));

app.get('/', function (req, res) { });

var server = app.listen(8888, function () { });