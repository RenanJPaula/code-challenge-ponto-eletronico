'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const env = require('./env')
const http = require('http')
const HttpStatus = require('http-status-codes')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(require('./routes/user-route'))
app.use(require('./routes/point-record-route'))

app.get('/', (req, res, next) => {
  return res.status(HttpStatus.OK).send({
    hello: 'Ponto eletronico API'
  })
})

app.post('/', (req, res, next) => {
  console.log(req.body)
  return res.status(HttpStatus.OK).send(req.body)
})

http.createServer(app).listen(env.port, () => {
  console.log(`API listen on port: ${env.port}`)
})
