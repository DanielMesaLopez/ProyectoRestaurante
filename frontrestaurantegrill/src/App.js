import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavbarNav from './components/NavbarNav'
import Sidebar from './components/Sidebar'
import Oferta from './crud/Oferta'
import Productos from './crud/Productos'
import Usuarios from './crud/Usuarios'
import Ciudad from './crud/Ciudad'
import Categorias from './crud/Categorias'
import Carrito from './crud/Carrito'
import Rol from './crud/Rol'
import './App.scss';


function App() {
  return (
    <Router>
      <NavbarNav/>
      <div className="flex">
      <Sidebar/>
       
      <div className="content">
        <Routes>
        <Route path="/oferta" exact={true} Component={Oferta} />  
        <Route path="/productos" exact={true} Component={Productos} />  
        <Route path="/usuarios" exact={true} Component={Usuarios} />  
        <Route path="/ciudad" exact={true} Component={Ciudad} />  
        <Route path="/categorias" exact={true} Component={Categorias} />  
        <Route path="/carrito" exact={true} Component={Carrito} />  
        <Route path="/rol" exact={true} Component={Rol} /> 
        </Routes>       
        </div>    
      </div>
    </Router>
  );
}

export default App;
