;(function ($, API) {
  'use strict'

  const _formLogin = $('#formLogin')
  const _inputName = $('#inputName')
  const _inputPassword = $('#inputPassword')
  const _snackbarContainer = $('#toast')

  _formLogin.on('submit', (event) => {
    event.preventDefault()

    let _user = { name: _inputName.value(), password: _inputPassword.value() }

    $.post(API.user.authenticate, _user).then((value) => {
      $.location('/lancamentos.html')
    }).catch(() => {
      let _snackBar = _snackbarContainer.element.MaterialSnackbar
      _snackBar.showSnackbar({message: 'Usuário ou senha inválido!'})
    })

    return false
  })
})(window.$, window.API)
