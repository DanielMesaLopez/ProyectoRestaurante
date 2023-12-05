import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const  Categorias = () => {
  const [id_categoria, setIdcategoria] = useState("");
  const [nombre_categoria, setNombre_categoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("");

  const [editar, setEditar] = useState(false);

  //constante para get hacer una lista
  const [categoriasList, setCategorias] = useState([]);

  //metodo post
  const add = () => {
    Axios.post("http://localhost:3300/categoriaCrear", {
      id_categoria: id_categoria,
      nombre_categoria: nombre_categoria,
      descripcion: descripcion,
      estado: estado,
    }).then(() => {
      getCategorias();
      limpiar();
      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html:
          "<i>La categoria <strong>" +
          descripcion +
          "</strong> fue registrado con exito!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  //metodo get
  const getCategorias = () => {
    Axios.get("http://localhost:3300/categorias").then((response) => {
      setCategorias(response.data);
      // alert("Categorias en listadas");
    });
  };
  getCategorias();

  //metodo put
  const editarCategorias = (val) => {
    setEditar(true);
    setIdcategoria(val.id_categoria);
    setNombre_categoria(val.nombre_categoria);
    setDescripcion(val.descripcion);
    setEstado(val.estado);
  };

  const update = () => {
    Axios.put("http://localhost:3300/categoriaA", {
      id_categoria: id_categoria,
      nombre_categoria: nombre_categoria,
      descripcion: descripcion,
      estado: estado,
    }).then(() => {
      getCategorias();
      limpiar();
      Swal.fire({
        title: "<strong>Actualizacion exitosa!</strong>",
        html:
          "<i>La categoria <strong>" +
          descripcion +
          "</strong> fue actualizado con exito!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  const limpiar = () => {
    setIdcategoria("");
    setNombre_categoria("");
    setDescripcion("");
    setEstado("");
    setEditar(false);
  };

  //metodo eliminar

  const deleteCategorias = (val) => {
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
          `http://localhost:3300/categoria/${val.id_productos}`
        ).then(() => {
          getCategorias();
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
        <div className="card-header">GESTIÓN DE CATEGORIAS</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              ID CATEGORIA:
            </span>
            <input
              type="number"
              value={id_categoria}
              onChange={(event) => {
                setIdcategoria(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Id de categoria"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              ID NOMBRE_CATEGORIA:
            </span>
            <input
              type="number"
              value={nombre_categoria}
              onChange={(event) => {
                setNombre_categoria(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Id nombre de categoria"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Descripcion:
            </span>
            <input
              type="text"
              value={descripcion}
              onChange={(event) => {
                setDescripcion(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese la descripción"
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
            <th scope="col">id_categoria</th>
            <th scope="col">nombre_categoria</th>
            <th scope="col">descripcion</th>
            <th scope="col">estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categoriasList.map((val, key) => {
            return (
              <tr key={val.id_categoria}>
                <th>{val.id_categoria}</th>
                <td>{val.nombre_categoria_categoria}</td>
                <td>{val.descripcion}</td>
                <td>{val.estado}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        editarCategorias(val);
                      }}
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteCategorias(val);
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

export default Categorias;
