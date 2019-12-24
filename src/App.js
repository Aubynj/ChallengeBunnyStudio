import React from 'react'
// import logo from './logo.svg'
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './Components/Navbar'
import { Provider } from 'react-redux'
import Store from './Redux/Store'
import CreateUser from './Components/CreateUser'
import CreateEditTask from './Components/CreateEditTask'
import UserList from './Components/UserList'
import SingleUserComponent from './Components/SingleUserComponent';
import EditUser from './Components/EditUser';

function App() {
    return (
        <Provider store={Store}>
            <Router>
                <Navbar />
                <br/>
                <Route path="/" exact component={UserList}/>
                <Route path="/User" exact component={CreateUser}/>
                <Route path="/User/:id" exact component={SingleUserComponent} />
                <Route path="/User/Task/Edit/:id" exact component={CreateEditTask} />
                <Route path="/User/edit/:id" exact component={EditUser} />
            </Router>
        </Provider>
    );
}

export default App;
