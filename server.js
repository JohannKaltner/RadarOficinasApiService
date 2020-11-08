const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
var dbConn = require('./config/db.config');
var cors = require('cors')

//instancia a ENV
require('dotenv').config({
  path: process.env.NODE_ENV === "local" ? ".env.local" : ".env"
})

// Cria servidor
const app = express();

// Instancia porta
const port = process.env.PORTA_EXECUCAO_APLICACAO;
 
// Formata requests do tipo content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Formata requests do tipo content-type - application/json
app.use(bodyParser.json())

app.use(cors())


// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:19006');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

// define a root route
app.get(process.env.URL_BASE_APLICACAO, (req, res) => {
 		res.send("ok");
 
});

//Rotas da Aplicação
const rotasUsuario = require('./src/routes/usuarios.routes')
const rotasOficina = require('./src/routes/oficinas.routes')
// using as middleware
app.use(process.env.URL_API_LOCAL + 'usuarios', rotasUsuario)

app.use(process.env.URL_API_LOCAL + 'oficinas', rotasOficina)


// Recebe os requests
app.listen(port, () => {
  console.log(`Servidor Rodando na porta: ${port}`);
});