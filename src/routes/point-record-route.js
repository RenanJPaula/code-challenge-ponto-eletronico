'use strict'

const router = require('express').Router()
const HttpStatus = require('http-status-codes')
const _records = []
let _idCount = 0

router.post('/pointrecord', (req, res, next) => {
  if (req.body) {
    if (!req.body._id && req.body._id !== 0) {
      req.body._id = _idCount++
    }
    _records[req.body._id] = req.body
  }
  return res.status(HttpStatus.OK).send(req.body)
})

router.get('/pointrecord', (req, res, next) => {
  return res.status(HttpStatus.OK).send(_records)
})

module.exports = router
