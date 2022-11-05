const express = require('express');
const cors = require('cors');

//Clase Server
class Server {

    //constructor de la clase Server
    constructor(){
        //se llaman las funciones de express y se guardan en la variable app
        this.app = express();
        //se llama la variable de entorno puerto guardada en el archivo .env
        this.port = process.env.PORT;

        //Llamadas a los Middlewares
        this.middlewares();

        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //llama al directorio public para usar el contenido de los archivos a renderzar de forma estatico
        this.app.use(express.static('public'))
    }

    //rutas del servidor, en este ejeplo es http://localhost:8081/api
    routes(){
        this.app.get('/api', (req, res) => {
            res.json({
                msg: 'get API'
            });
        });

        this.app.put('/api', (req, res) => {
            res.status(500).json({
                msg: 'put API'
            });
        });

        this.app.post('/api', (req, res) => {
            res.status(201).json({
                msg: 'post API'
            });
        });

        this.app.delete('/api', (req, res) => {
            res.json({
                msg: 'delete API'
            });
        });

        this.app.patch('/api', (req, res) => {
            res.json({
                msg: 'patch API'
            });
        });
    }

    //funcion de escucha al puerto para levantar el servidor 
    listen(){
        this.app.listen(this.port , () => {
            console.log(`Servidor creado en http://localhost:${this.port}`);
        });
    }

}

module.exports = Server;