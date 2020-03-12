const express = require('express');
const router = new express.Router()

const pgp = require('pg-promise')();

const cn = {
    host: '185.224.139.231',
    port: '5432',
    database: 'proposal',
    user: 'postgres',
    password: 'halflife'
}

const db = pgp(cn);


router.get('/api/rules', async (req, res) => {
    const data = await db.any(`
    SELECT * FROM 
        ruleaudit
            WHERE 
                proposalid = $1
    `, String(req.query.prop))

    if (!data) {
        res.send(data)
    } else {
        res.status(404).send({
            error: 'No Rules Triggered'
        })
    }
});


module.exports = router