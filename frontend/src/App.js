import React from 'react';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Landing from './components/Landing/Landing.js'
import HomeNav from './components/HomeNav/HomeNav'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import Particles from 'react-particles-js'
import Link from './components/Link/Link.js'
import Bigchart from './components/Charts/Bigchart.js'
import Transactions from './components/Transactions/transactions'
import Goal from './components/Goal/Goal'
import Accsettings from './components/Accsettings/Accsettings'
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
      route: 'home',
      isSignedIn: false,
      user: {
        id: '5e6ea5583dec336c94d6ba23',
        name: '',
        email: '',
        goal: '',
        accessToken: ''
      }
    }
  }

  loadUser = (data) => {      //loaduser with data received when signin is called 
    this.setState({
      user: {
        id: data._id,
        name: data.name,
        email: data.email,
        accessToken: data.accessToken,
        goal: data.goal
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

  updateTransactions(res, uid) {
    fetch("http://localhost:9000/plaid/", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        accessToken: res,
        days: 30
      })
    })
      .then(response => response.json())
      .then(res => {
        console.log(res.transactions);
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
                  <Link user={this.state.user.id} loadUser={this.loadUser} onRouteChange={this.onRouteChange} updateTransactions={this.updateTransactions} />
                  asdf
                </div>

                :
                route === 'home' ?

                  <Container fluid="true">
                    <Row >
                      <Col className="bg-white" lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }}>
                        <HomeNav user={this.state.user.id} onRouteChange={this.onRouteChange} updateTransactions={this.updateTransactions} />
                        <Bigchart user={this.state.user.id} ></Bigchart>
                      </Col>
                    </Row>
                  </Container>


                  :
                  route === 'transactions' ?
                    <div>
                      <Container fluid="true">
                    <Row >
                      <Col className="bg-white" lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }}>
                      <HomeNav user={this.state.user.id} onRouteChange={this.onRouteChange} updateTransactions={this.updateTransactions} />
                      <Transactions user={this.state.user} onRouteChange={this.onRouteChange} />
                      </Col>
                    </Row>
                  </Container>
                      
                    </div>
                    :
                    route === 'goals' ?
                      <div>
                        <Goal loadUser={this.loadUser} user={this.state.user} onRouteChange={this.onRouteChange}></Goal>
                      </div>
                      :
                      route === 'Accsettings' ?
                      <div>
                        <Container fluid="true">
                    <Row >
                      <Col className="bg-white" lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }}>
                        <HomeNav user={this.state.user.id} onRouteChange={this.onRouteChange} updateTransactions={this.updateTransactions} />
                        <Accsettings loadUser={this.loadUser} user={this.state.user} onRouteChange={this.onRouteChange}></Accsettings>
                      </Col>
                    </Row>
                  </Container>
                        
                      </div>
                      : <div>ohasdfasdf</div>
        }
      </div>
    );
  }
}

export default App;
