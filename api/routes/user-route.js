'use strict'

const router = require('express').Router()
const HttpStatus = require('http-status-codes')

router.post('/user', (req, res, next) => {
  return res.status(HttpStatus.OK).send({})
})

router.post('/user/authenticate', (req, res, next) => {
  return res.status(400).send()
})

module.exports = router
