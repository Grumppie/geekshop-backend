import Product from '../Models/product.model.js'
import expressAsyncHandler from "express-async-handler"


// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = expressAsyncHandler(
    async (req, res) => {
        const products = await Product.find()
        res.status(200).json(products)
    }
)

// @desc    Fetch single product
// @route   GET /api/products/id
// @access  Public
const getProductById = expressAsyncHandler(
    async (req, res) => {
        const id = req.params.id

        const product = await Product.findById(id)
        if (product) {
            res.status(200).json(product)
        } else {
            res.status(404)
            throw new Error('product not found')
        }

    }
)

export {
    getProducts,
    getProductById
}
