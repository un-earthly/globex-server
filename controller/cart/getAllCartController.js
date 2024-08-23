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
}; const getAllOrdersAdminController = async (req, res) => {
	try {
		const { page = 1, limit = 10 } = req.query;

		// Calculate the number of items to skip
		const skip = (page - 1) * limit;

		// Fetch orders with pagination
		const orders = await OrderModel
			.find()
			.skip(skip)
			.limit(parseInt(limit))
			.populate({
				path: 'items.productId',
				model: 'products',
			})
			.exec();

		// Get the total count of orders
		const totalOrders = await OrderModel.countDocuments();

		res.status(200).json({
			data: orders,
			currentPage: page,
			totalPages: Math.ceil(totalOrders / limit),
			totalOrders,
			success: true,
			error: false,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message || 'Error fetching orders for admin',
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

const updateOrderStatusController = async (req, res) => {
	try {
		const { orderId } = req.params;
		const { status } = req.body;

		const order = await OrderModel.findById(orderId);

		if (!order) {
			return res.status(404).json({
				message: 'Order not found',
				error: true,
				success: false,
			});
		}

		order.status = status;
		await order.save();

		res.status(200).json({
			message: 'Order status updated successfully',
			success: true,
			error: false,
			data: order,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message || 'Error updating order status',
			error: true,
			success: false,
		});
	}
}; const searchOrdersController = async (req, res) => {
	try {
		const { userId, status, startDate, endDate, customerName, page = 1, limit = 10 } = req.query;

		const query = {};

		if (userId) query.userId = userId;
		if (status) query.status = status;
		if (startDate || endDate) {
			query.createdAt = {};
			if (startDate) query.createdAt.$gte = new Date(startDate);
			if (endDate) query.createdAt.$lte = new Date(endDate);
		}
		if (customerName) {
			query['shippingAddress.name'] = { $regex: customerName, $options: 'i' }; // Case-insensitive search
		}

		// Calculate the number of items to skip
		const skip = (page - 1) * limit;

		// Fetch orders with pagination and query
		const orders = await OrderModel
			.find(query)
			.skip(skip)
			.limit(parseInt(limit))
			.populate({
				path: 'items.productId',
				model: 'products',
			})
			.exec();

		// Get the total count of orders matching the query
		const totalOrders = await OrderModel.countDocuments(query);

		res.status(200).json({
			data: orders,
			currentPage: parseInt(page),
			totalPages: Math.ceil(totalOrders / limit),
			totalOrders,
			success: true,
			error: false,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message || 'Error searching orders',
			error: true,
			success: false,
		});
	}
};

module.exports = {
	getAllOrdersController,
	getOrderDetailsController,
	updateOrderStatusController,
	searchOrdersController,
	getAllOrdersAdminController
};
