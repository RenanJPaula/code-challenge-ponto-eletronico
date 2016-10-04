# Code Challenge - Ponto Eletronico

Projeto construído de acordo com as especificações do "Code Challenge". 
As seções a seguir sumarizam as tecnologias utilizadas e decisões tomadas para a implementação.

## Back-End
- [NodeJS](https://nodejs.org/en/)

## Front-End
- [materializecss](http://materializecss.com/)
- [Google Charts](https://developers.google.com/chart/)
- JavaScript com ES6 

Para entrar na brincadeira criei um [utilitário](./src/static/js/libs/my-util-jquery-style.js) para manipulação de DOM parecido com o JQuery.

# Execução do Projeto

- Instalar o [NodeJS](https://nodejs.org/en/) e [NPM](https://www.npmjs.com/);
- Clonar o repositório;
- Entrar via terminal na pasta **src**;
- Instalar as dependências via **npm install**;
```shell
  npm install
```
- Executar o projeto via **npm start**;
```shell
  npm start
```

O servidor HTTP está previamente configurado para utilizar a porta 3000. Caso seja necessário alterar esta porta, basta alterar o arquivo: **src/env.js** e **src/static/js/config/api-config.js**;

Credenciais para realização do login:

Usuário: teste

senha: teste

# Implementações futuras
- Adição do MongoDB;
- Adição dos gráficos mensais e anuais;
- Dinamização da entrada de dados para permitir a entradas diferentes do dia atual;
- Criação de build e otimização via Gulp;
 
# Contato

renanjohannsen@gmail.com;

