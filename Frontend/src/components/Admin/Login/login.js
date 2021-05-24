import React from 'react';
import './login.css';
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import { useState } from 'react'
import axios from 'axios';
function AdminLogin({ AdminloggedIn }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return <div class="wrapper fadeInDown">
        <div id="formContent">
            <h2 class="active admin-login-h2"> Sign In </h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                axios.post('http://localhost:5000/users/login', { email, password })
                    .then(res => {
                        if (res.data.admin) {
                            sessionStorage.setItem('userToken', JSON.stringify(res.data.editedtoken))
                            sessionStorage.setItem('admin', JSON.stringify(res.data.admin))
                            console.log("redirection");
                            alert("You are successfully logged in as Admin")
                            window.location.reload();
                            // return   <Redirect to="/admin/category" />
                        } else {
                            alert("Sorry you have Enterd incorrect Email or Password")
                            setEmail("")
                            setPassword("")
                        }
                    })
                    .catch(function (error) {
                        console.log("sorry wrong cred");
                        console.log(error);
                        alert("Sorry you have Enterd incorrect Email or Password")
                        setEmail("")
                        setPassword("")
                    })
            }}>
                <input type="text" id="email" class="fadeIn second admin-login" name="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" id="password" class="fadeIn third admin-login" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="submit" class="fadeIn fourth" value="Log In" />
            </form>
            <div id="formFooter">
                Welcome To Admin Panel
    </div>

        </div>
    </div>

























    // <div id="login">
    //     <div class="container">
    //         <div id="login-row" class="row justify-content-center align-items-center">
    //             <div id="login-column" class="col-md-6">
    //                 <div id="login-box" class="col-md-12">
    //                     <form id="login-form" class="form" method="post" onSubmit={(e) => {
    //                         e.preventDefault();
    //                         axios.post('http://localhost:5000/users/login', { email, password })
    //                             .then(res => {
    //                                 if (res.data.admin) {
    //                                     sessionStorage.setItem('userToken', JSON.stringify(res.data.editedtoken))
    //                                     sessionStorage.setItem('admin', JSON.stringify(res.data.admin))
    //                                     console.log("redirection");
    //                                     alert("You are successfully logged in as Admin")
    //                                     window.location.reload();
    //                                     // return   <Redirect to="/admin/category" />
    //                                 } else {
    //                                     alert("Sorry you have Enterd incorrect Email or Password")
    //                                     setEmail("")
    //                                     setPassword("")
    //                                 }
    //                             })
    //                             .catch(function (error) {
    //                                 console.log("sorry wrong cred");
    //                                 console.log(error);
    //                                 alert("Sorry you have Enterd incorrect Email or Password")
    //                                 setEmail("")
    //                                 setPassword("")
    //                             })
    //                     }}>
    //                         <h3 class="text-center text-info">Welcome To Admin Panel</h3>
    //                         <div class="form-group">
    //                             <label for="username" class="text-info">Email:</label><br />
    //                             <input type="text" name="email" id="email" class="form-control" value={email} onChange={e => setEmail(e.target.value)} />
    //                         </div>
    //                         <div class="form-group">
    //                             <label for="password" class="text-info">Password:</label><br />
    //                             <input type="password" name="password" id="password" class="form-control" value={password} onChange={e => setPassword(e.target.value)} />
    //                         </div>
    //                         <div class="form-group">
    //                             <input type="submit" name="submit" class="btn btn-info btn-md" value="Login" />
    //                         </div>
    //                     </form>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>

}

const handleLogIn = (e) => {
    // e.preventDefault();
    // console.log("submitted");
    // log

}

export default AdminLogin