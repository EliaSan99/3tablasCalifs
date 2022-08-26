const express = require('express');
const ejs = require('ejs');
const myConnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');

const servidor = express();

const datosBD = {
                    host: "localhost",
                    user: "root",
                    password: "",
                    port: "3306",
                    database: "trestablas"
                };

//Settings
servidor.set("puerto",8000);
servidor.set("view engine", "ejs");
servidor.set("views", path.join(__dirname, "./src/vistas"));
servidor.engine("html", ejs.renderFile);

//Middleware
servidor.use(express.urlencoded({extended:false}));
servidor.use(express.json());

servidor.use(myConnection(mysql,datosBD,"single"));  // Se escribe antes de las rutas.

servidor.use(session({
                        secret: "Nodejavas$Secretkey",
                        resave:  false,
                        saveUninitialized: false
                     }));


//Rutas
servidor.use("/",require("./src/rutas/index.js"));
servidor.use("/alumnos",require("./src/rutas/rutasAlumnos/alumnos.js")); 
servidor.use("/actividades",require("./src/rutas/rutasActividades/actividades.js")); 
servidor.use("/Criterios",require("./src/rutas/rutasCriterios/criterios.js"));  
servidor.use("/session",require("./src/rutas/rutasSesion/session.js"));

/*Archivos estaticos de css e imagenes*/
servidor.use(express.static("./src/recursos"));
/*Archivos estaticos del selector de fechas (flatpickr)*/
servidor.use(express.static("./node_modules/flatpickr"));

servidor.listen(servidor.get("puerto"), function () {
    console.log("Servidor express escuchando en el puerto: ", servidor.get("puerto"));
});