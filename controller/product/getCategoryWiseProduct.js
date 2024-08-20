const productModel = require("../../models/productModel.js");
const categoryModel = require("../../models/categoryModel.js"); // Adjust the path if needed

const getCategoryWiseProduct = async (req, res) => {
    try {
        const { category } = req?.body || req?.query;
        console.log({ category });
        // Check if category is provided
        if (!category) {
            return res.status(400).json({
                message: "Category slug is required",
                error: true,
                success: false
            });
        }

        // Find the category by slug
        const categoryDoc = await categoryModel.findOne({ slug: category }); // Assuming `slug` is the field name

        if (!categoryDoc) {
            return res.status(404).json({
                message: "Category not found",
                error: true,
                success: false
            });
        }

        const categoryId = categoryDoc._id;

        // Find products by category ID
        const products = await productModel.find({ category: categoryId });

        res.json({
            data: products,
            message: "Products retrieved successfully",
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

const getSubcategoryItems = async (req, res) => {
    try {
        const { category, subcategory } = req?.body || req?.query;
        console.log(req?.body);

        // Check if category and subcategory slugs are provided
        if (!category || !subcategory) {
            return res.status(400).json({
                message: "Category and Subcategory slugs are required",
                error: true,
                success: false
            });
        }

        // Find the category by slug
        const categoryDoc = await categoryModel.findOne({ slug: category });
        if (!categoryDoc) {
            return res.status(404).json({
                message: "Category not found",
                error: true,
                success: false
            });
        }
        const products = await productModel.find({
            category: categoryDoc._id,
            subcategory: subcategory
        });

        res.json({
            data: products,
            message: "Subcategory items retrieved successfully",
            success: true,
            error: false
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};



module.exports = { getCategoryWiseProduct, getSubcategoryItems };
