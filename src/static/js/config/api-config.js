;(function (window) {
  'use strict'

  const API_PATH = 'http://localhost:3000'
  const API = {}

  API.user = {
    authenticate: API_PATH + '/user/authenticate'
  }

  API.pointrecord = API_PATH + '/pointrecord'

  window.API = API
})(window)
