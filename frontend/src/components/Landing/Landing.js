import React, { Component } from 'react';
import { Jumbotron, Button, Card, CardDeck } from 'react-bootstrap';
import './Landing.css';
import { Navbar, Nav } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

export default class Banner extends React.Component {

    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    render() {
        const { onRouteChange } = this.props;
        return (

            <Container fluid="true">
                <Row >
                    <Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }}>
                        <Navbar bg="light" sticky="top" variant="light">

                            <Navbar.Brand onClick={() => onRouteChange('landing')} id="title" href="#home">Finman</Navbar.Brand>
                            <img className="resize" src="https://img.icons8.com/ios-filled/50/000000/airplane-tail-fin.png" />
                            <Nav className="ml-auto">
                                <Nav.Link onClick={() => onRouteChange('signin')} className="grow" href="#home">Sign In</Nav.Link>
                                <Nav.Link onClick={() => onRouteChange('register')} className="grow" href="#features">Sign Up</Nav.Link>
                            </Nav>
                        </Navbar>
                        <p>{this.state.apiResponse}</p>
                        <Jumbotron className="jumbo">
                            <h1>Financial</h1>
                            <p>
                                This is a simple hero unit, a simple jumbotron-style component for calling
                                extra attention to featured content or information.
                    </p>
                            <Button onClick={() => onRouteChange('register')} variant="primary">Get Started</Button>
                        </Jumbotron>
                        <CardDeck>
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px160" />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This content is a little bit longer.
                            </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px160" />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This card has supporting text below as a natural lead-in to additional content.{' '}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                            <Card>
                                <Card.Img variant="top" src="holder.js/100px160" />
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a wider card with supporting text below as a natural lead-in to
                                        additional content. This card has even longer content than the first to
                                        show that equal height action.
                            </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                        </CardDeck>
                    </Col>
                </Row>
            </Container>



        )
    }
}


{/* <Container fluid="true">
                <Row >
                    <Col lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }}>
                        <Navbar bg="light" sticky="top" variant="light">
                            <Navbar.Brand href="#home">Finman</Navbar.Brand>
                            <Nav className="ml-auto">
                                <Nav.Link onClick={ () => onRouteChange('signin')} className="grow" href="#home">Log In</Nav.Link>
                                <Nav.Link onClick={ () => onRouteChange('register')} className="grow" href="#features">Sign Up</Nav.Link>
                            </Nav>
                        </Navbar>
                        <Banner id="home"> home</Banner>
                        
                    </Col>
                </Row>
            </Container> */}