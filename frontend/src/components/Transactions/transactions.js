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
                id: this.props.user
            })
        })
            .then(response => response.json())
            .then(res => {
                this.setState({ trans: res });
            });

    }

    render() {
        return (

            // <div>
            //     <h1>Transactions List</h1>
            //     <ul>
            //         {this.state.trans.map(trans => {
            //             return <li>{trans[0]} {trans[2]} {trans[1]}</li>
            //         })}
            //     </ul>
            // </div>
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
                                <th scope="row">{trans[0]}</th>
                                <td>{trans[2]} </td>
                                <td>{trans[1]}</td>
                                <td>@{trans[3]}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>


        )
    }
}