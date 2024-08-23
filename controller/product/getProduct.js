const productModel = require("../../models/productModel.js");
const categoryModel = require("../../models/categoryModel.js");

const getProductController = async (req, res) => {
    try {
        const { page = 1, limit = 8 } = req.query; // Default to page 1 and limit 10 if not provided

        const skip = (page - 1) * limit;
        const allProduct = await productModel.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)); // Ensure limit is a number

        const totalProducts = await productModel.countDocuments();

        res.json({
            message: "All Products",
            success: true,
            error: false,
            data: allProduct,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};


const getDealOfTheDayController = async (req, res) => {
    try {
        const dealOfTheDayProduct = await productModel.aggregate([
            { $sample: { size: 1 } } // Randomly select one document
        ]);

        res.json({
            message: "Deal of the Day",
            success: true,
            error: false,
            data: dealOfTheDayProduct[0] // Return the single product object
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};
const searchProductController = async (req, res) => {
    try {
        const query = req.query.q;
        const { page = 1, limit = 8 } = req.query; // Default to page 1 and limit 8 if not provided
        const regex = new RegExp(query, 'i');

        // First, find categories matching the query
        const categories = await categoryModel.find({ name: regex }).select('_id');
        const categoryIds = categories.map(cat => cat._id);

        // Search for products matching the query or category IDs
        const productQuery = {
            "$or": [
                { productName: regex },
                { category: { $in: categoryIds } }  // Match against the category ObjectIds
            ]
        };

        // Calculate skip and limit for pagination
        const skip = (page - 1) * limit;

        // Fetch the products matching the search query
        const products = await productModel.find(productQuery)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit)); // Ensure limit is a number

        // Get the total count of products that match the search query
        const totalProducts = await productModel.countDocuments(productQuery);

        res.json({
            message: "Search Product list",
            success: true,
            error: false,
            data: products,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params; // Get the product ID from the request parameters

        // Find the product by ID and delete it
        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                success: false,
                error: true,
            });
        }

        res.json({
            message: "Product deleted successfully",
            success: true,
            error: false,
            data: deletedProduct,
        });

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            success: false,
            error: true,
        });
    }
};


module.exports = {
    getProductController,
    getDealOfTheDayController,
    searchProductController,
    deleteProductController
};
