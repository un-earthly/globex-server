const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
	{
		productName: {
			type: String,
			required: true,
		},
		brandName: {
			type: String,
			required: true,
		},
		category: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'category',
			required: true,
		},
		productImage: [{
			type: String,
			required: true,
		}],
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		sellingPrice: {
			type: Number,
			required: true,
		},
		subcategory: {
			type: String,
			required: true,
		},
		stock: {
			type: Number,
			default: 0,
		},
		quantity: {
			type: Number,
			default: 1,
		},
		status: {
			type: String,
			enum: ['available', 'out of stock', 'discontinued'],
			default: 'available',
		},
	},
	{
		timestamps: true,
	}
);

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;
