const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

    // Conectar a base de datos
    this.DBConnect();

    // Middlewares
    this.middlewares();
    // Rutas
    this.routes();
  }

  async DBConnect() {
    await dbConnection()
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body 
    this.app.use(express.json())

    // Directorio publico
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/users'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`server listening on port: ${this.port}`)
    });
  }
}

module.exports = Server;