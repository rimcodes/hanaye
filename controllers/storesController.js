const asyncHandler = require('express-async-handler')

const {Store} = require('../models/Store')


/**
 * @desc Get all stores
 * @route Get /sotres
 * @access Public
 */
const getAllStores = asyncHandler(async (req, res) => {
    const stores = await Store.find()

    if (!stores?.length) {
        return res.status(400).json({ message: "No Stores found"})
    }

    res.json(stores)

})

/**
 * @desc Get single store
 * @route Get /stores/:id
 * @access Public 
 */
const getStore = asyncHandler(async (req, res) => {
    const { id } = req.params

    const store = await Store.findById(id)

    if (!store) {
        res.status(400).json({ message: 'No Store with the given id!'})
    }

    res.send(store)

})

/**
 * @desc Get single user store for showning details
 * @route Get /stores/user/:userid
 * @access Public
 */
const getWorkerStore = asyncHandler(async (req, res) => {
    const { userid } = req.params

    const store = await Store.findOne({ worker: userid })

    if (!store) {
        res.status(400).json({ message: 'No Store with user with the given id!'})
    }

    res.send(store)

})

/**
 * @desc Create a new store
 * @route Post /stores
 * @access Public
 */
const createNewStore = asyncHandler(async (req, res) => {
    // Create a new Store
    const { name, details, location, worker } = req.body

    if ( !name || !location  ) {
        return res.status(400).json({ message: 'All fields(name, location) are required'})
    }

    
    const file = req.file;
    let imagePath;

    let fileName = 'images/store.png';
    let basePath = process.env.BASE_PATH || 'http://localhost:3500/'
    if(file) {
        fileName = req.file.key;
        basePath = process.env.BUCKETEER_BUCKET_NAME || ``;
        imagePath = `${basePath}${fileName}`;
    } else {
        imagePath = `${basePath}${fileName}`;
    }

    let storeObject = {}

    // image: imagePath
    storeObject = { name, details, location, image: imagePath, worker  }

    // Create and store service
    const createdStore = await Store.create(storeObject)

    // createdStore = await createdStore.save()

    if (createdStore) {
        res.status(201).json({ message: `New store created`, createdStore})
    } else {
        res.status(400).json({ message: 'Invalid store data recieved' })
    }
})

/**
 * @desc Update a store
 * @route PUT /stores
 * @access Private
 */
const updateStore = asyncHandler(async (req, res) => {
    // Update a Store
    const { id, name, details, location, active, worker } = req.body

    if ( !id ) {
        return res.status(400).json({ message: 'id is required'})
    }

    // Confirm service exists to update
    const editedStore = await Store.findById(id)
    if (!editedStore) {
        return res.status(400).json({ message: 'Store not found'})
    }

    const file = req.file;
    let imagePath;

    let basePath = process.env.BASE_PATH;
    if(file) {
        fileName = req.file.key;
        basePath = process.env.BUCKETEER_BUCKET_NAME || ``;
        imagePath = `${basePath}${fileName}`;
        editedStore.image = imagePath
    }

    editedStore.name = name
    editedStore.worker = worker
    editedStore.details = details
    editedStore.location = location
    editedStore.active = active

    const updatedStore = await editedStore.save()

    res.json({ updatedStore })
})

/**
 * @desc Delete a store
 * @route Delete /stores
 * @access Private
 */
const deleteStore = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Store ID required' })
    }

    // Need further work for implementing this feature
    // const service = await Service.findOne({ Store: id }).lean().exec()
    // if(service) {
    //     return res.status(400).json({ message: 'Store has services assigned to it'})
    // }

    // Confirm store exists to delete
    const store = await Store.findById(id)
    if (!store) {
        return res.status(400).json({ message: 'Store not found' })
    }

    const result = await store.deleteOne()

    const reply = `Store ${result.name} with ID ${result._id} deleted`
    res.json(reply)
})

/**
 * @desc Upload store gallery
 * @route POST /stores/gallery-image/:id
 * @access Public
 */
const uploadGallery = asyncHandler(async (req, res) => {
    // if(!mongoose.isValidObjectId(req.params.id)){
    //     res.status(400).send('Invalid store id');
    // }

    const files = req.files;
    let imagesPaths = [];
    const basePath = process.env.BUCKETEER_BUCKET_NAME || ``;
    if(files) {
        files.map(file => {
            imagesPaths.push(`${basePath}${file.key}`)
        })
    }

    const store = await Store.findByIdAndUpdate(
        req.params.id, 
        {
            images: imagesPaths
        },
        { new: true }
    );

    if(!store) {
        return res.status(500).send('the store cannot be updated');
    }

    res.status(200).send(store);
})

module.exports = {
    getAllStores,
    getStore,
    getWorkerStore,
    createNewStore,
    updateStore,
    deleteStore,
    uploadGallery
}
