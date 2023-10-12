import React from 'react';
import Navbar from './Components/Layouts/Navbar';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';
import User from './Components/users/User';
import About from './Components/Pages/About';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './Components/Pages/Home';
import NotFound from './Components/Pages/NotFound';
import './App.css';
import Alert from './Components/Layouts/Alert';

const App = () =>{
  
    return(
      <GithubState>
        <AlertState>
          <Router>
            <div className="App">
            <Navbar />
              <div className="container">
                <Alert />
                <Routes>
                  <Route exact path='/'Component={Home} />
                  <Route exact path='/about' Component={About} />
                  <Route exact path='/user/:login' Component={User}/> 
                  <Route Component={NotFound}/>
                </Routes>           
              </div>
            </div>
          </Router>
        </AlertState>
      </GithubState>   
    )
}



export default App;
