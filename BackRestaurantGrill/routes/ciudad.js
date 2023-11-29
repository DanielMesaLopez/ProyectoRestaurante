const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
 
//conectar con la base de datos
const {connection} = require("../config.db");

//Utilizando el método Get 
const getCiudad = (request, response) => {
    connection.query("SELECT * FROM ciudad", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
 
//ruta de consumo
app.route("/Ciudad")
.get(getCiudad);

//Agregar Ciudad
const postCiudad = (request, response) => {
    const {id_ciudad, nombre_ciudad, cobertura} = request.body;
    connection.query("INSERT INTO ciudad(id_ciudad, nombre_ciudad, cobertura) VALUES (?, ?, ?)",
    [id_ciudad, nombre_ciudad, cobertura],
    (error, results) => {
        if (error) throw error;
        response.status(201).json({"Ciudad creado correctamente": results.affectedRows});
    });
};
 
//ruta
app.route("/ciudadCrear")
.post(postCiudad);


// Actualizar Ciudad
const putCiudad = (request, response) => {
    const {id_ciudad, nombre_ciudad, cobertura} = request.body;
    connection.query("UPDATE ciudad set nombre_ciudad= ?, cobertura= ?  where id_ciudad=?",
    [ nombre_ciudad, cobertura, id_ciudad],
    (error, results) => {
       if(error)
          throw error;
       response.status(201).json({"Ciudad actualizado correctamente": results.affectedRows});
      });
    };
   
    //ruta
    app.route("/CiudadA")
    .put(putCiudad);

    //Eliminar Ciudad
const delCiudad= (request, response) => {
    const id_ciudad = request.params.id_ciudad;
    connection.query("delete from ciudad where id_ciudad = ?",
    [id_ciudad],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Ciudad eliminada":results.affectedRows});
    });
};
 
//ruta
app.route("/ciudad/:id_ciudad")
.delete(delCiudad);

module.exports = app;