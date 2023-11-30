import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const Productos = () => {
  const [id_productos, setIdproducto] = useState("");
  const [id_categoria, setIdcategoria] = useState("");
  const [descripcion_producto, setDescripcion] = useState("");
  const [image, setImagen] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [estado, setEstado] = useState("");

  const [editar, setEditar] = useState(false);

  //constante para get hacer una lista
  const [productosList, setProductos] = useState([]);

  //metodo post
  const add = () => {
    Axios.post("http://localhost:3300/productoCrear", {
      id_productos: id_productos,
      id_categoria: id_categoria,
      descripcion_producto: descripcion_producto,
      image: image,
      precio: precio,
      cantidad: cantidad,
      estado: estado,
    }).then(() => {
      getProductos();
      limpiar();
      Swal.fire({
        title: "<strong>Registro exitoso!</strong>",
        html:
          "<i>El producto <strong>" +
          descripcion_producto +
          "</strong> fue registrado con exito!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  //metodo get
  const getProductos = () => {
    Axios.get("http://localhost:3300/productos").then((response) => {
      setProductos(response.data);
      // alert("Productos en listados");
    });
  };
  getProductos();

  //metodo put
  const editarProducto = (val) => {
    setEditar(true);
    setIdproducto(val.id_productos);
    setIdcategoria(val.id_categoria);
    setDescripcion(val.descripcion_producto);
    setImagen(val.image);
    setPrecio(val.precio);
    setCantidad(val.cantidad);
    setEstado(val.estado);
  };

  const update = () => {
    Axios.put("http://localhost:3300/productoA", {
      id_productos: id_productos,
      id_categoria: id_categoria,
      descripcion_producto: descripcion_producto,
      image: image,
      precio: precio,
      cantidad: cantidad,
      estado: estado,
    }).then(() => {
      getProductos();
      limpiar();
      Swal.fire({
        title: "<strong>Actualizacion exitosa!</strong>",
        html:
          "<i>El producto <strong>" +
          descripcion_producto +
          "</strong> fue actualizado con exito!</i>",
        icon: "success",
        timer: 3000,
      });
    });
  };

  const limpiar = () => {
    setIdproducto("");
    setIdcategoria("");
    setDescripcion("");
    setImagen("");
    setPrecio("");
    setCantidad("");
    setEstado("");
    setEditar(false);
  };

  //metodo eliminar

  const deleteProducto = (val) => {
    Swal.fire({
      title: "Confirmar eliminación",
      html:
        "<i>Realmente desea eliminar a <strong>" +
        val.descripcion_producto +
        "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(
          `http://localhost:3300/productos/${val.id_productos}`
        ).then(() => {
          getProductos();
          limpiar();
          Swal.fire({
            icon:'success',
            title: val.descripcion_producto+' fue eliminado.',
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
              ID PRODUCTO:
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
              Descripcion:
            </span>
            <input
              type="text"
              value={descripcion_producto}
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
              Imagen:
            </span>
            <input
              type="text"
              value={image}
              onChange={(event) => {
                setImagen(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese la imagen"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Precio:
            </span>
            <input
              type="number"
              value={precio}
              onChange={(event) => {
                setPrecio(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese el precio"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cantidad:
            </span>
            <input
              type="number"
              value={cantidad}
              onChange={(event) => {
                setCantidad(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese la cantidad"
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
            <th scope="col">id_productos</th>
            <th scope="col">id_categoria</th>
            <th scope="col">descripcion_producto</th>
            <th scope="col">image</th>
            <th scope="col">precio</th>
            <th scope="col">cantidad</th>
            <th scope="col">estado</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosList.map((val, key) => {
            return (
              <tr key={val.id_productos}>
                <th>{val.id_productos}</th>
                <td>{val.id_categoria}</td>
                <td>{val.descripcion_producto}</td>
                <td>{val.image}</td>
                <td>{val.precio}</td>
                <td>{val.cantidad}</td>
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
                        editarProducto(val);
                      }}
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleteProducto(val);
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
