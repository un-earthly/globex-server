const productModel = require("../../models/productModel.js");

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

// module.exports = getDealOfTheDayController;



module.exports = { getProductController, getDealOfTheDayController };
