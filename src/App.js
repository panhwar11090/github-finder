import React, {Component, Fragment} from 'react';
import Navbar from './Components/Layouts/Navbar';
import Users from './Components/users/Users';
import Search from './Components/users/Search';
import About from './Components/Pages/About';
import User from './Components/users/User';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Alert from './Components/Layouts/Alert';

class App extends Component{
  state = {
    users:[],
    user:{},
    loading : false,
    alert: null
  }
  // async componentDidMount(){
  //   this.setState({loading : true});
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   this.setState({ users: res.data,  loading:false})
  // }

  searchUsers = async (text) =>{
    this.setState({loading : true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
    this.setState({users : res.data.items, loading:false});
    console.log(res.data)
  }

  getUser = async (username) =>{
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({user: res.data, loading:false})
    console.log(res.data)
  }

    // This function is called from the Search component to clear users from state
    clearUsers = () => this.setState({ users: [], loading: false })



  // This function is called from the Search component to raise an alert for empty text field search
  setAlert = (msg, type) =>{
    this.setState({alert: {msg, type}})
    // remove the msg after 5 sec
    setTimeout(() => {
      this.setState({alert: null})
    }, 5000);
  }


  render(){
    const {users , user, loading} = this.state;

    return(
      <Router>
        <div className="App">
        <Navbar title = 'Github Finder' icon='fab fa-github' />
          <div className="container">
            <Alert alert={this.state.alert}/>
            <Routes>
              <Route exact path='/'element={
                <Fragment>
                  <Search searchUsers={this.searchUsers}
                    setAlert = {this.setAlert}
                    clearUsers= {this.clearUsers}
                    showClear = {users.length > 0 ? true : false}
                  />
                  <Users loading = {loading} users = {users}/>
                </Fragment>}
              />
              <Route exact path='/about' Component={About}/>
              <Route exact path='/user/:Login' Component={
                 <User getUser={this.getUser} loading ={loading} user={user} />}
              /> 
            </Routes>
            
          </div>
        </div>

      </Router>
      
    )
  }
}



export default App;
