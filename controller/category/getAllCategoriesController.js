const categoryModel = require('../../models/categoryModel.js');

// Controller to get all unique categories
const getAllCategories = async (req, res) => {
	try {
		const categories = await categoryModel.find();
		res.status(200).json({
			message: 'Categories retrieved successfully',
			categories,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error retrieving categories',
			error: error.message,
		});
	}
};

module.exports = {
	getAllCategories,
};
