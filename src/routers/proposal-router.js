const express = require('express')
const router = new express.Router()
const moment = require('moment')
const Proposal = require('../models/proposal-model')
const tools = require('../tools/calculator')

router.post('/api/proposals', async (req, res) => {
    console.info(req.originalUrl + ' hit with method ' + req.method + ' @ ' + moment().format())
    const proposal = new Proposal(req.body)

    try {
        await proposal.save()
        res.status(201).send({
            proposal,
            action: 'proposalSubmitted'
        })

    } catch (e) {
        res.status(500).send({
            proposal: {
                error: 'Proposal could not be submitted',
                reason: e
            },
            action: 'proposalFailed'
        })
    }
})

router.get('/api/proposals', async (req, res) => {
    console.info(req.originalUrl + ' hit with method ' + req.method + ' @ ' + moment().format())
    try {
        const data = await Proposal.find({ brokerId: req.query.brokerid })
        if (data == '') {
            res.send({
                proposals: 'No existing proposals',
                action: 'proposalsReturned'
            })
        } else {
            res.send({
                proposals: data,
                action: 'proposalsReturned'
            })
        }
    } catch (e) {
        res.status(500).send({
            proposals: e,
            action: 'proposalsFailed'
        })
    }
})

router.get('/api/proposal', async (req, res) => {
    console.info(req.originalUrl + ' hit with method ' + req.method + ' @ ' + moment().format())
    try {
        const data = await Proposal.find({ proposalId: req.query.proposalid })
        if (data == '') {
            res.send({
                proposal: 'No existing proposals',
                action: 'proposalsReturned'
            })
        } else {
            res.send({
                proposal: data,
                action: 'proposalReturned'
            })
        }
    } catch (e) {
        res.status(500).send({
            proposals: e,
            action: 'proposalFailed'
        })
    }
})

router.patch('/api/proposal/:id/quote', async (req, res) => {
    console.info(req.originalUrl + ' hit with method ' + req.method + ' @ ' + moment().format())
    const updates = Object.keys(req.body)
    const allowedUpdated = ['advance', 'term', 'rate', 'apr', 'payment']
    const isValidOperation = updates.every((update) => {
        return allowedUpdated.includes(update)
    })

    if (!isValidOperation) {
        res.status(400).send({
            error: 'Invalid update fields for this endpoint have been provided in the request'
        })
    } else {
        try {
            const proposal = await Proposal.findOne({ proposalId: req.params.id })

            if (!proposal) {
                return res.status(404).send()
            }

            let data = req.body

            const calcResult = await tools(data.advance, data.term, data.rate)

            data.payment = calcResult.payment
            data.apr = calcResult.apr

            const postUpdates = Object.keys(data)

            postUpdates.forEach((update) => proposal[update] = data[update])

            await proposal.save()

            res.send({
                quote: data,
                action: 'quoteAmended'
            })
        } catch (e) {
            res.status(500).send({
                quote: e,
                action: 'quoteAmendFailed'
            })
        }
    }
})

router.patch('/api/proposal/:id/status', async (req, res) => {
    console.info(req.originalUrl + ' hit with method ' + req.method + ' @ ' + moment().format())
    const newStatus = req.body.update
    const id = req.params.id
    const filter = { proposalId: id }
    const update = { status: newStatus }

    try {
        let proposal = await Proposal.findOneAndUpdate(filter, update)
        
        if (!proposal) {
            res.status(404).send({
                proposal: 'No Proposal found with requested details',
                action: 'n/a'
            })
        } else {
            proposal = await Proposal.findOne(filter)
            res.status(200).send({
                proposal: proposal,
                action: 'statusUpdated'
            })
        }
    } catch (e) {
        res.status(500).send({
            proposal: e,
            action: 'statusUpdateFailed'
        })
    }
})

module.exports = router