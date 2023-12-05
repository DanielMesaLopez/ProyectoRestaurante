import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const Usuarios = () => {
  const [id_usuarios, setIdusuarios] = useState("");
  const [id_ciudad, setIdCiudad] = useState("");
  const [id_rol, setIdRol] = useState("");
  const [id_refiere, setIdRefiere] = useState("");
  const [nombre_usuario, setNombre_usuario] = useState("");
  const [direccion, setDireccion] = useState("");
  const [estado, setEstado] = useState("");
  const [contraseña_usuario, setContraseña_usuario] = useState("");
  const [correo_usuario, setCorreo_usuario] = useState("");
  const [telefono_usuario, setTelefono_usuario] = useState("");

  const [editar, setEditar] = useState(false);

  //constante para get hacer una lista
  const [usuariosList, setUsuarios] = useState([]);

  //metodo post
  const add = () => {
    Axios.post("http://localhost:3300/usuarioCrear", {
      id_usuarios: id_usuarios,
      id_ciudad: id_ciudad,
      id_rol: id_rol,
      id_refiere: id_refiere,
      nombre_usuario: nombre_usuario,
      direccion: direccion,
      estado: estado,
      contraseña_usuario: contraseña_usuario,
      correo_usuario: correo_usuario,
      telefono_usuario: telefono_usuario,

    }).then(() => {
      getUsuarios();
      limpiar();
      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html:
          "<i>El Usuario <strong>" +
          direccion +
          "</strong> fue registrado con exito!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  //metodo get
  const getUsuarios = () => {
    Axios.get("http://localhost:3300/usuarios").then((response) => {
      setUsuarios(response.data);
      // alert("Usuarios en listados");
    });
  };
  getUsuarios();

  //metodo put
  const editarUsuarios = (val) => {
    setEditar(true);
    setIdusuarios(val.id_usuarios);
    setIdCiudad(val.id_ciudad);
    setIdRol(val.id_rol);
    setIdRefiere(val.id_refiere);
    setNombre_usuario(val.nombre_usuario);
    setDireccion(val.direccion);
    setEstado(val.estado);
    setContraseña_usuario(val.contraseña_usuario);
    setTelefono_usuario(val.telefono_usuario);
  };

  const update = () => {
    Axios.put("http://localhost:3300/usuarioA", {
        id_usuarios: id_usuarios,
        id_ciudad: id_ciudad,
        id_rol: id_rol,
        id_refiere: id_refiere,
        nombre_usuario: nombre_usuario,
        direccion: direccion,
        estado: estado,
        contraseña_usuario: contraseña_usuario,
        correo_usuario: correo_usuario,
        telefono_usuario: telefono_usuario,
    }).then(() => {
      getUsuarios();
      limpiar();
      Swal.fire({
        title: "<strong>Actualizacion exitosa!</strong>",
        html:
          "<i>El Usuario <strong>" +
          direccion +
          "</strong> fue actualizado con exito!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  const limpiar = () => {
    setIdusuarios("");
    setIdCiudad("");
    setIdRol("");
    setIdRefiere("");
    setNombre_usuario("");
    setDireccion("");
    setEstado("");
    setContraseña_usuario("");
    setCorreo_usuario("");
    setTelefono_usuario("");
    setEditar(false);
  };

  //metodo eliminar

  const deleteUsuarios = (val) => {
    Swal.fire({
      title: "Confirmar eliminación",
      html:
        "<i>Realmente desea eliminar a <strong>" +
        val.direccion +
        "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(
          `http://localhost:3300/usuarios/${val.id_usuarios}`
        ).then(() => {
          getUsuarios();
          limpiar();
          Swal.fire({
            icon:'success',
            title: val.direccion+' fue eliminado.',
            showConfirmButton: false,
            timer:2000
          });
        }).catch(function(error){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se logró eliminar el producto sube el BACK!!',
                footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
            })
        })       
      }
    });
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTIÓN DE PRODUCTOS</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              ID USUARIOS:
            </span>
            <input
              type="number"
              value={id_usuarios}
              onChange={(event) => {
                setIdusuarios(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Id de usuarios"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              ID CIUDAD:
            </span>
            <input
              type="number"
              value={id_ciudad}
              onChange={(event) => {
                setIdCiudad(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Id de ciudad"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              ID ROL:
            </span>
            <input
              type="number"
              value={id_rol}
              onChange={(event) => {
                setIdRol(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Id de Rol"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              ID REFIERE:
            </span>
            <input
              type="number"
              value={id_refiere}
              onChange={(event) => {
                setIdRefiere(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Id de refiere"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              nombre_usuario:
            </span>
            <input
              type="text"
              value={nombre_usuario}
              onChange={(event) => {
                setNombre_usuario(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese el nombre de usuario"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Direccion:
            </span>
            <input
              type="text"
              value={direccion}
              onChange={(event) => {
                setDireccion(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese la direccion"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Estado:
            </span>
            <input
              type="number"
              value={estado}
              onChange={(event) => {
                setEstado(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese el estado"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              contraseña_usuario:
            </span>
            <input
              type="number"
              value={contraseña_usuario}
              onChange={(event) => {
                setContraseña_usuario(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese la contraseña"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              correo_usuario:
            </span>
            <input
              type="text"
              value={correo_usuario}
              onChange={(event) => {
                setCorreo_usuario(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese el correo del usuario"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              telefono_usuario:
            </span>
            <input
              type="number"
              value={telefono_usuario}
              onChange={(event) => {
                setTelefono_usuario(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese el Telefono de Usuario"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
         </div>
          <div className="card-footer text-muted">
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={update}>
                Actualizar
              </button>{" "}
              <button className="btn btn-info m-2" onClick={limpiar}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={add}>
              Registrar
            </button>
          )}
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">id_usuarios</th>
            <th scope="col">id_ciudad</th>
            <th scope="col">id_rol</th>
            <th scope="col">id_refiere</th>
            <th scope="col">nombre_usuario</th>
            <th scope="col">direccion</th>
            <th scope="col">estado</th>
            <th scope="col">contraseña_usuario</th>
            <th scope="col">correo_usuario</th>
            <th scope="col">telefono_usuario</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosList.map((val, key) => {
            return (
              <tr key={val.id_usuarios}>
                <th>{val.id_usuarios}</th>
                <td>{val.id_ciudad}</td>
                <td>{val.id_rol}</td>
                <td>{val.id_refiere}</td>
                <td>{val.nombre_usuario}</td>
                <td>{val.direccion}</td>
                <td>{val.estado}</td>
                <td>{val.contraseña_usuario}</td>
                <td>{val.correo_usuario}</td>
                <td>{val.telefono_usuario}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        editarUsuarios(val);
                      }}
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteUsuarios(val);
                      }}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;
