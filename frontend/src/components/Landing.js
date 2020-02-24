import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';
import Banner from './banner/Banner'

export default class Landing extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <Container fluid="true">
                <Row >
                    <Col lg={{ span: 8, offset: 2 }}>
                        <Navbar bg="light" sticky="top" variant="light">
                            <Navbar.Brand href="#home">Finman</Navbar.Brand>
                            <Nav className="ml-auto">
                                <Nav.Link className="grow" href="#home">Sign In</Nav.Link>
                                <Nav.Link className="grow" href="#features">Register</Nav.Link>
                            </Nav>
                        </Navbar>
                        <Banner id="home"> home</Banner>
                        
                    </Col>
                </Row>
            </Container>

        )
    }
}
