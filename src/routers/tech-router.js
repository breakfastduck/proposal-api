const express = require('express')
const router = new express.Router()
const moment = require('moment')

router.get('/api/tech/status', (req, res) => {
    const data = {
        status: 'running',
        performance: 'normal',
        port: '6000',
    }
    console.info(req.originalUrl + ' hit with method ' + req.method + ' @ ' + moment().format())
    res.status(200).send(JSON.stringify(data))
});

module.exports = router