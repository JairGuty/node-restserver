const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/auth'
        }
      
        // conectar a la base de datos
        this.conectarDB();

        // Middlewares (funciones que le van añadir funcionalidades a mi web server)
        this.middlewares();
        // Rutas de mi aplicacion
        this.routes();

    }

    async conectarDB() {
        await dbConnection(); 
    }

    middlewares() {
        
        // CORS
        this.app.use( cors() );

        // Lectura y paseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public'));
    }

    routes() {
        
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.buscar, require('../routes/buscar'));       
        this.app.use( this.paths.categorias, require('../routes/categorias'));
        this.app.use( this.paths.productos, require('../routes/productos'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}

module.exports = Server;