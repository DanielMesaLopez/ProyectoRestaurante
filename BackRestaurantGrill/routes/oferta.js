const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
 
//conectar con la base de datos
const {connection} = require("../config.db");

//Utilizando el método Get 
const getOferta = (request, response) => {
    connection.query("SELECT * FROM oferta", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
 
//ruta de consumo
app.route("/oferta")
.get(getOferta);

//Agregar oferta
const postOferta = (request, response) => {
    const {id_oferta, id_productos, nombre_oferta, descripcion, estado, fecha_inicio, fecha_fin, descuento, imagen} = request.body;
    connection.query("INSERT INTO oferta(id_oferta, id_productos, nombre_oferta, descripcion, estado, fecha_inicio, fecha_fin, descuento, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [id_oferta, id_productos, nombre_oferta, descripcion, estado, fecha_inicio, fecha_fin, descuento, imagen],
    (error, results) => {
        if (error) throw error;
        response.status(201).json({"Oferta creada correctamente": results.affectedRows});
    });
};
 
//ruta
app.route("/OfertaCreada")
.post(postOferta);


// Actualizar oferta
const putOferta = (request, response) => {
    const {id_oferta, id_productos, nombre_oferta, descripcion, estado, fecha_inicio, fecha_fin, descuento, imagen} = request.body;
    connection.query("UPDATE oferta set id_productos= ?, nombre_oferta= ?, descripcion= ?, estado= ?, fecha_inicio= ?, fecha_fin= ?, descuento= ?, imagen= ?  where id_oferta=?",
    [id_productos, nombre_oferta, descripcion, estado, fecha_inicio, fecha_fin, descuento, imagen, id_oferta],
    (error, results) => {
       if(error)
          throw error;
       response.status(201).json({"Oferta actualizada correctamente": results.affectedRows});
      });
    };
   
    //ruta
    app.route("/ofertaA")
    .put(putOferta);

    //Eliminar Oferta
const delOferta= (request, response) => {
    const id_oferta = request.params.id_oferta;
    connection.query("delete from oferta where id_oferta = ?",
    [id_oferta],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Oferta eliminado":results.affectedRows});
    });
};
 
//ruta
app.route("/oferta/:id_oferta")
.delete(delOferta);

module.exports = app;