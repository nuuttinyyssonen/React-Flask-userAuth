import './App.css';
import Signup from './components/signup';
import Main from './components/main';
import Login from './components/login';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" Component={Signup}/>
          <Route path="/login" Component={Login}/>
          <Route path="/main" Component={Main}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
