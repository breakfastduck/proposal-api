const mongoose = require('mongoose')
const validator = require('validator')

const getID = function (min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


const quoteSchema = new mongoose.Schema({
        quoteID: {
            type: String,
            required: true,
            default: getID(100000,120000)
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        postcode: {
            type: String,
            required: true,
            trim: true
            
        },
        dob: {
            type: String,
            required: true
        },
        mobile: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid')
                }
            }
        },
        advance: {
            type: Number,
            required: true,
            default: 0
        },
        term: {
            type: Number,
            required: true,
            default: 0
        },
        rate: {
            type: Number,
            required: true,
            default: 0
        },
        apr: {
            type: Number,
            default: 0
        },
        payment: {
            type: Number,
            default: 0
        },
        status: {
            type: String,
            required: true,
            trim: true,
            default: 'Approved'
        },
        tier: {
            type: String,
            default: 'TIER1'

        }
}, {
    timestamps: true
})

quoteSchema.statics.findByCredentials = async (quoteID) => {
    const quote = await Quote.findOne({ quoteID })

    if (!quote) {
        throw new Error('Unable to login')
    }

    return quote
}

const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote