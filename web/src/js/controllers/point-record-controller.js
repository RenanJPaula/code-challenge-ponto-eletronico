;(function ($, dialogPolyfill, PointRecord) {
  'use strict'

  const _pointRecordTable = $('#pointRecordTable')
  const _totalWorkHoursCell = $('#totalWorkHoursCell')
  const _buttonNewPoint = $('#buttonNewPoint')
  const _dialog = document.querySelector('dialog')
  const _formPointRecord = $('#formPointRecord')
  const _inputPointRecordId = $('#inputPointRecordId')
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

    new PointRecord(_inputPointRecordId.value(), entryTime, lunchTime, returnTime, exitTime).save().then(() => {
      _dialog.close()
      initPointRecordsTable()
    })

    return false
  })

  function editPointRecord (pointRecord) {
    _inputPointRecordId.value(pointRecord._id)
    _inputEntryTime.value(pointRecord.getFormatedEntryTime())
    _inputLunchTime.value(pointRecord.getFormatedLunchTime())
    _inputReturnTime.value(pointRecord.getFormatedReturnTime())
    _inputExitTime.value(pointRecord.getFormatedExitTime())
    _dialog.showModal()
  }

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
      _pointRecordTable.element.innerHTML = ''
      pointRecords.forEach((pointRecord) => {
        let _tr = document.createElement('TR')
        let _td = document.createElement('TD')
        let _buttonEdit = document.createElement('BUTTON')
        let _editIcon = document.createElement('I')
        _td.className = 'mdl-data-table__cell--non-numeric'
        _buttonEdit.className = 'buttonEdit mdl-button mdl-js-button mdl-button--icon mdl-button--colored mdl-button--accent'
        _editIcon.className = 'material-icons'
        _editIcon.innerText = 'edit'
        _buttonEdit.appendChild(_editIcon)

        _td.innerText = pointRecord.getFormatedDate()
        _tr.appendChild(_td.cloneNode(true))

        _td.innerText = pointRecord.getFormatedEntryTime()
        _tr.appendChild(_td.cloneNode(true))

        _td.innerText = pointRecord.getFormatedLunchTime()
        _tr.appendChild(_td.cloneNode(true))

        _td.innerText = pointRecord.getFormatedReturnTime()
        _tr.appendChild(_td.cloneNode(true))

        _td.innerText = pointRecord.getFormatedExitTime()
        _tr.appendChild(_td.cloneNode(true))

        _td.innerText = `${pointRecord.total} horas`
        _tr.appendChild(_td.cloneNode(true))

        _td.innerHTML = _buttonEdit.outerHTML
        _tr.appendChild(_td.cloneNode(true))

        _tr.addEventListener('click', () => {
          editPointRecord(pointRecord)
        })
        _pointRecordTable.element.appendChild(_tr)
      })

      let _totalWorkHours = pointRecords.reduce((previous, current) => {
        return (previous.total || previous) + (current.total || current)
      })

      _totalWorkHoursCell.element.innerHTML = `${_totalWorkHours} horas`
    })
  }
})(window.$, window.dialogPolyfill, window.PointRecord)
