import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Landing from './components/Landing/Landing.js'
import HomeNav from './components/HomeNav/HomeNav'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Particles from 'react-particles-js'
import Banner from './components/banner/Banner'
import Link from './components/Link.js'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink
} from "react-router-dom";

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

const initialState = { //default state for a user, just a function
  route: 'home',
  isSignedIn: false,
  user: {
    id: '5e4c85bebf08774aeaccf307',
    name: '',
    email: '',
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: 'landing',
      isSignedIn: false,
      user: {
        id: '5e5f054af2ef047d32fbb4a7',
        name: '',
        email: '',
      }
    }
  }

  loadUser = (data) => {      //loaduser with data received when signin is called 
    this.setState({
      user: {
        id: data._id,
        name: data.name,
        email: data.email
      }
    })
  }

  onRouteChange = (route) => { //on signout, reset the state to initialState
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, route } = this.state;
    return (
      <div>
        <Link user={this.state.user.id} />
        {/* <SignIn></SignIn> */}
        {/* <Register></Register> */}
        {/* <Particles className='particles'
          params={particlesOptions}
        /> */}
        {route === 'landing'
          ? <div>
            <Landing isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}></Landing>
          </div>

          :
          route === 'signin' ?
            <div>
              <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            </div>

            :
            route === 'register' ?
              <div>
                <Register user={this.user} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              </div>

              :
              route === 'link' ?
                <div>
                  <Link user={this.state.user.id} onRouteChange={this.onRouteChange} />
                  asdf
                </div>

                : <div>{console.log(this.state.user)}</div>
        }
      </div>
    );
  }
}

export default App;
