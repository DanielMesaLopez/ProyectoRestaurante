const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
 
//conectar con la base de datos
const {connection} = require("../config.db");

//Utilizando el método Get 
const getCarrito = (request, response) => {
    connection.query("SELECT * FROM carrito", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
 
//ruta de consumo
app.route("/carrito")
.get(getCarrito);


//Agregar Carrito
const postCarrito = (request, response) => {
    const {id_carrito, id_usuarios, fecha_compra, fecha_pago, estado} = request.body;
    connection.query("INSERT INTO carrito(id_carrito, id_usuarios, fecha_compra, fecha_pago, estado) VALUES (?, ?, ?, ?, ?)",
    [id_carrito, id_usuarios, fecha_compra, fecha_pago, estado],
    (error, results) => {
        if (error) throw error;
        response.status(201).json({"Producto creado correctamente": results.affectedRows});
    });
};
 
//ruta
app.route("/carritoCrear")
.post(postCarrito);


// Actualizar producto
const putCarrito = (request, response) => {
    const {id_carrito, id_usuarios, fecha_compra, fecha_pago, estado} = request.body;
    connection.query("UPDATE carrito set id_usuarios=?, fecha_compra=?, fecha_pago=?, estado= ?  where id_carrito=?",
    [id_usuarios, fecha_compra, fecha_pago, estado, id_carrito],
    (error, results) => {
       if(error)
          throw error;
       response.status(201).json({"Carrito actualizado correctamente": results.affectedRows});
      });
    };
   
    //ruta
    app.route("/carritoA")
    .put(putCarrito);

    //Eliminar Carrito
const delCarrito= (request, response) => {
    const id_carrito = request.params.id_carrito;
    connection.query("delete from carrito where id_carrito = ?",
    [id_carrito],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Carrito eliminado":results.affectedRows});
    });
};
 
//ruta
app.route("/carrito/:id_carrito")
.delete(delCarrito);

module.exports = app;