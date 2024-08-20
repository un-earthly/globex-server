const categoryModel = require("../../models/categoryModel");

// Controller to add a new category
const addCategory = async (req, res) => {
	try {
		const { name, image, slug } = req.body;

		// Create a new category
		const newCategory = new categoryModel({
			name,
			image,
			slug
		});

		// Save the category to the database
		const savedCategory = await newCategory.save();

		res.status(201).json({
			message: 'Category added successfully',
			category: savedCategory,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error adding category',
			error: error.message,
		});
	}
};

module.exports = {
	addCategory,
};
