const express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        // Middlewares
        this.middlewares();

        this.routes();       
        
        // Configuracion de sockets
        this.sockets();
        
    }

    routes() {
        
        // this.app.use(this.authPath, require('../routes/auth'));
        // this.app.use(this.usersPath, require('../routes/user'));

    }

    sockets() {
        // ON servidor cada vez que se conecta un cliente
        this.io.on('connection', socketController);
    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Lectura y parsing del body
        this.app.use(express.json());

        // Contenidos estaticos
        this.app.use(express.static('public'));
    }



    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor de sockets escuchando en ${this.port}`);
        });
    }
}

module.exports = Server;