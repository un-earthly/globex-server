const addToCartModel = require('../../models/cartProduct.js');

const cartController = async (req, res) => {
	try {
		const { productId, quantity, userId, shippingAddress, paymentMethod } =
			req.body;

		// Create a new cart item
		const newCartItem = new addToCartModel({
			productId,
			quantity,
			userId,
			shippingAddress,
			paymentMethod,
		});

		// Save the cart item to the database
		const savedCartItem = await newCartItem.save();

		res.status(201).json({
			data: savedCartItem,
			message: 'Item added to cart successfully',
			success: true,
			error: false,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error adding item to cart',
			errorMessage: error.message,
			error: true,
			success: false,
		});
	}
};

module.exports = cartController;
