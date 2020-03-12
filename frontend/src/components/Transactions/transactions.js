import React, { Component } from 'react';
import { Jumbotron, Button, Card, CardDeck } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

export default class Transactions extends React.Component {

    constructor(props) {
        super(props);
        this.state = { trans: [] };
    }


    componentDidMount() {
        var dataCat = [];
        var dataAmo = [];
        fetch("http://localhost:9000/users/searchTrans", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.props.user.id
            })
        })
            .then(response => response.json())
            .then(res => {
                this.setState({ trans: res });
            });

    }
    onSelect(date) {

        fetch("http://localhost:9000/plaid/", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                accessToken: this.props.user.accessToken,
                days: date
            })
        })
            .then(response => response.json())
            .then(res => {
                var temp = res.transactions;
                var transac = temp.map(indx => {
                    var temp = [];
                    temp.push(indx.amount);
                    temp.push(indx.category);
                    temp.push(indx.name);
                    temp.push(indx.date);
                    return temp;
                });
                this.setState({ trans: transac });
                console.log(this.state.trans);
            });


    }

    render() {
        return (
            <Container fluid="true">
                <Row>
                    <Col className="bg-white" lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }}>
                        <div class="btn-group">
                            <button type="button" class="btn btn-danger">Action</button>
                            <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" onClick={() => this.onSelect(30)}>30</a>
                                <a class="dropdown-item" onClick={() => this.onSelect(60)}>60</a>
                                <a class="dropdown-item" onClick={() => this.onSelect(90)}>90</a>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col className="bg-white" lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }}>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Categories</th>
                                    <th scope="col">Dates</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.trans.map(trans => {
                                    return (
                                        <tr>
                                            <th scope="row">${trans[0]}</th>
                                            <td>{trans[2]} </td>
                                            <td>{trans[1].join(", ")}</td>
                                            <td>@{trans[3]}</td>

                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </Col>
                </Row>
            </Container>


        )
    }
}