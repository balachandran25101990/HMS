const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Connect To Mongo DB
mongoose.connect("mongodb://localhost:27017/HMS");
var db =mongoose.connection;

app.get('/', (req, res) => {
	res.send("Welcome to HMS !");
});


app.listen(3000);
console.log("running in port : 3000....");

