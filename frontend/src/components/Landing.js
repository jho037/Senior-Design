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
                            <Nav className="mr-auto">
                                <Nav.Link href="#home">Home</Nav.Link>
                                <Nav.Link href="#features">Features</Nav.Link>
                                <Nav.Link href="#pricing">Pricing</Nav.Link>
                            </Nav>
                        </Navbar>
                        <Banner id="home"> home</Banner>
                        <div id="features"> features</div>
                        <div id="pricing"> prices</div>
                    </Col>
                </Row>
            </Container>

        )
    }
}
