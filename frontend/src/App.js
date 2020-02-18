import React from 'react';
import logo from './logo.svg';
import './App.css';

import Landing from './components/Landing.js'

function App() {
  return (
    <div>
      <Landing></Landing>
      <div id="home"> home</div>
      <div id="features"> features</div>
      <div id="pricing"> prices</div>

    </div>
  );
}

export default App;
