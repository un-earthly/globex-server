const OrderModel = require('../../models/order.js');

const getAllOrdersController = async (req, res) => {
	try {
		const currentUser = req.userId;

		const orders = await OrderModel
			.find({ userId: currentUser })
			.populate({
				path: 'items.productId', // Populate product details for each order item
				model: 'products', // Select the fields you need from the product model
			})
			.exec();

		res.status(200).json({
			data: orders,
			success: true,
			error: false,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message || 'Error fetching orders',
			error: true,
			success: false,
		});
	}
};
const getOrderDetailsController = async (req, res) => {
	try {
		const orderId = req.params.id; // Get the order ID from the request parameters
		const currentUser = req.userId; // Assuming you have user ID from authentication

		// Find the order by ID and ensure it belongs to the current user
		const order = await OrderModel
			.findOne({ _id: orderId, userId: currentUser })
			.populate({
				path: 'items.productId', // Populate product details for each order item
				model: 'products', // Specify the model name for population
			})
			.exec();

		if (!order) {
			return res.status(404).json({
				message: 'Order not found',
				success: false,
				error: true,
			});
		}

		res.status(200).json({
			data: order,
			success: true,
			error: false,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message || 'Error fetching order details',
			error: true,
			success: false,
		});
	}
};
module.exports = { getAllOrdersController,getOrderDetailsController};
