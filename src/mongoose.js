const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://breakfastduck:halflife@cluster0-0tx7t.mongodb.net/engager?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to Mongo Atlas --- Database Name: Engager')
    console.log('Listening for requests...')
})

