import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';
//import {LinkContainer} from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.scss';
export default function NavBar() {
   const cartData = useSelector(state => state.cartData);
   const {totalItems} = cartData;
    return (
        
<Navbar bg="light" variant="light" collapseOnSelect expand="lg" sticky="top">

    <Navbar.Brand as={Link} to="/" className="col-7 col-md-2 order-md-1 order-2">Shopping</Navbar.Brand>
    <Nav className="col-2 order-3 cart-icon" variant="dark">
            <Nav.Link className="basket" as={Link} to="/cart">
            <span className="basket__count">{totalItems !== 0 ? totalItems: ''}</span>
                <i class="bi bi-cart"></i>
            </Nav.Link>
    </Nav>
   <div className="col-3 col-md-8 order-1 order-md-2 ">
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            <Nav.Link as={Link} to="/services">Services</Nav.Link>
        </Nav>
        
        </Navbar.Collapse>
    </div>
</Navbar>
  
    )
}
