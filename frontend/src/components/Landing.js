import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import Banner from './banner/Banner'


const Landing = ( { onRouteChange, isSignedIn})=> {
    return (
        <Container fluid="true">
                <Row >
                    <Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }}>
                        <Navbar bg="light" sticky="top" variant="light">
                            <Navbar.Brand href="#home">Finman</Navbar.Brand>
                            <Nav className="ml-auto">
                                <Nav.Link onClick={ () => onRouteChange('signin')} className="grow" href="#home">Sign In</Nav.Link>
                                <Nav.Link onClick={ () => onRouteChange('register')} className="grow" href="#features">Register</Nav.Link>
                            </Nav>
                        </Navbar>
                        <Banner id="home"> home</Banner>
                        
                    </Col>
                </Row>
            </Container>
    );
}

export default Landing;
