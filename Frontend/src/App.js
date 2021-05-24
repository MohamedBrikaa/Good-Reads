import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch, Link, Redirect } from "react-router-dom";

// import AdminHome from "./screens/Admin"
import Navbar from "./components/website/Navbar/Navbar";
import HomePage from "./components/website/HomePage/HomePage";
import Categories from "./components/website/categories/Categories";
import Categorydetails from "./components/website/categories/Categorydetails";
import Authors from "./components/website/Authors/Authors";
import AuthorDetails from "./components/website/AuthorDetails/AuthorDetails";
import Searchbooks from "./components/website/search/Searchbooks";
import Searchcategories from "./components/website/search/Searchcategories";
import Searchauthors from './components/website/search/Searchauthors'
import Error from './components/website/Error/Error'
import Books from "./components/website/books/Books";
import Book from './components/website/bookDetails/Book'
import CategoryTable from "./components/Admin/Category/CategoryTable";
import BookTable from "./components/Admin/Book/BookTable";
import AuthorTable from "./components/Admin/Author/AuthorTable";
import AdminLogin from "./components/Admin/Login/login";
import EditForm from './components/website/EditProfile/EditProfile'
function App() {
  const AdminloggedIn =
    sessionStorage.getItem("userToken") && sessionStorage.getItem("admin")
      ? true
      : false;
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        {/* Admin Pages */}
        <Route exact path='/admin/'>
          {AdminloggedIn ? <Redirect to='/admin/category' /> : <AdminLogin />}
        </Route>
        <Route exact path='/admin/category'>
          {AdminloggedIn ? <CategoryTable /> : <Redirect to='/admin' />}
        </Route>
        <Route exact path='/admin/book'>
          {AdminloggedIn ? <BookTable /> : <Redirect to='/admin' />}
        </Route>
        <Route exact path='/admin/author'>
          {AdminloggedIn ? <AuthorTable /> : <Redirect to='/admin' />}
        </Route>

        {/* Website Pages */}
        <Route exact path='/'>
          {" "}
          <HomePage />{" "}
        </Route>
        <Route exact path='/categories'>
          <Categories />
        </Route>
        <Route exact path='/categories/:id'>
          <Categorydetails />
        </Route>
        <Route exact path='/books'>
          <Books />
        </Route>
        <Route exact path='/books/:id'>
          <Book />
        </Route>
        <Route exact path='/authors'>
          {" "}
          <Authors />
        </Route>
        <Route exact path='/authorDetails/:id'>
          {" "}
          <AuthorDetails />
        </Route>
        <Route exact path='/search/book/:name'>
          {" "}
          <Searchbooks />
        </Route>
        <Route exact path='/search/category/:name'>
        
          <Searchcategories />
        </Route>
        <Route exact path='/search//'>
    
          <Books />
        </Route>
        <Route exact path='/search//:name'>
    
    <Books />
    
  </Route>
  <Route exact path='/search/book'>
    
    <Books />
    
  </Route>
  <Route exact path='/search/category'>
    
    <Categories />
    
  </Route>
  <Route exact path='/search/author'>
    
    <Authors />
    
  </Route>
        <Route exact path='/search/author/:name'>
          
          <Searchauthors />
        </Route>
        <Route exact path='/editProfile'>
        {sessionStorage.getItem("userToken") ? <EditForm/>:<Redirect to='/' /> }
        </Route>
        <Route component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;