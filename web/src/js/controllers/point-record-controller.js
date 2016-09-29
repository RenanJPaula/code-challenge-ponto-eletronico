;(function ($, dialogPolyfill, PointRecord) {
  'use strict'

  const _pointRecordTable = $('#pointRecordTable')
  const _totalWorkHoursCell = $('#totalWorkHoursCell')
  const _buttonNewPoint = $('#buttonNewPoint')
  const _dialog = document.querySelector('dialog')
  const _formPointRecord = $('#formPointRecord')
  const _inputEntryTime = $('#inputEntryTime')
  const _inputLunchTime = $('#inputLunchTime')
  const _inputReturnTime = $('#inputReturnTime')
  const _inputExitTime = $('#inputExitTime')

  initPointRecordsTable()
  configDialog()

  // Init Form PointRecord
  _formPointRecord.on('submit', (event) => {
    event.preventDefault()

    let entryTime = new Date()
    entryTime.setHours(..._inputEntryTime.value().split(':'))

    let lunchTime = new Date()
    lunchTime.setHours(..._inputLunchTime.value().split(':'))

    let returnTime = new Date()
    returnTime.setHours(..._inputReturnTime.value().split(':'))

    let exitTime = new Date()
    exitTime.setHours(..._inputExitTime.value().split(':'))

    new PointRecord(entryTime, lunchTime, returnTime, exitTime).save().then(() => {
      _dialog.close()
      initPointRecordsTable()
    })

    return false
  })

  function configDialog () {
    _buttonNewPoint.on('click', () => {
      _dialog.showModal()
    })

    if (!_dialog.showModal) {
      dialogPolyfill.registerDialog(_dialog)
    }

    _dialog.querySelector('.close').addEventListener('click', function () {
      _dialog.close()
    })
  }

  function initPointRecordsTable () {
    PointRecord.getPointRecords().then((pointRecords) => {
      let _tableHtml = pointRecords.map((pointRecord) => {
        return `<tr>
                  <td class="mdl-data-table__cell--non-numeric">${pointRecord.getFormatedDate()}</td>
                  <td class="mdl-data-table__cell--non-numeric">${pointRecord.getFormatedEntryTime()}</td>
                  <td class="mdl-data-table__cell--non-numeric">${pointRecord.getFormatedLunchTime()}</td>
                  <td class="mdl-data-table__cell--non-numeric">${pointRecord.getFormatedReturnTime()}</td>
                  <td class="mdl-data-table__cell--non-numeric">${pointRecord.getFormatedExitTime()}</td>
                  <td class="mdl-data-table__cell--non-numeric">${pointRecord.total} horas</td>
                  <td class="mdl-data-table__cell--non-numeric">
                    <button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored mdl-button--accent">
                      <i class="material-icons">edit</i>
                    </button>
                  </td>
                </tr>`
      }).reduce((previous, current) => {
        return previous + current
      })

      let _totalWorkHours = pointRecords.reduce((previous, current) => {
        return (previous.total || previous) + (current.total || current)
      })

      _pointRecordTable.element.innerHTML = _tableHtml
      _totalWorkHoursCell.element.innerHTML = `${_totalWorkHours} horas`
    })
  }
})(window.$, window.dialogPolyfill, window.PointRecord)
