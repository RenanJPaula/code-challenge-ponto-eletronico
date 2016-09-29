'use strict'

;(function (window) {
  class PointRecord {
    constructor (entryTime, lunchTime, returnTime, exitTime) {
      this.entryTime = entryTime
      this.lunchTime = lunchTime
      this.returnTime = returnTime
      this.exitTime = exitTime
      this.calculateTotal()
    }

    getFormatedEntryTime () {
      return formatTime(this.entryTime)
    }
    getEntryTime () {
      return this.entryTime
    }
    setEntryTime (entryTime) {
      this.entryTime = entryTime
      this.calculateTotal()
    }

    getFormatedLunchTime () {
      return formatTime(this.lunchTime)
    }
    getLunchTime () {
      return this.lunchTime
    }
    setLunchTime (lunchTime) {
      this.lunchTime = lunchTime
      this.calculateTotal()
    }

    getFormatedReturnTime () {
      return formatTime(this.returnTime)
    }
    getReturnTime () {
      return this.returnTime
    }
    setReturnTime (returnTime) {
      this.returnTime = returnTime
      this.this.calculateTotal()
    }

    getFormatedExitTime () {
      return formatTime(this.exitTime)
    }
    getExitTime () {
      return this.exitTime
    }
    seTexitTime (exitTime) {
      this.exitTime = exitTime
      this.this.calculateTotal()
    }

    getFormatedDate () {
      let date = this.entryTime || this.lunchTime || this.returnTime || this.exitTime
      let dd = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString()
      let mm = date.getMonth() + 1
      mm = mm < 10 ? '0' + mm : mm.toString()
      return `${dd}/${mm}/${date.getFullYear()}`
    }

    calculateTotal () {
      if (this.entryTime && this.lunchTime && this.returnTime && this.exitTime) {
        this.total = getHoursBetween(this.entryTime, this.lunchTime) + getHoursBetween(this.returnTime, this.exitTime)
        this.total = Math.floor(this.total * 100) / 100
      } else {
        this.total = null
      }
    }

    save () {
      return new Promise((resolve) => {
        records.push(this)
        resolve()
      })
    }

    static getPointRecords () {
      return new Promise((resolve) => {
        resolve(records)
      })
    }
  }

  function formatTime (date) {
    if (date) {
      let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours().toString()
      let mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getHours().toString()
      return `${hh}:${mm}`
    } else {
      return ''
    }
  }

  function getHoursBetween (beginDate, endDate) {
    return (endDate.getTime() - beginDate.getTime()) / 3600000
  }

  const records = [
    new PointRecord(
      new Date(1991, 9, 1, 8, 0, 0, 0),
      new Date(1991, 9, 1, 12, 0, 0, 0),
      new Date(1991, 9, 1, 13, 0, 0, 0),
      new Date(1991, 9, 1, 17, 0, 0, 0)
    ),
    new PointRecord(
      new Date(1991, 9, 2, 8, 0, 0, 0),
      new Date(1991, 9, 2, 12, 0, 0, 0),
      new Date(1991, 9, 2, 13, 0, 0, 0),
      new Date(1991, 9, 2, 17, 0, 0, 0)
    ),
    new PointRecord(
      new Date(1991, 9, 3, 8, 0, 0, 0),
      new Date(1991, 9, 3, 12, 0, 0, 0),
      new Date(1991, 9, 3, 13, 0, 0, 0),
      new Date(1991, 9, 3, 16, 0, 0, 0)
    )
  ]

  window.PointRecord = PointRecord
})(window)
