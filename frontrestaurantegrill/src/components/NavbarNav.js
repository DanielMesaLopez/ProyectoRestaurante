import React, { useState } from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,  
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, 
} from 'reactstrap';

const NavbarNav = (props) =>  {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color='light' light expand="md">
        <NavbarBrand href="/" >Grill Brasa</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>            
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Daniel Alejandro Mesa Lopez
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Mi perfil</DropdownItem>
                <DropdownItem>Configuraciones</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Cerrar Sesión</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>         
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarNav;