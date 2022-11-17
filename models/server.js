const express = require('express');
const cors = require('cors');
const { conexionDB } = require('../database/config.db');

//Clase Server
class Server {

    //constructor de la clase Server
    constructor(){
        //se llaman las funciones de express y se guardan en la variable app
        this.app = express();
        //se llama la variable de entorno puerto guardada en el archivo .env
        this.port = process.env.PORT;

        this.routesPath = '/api/users';
        this.authPath = '/api/auth';

        //Realiza conexion a la base de datos
        this.conectarDB();

        //Llamadas a los Middlewares
        this.middlewares();

        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //lectura y parseo de body
        this.app.use(express.json());

        //llama al directorio public para usar el contenido de los archivos a renderzar de forma estatico
        this.app.use(express.static('public'))
    }

    //rutas del servidor, en este ejeplo es http://localhost:8081/api
    routes(){
        this.app.use( this.authPath , require('../routes/auth.routes'));
        this.app.use( this.routesPath , require('../routes/user.routes'));
    }

    async conectarDB(){
        await conexionDB();
    }

    //funcion de escucha al puerto para levantar el servidor 
    listen(){
        this.app.listen(this.port , () => {
            console.log(`Servidor creado en http://localhost:${this.port}`);
        });
    }

}

module.exports = Server;