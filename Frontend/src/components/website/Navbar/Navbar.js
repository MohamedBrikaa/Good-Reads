import React, {useState} from 'react';
import FAVPNG from '../../assests/FAVPNG.png'
import gwordlogo from '../../assests/gwordlogo.png'
import login from '../../assests/login.png'
import user from '../../assests/user.png'
import './Navbar.css'
import { Link, BrowserRouter, Switch, Route } from 'react-router-dom'
import Categories from '../categories/Categories'
import Categorydetails from '../categories/Categorydetails'
import Books from '../books/Books'
import Book from '../bookDetails/Book'
import Authors from '../Authors/Authors'
import Search from '../search/Search'
import axios from 'axios';


function Navbar() {
  
  const logout = () => {
    console.log("In the logout function...");
    const token = JSON.parse(sessionStorage.getItem('userToken')); //fetch l token and parse it 3ashan hanb3to fl body bta3 l request
    sessionStorage.removeItem('userToken'); 
     
    axios.post('http://localhost:5000/users/logout', { 
        token
      })
      .then(res => {
       console.log(res.data); 
      })
    window.location.reload();
  }
  
  return (<React.Fragment>
    <nav class=" navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between ">
      <img class="navbar-brand img" src={FAVPNG} alt="goodreads" />
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">

          <li class="nav-item active m-auto" >

            <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>

          </li>
          <li class="nav-item m-auto">
            <Link class="nav-link" to="/categories">Categories</Link>

          </li>

          <li class="nav-item m-auto">
            <Link class="nav-link" to="/books">Books</Link>
          </li>
          <li class="nav-item m-auto">
            <Link class="nav-link" to="/authors">Authors</Link>
          </li>


          <li class="col-3 ">
            <img class="img2" src={gwordlogo} />
          </li>
        </ul>
        <Search />
        {sessionStorage.getItem('userToken')!=null &&
        
        <div class="col-1  ">
          <div class="row">
          <Link to="/editProfile"><img class=" img mr-3" src={user} style={{width:'30px', height:'30px'}}/></Link>
          
          <Link to="/"> <img class="img" src={login} style={{width:'30px', height:'30px'}} onClick={()=>logout()}/></Link>
          </div>
        </div>
        }
      </div>
    </nav>
  </React.Fragment>
  );
}

export default Navbar;
