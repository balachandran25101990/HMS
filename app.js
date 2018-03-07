const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Role = require('./models/role');

//Connect To Mongo DB
mongoose.connect("mongodb://localhost:27017/HMS");
var db =mongoose.connection;

app.get('/', (req, res) => {
	res.send("Welcome to HMS !");
});

app.get('/api/roles', (req, res) => {
	Role.getRoles((err, roles) =>{
		if(err){
			throw err;
		}
		res.json(roles);
	})
});

app.get('/api/roles/:_id', (req, res) => {
	Role.getRoleById(req.params._id, (err, role) => {
		if(err){
			throw err;
		}
		res.json(role);
	});
});

app.post('/api/roles', (req, res) => {
	var role = req.body;
	Role.addRole(role, (err, role) => {
		if(err){
			throw err;
		}
		res.json(role);
	});
});

app.listen(3000);
console.log("running in port : 3000....");

