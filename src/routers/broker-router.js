const express = require('express');
const Broker = require('../models/broker-model');

const router = new express.Router()

//CREATE BROKER ACCOUNT
router.post('/api/broker/new', async (req, res) => {
    const broker = new Broker(req.body)

    try {
        await broker.save()
        res.status(201).send({
            broker
        })

    } catch (e) {
        res.status(400).send(e)
    }
})

//LOG IN
router.post('/api/broker/login', async (req, res) => {
    try {
        const broker = await Broker.findByCredentials(req.body.brokerId, req.body.password)
        console.log(broker)
        res.send({
            broker,
            action: "login"
        })
    } catch (e) {
        res.status(400).send({
            error: "Unable to login",
            action: "loginFailed"
        })
    }
})

module.exports = router