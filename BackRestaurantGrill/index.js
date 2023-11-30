const express = require("express");
const app = express();
const cors = require("cors");
 
//Analizar el cuerpo de la solicitud POST
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
 
//Archivo de rutas definidas
app.use(require('./routes/producto'));
app.use(require('./routes/ciudad'));
app.use(require('./routes/carrito'));
app.use(require('./routes/categorias'))
app.use(require('./routes/oferta'))
app.use(require('./routes/Rol'))
app.use(require('./routes/usuarios'))
 
app.listen(process.env.PORT||3300,() => {
    console.log("Servidor ejecutandose en el puerto 3300");
});
 
module.exports = app;