const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
var cors = require("cors");

//Morgan para Logs

//instancia a ENV
require("dotenv").config({
  path: process.env.NODE_ENV === "local" ? ".env.local" : ".env",
});

const app = express();

const port = process.env.PORTA_EXECUCAO_APLICACAO;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(process.env.URL_API_LOCAL + "usuarios", rotasUsuario);
app.use(process.env.URL_API_LOCAL + "oficinas", rotasOficina);

app.use(function (req, res, next) {
  //   // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:19006");

  //   // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  //   // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  //   // Set to true if you need the website to include cookies in the requests sent
  //   // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

// define a root route
app.get(process.env.URL_BASE_APLICACAO, (req, res) => {
  res.send("ok");
});

//Rotas da Aplicação
const rotasUsuario = require("./src/routes/usuarios.routes");
const rotasOficina = require("./src/routes/oficinas.routes");
// using as middleware

// Recebe os requests
app.listen(port, () => {
  console.log(`Servidor Rodando na porta: ${port}`);
});

//Error Message
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    Detalhes: {
      mensagem: error.message,
    },
  });
});
