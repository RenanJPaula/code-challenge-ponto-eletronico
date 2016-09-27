;(function (window) {
  'use strict'

  const API_PATH = 'http://localhost:3000'
  const API = {}

  API.user = {
    authenticate: API_PATH + '/user/authenticate'
  }

  window.API = API
})(window)
