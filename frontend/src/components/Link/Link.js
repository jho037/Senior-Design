import React, { Component } from "react";
import PlaidLink from "react-plaid-link";
import axios from "axios";
import { Container, Row, Col } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import './Link.css';

class Link extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: [],
            temp: ''
        }

        this.handleOnSuccess = this.handleOnSuccess.bind(this);
    }

    handleOnSuccess(public_token, metadata) {
        // send token to client server
        console.log(this.props.user);
        fetch("http://localhost:9000/plaid/get_access_token", {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                public_token: public_token
            })
        })
            .then(response => response.json())
            .then(res => {
                fetch("http://localhost:9000/users/update/access", {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: this.props.user,
                        accessToken: res.access_token
                    })
                })
                    .then(response => response.json())
                    .then(res => {
                        this.props.loadUser(res);
                        this.props.updateTransactions(res.accessToken, res._id);
                        this.props.onRouteChange('goals');
                    })

            });
    }

    handleOnExit() {
        // handle the case when your user exits Link
        // For the sake of this tutorial, we're not going to be doing anything here.
    }

    render() {
        return (

            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand top" href="#">FinMan</a>
                    <img class="resize" src="https://img.icons8.com/ios-filled/50/000000/airplane-tail-fin.png" />
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>
                <div className="top">Almost There!</div>
                <div className="editme">
                    <Container fluid="true">
                        <Row class="row-align-items-center">
                            <Col lg={{ span: 6, offset: 4 }} md={{ span: 10, offset: 1 }} sm={{ span: 12, offset: 0 }}>
                                <div class="card-group">
                                    <div class="card">
                                        <img class="card-img-top" src="http://pngimg.com/uploads/number1/number1_PNG14906.png" alt="Card image cap" />
                                        <div class="card-body">
                                            <h5 class="card-title">Find your Bank</h5>

                                        </div>
                                    </div>
                                    <div class="card">
                                        <img class="card-img-top" src="http://pngimg.com/uploads/number2/Number%202%20PNG%20images%20free%20download_PNG14936.png" alt="Card image cap" />
                                        <div class="card-body">
                                            <h5 class="card-title">Connect it to FinMan</h5>

                                        </div>
                                    </div>
                                    <div class="card">
                                        <img class="card-img-top" src="http://pngimg.com/uploads/number3/number3_PNG14957.png" alt="Card image cap" />
                                        <div class="card-body">
                                            <h5 class="card-title">Let FinMan do the rest!</h5>

                                        </div>
                                    </div>
                                </div>
                                <PlaidLink
                                    clientName="React Plaid Setup"
                                    env="development"
                                    product={["auth", "transactions"]}
                                    publicKey="d393e49d5cd80df0a7d0ac6562875a"
                                    onExit={this.handleOnExit}
                                    onSuccess={this.handleOnSuccess}
                                    className="w-100 mt-3 hover-gray grow"
                                >
                                    Click here to connect your bank
                </PlaidLink>
                            </Col>
                        </Row>
                    </Container>
                </div>



                {/* <div>
                    <button onClick={this.handleClick}>Get Transactions</button>
                </div> */}
            </div>


        );
    }
}

export default Link;
