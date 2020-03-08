const mongoose = require('mongoose')
const validator = require('validator')
const autoIncrement = require('mongoose-auto-increment');

// const connection = mongoose.createConnection('mongodb+srv://breakfastduck:halflife@cluster0-0tx7t.mongodb.net/engager?retryWrites=true&w=majority')
autoIncrement.initialize(mongoose.connection)

const proposalSchema = new mongoose.Schema({
    brokerId: {
        type: String,
        required: true
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
        default: 1.2
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
        default: 'Awaiting Decision'
    },
    tier: {
        type: String,
        default: ''

    }
}, {
    timestamps: true
})

proposalSchema.plugin(autoIncrement.plugin, {
    model: 'Proposal',
    field: 'proposalId',
    startAt: 10000,
})

const Proposal = mongoose.model('Proposal', proposalSchema)

module.exports = Proposal