const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
	Name:{
		type:String,
		reuired:true
	},
	Description:{
		type:String
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

const Role = module.exports = mongoose.model('Role', roleSchema);

module.exports.getRoles = (callback, limit) =>{
	Role.find(callback).limit(limit);
}

module.exports.getRoleById = (id, callback) => {
	Role.findById(id, callback);
}

// Add Role
module.exports.addRole = (role, callback) => {
	Role.create(role, callback);
}

// Update Genre
module.exports.updateRole = (role, options, callback) => {
	var query = {_id: role._id};
	var update = {
		Name: role.Name,
		Description: role.Description,
		Active:role.Active
	}
	Role.findOneAndUpdate(query, update, options, callback);
}


// Delete Genre
module.exports.removeRole = (id, callback) => {
	var query = {_id: id};
	Role.remove(query, callback);
}
