const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
	FirstName:{
		type:String,
	    required:true
    },
    MiddleName:{
		type:String
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
    DOB:{
        type:Date,
        required:true
    },
    Height:{
        type:Number
    },
    Weight:{
        type:Number
    },
	Active:{
		type:Boolean
	},
	CreatedBy:{
		type:String
	},
	CreatedDate:{
		type:Date,
		default:Date.now
	},
	UpdatedBy:{
		type:String
	},
	UpdatedDate:{
		type:Date,
		default:Date.now
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
		MiddleName: customer.MiddleName,
		LastName: customer.LastName,
		Code: customer.Code,
		Password: customer.Password,
		Mobile:	customer.Mobile,
        EmailId:customer.EmailId,
        DOB:customer.DOB,
        Height:customer.Height,
        Weight:customer.Weight,
		UpdatedBy: customer.UpdatedBy,
		Active:customer.Active
	}
	Customer.findOneAndUpdate(query, update, options, callback);
}


// Delete Customer
module.exports.removeCustomer = (id, callback) => {
	var query = {_id: id};
	Customer.remove(query, callback);
}
