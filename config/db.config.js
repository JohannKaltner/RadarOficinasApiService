'user strict';

const mysql = require('mysql');

//local mysql db connection
const dbConn = mysql.createConnection({
  host     : process.env.URL_BANCO_DE_DADOS,
  user     : 'root',
  password : '',
  database : 'radaroficinasdb'
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Conexão com o banco de dados realizada com êxito!");
});
module.exports = dbConn;