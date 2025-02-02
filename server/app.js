require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT
const routes = require('./routes')
const mongoose = require('mongoose')
const morgan = require('morgan')
const NODE_ENV = process.env.NODE_ENV || "development"


mongoose.set('useNewUrlParser', true)
var cors = require('cors')

mongoose.connect('mongodb+srv://database:database@database-c6k6t.gcp.mongodb.net/hacktivoverflow?retryWrites=true&w=majority' +NODE_ENV,{useNewUrlParser: true})

app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extends:true}))

app.use('/',routes)

app.listen(port, () => console.log(`Example app listening on port port!`))


module.exports = app