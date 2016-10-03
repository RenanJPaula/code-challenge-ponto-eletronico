;(function (google, PointRecord) {
  'use strict'

  PointRecord.getPointRecords().then((pointRecords) => {
    google.charts.load('current', {packages: ['corechart', 'bar']})
    google.charts.setOnLoadCallback(drawChart)

    function drawChart () {
      const chart = new google.visualization.ColumnChart(document.getElementById('chart_div'))
      const data = new google.visualization.DataTable()

      data.addColumn('string', 'Data')
      data.addColumn('number', 'Horas trabalhadas')

      const dataValues = pointRecords.map((pointRecord) => {
        return [pointRecord.getFormatedDate(), pointRecord.total]
      })

      data.addRows(dataValues)
      chart.draw(data, {
        'title': 'Horas trabalhadas',
        'height': 400
      })
    }
  })
})(window.google, window.PointRecord)
