import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export default class Landing extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        return (
            <Navbar bg="light" sticky="top" variant="light">
                <Navbar.Brand href="#home">Finman</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}
