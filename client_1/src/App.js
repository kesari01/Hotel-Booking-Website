import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import Homescreen from './screens/Homescreen'
import Bookingscreen from './screens/Bookingscreen'
import Signupscreen from './screens/Signupscreen'
import Loginscreen from './screens/Loginscreen'
import Profilescreen from './screens/Profilescreen'
import Adminscreen from './screens/Adminscreen'
import Landingscreen from './screens/Landingscreen'
import Aboutusscreen from './screens/Aboutusscreen'
import React from 'react'

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
          <Route path="/home" exact component={Homescreen} />
          <Route path="/book/:roomid/:fromdate/:todate" exact component={Bookingscreen} />
          <Route path="/signup" exact component={Signupscreen} />
          <Route path="/login" exact component={Loginscreen} />
          <Route path="/profile" exact component={Profilescreen} />
          <Route path="/admin" exact component={Adminscreen} />
          <Route path="/aboutus" exact component={Aboutusscreen} />
          <Route path="/" exact component={Landingscreen} />
      </BrowserRouter>
    </div>
  );
}

export default App;
