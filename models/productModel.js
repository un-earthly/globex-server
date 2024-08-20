const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		productName: String,
		brandName: String,
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'category',
		},
		productImage: [],
		description: String,
		price: Number,
		sellingPrice: Number,
		subcategory: String,
	},
	{
		timestamps: true,
	},
);

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;
