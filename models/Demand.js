const mongoose = require('mongoose')

const demandSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        client: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

demandSchema.virtual('id').get(function () {
    return this._id.toHexString();
})
demandSchema.set('toJSON', {
    virtuals: true
})

exports.Demand = mongoose.model('Demand', demandSchema)
exports.demandSchema = demandSchema