import React from 'react';
import './App.css';

import Landing from './components/Landing.js'
import HomeNav from './components/HomeNav/HomeNav'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Particles from 'react-particles-js'

const particlesOptions = {  //used to edit the background particles
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 400
      }
    }
  }
}


function App() {
  return (

    <div>
      {/* <Landing></Landing>
      <div id="home"> home</div>
      <div id="features"> features</div>
      <div id="pricing"> prices</div> */}
      
      <Register></Register>
      <Particles className='particles'
          params={particlesOptions}
        />

    </div>
  );
}

export default App;
