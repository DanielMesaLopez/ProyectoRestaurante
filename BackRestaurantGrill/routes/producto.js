const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
 
//conectar con la base de datos
const {connection} = require("../config.db");

//Utilizando el método Get 
const getProductos = (request, response) => {
    connection.query("SELECT * FROM productos where estado=1", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
 
//ruta de consumo
app.route("/productos")
.get(getProductos);

//Agregar producto
const postProductos = (request, response) => {
    const {id_productos, id_categoria, descripcion_producto, image, precio, cantidad, estado} = request.body;
    connection.query("INSERT INTO productos(id_productos, id_categoria, descripcion_producto, image, precio, cantidad, estado) VALUES (?, ?, ?, ?, ?, ?,?)",
    [id_productos, id_categoria, descripcion_producto, image, precio, cantidad, estado],
    (error, results) => {
        if (error) throw error;
        response.status(201).json({"Producto creado correctamente": results.affectedRows});
    });
};
 
//ruta
app.route("/productoCrear")
.post(postProductos);


// Actualizar producto
const putProductos = (request, response) => {
    const {id_productos, id_categoria, descripcion_producto, image, precio, cantidad, estado} = request.body;
    connection.query("UPDATE productos set id_categoria=?, descripcion_producto=?, image=?, precio=?, cantidad=?, estado= ?  where id_productos=?",
    [id_categoria, descripcion_producto, image, precio, cantidad, estado, id_productos],
    (error, results) => {
       if(error)
          throw error;
       response.status(201).json({"Producto actualizado correctamente": results.affectedRows});
      });
    };
   
    //ruta
    app.route("/productoA")
    .put(putProductos);

    //Eliminar Producto
const delProductos= (request, response) => {
    const id_productos = request.params.id_productos;
    connection.query("delete from productos where id_productos = ?",
    [id_productos],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Producto eliminado":results.affectedRows});
    });
};
 
//ruta
app.route("/productos/:id_productos")
.delete(delProductos);

module.exports = app;