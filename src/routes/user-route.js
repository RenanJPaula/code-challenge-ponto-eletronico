'use strict'

const router = require('express').Router()
const HttpStatus = require('http-status-codes')

router.post('/user/authenticate', (req, res, next) => {
  if (req.body.name === 'teste' && req.body.password === 'teste') {
    return res.status(HttpStatus.OK).send()
  } else {
    return res.status(HttpStatus.FORBIDDEN).send()
  }
})

module.exports = router
