const asyncHandler = require('express-async-handler')

// const {User} = require('../models/User')
const {Product} = require('../models/Product')
// const {Category} = require('../models/Category')

/**
 * @desc Get all products
 * @route Get /products
 * @access Public
 */
const getAllProducts = asyncHandler(async (req, res) => {
    // get all the products
    let products

    if(req.query.stores) {
        products = await Product.find({ store: req.query.stores }).populate('store')
    } else if (req.query.client) {
        products = await Product.find({ worker: req.query.client }).populate('store')
    } else {
        products = await Product.find().populate('store')
    }

    if(!products?.length) {
        return res.status(400).json({ message: 'No products found'})
    }

    res.json(products)
})

const getClientProducts = asyncHandler(async (req, res) => {
    let clentProducts;

    if (req.query.client) {
        clentProducts = await Product.find({ user: req.query.client }).populate('store')
    } else {
        clentProducts = await Product.find().populate('store')
    }

    res.json(clentProducts)
})

/**
 * @desc Get all products
 * @route Get /products/:id
 * @access Public
 */
const getProduct = asyncHandler(async (req, res) => {
    // get single product

    const { id } = req.params

    const product = await Product.findById(id).populate({
        path: 'store',
        populate: {
          path: 'worker',
          model: 'User'
        } })
    // const product = await Product.findById(id)
    if(!product) {
        return res.status(400).json({ message: 'No Product found with given id'})
    }

    res.json(product)
})

/**
 * @desc Create a new Product
 * @route Post /products
 * @access Private
 */
const createNewProduct = asyncHandler(async (req, res) => {
    // Create a new Product
    const { store, title, price, details, worker } = req.body

    if (!title || !store ) {
        return res.status(400).json({ message: 'All this fields ( title and store) are required'})
    }

    const file = req.file;
    let imagePath;

    let fileName = 'images/product.png';
    let basePath = process.env.BASE_PATH || 'http://localhost:3500/'
    if(file) {
        fileName = req.file.key;
        basePath = process.env.BUCKETEER_BUCKET_NAME || ``;
        imagePath = `${basePath}${fileName}`;
    } else {
        imagePath = `${basePath}${fileName}`;
    }
    // Create and store product
    const productObject = { store, title, price, details, worker, image: imagePath }
    const product = await Product.create(productObject)

    if (product) {
        res.status(201).json(product)
    } else {
        res.status(400).json({ message: 'Invalid product data recieved' })
    }

})

/**
 * @desc Update a Product
 * @route PATCH /products
 * @access Private
 */
const updateProduct = asyncHandler(async (req, res) => {
    // Update a Product
    const { id, store, title, price, worker, details, active } = req.body

    if ( !id ) {
        return res.status(400).json({ message: 'Field is required'})
    }

    // Confirm product exists to update
    const product = await Product.findById(id).exec()
    if (!product) {
        return res.status(400).json({ message: 'Product not found'})
    }

    const file = req.file;
    let imagePath;

    let basePath = process.env.BASE_PATH;
    if(file) {
        fileName = req.file.key;
        basePath = process.env.BUCKETEER_BUCKET_NAME || ``;
        imagePath = `${basePath}${fileName}`;
        product.image = imagePath
    }

    product.store = store
    product.title = title
    product.price = price
    product.worker = worker
    product.details = details
    product.active = active

    const updatedProduct = await product.save()

    res.json(updatedProduct)
})

/**
 * @desc Delete a product
 * @route Delete /products
 * @access Private
 */
const deleteProduct = asyncHandler(async (req, res) => {
    // Delete Product
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Product ID required' })
    }

    // Confirm product exists to delete
    const product = await Product.findById(id).exec()
    if (!product) {
        return res.status(400).json({ message: 'Product not found' })
    }

    const result = await product.deleteOne()

    const reply = `Product ${result.title} with ID ${result._id} deleted`
    res.json({message: reply})
})

module.exports = {
    getAllProducts,
    getClientProducts,
    getProduct,
    createNewProduct,
    updateProduct,
    deleteProduct
}
