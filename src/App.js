import React from 'react'
// import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from './Components/Navbar';

import CreateUser from './Components/CreateUser'
import CreateUserTask from './Components/CreateUserTask'
import CreateEditTask from './Components/CreateEditTask'
import UserList from './Components/UserList'
import SingleUserComponent from './Components/SingleUserComponent';
import EditUser from './Components/EditUser';

function App() {
    return (
        <Router>
            <Navbar />
            <br/>
            <Route path="/" exact component={UserList}/>
            <Route path="/User" exact component={CreateUser}/>
            <Route path="/Create" exact component={CreateUserTask} />
            <Route path="/User/:id" exact component={SingleUserComponent} />
            <Route path="/User/Task/Edit/:id" exact component={CreateEditTask} />
            <Route path="/User/edit/:id" exact component={EditUser} />
        </Router>
    );
}

export default App;
