;(function ($, API) {
  'use strict'

  const _formLogin = $('#formLogin')
  const _inputName = $('#inputName')
  const _inputPassword = $('#inputPassword')
  const _invalidUserMessage = $('#invalidUserMessage')

  _formLogin.on('submit', (event) => {
    event.preventDefault()

    let _user = { name: _inputName.value(), password: _inputPassword.value() }

    $.post(API.user.authenticate, _user).then((value) => {
      console.log(value)
    }).catch(() => {
      _invalidUserMessage.show()
    })

    return false
  })
})(window.$, window.API)
