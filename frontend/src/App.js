import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Landing from './components/Landing.js'
import HomeNav from './components/HomeNav/HomeNav'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Particles from 'react-particles-js'
import Banner from './components/banner/Banner'
import Link from './components/Link.js'

const particlesOptions = {  //used to edit the background particles
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 600
      }
    }
  }
}

function App() {
  return (
    <div>
      <SignIn />
    </div>
  );
}

export default App;


