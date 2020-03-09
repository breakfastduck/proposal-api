const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const brokerSchema = new mongoose.Schema({
    brokerId: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7
    }
})

brokerSchema.statics.findByCredentials = async (brokerId, password) => {

    const broker = await Broker.findOne({ brokerId });

    if (!broker) {
        throw new Error('Unable to log in');
    } else {
        const isMatch = await bcrypt.compare(password, broker.password)
    
        if (!isMatch) {
            throw new Error('Unable to log in');
        } return broker;
    }
}

brokerSchema.pre('save', async function (next) {

    const broker = this;

    if (broker.isModified('password')) {
        broker.password = await bcrypt.hash(broker.password, 8)
        console.log('HashComplete')
    }
    next();
})

const Broker = mongoose.model('Broker', brokerSchema)

module.exports = Broker