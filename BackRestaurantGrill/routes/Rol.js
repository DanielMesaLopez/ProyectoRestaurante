const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
 
//conectar con la base de datos
const {connection} = require("../config.db");

//Utilizando el método Get 
const getRol = (request, response) => {
    connection.query("SELECT * FROM rol", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
 
//ruta de consumo
app.route("/Rol")
.get(getRol);

//Agregar Rol
const postRol = (request, response) => {
    const {id_rol, descripcion, nombre} = request.body;
    connection.query("INSERT INTO rol(id_rol, descripcion, nombre) VALUES (?, ?, ?)",
    [id_rol, descripcion, nombre],
    (error, results) => {
        if (error) throw error;
        response.status(201).json({"Rol creado correctamente": results.affectedRows});
    });
};
 
//ruta
app.route("/rolCreado")
.post(postRol);


// Actualizar Rol
const putRol = (request, response) => {
    const {id_rol, descripcion, nombre} = request.body;
    connection.query("UPDATE rol set descripcion= ?, nombre= ?  where id_rol=?",
    [descripcion, nombre, id_rol],
    (error, results) => {
       if(error)
          throw error;
       response.status(201).json({"Rol actualizado correctamente": results.affectedRows});
      });
    };
   
    //ruta
    app.route("/rolA")
    .put(putRol);

    //Eliminar Rol
const delRol= (request, response) => {
    const id_rol = request.params.id_rol;
    connection.query("delete from rol where id_rol = ?",
    [id_rol],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Rol eliminado":results.affectedRows});
    });
};
 
//ruta
app.route("/rol/:id_rol")
.delete(delRol);

module.exports = app;