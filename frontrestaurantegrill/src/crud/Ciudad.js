import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const Ciudad = () => {
  const [id_ciudad, setIdCiudad] = useState("");
  const [nombre_ciudad, setNombre_ciudad] = useState("");
  const [cobertura, setCobertura] = useState("");

  const [editar, setEditar] = useState(false);

  //constante para get hacer una lista
  const [ciudadList, setCiudad] = useState([]);

  //metodo post
  const add = () => {
    Axios.post("http://localhost:3300/ciudadCrear", {
      id_ciudad: id_ciudad,
      nombre_ciudad: nombre_ciudad,
      cobertura: cobertura,
    }).then(() => {
      getCiudad();
      limpiar();
      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html:
          "<i>La Ciudad <strong>" +
          cobertura +
          "</strong> fue registrado con exito!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  //metodo get
  const getCiudad = () => {
    Axios.get("http://localhost:3300/ciudad").then((response) => {
      setCiudad(response.data);
      // alert("Ciudad en listados");
    });
  };
  getCiudad();

  //metodo put
  const editarCiudad = (val) => {
    setEditar(true);
    setIdCiudad(val.id_ciudad);
    setNombre_ciudad(val.nombre_ciudad);
    setCobertura(val.cobertura);
  };

  const update = () => {
    Axios.put("http://localhost:3300/ciudadA", {
      id_ciudad: id_ciudad,
      nombre_ciudad: nombre_ciudad,
      cobertura: cobertura,
    }).then(() => {
      getCiudad();
      limpiar();
      Swal.fire({
        title: "<strong>Actualizacion exitosa!</strong>",
        html:
          "<i>La Ciudad <strong>" +
          cobertura +
          "</strong> fue actualizado con exito!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  const limpiar = () => {
    setIdCiudad("");
    setNombre_ciudad("");
    setCobertura("");
    setEditar(false);
  };

  //metodo eliminar

  const deleteCiudad = (val) => {
    Swal.fire({
      title: "Confirmar eliminación",
      html:
        "<i>Realmente desea eliminar a <strong>" +
        val.cobertura +
        "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(
          `http://localhost:3300/ciudad/${val.id_productos}`
        ).then(() => {
          getCiudad();
          limpiar();
          Swal.fire({
            icon:'success',
            title: val.cobertura+' fue eliminado.',
            showConfirmButton: false,
            timer:2000
          });
        }).catch(function(error){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se logró eliminar la ciudad sube el BACK!!',
                footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
            })
        })       
      }
    });
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTIÓN DE CIUDAD</div>
        <div className="card-body">
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
              NOMBRE_CIUDAD:
            </span>
            <input
              type="number"
              value={nombre_ciudad}
              onChange={(event) => {
                setNombre_ciudad(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Id de categoria"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cobertura:
            </span>
            <input
              type="text"
              value={cobertura}
              onChange={(event) => {
                setCobertura(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese la cobertura"
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
            <th scope="col">id_ciudad</th>
            <th scope="col">nombre_ciudad</th>
            <th scope="col">cobertura</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ciudadList.map((val, key) => {
            return (
              <tr key={val.id_ciudad}>
                <th>{val.id_ciudad}</th>
                <td>{val.nombre_ciudad}</td>
                <td>{val.cobertura}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        editarCiudad(val);
                      }}
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteCiudad(val);
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

export default Ciudad;
