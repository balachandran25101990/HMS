const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
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
	RoleId:{
		type:String
    },
    Mobile:{
        type:String,
        required:true
    },
    EmailId:{
        type:String,
        required:true
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

const Employee = module.exports = mongoose.model('Employee', employeeSchema);

module.exports.getEmployees = (callback, limit) =>{
	Employee.find(callback).limit(limit);
}

module.exports.getEmployeeById = (id, callback) => {
	Employee.findById(id, callback);
}

module.exports.getEmployeeAuthenticate = (code, password, callback) => {
    console.log("Code"+ code + " Password:" +password);
	Employee.findOne({Code: code, Password: password}, callback);
}

// Add Role
module.exports.addEmployee = (role, callback) => {
	Employee.create(role, callback);
}