const express = require('express');
const cors = require('cors');

const { socketController } = require('./sockets/controller');

class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();
    this.server = require('http').createServer(this.app);
    this.io = require('socket.io')(this.server);

    // paths globales
    this.path = {
      auth: '/api/auth',
    };

    // middlewares
    this.middlewares();

    // rutas
    this.routes();

    // sockets
    this.sockets();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static('public'));
  }

  routes() {
    // this.app.use(this.path.auth, require('./../routes/auth'));
  }

  sockets() {
    this.io.on('connection', socketController);
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log('Corriendo en el puerto:', this.port);
    });
  }
}

module.exports = Server;
