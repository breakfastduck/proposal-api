const express = require('express')
const router = new express.Router()
const moment = require('moment')
const Note = require('../models/note-model')

router.get('/api/notes/:id', async (req, res) => {
    console.info(req.originalUrl + ' hit with method ' + req.method + ' @ ' + moment().format())
    const id = req.params.id
    console.log(id)
    try {
        const data = await Note.find({ proposalId: id })

        if (data == '') {
            res.send({
                notes: 'No existing notes',
                action: 'notesReturned'
            })
        } else {
            res.send({
                notes: data,
                action: 'notesReturned'
            })
        }
    } catch (e) {
        res.status(500).send({
            notes: e,
            action: 'notesFailed'
        })
    }
})

router.post('/api/notes/new', async (req, res) => {
    console.info(req.originalUrl + ' hit with method ' + req.method + ' @ ' + moment().format())
    
    const note = new Note(req.body)
    try {
        await note.save()
        res.status(201).send({
            note,
            action: 'noteSaved'
        })
    } catch (e) {
        res.status(500).send({
            note: {
                error: 'Note could not be submitted',
                reason: e
            },
            action: 'noteFailed'
        })
    }
})

module.exports = router