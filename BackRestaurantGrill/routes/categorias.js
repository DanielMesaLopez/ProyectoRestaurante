const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
 
//conectar con la base de datos
const {connection} = require("../config.db");

//Utilizando el método Get 
const getCategorias = (request, response) => {
    connection.query("SELECT * FROM categorias", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
 
//ruta de consumo
app.route("/categorias")
.get(getCategorias);

//Agregar Categorias
const postCategorias = (request, response) => {
    const {id_categoria, nombre_categoria, descripcion, estado} = request.body;
    connection.query("INSERT INTO categorias(id_categoria, nombre_categoria, descripcion, estado) VALUES (?, ?, ?, ?)",
    [id_categoria, nombre_categoria, descripcion, estado],
    (error, results) => {
        if (error) throw error;
        response.status(201).json({"Categoria creada correctamente": results.affectedRows});
    });
};
 
//ruta
app.route("/categoriaCrear")
.post(postCategorias);


// Actualizar Categoria
const putCategorias = (request, response) => {
    const {id_categoria, nombre_categoria, descripcion, estado} = request.body;
    connection.query("UPDATE categorias set nombre_categoria= ?, descripcion= ?, estado= ?  where id_categoria=?",
    [nombre_categoria, descripcion, estado, id_categoria],
    (error, results) => {
       if(error)
          throw error;
       response.status(201).json({"Categoria actualizada correctamente": results.affectedRows});
      });
    };
   
    //ruta
    app.route("/categoriaA")
    .put(putCategorias);

    //Eliminar Categoria
const delCategorias= (request, response) => {
    const id_categoria = request.params.id_categoria;
    connection.query("delete from categorias where id_categoria = ?",
    [id_categoria],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Categoria eliminada":results.affectedRows});
    });
};
 
//ruta
app.route("/categoria/:id_categoria")
.delete(delCategorias);

module.exports = app;