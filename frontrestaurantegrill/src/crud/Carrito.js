import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const Productos = () => {
  const [id_carrito, setIdCarrito] = useState("");
  const [id_usuarios, setIdUsuarios] = useState("");
  const [fecha_compra, setFecha_compra] = useState("");
  const [fecha_pago, setFecha_pago] = useState("");
  const [estado, setEstado] = useState("");

  const [editar, setEditar] = useState(false);

  //constante para get hacer una lista
  const [carritoList, setCarrito] = useState([]);

  //metodo post
  const add = () => {
    Axios.post("http://localhost:3300/carritoCrear", {
      id_carrito: id_carrito,
      id_usuarios: id_usuarios,
      fecha_compra: fecha_compra,
      fecha_pago: fecha_pago,
      estado: estado,
    }).then(() => {
      getCarrito();
      limpiar();
      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html:
          "<i>El carrito <strong>" +
          fecha_compra +
          "</strong> fue registrado con exito!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  //metodo get
  const getCarrito = () => {
    Axios.get("http://localhost:3300/carrito").then((response) => {
      setCarrito(response.data);
      // alert("Productos en listados");
    });
  };
  getCarrito();

  //metodo put
  const editarCarrito = (val) => {
    setEditar(true);
    setIdCarrito(val.id_carrito);
    setIdUsuarios(val.id_usuarios);
    setFecha_compra(val.fecha_compra);
    setFecha_pago(val.fecha_pago);
    setEstado(val.estado);
  };

  const update = () => {
    Axios.put("http://localhost:3300/carritoA", {
      id_carrito: id_carrito,
      id_usuarios: id_usuarios,
      fecha_compra: fecha_compra,
      fecha_pago: fecha_pago,
      estado: estado,
    }).then(() => {
      getCarrito();
      limpiar();
      Swal.fire({
        title: "<strong>Actualizacion exitosa!</strong>",
        html:
          "<i>El carrito <strong>" +
          fecha_compra +
          "</strong> fue actualizado con exito!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  const limpiar = () => {
    setIdCarrito("");
    setIdUsuarios("");
    setFecha_compra("");
    setFecha_pago("");
    setEstado("");
    setEditar(false);
  };

  //metodo eliminar

  const deleteCarrito = (val) => {
    Swal.fire({
      title: "Confirmar eliminación",
      html:
        "<i>Realmente desea eliminar a <strong>" +
        val.fecha_compra +
        "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(
          `http://localhost:3300/carrito/${val.id_carrito}`
        ).then(() => {
          getCarrito();
          limpiar();
          Swal.fire({
            icon:'success',
            title: val.fecha_compra+' fue eliminado.',
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
        <div className="card-header">GESTIÓN DE CARRITO</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              ID CARRITO:
            </span>
            <input
              type="number"
              value={id_carrito}
              onChange={(event) => {
                setIdCarrito(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Id de carrito"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              ID USUARIOS:
            </span>
            <input
              type="number"
              value={id_usuarios}
              onChange={(event) => {
                setIdUsuarios(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Id de usuarios"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              fecha_compra:
            </span>
            <input
              type="text"
              value={fecha_compra}
              onChange={(event) => {
                setFecha_compra(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese la fecha de compra"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              fecha_pago:
            </span>
            <input
              type="text"
              value={fecha_pago}
              onChange={(event) => {
                setFecha_pago(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese la fecha de pago"
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
            <th scope="col">id_carrito</th>
            <th scope="col">id_usuarios</th>
            <th scope="col">fecha_compra</th>
            <th scope="col">fecha_pago</th>
            <th scope="col">estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {carritoList.map((val, key) => {
            return (
              <tr key={val.id_carrito}>
                <th>{val.id_carrito}</th>
                <td>{val.id_usuarios}</td>
                <td>{val.fecha_compra}</td>
                <td>{val.fecha_pago}</td>
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
                        editarCarrito(val);
                      }}
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteCarrito(val);
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

export default Productos;
