import React, { Component } from 'react';
import { Jumbotron, Button, Card, CardDeck } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import { Container, Row, Col } from 'react-bootstrap';

export default class Transactions extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            trans: [],
            categories: {},
            filter: false,
            transFiltered: []
        };
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
                var temp = res;
                var cats = [];
                var data = {};
                temp.map(indx => {
                    cats.push(indx[1][0]);
                })
                for (var x = 0; x < cats.length; x++) {
                    if (cats[x] in data) {
                        data[cats[x]] = data[cats[x]].concat(x);
                    }
                    else
                        data[cats[x]] = [x];
                }
                this.setState({ categories: data });
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
                var cats = [];
                var data = {};
                transac.map(indx => {
                    cats.push(indx[1][0]);
                })
                for (var x = 0; x < cats.length; x++) {
                    if (cats[x] in data) {
                        data[cats[x]] = data[cats[x]].concat(x);
                    }
                    else
                        data[cats[x]] = [x];
                }
                this.setState({ categories: data });
            });
    }
    onCats = (cat) => {
        if (cat == "none") {
            console.log("here")
            this.setState({ filter: false });
        }
        else {
            var transactions = []
            var indexes = [];
            var filt = [];
            transactions = this.state.trans
            indexes = this.state.categories[cat['key']];
            console.log(indexes);
            filt = indexes.map(indx => {
                return this.state.trans[indx];
            })
            this.setState({
                transFiltered: filt,
                filter: true
            })

        }

    }

    render() {
        return (
            <Container fluid="true">
                <Row>
                    <Col className="bg-white" lg={{ span: 8, offset: 2 }} md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }}>
                        <div class="btn-group left-1">
                            <button type="button" class="btn btn-primary">Days</button>
                            <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" onClick={() => this.onSelect(30)}>30</a>
                                <a class="dropdown-item" onClick={() => this.onSelect(60)}>60</a>
                                <a class="dropdown-item" onClick={() => this.onSelect(90)}>90</a>
                            </div>
                        </div>
                        <div class="btn-group left-2">
                            <button type="button" class="btn btn-primary">Categories</button>
                            <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="sr-only">Toggle Dropdown</span>
                            </button>
                            <div class="dropdown-menu">
                                {Object.keys(this.state.categories).map(key => {
                                    return (
                                        <a class="dropdown-item" onClick={() => this.onCats({ key })}>{key}</a>
                                    )
                                })}
                                <a class="dropdown-item" onClick={() => this.onCats("none")}>None</a>
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
                                {this.state.filter === false
                                    ?
                                    this.state.trans.map(trans => {
                                        return (
                                            <tr>
                                                <th scope="row">${trans[0]}</th>
                                                <td>{trans[2]} </td>
                                                <td>{trans[1].join(", ")}</td>
                                                <td>{trans[3]}</td>
                                            </tr>
                                        )
                                    })

                                    :
                                    this.state.filter === true
                                        ?
                                        this.state.transFiltered.map(trans => {
                                            return (
                                                <tr>
                                                    <th scope="row">${trans[0]}</th>
                                                    <td>{trans[2]} </td>
                                                    <td>{trans[1].join(", ")}</td>
                                                    <td>{trans[3]}</td>
                                                </tr>
                                            )
                                        })
                                        : <div>oh shoot</div>
                                }
                            </tbody>
                        </table>

                    </Col>
                </Row>
            </Container>


        )
    }
}