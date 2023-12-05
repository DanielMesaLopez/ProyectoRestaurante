import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const Rol = () => {
  const [id_rol, setIdrol] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombre, setNombre] = useState("");
  

  const [editar, setEditar] = useState(false);

  //constante para get hacer una lista
  const [rolList, setRol] = useState([]);

  //metodo post
  const add = () => {
    Axios.post("http://localhost:3300/rolCrear", {
      id_rol: id_rol,
      descripcion: descripcion,
      nombre: nombre,
        }).then(() => {
      getRol();
      limpiar();
      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html:
          "<i>El rol <strong>" +
          descripcion +
          "</strong> fue registrado con exito!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  //metodo get
  const getRol = () => {
    Axios.get("http://localhost:3300/rol").then((response) => {
      setRol(response.data);
      // alert("Rol en listados");
    });
  };
  getRol();

  //metodo put
  const editarRol = (val) => {
    setEditar(true);
    setIdrol(val.id_rol);
    setDescripcion(val.descripcion);
    setNombre(val.nombre);
  };

  const update = () => {
    Axios.put("http://localhost:3300/rolA", {
      id_rol: id_rol,
      descripcion: descripcion,
      nombre: nombre,
        }).then(() => {
      getRol();
      limpiar();
      Swal.fire({
        title: "<strong>Actualizacion exitosa!</strong>",
        html:
          "<i>El rol <strong>" +
          descripcion +
          "</strong> fue actualizado con exito!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  const limpiar = () => {
    setIdrol("");
    setDescripcion("");
    setNombre("");
    setEditar(false);
  };

  //metodo eliminar

  const deleteRol = (val) => {
    Swal.fire({
      title: "Confirmar eliminación",
      html:
        "<i>Realmente desea eliminar a <strong>" +
        val.descripcion +
        "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(
          `http://localhost:3300/rol/${val.id_productos}`
        ).then(() => {
          getRol();
          limpiar();
          Swal.fire({
            icon:'success',
            title: val.descripcion+' fue eliminado.',
            showConfirmButton: false,
            timer:2000
          });
        }).catch(function(error){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se logró eliminar el Rol sube el BACK!!',
                footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
            })
        })       
      }
    });
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTIÓN DE ROLES</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              ID ROL:
            </span>
            <input
              type="number"
              value={id_rol}
              onChange={(event) => {
                setIdrol(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Id de Roles"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Descripcion:
            </span>
            <input
              type="number"
              value={descripcion}
              onChange={(event) => {
                setDescripcion(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese descripcion"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese el Nombre"
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
            <th scope="col">id_rol</th>
            <th scope="col">descripcion</th>
            <th scope="col">nombre</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rolList.map((val, key) => {
            return (
              <tr key={val.id_rol}>
                <th>{val.id_rol}</th>
                <td>{val.descripcion}</td>
                <td>{val.nombre}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        editarRol(val);
                      }}
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteRol(val);
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

export default Rol;
