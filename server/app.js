require('dotenv').config({silent: true});

var express=require('express');
var path = require('path');
var app=express();
var morgan=require('morgan');
var bodyParser=require('body-parser');
var fs = require('fs');
var request = require('request');

var port = process.env.PORT || 8080;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/',express.static(path.join(__dirname, '../client')));

app.listen(port,function(req,res)
{
   console.log("started listening at port "+ port + "...");
});
