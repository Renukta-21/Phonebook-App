const cors = require('cors')
const express = require('express')
const app = express()
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const contactRouter = require('./controllers/contact')
const config  = require('./utils/config')
const mongoose = require('mongoose')

mongoose.connect(config.MONGO_URI)
.then(()=> console.log('Succesful connection'))


app.use(cors())
app.use(express.json())
app.use(logger)

app.use('/api', contactRouter)
app.use(middleware.errorHandler)

module.exports = app