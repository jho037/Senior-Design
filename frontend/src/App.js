import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';

import Landing from './components/Landing'
import Banner from './components/banner/Banner'

function App() {
  return (
    <div>
      <Container fluid="true">
        <Row >
          <Col lg={{ span: 8, offset: 2 }}>
            <Landing></Landing>
            <Banner id="home"> home</Banner>
            <div id="features"> features</div>
            <div id="pricing"> prices</div>
          </Col>
        </Row>
      </Container>


    </div>
  );
}

export default App;
