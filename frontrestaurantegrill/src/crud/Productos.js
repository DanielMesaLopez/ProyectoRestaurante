import { useState } from "react"
import Axios from "axios"

const Productos = () => {

    const [id_productos,setIdproducto]= useState(0);
    const [id_categoria,setIdcategoria]= useState(0);
    const [descripcion_producto,setDescripcion]= useState("");
    const [image,setImagen]= useState("");
    const [precio,setPrecio]= useState(0);
    const [cantidad,setCantidad]= useState(0);
    const [estado,setEstado]= useState(0);

//constante para get hacer una lista
    const [productosList, setProductos]= useState([])

//metodo post
    const add = ()=>{
        Axios.post("http://localhost:3300/productoCrear",{
        id_productos:id_productos,
        id_categoria:id_categoria,
        descripcion_producto:descripcion_producto,
        image:image,
        precio:precio,
        cantidad:cantidad,
        estado:estado
        }).then(()=>{
            getProductos();
            alert('Producto creado')
        });        
    }

//metodo get
const getProductos = ()=>{
    Axios.get("http://localhost:3300/productos").then((response)=>{
        setProductos(response.data);
        alert("Productos en listados");
    });
    
}

    return (
        <div className="producto">
            <div className="datos px-3">
                <label>ID PRODUCTO: <input 
                onChange={(event)=>{
                    setIdproducto(event.target.value);
                }}
                type="number" /></label>
                <label>ID CATEGORIA: <input
                onChange={(event)=>{
                    setIdcategoria(event.target.value);
                }} type="number" /></label>  
                <label>Descripcion: <input
                onChange={(event)=>{
                    setDescripcion(event.target.value);
                }} type="text" /></label>
                <label>Imagen: <input
                onChange={(event)=>{
                    setImagen(event.target.value);
                }} type="text" /></label>
                <label>Precio: <input
                onChange={(event)=>{
                    setPrecio(event.target.value);
                }} type="number" /></label>  
                <label>Cantidad: <input
                onChange={(event)=>{
                    setCantidad(event.target.value);
                }} type="number" /></label>  
                <label>Estado: <input
                onChange={(event)=>{
                    setEstado(event.target.value);
                }} type="number" /></label>
                <button onClick={add}>Registrar</button>
            </div>
            <div className="lista" >
            <button onClick={getProductos}>Listar</button>
            {
                productosList.map((val,key)=>{
                    return <di className="">{val.id_productos}</di>
                })
            }
                </div>            
        </div>
    )
}

export default Productos