import React from 'react';
import './App.css';
import Landing from './components/Landing/Landing.js'
import HomeNav from './components/HomeNav/HomeNav'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Link from './components/Link/Link.js'
import Bigchart from './components/Charts/Bigchart.js'
import Transactions from './components/Transactions/transactions'
import Goal from './components/Goal/Goal.js'
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
    id: '5e659e704209f21f9746a50e',
    name: '',
    email: '',
    accessToken: ''
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: 'landing',
      isSignedIn: false,
      user: {
        id: '5e659e704209f21f9746a50e',
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
        email: data.email,
        accessToken: data.accessToken
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

  updateTransactions(at, uid) {
    fetch("http://localhost:9000/plaid/", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken: at,
        days: 30
      })
    })
      .then(response => response.json())
      .then(res => {
        fetch("http://localhost:9000/users/update/transactions", {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: uid,
            transactions: res.transactions
          })
        })
      });
  }

  render() {
    const { isSignedIn, route } = this.state;
    return (
      <div>
        {/* <Link user={this.state.user.id} /> */}
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
              <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} user={this.user} updateTransactions={this.updateTransactions} />
            </div>

            :
            route === 'register' ?
              <div>
                <Register user={this.user} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              </div>

              :
              route === 'link' ?
                <div>
                  <Link loadUser={this.loadUser} user={this.state.user.id} onRouteChange={this.onRouteChange} updateTransactions={this.updateTransactions} />
                  asdf
                </div>

                :
                route === 'home' ?
                  <div>
                    <HomeNav user={this.state.user.id} onRouteChange={this.onRouteChange} updateTransactions={this.updateTransactions} />
                    <Bigchart user={this.state.user.id} ></Bigchart>
                  </div>
                  :
                  route === 'transactions' ?
                    <div>
                      <Transactions user={this.state.user} onRouteChange={this.onRouteChange} />
                    </div>
                    :
                    route === 'goals' ?
                      <div>
                        <Goal user={this.state.user} onRouteChange={this.onRouteChange}></Goal>
                      </div>
                      : <div>ohasdfasdf</div>
        }
      </div>
    );
  }
}

export default App;
