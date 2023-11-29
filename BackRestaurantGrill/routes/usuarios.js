const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
 
//conectar con la base de datos
const {connection} = require("../config.db");

//Utilizando el método Get 
const getUsuarios = (request, response) => {
    connection.query("SELECT * FROM usuarios", 
    (error, results) => {
        if(error)
            throw error;
        response.status(200).json(results);
    });
};
 
//ruta de consumo
app.route("/usuarios")
.get(getUsuarios);

//Agregar Usuario
const postUsuario = (request, response) => {
    const {id_usuarios, id_ciudad, id_rol, id_refiere, nombre_usuario, direccion, estado, contraseña_usuario, correo_usuario, telefono_usuario} = request.body;
    connection.query("INSERT INTO usuarios(id_usuarios, id_ciudad, id_rol, id_refiere, nombre_usuario, direccion, estado, contraseña_usuario, correo_usuario, telefono_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [id_usuarios, id_ciudad, id_rol, id_refiere, nombre_usuario, direccion, estado, contraseña_usuario, correo_usuario, telefono_usuario],
    (error, results) => {
        if (error) throw error;
        response.status(201).json({"Usuario creado correctamente": results.affectedRows});
    });
};
 
//ruta
app.route("/usuarioCrear")
.post(postUsuario);


// Actualizar usuario
const putUsuario = (request, response) => {
    const {id_usuarios, id_ciudad, id_rol, id_refiere, nombre_usuario, direccion, estado, contraseña_usuario, correo_usuario, telefono_usuario} = request.body;
    connection.query("UPDATE usuarios set id_ciudad= ? , id_rol= ? , id_refiere= ? , nombre_usuario= ? , direccion= ? , estado= ? , contraseña_usuario= ? , correo_usuario= ? , telefono_usuario= ?  where id_usuarios=?",
    [id_ciudad, id_rol, id_refiere, nombre_usuario, direccion, estado, contraseña_usuario, correo_usuario, telefono_usuario, id_usuarios],
    (error, results) => {
       if(error)
          throw error;
       response.status(201).json({"Usuario actualizado correctamente": results.affectedRows});
      });
    };
   
    //ruta
    app.route("/usuarioA")
    .put(putUsuario);

    //Eliminar Usuario
const delUsuarios= (request, response) => {
    const id_usuarios = request.params.id_usuarios;
    connection.query("delete from usuarios where id_usuarios = ?",
    [id_usuarios],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Usuario eliminado":results.affectedRows});
    });
};
 
//ruta
app.route("/usuarios/:id_usuarios")
.delete(delUsuarios);

module.exports = app;