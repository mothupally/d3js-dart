var express = require("express");

var app = express();
var http = require('http').Server(app);

app.use('/', express.static('public'))
app.use('/bower_components', express.static('bower_components'))

http.listen("1337");
console.log("Running server");
