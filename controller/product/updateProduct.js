const uploadProductPermission = require('../../helpers/permission.js')
const productModel = require('../../models/productModel.js')

async function updateProductController(req, res) {
    try {

        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission denied")
        }

        const { _id, ...resBody } = req.body
        console.log(resBody)

        const updateProduct = await productModel.findByIdAndUpdate(_id, resBody)
        console.log(updateProduct)
        res.json({
            message: "Product update successfully",
            data: updateProduct,
            success: true,
            error: false
        })

    } catch (err) {
        res.status(400).json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}


module.exports = updateProductController