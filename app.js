const express = require('express')
require('./src/mongoose')
const cors = require('cors')
const techRouter = require('./src/routers/tech-router')
const Proposal = require('./src/models/proposal-model')
const proposalRouter = require('./src/routers/proposal-router')


const app = express()
const port = process.env.PORT || 6000
//const port = ''
app.use(express.json())
app.use(cors())

app.use(techRouter);
app.use(proposalRouter);

app.get('*', (req, res) => {
    const data = {
        error: 'Endpoint does not exist',
        apiDocumentation: 'https://www.google.com/help'
    }

    res.status(501).send(JSON.stringify(data))
})


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})