const mongoose = require('mongoose');

// Define the subcategory schema
const subcategorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	slug: {
		type: String,
		required: true,
		unique: true,
	},
	image: {
		type: String, // URL to the image
	},
});

// Define the category schema
const categorySchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
			type: String, // URL to the image
		},
		subcategories: [subcategorySchema],
	},
	{
		timestamps: true,
	}
);

// Create the Category model
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
