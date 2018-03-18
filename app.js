const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//#region Connection to DB

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Role = require('./models/role');
Employee = require('./models/employee');
Customer = require('./models/customer');
Product = require('./models/product');

//Connect To Mongo DB
mongoose.connect("mongodb://localhost:27017/HMS");
var db =mongoose.connection;

//#endregion

//#region Employee Authenticate

//Employee Login
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

//#endregion

//#region Manage Role

//Get Roles
app.get('/api/roles', (req, res) => {
	Role.getRoles((err, roles) =>{
		if(err){
			throw err;
		}
		res.json(roles);
	})
});

//Get Roles based on Id
app.get('/api/roles/:_id', (req, res) => {
	Role.getRoleById(req.params._id, (err, role) => {
		if(err){
			throw err;
		}
		res.json(role);
	});
});

// Add a role.
app.post('/api/roles', (req, res) => {
	var role = req.body;
	Role.addRole(role, (err, role) => {
		if(err){
			throw err;
		}
		res.json(role);
	});
});

//Update a Role
app.put('/api/roles/', (req, res) => {
	var role = req.body;
	Role.updateRole(role, {}, (err, role) => {
		if(err){
			throw err;
		}
		res.json(role);
	});
});

//Delete a Role
app.delete('/api/roles/:_id', (req, res) => {
	console.log(req._id);
	var id = req.params._id;
	Role.removeRole(id, (err, role) => {
		if(err){
			throw err;
		}
		res.json(role);
	});
});

//#endregion

//#region Manage Employee 

//Get Employees
app.get('/api/employees', (req, res) => {
	Employee.getEmployees((err, employees) =>{
		if(err){
			throw err;
		}
		res.json(employees);
	})
});

//Get Employees based on Id
app.get('/api/employees/:_id', (req, res) => {
	Employee.getEmployeeById(req.params._id, (err, employee) => {
		if(err){
			throw err;
		}
		res.json(employee);
	});
});

// Add a Employee.
app.post('/api/employees', (req, res) => {
	var employee = req.body;
	Employee.addEmployee(employee, (err, employee) => {
		if(err){
			throw err;
		}
		res.json(employee);
	});
});

//Update a Employee
app.put('/api/employees/', (req, res) => {
	var employee = req.body;
	Employee.updateEmployee(employee, {}, (err, employee) => {
		if(err){
			throw err;
		}
		res.json(employee);
	});
});

//Delete a Employee
app.delete('/api/employees/:_id', (req, res) => {
	var id = req.params._id;
	Employee.removeEmployee(id, (err, employee) => {
		if(err){
			throw err;
		}
		res.json(employee);
	});
});

//#endregion

//#region Customer Authenticate

//Customer Login
app.post('/api/CustomerAuthenticate', (req, res) => {
	var customerAuthenticate = req.body;
	Customer.getCustomerAuthenticate(customerAuthenticate.Code, customerAuthenticate.Password, (err, customer) => {
		if(err){
			throw err;
		}
		res.json(customer);
	});
});

//#endregion

//#region Manage Customer 

//Get Customers
app.get('/api/customers/', (req, res) => {
	Customer.getCustomers((err, customers) =>{
		if(err){
			throw err;
		}
		res.json(customers);
	});
});

// Add a Customer.
app.post('/api/customers/', (req, res) => {
	var customer = req.body;
	
	Customer.addCustomer(customer, (err, customer) => {
		if(err){
			throw err;
		}
		res.json(customer);
	});
});

//Update a Customer
app.put('/api/customers/', (req, res) => {
	var customer = req.body;
	Customer.updateCustomer(customer, {}, (err, customer) => {
		if(err){
			throw err;
		}
		res.json(customer);
	});
});

//Delete a customer
app.delete('/api/customers/:_id', (req, res) => {
	var id = req.params._id;
	Customer.removeCustomer(id, (err, customer) => {
		if(err){
			throw err;
		}
		res.json(customer);
	});
});

//#endregion

//#region Manage Product 

//Get Products
app.get('/api/products/', (req, res) => {
	Product.getProducts((err, products) =>{
		if(err){
			throw err;
		}
		res.json(products);
	});
});

app.post('/api/productBasedOnProductId', (req, res) => {
	var product = req.body;
	console.log(product);
	Product.getProductByProductId(product.ProductId, (err, product) => {
		if(err){
			throw err;
		}
		res.json(product);
	});
});

// Add a Product.
app.post('/api/products/', (req, res) => {
	var product = req.body;
	Product.addProduct(product, (err, product) => {
		if(err){
			throw err;
		}
		res.json(product);
	});
});

//Update a Product
app.put('/api/products/', (req, res) => {
	var product = req.body;
	Product.updateProduct(product, {}, (err, product) => {
		if(err){
			throw err;
		}
		res.json(product);
	});
});

//Delete a product
app.delete('/api/products/:_id', (req, res) => {
	var id = req.params._id;
	Product.removeProduct(id, (err, product) => {
		if(err){
			throw err;
		}
		res.json(product);
	});
});

//#endregion

app.listen(3000);
console.log("running in port : 3000....");

