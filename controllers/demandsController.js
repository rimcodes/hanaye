const asyncHandler = require('express-async-handler')

// const {Store} = require('../models/Store')
const {Demand} = require('../models/Demand')


/**
 * @desc Get all demands
 * @route Get /demands
 * @access Public
 */
const getAllDemands = asyncHandler(async (req, res) => {
    const demands = await Demand.find().populate('client', '-password')

    if (!demands?.length) {
        return res.status(400).json({ message: "No Demands found"})
    }

    res.json(demands)

})

/**
 * @desc Get single demand
 * @route Get /demands/:id
 * @access Public 
 */
const getDemand = asyncHandler(async (req, res) => {
    const { id } = req.params

    const demand = await Demand.findById(id).populate('client', '-password')

    if (!demand) {
        res.status(400).json({ message: 'No Demand with the given id!'})
    }

    res.send(demand)

})

/**
 * @desc Create a new demand
 * @route Post /demands
 * @access Public
 */
const createNewDemand = asyncHandler(async (req, res) => {
    // Create a new demand
    const { name, client } = req.body

    if ( !client  ) {
        return res.status(400).json({ message: 'Client is required'})
    }

    // Create and demand
    const createdStore = await Demand.create({ name, client  })

    if (createdStore) {
        res.status(201).json({ message: `New demand created`, createdStore})
    } else {
        res.status(400).json({ message: 'Invalid demand data recieved' })
    }
})

/**
 * @desc Update a demand
 * @route PUT /demands
 * @access Private
 */
const updateDemand = asyncHandler(async (req, res) => {
    // Update a demand
    const { id, name, client } = req.body

    if ( !id ) {
        return res.status(400).json({ message: 'id is required'})
    }

    // Confirm demand exists to update
    const updateDemand = await Demand.findByIdAndUpdate(id, {
        name,
        client
    })

    res.json(updateDemand)

})

/**
 * @desc Delete a demand
 * @route Delete /demands
 * @access Private
 */
const deleteDemand = asyncHandler(async (req, res) => {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Denand ID required' })
    }

    // Confirm store exists to delete
    const store = await Store.findByIdAndDelete(id)
    if (!store) {
        return res.status(400).json({ message: 'Store not found' })
    }


    const reply = `Demand with ID = ${id} deleted`
    res.json(reply)
})


module.exports = {
    getAllDemands,
    getDemand,
    createNewDemand,
    updateDemand,
    deleteDemand
}
