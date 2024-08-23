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
}; const addSubcategory = async (req, res) => {
	try {
		const { categorySlug, name, slug, image } = req.body;

		// Find the category by slug
		const category = await categoryModel.findOne({ slug: categorySlug });

		if (!category) {
			return res.status(404).json({
				message: 'Category not found',
			});
		}

		// Check if subcategory slug already exists within the same category
		const existingSubcategory = category.subcategories.find(sub => sub.slug === slug);
		if (existingSubcategory) {
			return res.status(400).json({
				message: 'Subcategory with this slug already exists',
			});
		}

		// Create a new subcategory
		const newSubcategory = {
			name,
			slug,
			image,
		};

		// Add the subcategory to the category
		category.subcategories.push(newSubcategory);

		// Save the updated category
		await category.save();

		res.status(201).json({
			message: 'Subcategory added successfully',
			subcategory: newSubcategory,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error adding subcategory',
			error: error.message,
		});
	}
};

const updateCategory = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedData = req.body;

		// Find the category by ID and update it with the new data
		const updatedCategory = await categoryModel.findByIdAndUpdate(id, updatedData, { new: true });

		if (!updatedCategory) {
			return res.status(404).json({
				message: 'Category not found',
				error: true,
			});
		}

		res.json({
			message: 'Category updated successfully',
			category: updatedCategory,
			error: false,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error updating category',
			error: error.message,
		});
	}
};
const updateSubcategory = async (req, res) => {
	try {
		const { categoryId, subcategoryId } = req.params;
		const updatedData = req.body;
		console.log(req.body, categoryId, subcategoryId)
		// Find the category and update the specific subcategory
		const category = await categoryModel.findById(categoryId);

		if (!category) {
			return res.status(404).json({
				message: 'Category not found',
				error: true,
			});
		}

		const subcategory = category.subcategories.id(subcategoryId);

		if (!subcategory) {
			return res.status(404).json({
				message: 'Subcategory not found',
				error: true,
			});
		}

		// Update subcategory fields
		subcategory.set(updatedData);

		// Save the category with the updated subcategory
		await category.save();

		res.json({
			message: 'Subcategory updated successfully',
			category,
			error: false,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error updating subcategory',
			error: error.message,
		});
	}
};
const deleteCategory = async (req, res) => {
	try {
		const { id } = req.params;

		// Find the category by ID and remove it
		const deletedCategory = await categoryModel.findByIdAndDelete(id);

		if (!deletedCategory) {
			return res.status(404).json({
				message: 'Category not found',
			});
		}

		res.status(200).json({
			message: 'Category deleted successfully',
			category: deletedCategory,
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error deleting category',
			error: error.message,
		});
	}
}; const deleteSubcategory = async (req, res) => {
	try {
		const { categoryId, subcategoryId } = req.params;

		// Find the category by ID
		const category = await categoryModel.findById(categoryId);

		if (!category) {
			return res.status(404).json({
				message: 'Category not found',
			});
		}

		// Check if the subcategory exists within the category
		const subcategoryIndex = category.subcategories.findIndex(sub => sub._id.toString() === subcategoryId);

		if (subcategoryIndex === -1) {
			return res.status(404).json({
				message: 'Subcategory not found',
			});
		}

		category.subcategories.splice(subcategoryIndex, 1);

		// Save the updated category
		await category.save();

		res.status(200).json({
			message: 'Subcategory deleted successfully',
		});
	} catch (error) {
		res.status(500).json({
			message: 'Error deleting subcategory',
			error: error.message,
		});
	}
};
module.exports = {
	addCategory,
	updateSubcategory,
	updateCategory,
	deleteSubcategory,
	deleteCategory,
	addSubcategory
};
