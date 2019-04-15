require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const routes = require('./routes')

const app = express()

mongoose.connect('mongodb://localhost:27017/miniwp', {
  useNewUrlParser: true,
  useCreateIndex: true
})

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)

app.listen(3000, _ => {
  console.log('Listening on port 3000...')
})