const OrderModel = require("../../models/order");

const orderController = async (req, res) => {
	try {
		const { userId, items, shippingAddress, paymentMethod } = req.body;

		if (!userId) {
			return res.status(400).json({
				message: 'User ID is required',
				success: false,
				error: true,
			});
		}

		if (!Array.isArray(items) || items.length === 0) {
			return res.status(400).json({
				message: 'No items found in the order',
				success: false,
				error: true,
			});
		}

		// Create a new order with the provided data
		const newOrder = new OrderModel({
			userId,
			items,
			shippingAddress,
			paymentMethod,
		});

		// Save the order to the database
		const savedOrder = await newOrder.save();

		res.status(201).json({
			data: savedOrder,
			message: 'Order placed successfully',
			success: true,
			error: false,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error placing order',
			errorMessage: error.message,
			error: true,
			success: false,
		});
	}
};

module.exports = orderController;
