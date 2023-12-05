import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const Oferta = () => {
  const [id_oferta, setIdoferta] = useState("");
  const [id_productos, setIdproducto] = useState("");
  const [nombre_oferta, setNombre_oferta] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("");
  const [fecha_inicio, setFecha_inicio] = useState("");
  const [fecha_fin, setFecha_fin] = useState("");
  const [descuento, setDescuento] = useState("");
  const [imagen, setImagen] = useState("");

  const [editar, setEditar] = useState(false);

  //constante para get hacer una lista
  const [OfertaList, setOferta] = useState([]);

  //metodo post
  const add = () => {
    Axios.post("http://localhost:3300/ofertaCrear", {
      id_oferta: id_oferta,
      id_productos: id_productos,
      nombre_oferta: nombre_oferta,
      descripcion: descripcion,
      estado: estado,
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin,
      descuento: descuento,
      imagen: imagen,
    
    }).then(() => {
      getOferta();
      limpiar();
      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html:
          "<i>La Oferta <strong>" +
          nombre_oferta +
          "</strong> fue registrado con exito!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  //metodo get
  const getOferta = () => {
    Axios.get("http://localhost:3300/oferta").then((response) => {
      setOferta(response.data);
      // alert("Oferta en promocional");
    });
  };
  getOferta();

  //metodo put
  const editarOferta = (val) => {
    setEditar(true);
    setIdoferta(val.id_oferta);
    setIdproducto(val.id_productos);
    setNombre_oferta(val.nombre_oferta);
    setDescripcion(val.descripcion);
    setEstado(val.estado);
    setFecha_inicio(val.fecha_inicio);
    setFecha_fin(val.fecha_fin);
    setDescuento(val.descuento);
    setImagen(val.imagen);
  };

  const update = () => {
    Axios.put("http://localhost:3300/ofertaA", {
      id_oferta: id_oferta,
      id_productos: id_productos,
      nombre_oferta: nombre_oferta,
      descripcion: descripcion,
      estado: estado,
      fecha_inicio: fecha_inicio,
      fecha_fin: fecha_fin,
      descuento: descuento,
      imagen: imagen,
    }).then(() => {
      getOferta();
      limpiar();
      Swal.fire({
        title: "<strong>Actualizacion exitosa!</strong>",
        html:
          "<i>La Oferta <strong>" +
          nombre_oferta +
          "</strong> fue actualizado con exito!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  const limpiar = () => {
    setIdoferta("");
    setIdproducto("");
    setNombre_oferta("");
    setDescripcion("");
    setEstado("");
    setFecha_inicio("");
    setFecha_fin("");
    setDescuento("");
    setImagen("");
    setEditar(false);
  };

  //metodo eliminar

  const deleteOferta = (val) => {
    Swal.fire({
      title: "Confirmar eliminación",
      html:
        "<i>Realmente desea eliminar a <strong>" +
        nombre_oferta +
        "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(
          `http://localhost:3300/oferta/${val.id_oferta}`
        ).then(() => {
          getOferta();
          limpiar();
          Swal.fire({
            icon:'success',
            title: val.nombre_oferta+' fue eliminado.',
            showConfirmButton: false,
            timer:2000
          });
        }).catch(function(error){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se logró eliminar la Oferta sube el BACK!!',
                footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)).message
            })
        })       
      }
    });
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTIÓN DE OFERTAS</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              ID OFERTAS:
            </span>
            <input
              type="number"
              value={id_oferta}
              onChange={(event) => {
                setIdoferta(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Id de oferta"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              ID PRODUCTOS:
            </span>
            <input
              type="number"
              value={id_productos}
              onChange={(event) => {
                setIdproducto(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Id de productos"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre de Oferta:
            </span>
            <input
              type="text"
              value={nombre_oferta}
              onChange={(event) => {
                setNombre_oferta(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese el nombre de la oferta"
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
              placeholder="Ingrese la descripcion"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              estado:
            </span>
            <input
              type="text"
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
              fecha_inicio:
            </span>
            <input
              type="datetime"
              value={fecha_inicio}
              onChange={(event) => {
                setFecha_inicio(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese la fecha de inicio"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              fecha_fin:
            </span>
            <input
              type="datetime"
              value={fecha_fin}
              onChange={(event) => {
                setFecha_fin(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese la fecha final"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        
        <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              descuento:
            </span>
            <input
              type="number"
              value={descuento}
              onChange={(event) => {
                setDescuento(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese el descuento"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              imagen:
            </span>
            <input
              type="text"
              value={imagen}
              onChange={(event) => {
                setImagen(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese la imagen"
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
            <th scope="col">id_oferta</th>
            <th scope="col">id_productos</th>
            <th scope="col">nombre_oferta</th>
            <th scope="col">descripcion</th>
            <th scope="col">estado</th>
            <th scope="col">fecha_inicio</th>
            <th scope="col">fecha_fin</th>
            <th scope="col">descuento</th>
            <th scope="col">imagen</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {OfertaList.map((val, key) => {
            return (
              <tr key={val.id_oferta}>
                <th>{val.id_oferta}</th>
                <td>{val.id_productos}</td>
                <td>{val.nombre_oferta}</td>
                <td>{val.descripcion}</td>
                <td>{val.estado}</td>
                <td>{val.fecha_inicio}</td>
                <td>{val.fecha_fin}</td>
                <td>{val.descuento}</td>
                <td>{val.imagen}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        editarOferta(val);
                      }}
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteOferta(val);
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

export default Oferta;
