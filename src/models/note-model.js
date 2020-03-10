const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    proposalId: {
        type: String,
        required: true,
        trim: true
    },
    noteBody: {
        type: String,
        required: true,
        trim: true,
    }
}, {
    timestamps: true
})

noteSchema.statics.findByProposal = async (proposalId) => {

    const notes = await Note.find({ proposalId });

    if (!notes) {
        throw new Error('No notes');
    } else {
          return notes;
    }
}

const Note = mongoose.model('Note', noteSchema)

module.exports = Note