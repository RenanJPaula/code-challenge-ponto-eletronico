'use strict'

const router = require('express').Router()
const HttpStatus = require('http-status-codes')
let _idCount = 0
const _records = [
  {
    _id: _idCount++,
    entryTime: '2016-09-30T11:00:18.656Z',
    lunchTime: '2016-09-30T15:00:18.656Z',
    returnTime: '2016-09-30T16:00:18.656Z',
    exitTime: '2016-09-30T20:00:18.656Z',
    total: 8
  },
  {
    _id: _idCount++,
    entryTime: '2016-10-01T11:00:18.656Z',
    lunchTime: '2016-10-01T15:00:18.656Z',
    returnTime: '2016-10-01T16:00:18.656Z',
    exitTime: '2016-10-01T20:00:18.656Z',
    total: 8
  },
  {
    _id: _idCount++,
    entryTime: '2016-10-02T11:00:18.656Z',
    lunchTime: '2016-10-02T15:00:18.656Z',
    returnTime: '2016-10-02T16:00:18.656Z',
    exitTime: '2016-10-02T20:00:18.656Z',
    total: 8
  }
]

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
