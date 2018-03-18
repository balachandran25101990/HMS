const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    ProductName:{
        type:String,
        required:true
    },
    ProductCategory:{
        type:String,
        required:true
    },
    ProductId:{
        type:String,
        required:true
    },
    ProductDesc:{
        type:String
    },
    ProductAdv:{
        type:String,
        required:true
    },
    ProductDisAdv:{
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
const Product = module.exports = mongoose.model('Product', productSchema);

module.exports.getProducts = (callback, limit) =>{
	Product.find(callback).limit(limit);
}

module.exports.getProductById = (id, callback) => {
	Product.findById(id, callback);
}

// Add Product
module.exports.addProduct = (product, callback) => {
	Product.create(product, callback);
}

// Update Product
module.exports.updateProduct = (product, options, callback) => {
	var query = {_id: product._id};
	var update = {
		ProductName: product.ProductName,
		ProductCategory: product.ProductCategory,
		ProductId: product.ProductId,
		ProductDesc: product.ProductDesc,
		ProductAdv:	product.ProductAdv,
        ProductDisAdv:product.ProductDisAdv,
        Active:product.Active
    }
	Product.findOneAndUpdate(query, update, options, callback);
}


// Delete Product
module.exports.removeProduct = (id, callback) => {
	var query = {_id: id};
	Product.remove(query, callback);
}
