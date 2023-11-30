import { NavLink } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'

const Sidebar = () => {
    return(
        <div className="sidebar bg-light">
            <ul>
                <li> 
                    <NavLink to="/oferta" className='text-dark rounded py-2 w-100 d-inline-block px-3'><FaIcons.FaHandHoldingUsd className='me-2'/> Ofertas</NavLink>
                    </li>
                    
                <li>
                    <NavLink to="/productos" exact className='text-dark rounded py-2 w-100 d-inline-block px-3' activeClassName="active"><FaIcons.FaHamburger className='me-2'/>Productos</NavLink>
                </li>
                <li>
                    <NavLink to="/usuarios" exact className='text-dark  rounded py-2 w-100 d-inline-block px-3' activeClassName="active"><FaIcons.FaUser className='me-2'/>Usuarios</NavLink>
                </li>
                <li>
                    <NavLink to="/ciudad" exact className='text-dark  rounded py-2 w-100 d-inline-block px-3' activeClassName="active"><FaIcons.FaUniversity className='me-2'/>Ciudad</NavLink>
                </li>
                <li>
                    <NavLink to="/categorias" exact className='text-dark  rounded py-2 w-100 d-inline-block px-3' activeClassName="active"><FaIcons.FaTasks className='me-2'/>Categorias</NavLink>
                </li>
                <li>
                    <NavLink to="/carrito" exact className='text-dark  rounded py-2 w-100 d-inline-block px-3' activeClassName="active"><FaIcons.FaStore className='me-2'/>Carrito</NavLink>
                </li>
                <li>
                    <NavLink to="/rol" exact className='text-dark  rounded py-2 w-100 d-inline-block px-3' activeClassName="active"><FaIcons.FaUsers className='me-2'/>Rol</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar;