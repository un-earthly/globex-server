const mongoose = require('mongoose');

const addToCart = mongoose.Schema(
	{
		productId: {
			ref: 'product',
			type: String,
		},
		quantity: Number,
		userId: String,
		shippingAddress: {
			name: String,
			email: String,
			address: String,
			city: String,
			zipCode: String,
		},
		paymentMethod: String,
	},
	{
		timestamps: true,
	},
);

const addToCartModel = mongoose.model('addToCart', addToCart);

module.exports = addToCartModel;
