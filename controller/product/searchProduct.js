const productModel = require("../../models/productModel.js")
const categoryModel = require("../../models/categoryModel.js")

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q;
        const regex = new RegExp(query, 'i');
        console.log(query)

        // First, find categories matching the query
        const categories = await categoryModel.find({ name: regex }).select('_id');
        const categoryIds = categories.map(cat => cat._id);
        const product = await productModel.find({
            "$or": [
                { productName: regex },
                { category: { $in: categoryIds } }  // Match against the category ObjectIds
            ]
        });

        res.json({
            data: product,
            message: "Search Product list",
            error: false,
            success: true
        });
    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        });
    }
};

module.exports = searchProduct