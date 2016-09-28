;(function (document, window, console) {
  'use strict'

  class EnhancedElement {
    constructor (element) {
      this.element = element
    }

    on (event, cb) {
      this.element.addEventListener(event, cb)
      return this
    }

    value (value) {
      if (value) {
        this.element.value = value
        return this
      } else {
        return this.element.value
      }
    }

    addClass (className) {
      if (this.element.classList) {
        this.element.classList.add(className)
      } else {
        this.element.className += ' ' + className
      }
      return this
    }

    removeClass (className) {
      if (this.element.classList) {
        this.element.classList.remove(className)
      } else {
        let _classSelection = new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi')
        this.element.className = this.element.className.replace(_classSelection, ' ')
      }
    }

    show () {
      this.element.style.display = ''
      return this
    }

    hide () {
      this.element.style.display = 'none'
      return this
    }
  }

  function myJqueryImpl (selector) {
    return new EnhancedElement(document.querySelector(selector))
  }

  myJqueryImpl.location = (path) => {
    window.location = path
  }

  myJqueryImpl.get = (path) => {
    return myJqueryImpl.ajax('GET', path)
  }

  myJqueryImpl.post = (path, data) => {
    return myJqueryImpl.ajax('POST', path, data)
  }

  myJqueryImpl.ajax = (method, path, data) => {
    return new Promise((resolve, reject) => {
      let _request = new window.XMLHttpRequest()
      _request.open(method, path, true)

      _request.onload = () => {
        let _data = {status: _request.status}
        if (_request.responseText) _data.data = window.JSON.parse(_request.responseText)
        let _success = _request.status >= 200 && _request.status < 400
        return _success ? resolve(_data) : reject(_data)
      }

      _request.onerror = () => {
        console.error(`Error in request ${method} ${path}`)
        return reject()
      }

      if (data) {
        _request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8')
        _request.send(window.JSON.stringify(data))
      } else {
        _request.send()
      }
    })
  }

  window.$ = myJqueryImpl
})(document, window, console)
