import React, { useState, Fragment} from 'react';
import Navbar from './Components/Layouts/Navbar';
import Users from './Components/users/Users';
import Search from './Components/users/Search';
import About from './Components/Pages/About';
import User from './Components/users/User';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Alert from './Components/Layouts/Alert';

const App = () =>{
 
   const [users, setUsers] = useState([]);
   const [user, setUser] = useState({});
   const [repos, setRepos] = useState([]);
   const [loading, setLoading] = useState(false);
   const[alert, setAlert] = useState(null);

  
  // async componentDidMount(){
  //   this.setState({loading : true});
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({ users: res.data,  loading:false})
  // }

  const searchUsers = async (text) =>{
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
    setUsers(res.data.items);
    setLoading(false);
  }

  const getUser = async (username) =>{
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setUser(res.data);
    setLoading(false);
  }

  const getUserRepos = async (username) =>{
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    setRepos(res.data);
    setLoading(false);
  }

    // This function is called from the Search component to clear users from state
    const clearUsers = () =>{
      setUsers([]);
      setLoading(false);
    } 


  // This function is called from the Search component to raise an alert for empty text field search
  const displayAlert = (msg, type) =>{
    setAlert({msg, type});
    // remove the msg after 5 sec
    setTimeout(() => {
      setAlert(null)
    }, 5000);
  }


  

    return(
      <Router>
        <div className="App">
        <Navbar title = 'Github Finder' icon='fab fa-github' />
          <div className="container">
            <Alert alert={alert}/>
            <Routes>
              <Route exact path='/'element={
                <Fragment>
                  <Search searchUsers={searchUsers}
                    setAlert = {displayAlert}
                    clearUsers= {clearUsers}
                    showClear = {users.length > 0 ? true : false}
                  />
                  <Users loading = {loading} users = {users}/>
                </Fragment>}
              />
              <Route exact path='/about' Component={About} />
              <Route path='/user/:login' element={<User getUser={getUser} getUserRepos={getUserRepos} repos={repos} loading={loading} user={user} /> }/> 
            </Routes>           
          </div>
        </div>
      </Router>
      
    )
}



export default App;
