const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Role = require('./models/role');
Employee = require('./models/employee');

//Connect To Mongo DB
mongoose.connect("mongodb://localhost:27017/HMS");
var db =mongoose.connection;

app.get('/', (req, res) => {
	res.send("Welcome to HMS !");
});

app.post('/api/EmployeeAuthenticate', (req, res) => {
	var employeeAuthenticate = req.body;
	console.log(employeeAuthenticate);
	Employee.getEmployeeAuthenticate(employeeAuthenticate.Code, employeeAuthenticate.Password, (err, employee) => {
		if(err){
			throw err;
		}
		res.json(employee);
	});
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

app.put('/api/roles/', (req, res) => {
	var role = req.body;
	Role.updateRole(role, {}, (err, role) => {
		if(err){
			throw err;
		}
		res.json(role);
	});
});

app.delete('/api/roles/', (req, res) => {
	var id = req._id;
	Role.removeRole(id, (err, role) => {
		if(err){
			throw err;
		}
		res.json(role);
	});
});



app.listen(3000);
console.log("running in port : 3000....");

