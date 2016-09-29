'use strict'

;(function (window, $, API) {
  class PointRecord {
    constructor (_id, entryTime, lunchTime, returnTime, exitTime) {
      this._id = _id
      this.setEntryTime(entryTime)
      this.setLunchTime(lunchTime)
      this.setReturnTime(returnTime)
      this.setExitTime(exitTime)
      this.calculateTotal()
    }

    getFormatedEntryTime () {
      return formatTime(this.entryTime)
    }
    getEntryTime () {
      return this.entryTime
    }
    setEntryTime (entryTime) {
      if (typeof entryTime !== Date) {
        entryTime = new Date(entryTime)
      }
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
      if (typeof lunchTime !== Date) {
        lunchTime = new Date(lunchTime)
      }
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
      if (typeof returnTime !== Date) {
        returnTime = new Date(returnTime)
      }
      this.returnTime = returnTime
      this.calculateTotal()
    }

    getFormatedExitTime () {
      return formatTime(this.exitTime)
    }
    getExitTime () {
      return this.exitTime
    }
    setExitTime (exitTime) {
      if (typeof exitTime !== Date) {
        exitTime = new Date(exitTime)
      }
      this.exitTime = exitTime
      this.calculateTotal()
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
      return $.post(API.pointrecord, this)
    }

    static getPointRecords () {
      return new Promise((resolve, reject) => {
        $.get(API.pointrecord).then((resp) => {
          let _pointRecords = resp.data.map((pointRecord) => {
            return new PointRecord(
              pointRecord._id,
              pointRecord.entryTime,
              pointRecord.lunchTime,
              pointRecord.returnTime,
              pointRecord.exitTime
            )
          })
          resolve(_pointRecords)
        }).catch(reject)
      })
    }
  }

  function formatTime (date) {
    if (date) {
      let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours().toString()
      let mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes().toString()
      return `${hh}:${mm}`
    } else {
      return ''
    }
  }

  function getHoursBetween (beginDate, endDate) {
    return (endDate.getTime() - beginDate.getTime()) / 3600000
  }

  window.PointRecord = PointRecord
})(window, window.$, window.API)
