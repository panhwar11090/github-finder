import React, {Component} from 'react';
import Navbar from './Components/Layouts/Navbar';
import './App.css';

class App extends Component{
  render(){
    return(
      <div className="App">
        <Navbar title = 'Github Finder' />
      </div>
    )
  }
}



export default App;
