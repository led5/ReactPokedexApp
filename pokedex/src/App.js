import React, { Component } from 'react'; 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap/dist/css/boostrap-theme.css';
import './App.css';
import NavBar from './components/layout/NavBar';
import Dashboard from './components/layout/Dashboard';  

class App extends Component {
  render() {
    return (
      <div className="App"> 
        <NavBar />
          <div className="container">
            <Dashboard />
        </div>
      </div>
    );
  }
}

export default App;
