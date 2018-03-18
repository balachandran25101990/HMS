const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
	FirstName:{
		type:String,
	    required:true
    },
    LastName:{
        type:String,
        required:true
    },
    Code:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
	Mobile:{
        type:String,
        required:true
    },
    EmailId:{
        type:String,
        required:true
    },
    Age:{
        type:String,
        required:true
    },
    Height:{
        type:Number
    },
    Weight:{
        type:Number
    }
});

const Customer = module.exports = mongoose.model('Customer', customerSchema);

module.exports.getCustomerAuthenticate = (code, password, callback) => {
	Customer.findOne({Code: code, Password: password}, callback);
}

module.exports.getCustomers = (callback, limit) =>{
	Customer.find(callback).limit(limit);
}

module.exports.getCustomerById = (id, callback) => {
	Customer.findById(id, callback);
}

// Add Customer
module.exports.addCustomer = (customer, callback) => {
	Customer.create(customer, callback);
}

// Update Customer
module.exports.updateCustomer = (customer, options, callback) => {
	var query = {_id: customer._id};
	var update = {
		FirstName: customer.FirstName,
		LastName: customer.LastName,
		Code: customer.Code,
		Password: customer.Password,
		Mobile:	customer.Mobile,
        EmailId:customer.EmailId,
        Age:customer.Age,
        Height:customer.Height,
        Weight:customer.Weight,
		}
	Customer.findOneAndUpdate(query, update, options, callback);
}


// Delete Customer
module.exports.removeCustomer = (id, callback) => {
	var query = {_id: id};
	Customer.remove(query, callback);
}
