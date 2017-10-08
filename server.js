var express = require("express");

var app = express();
var http = require('http').Server(app);

app.use('/', express.static('public'))

http.listen("1337");
console.log("Running server");