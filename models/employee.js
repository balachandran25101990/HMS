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

// Add Employee
module.exports.addEmployee = (employee, callback) => {
	Employee.create(employee, callback);
}

// Update Employee
module.exports.updateEmployee = (employee, options, callback) => {
	var query = {_id: employee._id};
	var update = {
		FirstName: employee.FirstName,
		MiddleName: employee.MiddleName,
		LastName: employee.LastName,
		Code: employee.Code,
		Password: employee.Password,
		Mobile:	employee.Mobile,
		RoleId: employee.RoleId,
		EmailId:employee.EmailId,
		UpdatedBy: employee.UpdatedBy,
		Active:employee.Active
	}
	Employee.findOneAndUpdate(query, update, options, callback);
}


// Delete Employee
module.exports.removeEmployee = (id, callback) => {
	var query = {_id: id};
	Employee.remove(query, callback);
}
