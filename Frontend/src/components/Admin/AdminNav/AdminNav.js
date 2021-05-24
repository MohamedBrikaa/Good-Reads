import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';



function NavBar() {
    return <React.Fragment>
        <ul class="nav nav-tabs">
            <li class="nav-item">
            <NavLink to="/admin/category" className="nav-link" activeClassName="active">Category</NavLink>
            </li>
            <li class="nav-item">
            <NavLink to="/admin/book" className="nav-link" activeClassName="active">Book</NavLink>
            </li>
            <li class="nav-item">
            <NavLink to="/admin/author" className="nav-link" activeClassName="active">Author</NavLink>
            </li>
        </ul>
    </React.Fragment>
}

export default NavBar


