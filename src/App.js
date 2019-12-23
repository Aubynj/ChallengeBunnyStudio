import React from 'react'
// import logo from './logo.svg'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from './Components/Navbar';

function App() {
    return (
        <Router>
            <Navbar />
            <br/>
            <Route path="" />
            <Route path="" />
            <Route path="" />
        </Router>
    );
}

export default App;
