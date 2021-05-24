import React from 'react';
import AdminNav from "../components/Admin/AdminNav/AdminNav"
import AdminLogin from "../components/Admin/Login/login"
import CategoryTable from "../components/Admin/Category/Table/CategoryTable"
import BookTable from "../components/Admin/Book/Table/BookTable"
import AuthorTable from "../components/Admin/Author/Table/AuthorTable"
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

function AdminHome() {
  const AdminloggedIn = true;
  return (<React.Fragment>
    <AdminNav />
     {/* <Switch>
     <Route exact path="/admin/login"><AdminLogin /></Route>

     </Switch> */}
    <Route exact path="/admin/category">
      {AdminloggedIn ? <CategoryTable /> : <Redirect to="/admin" />}
    </Route>
    <Route exact path="/admin/book">
      {AdminloggedIn ? <BookTable /> : <Redirect to="/admin" />}
    </Route>
    <Route exact path="/admin/author">
      {AdminloggedIn ? <AuthorTable /> : <Redirect to="/admin" />}
    </Route>
    </React.Fragment>
  );
}


export default AdminHome;